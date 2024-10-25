var friskXPos = 0;
var image = document.createElement("img");
var spawnButton = document.createElement("button");
spawnButton.id = "spawner";
var deleteButton = document.createElement("button");
deleteButton.id = "remover";
const MOVE_INTERVAL = 20;
const FRISK_LIMIT = 10;

document.body.onload = () => {
    // upon webpage loading, create some frisks
    let frisk1 = new Frisk();
    let frisk2 = new Frisk();
    let frisk3 = new Frisk();
    friskTime = setInterval(Frisk.moveFrisks, MOVE_INTERVAL);

    // add a button capable of spawning more frisks and an event listener for the button
    spawnButton.position = "fixed";
    spawnButton.innerHTML = "ADD MORE";
    document.body.append(spawnButton);
    document.getElementById("spawner").addEventListener("click", spawnFrisk);

    // add another button capable of deleting frisks
    deleteButton.position = "fixed";
    deleteButton.innerHTML = "DELETE";
    document.body.append(deleteButton);
    document.getElementById("remover").addEventListener("click", deleteFrisk);
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

function spawnFrisk() {
    if (Frisk.friskList.length < FRISK_LIMIT) {
        let frisk = new Frisk();
    }
}

function deleteFrisk() {
    if (Frisk.friskList.length > 0) {
        friskPop = Frisk.friskList.pop();
        friskPop.image.remove();
        delete friskPop;
    }
}