let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;
let puntos = 0;

const ALTO_GATO = 50;
const ANCHO_GATO = 50;
const ALTO_COMIDA = 30;
const ANCHO_COMIDA = 30;

let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);

    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    graficarGato();
    graficarComida();
}

function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "blue");
}

function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "red");
}

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 3. LÓGICA DE MOVIMIENTO (PARTE 3)
function moverIzquierda() {
    gatoX = gatoX - 10;
    actualizarPantalla();
}

function moverDerecha() {
    gatoX = gatoX + 10;
    actualizarPantalla();
}

function moverArriba() {
    gatoY = gatoY - 10;
    actualizarPantalla();
}

function moverAbajo() {
    gatoY = gatoY + 10;
    actualizarPantalla();
}

function actualizarPantalla() {
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function detectarColision() {
    // Algoritmo de colisión entre rectángulos
    if (gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY) {
        
        comerComida();
    }
}

function comerComida() {
    puntos++;
    actualizarPuntos(puntos); 
    comidaX = obtenerNumeroAleatorio(0, canvas.width - ANCHO_COMIDA);
    comidaY = obtenerNumeroAleatorio(0, canvas.height - ALTO_COMIDA);
    limpiarCanva();
    graficarGato();
    graficarComida();
}