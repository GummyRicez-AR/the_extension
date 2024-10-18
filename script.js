document.body.onload = () => {
    const image = document.createElement("img");
    image.src = "SOU_Frisk.png";
    image.style.position = "fixed";
    document.body.appendChild(image);
}

const elements = document.querySelectorAll("p");
const bigHeader = document.querySelector("h1");

elements.forEach(element => {
    element.innerHTML += " My wiiiiife!"
});

if (bigHeader) {
    bigHeader.style.color = "red";
}