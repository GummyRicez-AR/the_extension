var friskXPos = 0;
var image = document.createElement("img");

document.body.onload = () => {
    image.src = chrome.runtime.getURL("graphics/SOU_Frisk.png");
    image.style.width = "200px";
    image.style.height = "300px";
    image.style.position = "fixed";
    image.style.bottom = "0px";
    image.style.left = "0px";
    document.body.append(image);
    moveFrisk();
}

const elements = document.querySelectorAll("p");
const bigHeader = document.querySelector("h1");

elements.forEach(element => {
    element.innerHTML += " My wiiiiife!"
});

if (bigHeader) {
    bigHeader.style.color = "red";
}


function moveFrisk() {
    var friskTargetX = Math.floor(Math.random() * 1000);
    console.log(friskTargetX);
    if (friskXPos < friskTargetX) {
        console.log("yes");
        interval = setInterval( () => {
            console.log("interval+");
            friskXPos += 2;
            image.style.left = friskXPos.toString() + "px";
            if (friskXPos >= friskTargetX) {
                image.style.left = friskTargetX.toString() + "px";
                friskXPos = friskTargetX;
                clearInterval(interval);
                setTimeout(moveFrisk, 1000);
            }
        }, 20);
    } else {
        console.log("no");
        interval = setInterval( () => {
            console.log("interval-");
            friskXPos -= 2; 
            image.style.left = friskXPos.toString() + "px";
            if (friskXPos <= friskTargetX) {
                image.style.left = friskTargetX.toString() + "px";
                friskXPos = friskTargetX;
                clearInterval(interval);
                setTimeout(moveFrisk, 1000);
            }
        }, 20);
    }
}