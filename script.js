document.body.onload = () => {
    var image = document.createElement("img");
    image.src = chrome.runtime.getURL("graphics/SOU_Frisk.png");
    image.style.width = "200px";
    image.style.height = "300px";
    image.style.position = "fixed";
    image.style.bottom = 0;
    image.style.left = 0;
    document.body.append(image);
}

const elements = document.querySelectorAll("p");
const bigHeader = document.querySelector("h1");

elements.forEach(element => {
    element.innerHTML += " My wiiiiife!"
});

if (bigHeader) {
    bigHeader.style.color = "red";
}