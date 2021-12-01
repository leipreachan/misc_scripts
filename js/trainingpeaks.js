// this JS bookmarklet adds CADENCE values to Trainingpeaks structured workout
// sometimes you may have them in the description field but missed in the 
// actual workout. Use it in that case!


javascript:function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

result = [];
z = document.querySelectorAll('.workoutStep');
z.forEach((item) => {
    let v = item.querySelector('.workoutStepName').value;
    let matcher = v.match(/(\w+) ?RPM/i);
    if (!matcher) {
        v = querySelector(".notes .contents").innerText;
        matcher = v.match(/(\w+) ?RPM/i);
    }
    let low = 0, high = 0;
    if (matcher) {
        if (matcher[1] > 1) {
            low = high = matcher[1];
        } else {
            low = 120; high = 150;
        }
        result.push([item, low, high]);
        console.log(`Found ${v}`);
        try {
            item.querySelector('.addCadence').click();
        } catch (e) {
        }
    }
})
sleep(2000);
pasteEvent = new ClipboardEvent('paste', { 'bubbles': true });
result.forEach((item) => {
    setV = (el, val) => {
        pasteEvent.clipboardData.setData("text/plain", val);
        el.value = val;
        el.dispatchEvent(pasteEvent);
    }
    let inputs = item[0].querySelectorAll('[name="secondaryTargetValueInput"]');
    if (inputs.length > 1) {
        setV(inputs[0], item[1]);
        setV(inputs[1], item[2]);
    }
}) 
