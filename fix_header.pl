my $infile = shift(@ARGV);
my $outfile = $infile . ".restore.mp4";

my $ctts_offset=0;
my $width = 1280;
my $height = 720;
my $framerate = 30;
my $i, $val;

#
# Parse command line options for options
#
for($i=0; $i<@ARGV; $i++) {
	if ($ARGV[$i] =~ /-ctts/) {
		$ctts_offset = $ARGV[++$i];
	}
	if ($ARGV[$i] =~ /-reso/){
		$val = $ARGV[++$i];
		if ($val eq '720p30' || $val eq 'r2') {
			$width = 1280;
			$height = 720;
			$framerate = 30;
		} elsif ($val eq '720p60' || $val eq 'r3') {
			$width = 1280;
			$height = 720;
			$framerate = 60;
		} elsif ($val eq '960p30' || $val eq 'r4') {
			$width = 1280;
			$height = 960;
			$framerate = 30;
		} elsif ($val eq '1080p30' || $val eq 'r5') {
			$width = 1920;
			$height = 1080;
			$framerate = 30;
		} elsif ($val eq '480p60' || $val eq 'r1') {
			$width = 848;
			$height = 480;
			$framerate = 60; }
		else {
			printf("Error - resolution $val not supported. Trying default ".$height."p"."$framerate\n");
		}
	}
	
}

open INFILE, "<", $infile or die("Cannot open $infile for reading\n");
binmode INFILE;


print ("\nAttempting to fix $infile\n\n");

#disable screen buffering
$|=1;

#
# read data section, find video frames
#

my $n, $size, $type, $buff, $framecount, @ptrs, @szs, $offset, $pmdat;

#
# Skip looking for mdat, find frames by brute force
#


$framecount = 0;

#set delimiter to look for 6-byte value indicating AVC frame start
$/ = pack ("C*", (0x00, 0x00, 0x00, 0x02, 0x09));

printf("Found frame        at         "); 
while ($buff = <INFILE>)  {
	printf("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b%06d at %08x", $framecount, (tell INFILE) - 5);
	$ptrs[$framecount] = (tell INFILE)-5; #adjust to start of code
	if ($framecount > 0) {
		$szs[$framecount-1] = $ptrs[$framecount] - $ptrs[$framecount-1];
		#print ("size:  ".$szs[$framecount-1]."  \n");
	}
	$framecount++;
}

# throw away last one since it triggered on EOF
$framecount--;
pop(@ptrs);

#set beginning of mdat pointer based on 1st found frame
$pmdat=$ptrs[0]-8;


if ($framecount == 0){
	printf("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
	printf("No frames found. Quitting.            \n");
	close INFILE;
	exit;
} else {
	print ("\n");
}


open OUTFILE, ">", $outfile or die("Cannot open $outfile for writing\n");
binmode OUTFILE;
print ("Opened file $outfile for writing\n\n");


$min=0xffffffff;
$max=0x0;
foreach(@szs){
	if ($_> $max) {$max = $_}
	if ($_< $min) {$min = $_}
}
	

printf("Found %d (%x) frames, or approx %ds of video at %dfps\n", $framecount, $framecount, $framecount / $framerate, $framerate);
printf("   min size %x, max size %x\n", $min, $max);
printf("   from %x, to %x\n", $ptrs[0], $ptrs[$framecount-1]);



#
# Rebuild Header
#

my $hdrsize, $i, $moov, $stbl ;

#calculate size
#17 B per frame V, 17 Bpf A, plus overhead
$hdrsize = (34 * $framecount) + 2500;
$hdrsize = int ($hdrsize / 0x8000) + 1;
if ($hdrsize % 2 == 0) {
	$hdrsize ++; # always make header size an odd multiple of 0x8000
}
$hdrsize = $hdrsize * 0x8000;

# calculate adjustment for new header size
$offset = $hdrsize - $pmdat ;

printf("Calculated header size of 0x%x \n",$hdrsize); 
printf("Using ctts offset of $ctts_offset\n");
printf("Using $width x $height @ $framerate fps\n");

# ftyp
print OUTFILE pack("NA4A4NA4A4NN",0x20,'ftyp','avc1',0,'avc1','isom',0,0);

#stbl
$stbl = pack ("NA4NN",0xf9,'stsd',0,0x01); 
$stbl .= pack ("NA4NNNNNNnnNNNCCCA21C11CCC",0xe9,'avc1',0,1,0,0,0,0,$width,$height,0x480000,0x480000,0,0,1,0x15,'Ambarella AVC encoder',0,0,0,0,0,0,0,0,0,0,0,0x18,0xff,0xff);
$stbl .= pack ("NA4NN",0x10,'pasp',0,0);
$stbl .= pack ("NA4N8",0x28,'clap',$width,1,$height,1,0,1,0,1);
if ($height == 1080) {
	$stbl .= pack ("NA4N15C3",0x47,'avcC',0x014d0028,0xffe10030,0x274d0028,0x9a6280f0,0x044fcb80,0x8800001f,0x48000753,0x07430005, 0xb8e00019,0xbfd5de5c,0x686000b7,0x1c000337,0xfabbcb87,0xc2211458,0x01000428,0xee,0x3c,0x80);
} elsif ($height == 480) {
	$stbl .= pack ("NA4N15C3",0x47,'avcC',0x014d401e,0xffe10030,0x274d401e,0x9a6281a8,0x7b602200,0x7d200,0x03a981d0,0x8007a180, 0x0044aa57,0x7971a100,0x0f430000,0x8954aef2,0xe1f08845,0x16000000,0x01000428,0xee,0x3c,0x80);
} elsif ($height == 960) {
	$stbl .= pack ("NA4N15C3",0x47,'avcC',0x014d0028,0xffe10030,0x274d0028,0x9a6280a0,0x0f360220,0x7d20,0x1d4c1d,0x0c0016e3, 0x800066ff,0x577971a1,0x8002dc70,0x000cdfea,0xef2e1f08,0x84516000,0x01000428,0xee,0x3c,0x80);
}  else {
	$stbl .= pack ("NA4N15C3",0x47,'avcC',0x014d0028,0xffe10030,0x274d0028,0x9a6280a0,0x0b760220,0x7d20,0x1d4c1d,0x0c003d0a, 0x0112a9,0x5de5c686,0x1e8500,0x8954ae,0xf2e1f088,0x451e0000,0x01000428,0xee,0x3c,0x80);
}
$stbl .= pack ("NA4N3",0x14,'btrt',0,0,0);
$stbl .= pack ("NA4N4",0x18,'stts',0,1,$framecount,90090/$framerate);
$stbl .= pack ("NA4NN",8*$framecount  + 0x10, 'ctts', 0, $framecount); 
if ($height == 1080) {
	for ($i=0;$i < $framecount;$i++){
		$stbl .= pack ("NN",1,0x0bbb);
	}
} elsif ( $framerate == 60) {
	for ($i=$ctts_offset;$i < $framecount + $ctts_offset;$i++){
		if (($i  %6 == 0) || ($i %6 == 3)) {
			$stbl .= pack ("NN",1,0x1199);
		} elsif (($i  %6 == 1) || ($i %6 == 5)) {
			$stbl .= pack ("NN",1,1);
		} else {
			$stbl .= pack ("NN",1,0);
		}
	}
} else {
	for ($i=$ctts_offset;$i < $framecount + $ctts_offset;$i++){
		if ($i % 3 == 0) {
			$stbl .= pack ("NN",1,0x2331);
		} else {
			$stbl .= pack ("NN",1,0);
		}
	}
}
$stbl .= pack ("NA4N5",0x1c,'stsc',0,1,1,1,1);
$stbl .= pack ("NA4N3",4*$framecount + 0x14, 'stsz',0,0,$framecount);
for ($i=0;$i < $framecount;$i++){
	$stbl .= pack ("N",$szs[$i]);
}
$stbl .= pack ("NA4N2",4*$framecount + 0x10, 'stco',0,$framecount);
for ($i=0;$i < $framecount;$i++){
	$stbl .= pack ("N",$ptrs[$i] + $offset);
}
#fake stss because I don't know how to re-calculate it
$stbl .= pack ("NA4N3",0x14,'stss',0,1,1);
$stbl .= pack ("NA4N",$framecount + 0xc,'sdtp',0);
if ($height == 1080) {
	for ($i=0;$i < $framecount;$i++){
		$stbl .= pack ("C",0);
	}
} else {
	for ($i=0;$i < $framecount;$i++){
		if ($i % 3 == 0) {
			$stbl .= pack ("C",0);
		} else {
			$stbl .= pack ("C",0x08);
		}
	}
}
#moov
print OUTFILE pack("NA4",$hdrsize-0x20,'moov');
print OUTFILE pack ("NA4N25",0x6c,'mvhd',0,0,0,0x015f90,2700000 / $framerate / 0x1d * $framecount, 0x010000, 0x01000000, 0, 0, 0x010000,0,0,0,0x010000,0,0,0,0x40000000,0,0,0,0,0,0,3);
print OUTFILE pack ("NA4",0x180,'udta');
if ($height == 960) {
	print OUTFILE pack ("NA4N30",0x80,'AMBA',0x040003,0x01030f00,0x04,0x1776,0x02bf20,0xb71b00,0xb71b00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x0100);
} elsif ($height == 1080) {
	print OUTFILE pack ("NA4N30",0x80,'AMBA',0x100009,0x01010800,0x04,0x0bbb * (3-($framerate/30)),0x02bf20,0xb71b00,0xb71b00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x0100);
} else {
	print OUTFILE pack ("NA4N30",0x80,'AMBA',0x100009,0x01030f00,0x04,0x0bbb * (3-($framerate/30)),0x02bf20,0x7a1200,0x7a1200,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x0100);
}
print OUTFILE pack ("NA4N60",0xf8,'free',(0)x60);
print OUTFILE pack ("NA4",0x16a + length($stbl), 'trak');
print OUTFILE pack ("NA4N19n4",0x5c,'tkhd',0x07,0,0,1,0,2700000 / $framerate / 0x1d * $framecount,0,0,0,0,0x10000,0,0,0,0x10000,0,0,0,0x40000000,$width,0,$height,0);
print OUTFILE pack ("NA4",0x24,'edts');
print OUTFILE pack ("NA4N5",0x1c,'elst',0,1,0x015f90 / 0x1d * $framecount, 90090/$framerate,0x10000);
print OUTFILE pack ("NA4",0x44, 'tapt');
print OUTFILE pack ("NA4Nn4",0x14,'clef',0,$width,0,$height,0);
print OUTFILE pack ("NA4Nn4",0x14,'prof',0,$width,0,$height,0);
print OUTFILE pack ("NA4Nn4",0x14,'enof',0,$width,0,$height,0);
print OUTFILE pack ("NA4", 0x9e + length($stbl), 'mdia');
print OUTFILE pack ("NA4N6", 0x20, 'mdhd', 0,0,0,0x015f90,0x015f90 / 0x1d * $framecount,0);
print OUTFILE pack ("NA4N2A4N3CA13", 0x2e, 'hdlr', 0,0, 'vide',0,0,0,0xd,'Ambarella AVC');
print OUTFILE pack ("NA4",0x48 + length ($stbl), 'minf');
print OUTFILE pack ("NA4N3", 0x14, 'vmhd', 1,0,0,);
print OUTFILE pack ("NA4",0x24,'dinf');
print OUTFILE pack ("NA4N2",0x1c,'dref',0,1);
print OUTFILE pack ("NA4N",0xc,'url ',1);
print OUTFILE pack ("NA4", 0x8+length($stbl),'stbl');
print OUTFILE $stbl;


print OUTFILE pack ("NA4",$hdrsize - tell OUTFILE, 'free');

for ($i=$hdrsize - tell OUTFILE; $i>0; $i--) {
	print OUTFILE pack ("C",0);
}

#
# Copy data over
#

print OUTFILE pack ("NA4",unpack ("%123d*" , pack( "d*", @szs)) + 13,'mdat');
seek INFILE, $pmdat + 8, 0;
$framecount=0;
printf("Copying  frame       ..."); 
while ($buff = <INFILE>)  {
	printf("\b\b\b\b\b\b\b\b\b%06d...", $framecount++);
	print OUTFILE $buff;
}
print("\nDone.\n");

close OUTFILE;
close INFILE;




	
