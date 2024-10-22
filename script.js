var friskXPos = 0;
var image = document.createElement("img");
const MOVE_INTERVAL = 20;

document.body.onload = () => {
    image.src = chrome.runtime.getURL("graphics/SOU_Frisk.png");
    image.style.width = "10%";
    image.style.position = "fixed";
    image.style.bottom = "0px";
    image.style.left = "0px";
    let frisk1 = new Frisk();
    let frisk2 = new Frisk();
    let frisk3 = new Frisk();
    friskTime = setInterval(Frisk.moveFrisks, MOVE_INTERVAL);
}

const elements = document.querySelectorAll("p");
const bigHeader = document.querySelector("h1");
const regex = /sou|SOU|Sou/g;

elements.forEach(element => {
    element.innerHTML = element.innerHTML.replaceAll(regex, "<span><a href='https://www.youtube.com/watch?v=CJATWt1KbMA'>sou</a></span>")
    element.innerHTML += " My wiiiiife!"
});

if (bigHeader) {
    bigHeader.style.color = "red";
}

function moveFrisk() {
    let friskTargetX = Math.floor(Math.random() * (window.innerWidth * 0.9));
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

// EXPERIMENTAL: having multiple frisks on the screen
class Frisk {
    static friskList = [];
    image = null;
    #x = 0;
    #target = 0;
    currentlyMoving = true;
    timer = 0;
    constructor() {
        this.image = document.createElement("img");
        this.image.src = chrome.runtime.getURL("graphics/SOU_Frisk.png");
        this.image.style.width = "10%";
        this.image.style.position = "fixed";
        this.image.style.bottom = "0px";
        this.image.style.left = "0px";
        this.#x = 0;
        this.#target = Math.floor(Math.random() * (window.innerWidth * 0.9));
        Frisk.friskList.push(this);
        document.body.append(this.image);
    }

    #moveLeft() {
        this.#x -= 3;
        this.image.style.transform = "scaleX(1)";
        this.image.style.left = this.#x.toString() + "px";
        if (this.#x <= this.#target) { // if frisk is to the left of target after moving
            this.image.style.left = this.#target.toString() + "px";
            this.#x = this.#target;
            this.currentlyMoving = false;
            this.timer = Math.floor((Math.random() * 2000) + 1000);
            this.#target = Math.floor(Math.random() * (window.innerWidth * 0.9));
        }
    }

    #moveRight() {
        this.#x += 3;
        this.image.style.transform = "scaleX(-1)";
        this.image.style.left = this.#x.toString() + "px";
        if (this.#x >= this.#target) { // if frisk is to the right of target after moving
            this.image.style.left = this.#target.toString() + "px";
            this.#x = this.#target;
            this.currentlyMoving = false;
            this.timer = Math.floor((Math.random() * 2000) + 1000);
            this.#target = Math.floor(Math.random() * (window.innerWidth * 0.9));
        }
    }

    moveFrisk() {
        if (this.#x > this.#target) { // frisk wants to move to the left
            this.#moveLeft();
        } else { // frisk wants to move to the right
            this.#moveRight();
        }
    }

    static moveFrisks() {
        Frisk.friskList.forEach(function (i) {
            if (i.currentlyMoving) {
                i.moveFrisk();
            } else {
                i.timer -= MOVE_INTERVAL;
                if (i.timer <= 0) {
                    i.timer = 0;
                    i.currentlyMoving = true;
                }
            }
        });
    }
}