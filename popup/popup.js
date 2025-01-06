var userPreferences;

try {
    url = chrome.runtime.getURL("/userpref.json");
    console.log(url);
    fetch(url).then(response => response.json())
        .then(data => {
            userPreferences = data;
            console.log(userPreferences);
        });
} catch (error) {
    console.log(error);
}

function onLoad() {
    let friskText = document.getElementById("friskText");
    friskText.innerHTML = "hewwo! >w<\nhow many frisks do you want?";
    let friskInput = document.getElementById("fInputConfirm");
    friskInput.addEventListener("click", onInputClick)
}

function onInputClick() {
    let friskTextInput = document.getElementById("friskInput");
    let input = friskTextInput.value;
    try {
        input = parseInt(input, 10); // 10 is used to indicate base 10
    } catch (error) {
        console.log("can't set max number (number could not be converted to valid int)")
    }
}

document.body.onload = () => {
    onLoad();
}