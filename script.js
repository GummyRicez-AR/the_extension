var friskXPos = 0;
var image = document.createElement("img");

document.body.onload = () => {
    image.src = chrome.runtime.getURL("graphics/SOU_Frisk.png");
    image.style.width = "10%";
    image.style.position = "fixed";
    image.style.bottom = "0px";
    image.style.left = "0px";
    document.body.append(image);
    moveFrisk();
}

const elements = document.querySelectorAll("p");
const bigHeader = document.querySelector("h1");
const regex = /sou|SOU/g;

elements.forEach(element => {
    element.innerHTML = element.innerHTML.replaceAll(regex, "<span><a href='https://www.youtube.com/watch?v=CJATWt1KbMA'>sou</a></span>")
    element.innerHTML += " My wiiiiife!"
});

if (bigHeader) {
    bigHeader.style.color = "red";
}

function moveFrisk() {
    var friskTargetX = Math.floor(Math.random() * (window.innerWidth * 0.9));
    if (friskXPos < friskTargetX) {
        image.style.transform = "scaleX(-1)";
        interval = setInterval( () => {
            friskXPos += 3;
            image.style.left = friskXPos.toString() + "px";
            if (friskXPos >= friskTargetX) {
                image.style.left = friskTargetX.toString() + "px";
                friskXPos = friskTargetX;
                clearInterval(interval);
                setTimeout(moveFrisk, Math.floor((Math.random() * 2000) + 1000));
            }
        }, 20);
    } else {
        image.style.transform = "scaleX(1)";
        interval = setInterval( () => {
            friskXPos -= 3; 
            image.style.left = friskXPos.toString() + "px";
            if (friskXPos <= friskTargetX) {
                image.style.left = friskTargetX.toString() + "px";
                friskXPos = friskTargetX;
                clearInterval(interval);
                setTimeout(moveFrisk, Math.floor((Math.random() * 2000) + 1000));
            }
        }, 20);
    }
}