#!/bin/bash

if [ "$1" = "-h" ] || [ "$1" = "-help" ] || [ "$1" = "--help" ]; then
    echo "Upgrade your DSS kit with Dataiku Stories installed:"
    echo "$ upgrade-stories.sh <installation name of the kit> <path to dss kit tar gz>"
    echo ""
    echo "To get 'installation name' of the kit, use 'kittens ls' and see 'installation name' column"
    exit 0
fi
if [ -z "$1" ]; then
    echo "Please provide installation name of the DSS kit:"
    echo ""
    echo "upgrade-stories.sh <installation name> <DSS kit archive>"
    exit 1
fi
if [ -z "$2" ]; then
    echo "Please provide path to the DSS kit"
    echo "upgrade-stories.sh <installation name> <DSS kit archive>"
    exit 1
fi

# echo "Upgrading $1 dss kit using $2 archive"

KIT_NAME="$1"
KIT_ARCHIVE="$2"
#KIT_ID=$(kittens ls | grep $KIT_NAME |  awk '{print $2}')
DIP_HOME=$(kittens status | jq -r '.kits[] | select(.name == "'$KIT_NAME'") | .nodes[] | select(.type == "design") ."data-dir"')

cd $DIP_HOME

mv 'stories' 'stories.bak' 
echo "kittens upgrade -k $KIT_ARCHIVE $KIT_ID"
#kittens upgrade -k $KIT_ARCHIVE $KIT_ID && echo "Start the upgraded kit with 'kittens start kit $KIT_ID'"
kittens upgrade -k $KIT_ARCHIVE $KIT_NAME && echo "Start the upgraded kit with 'kittens start kit $KIT_NAME'"
mv 'stories.bak' 'stories'
