let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

function ejecutarAlCargar() {
    graficarGato();
    graficarComida();
}


function graficarGato() {
    ctx.fillStyle = "blue";
    ctx.fillRect(225, 225, 50, 50); 
}


function graficarComida() {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 30, 30);
}