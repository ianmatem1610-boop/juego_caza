// 1. VARIABLES GLOBALES
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;
let puntos = 0;
let tiempo = 10; // Valor inicial
let idIntervalo; // Para detener el tiempo

const ALTO_GATO = 50;
const ANCHO_GATO = 50;
const ALTO_COMIDA = 30;
const ANCHO_COMIDA = 30;

let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// 2. INICIO DEL JUEGO
function iniciarJuego() {
    // Posiciones iniciales
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    graficarGato();
    graficarComida();

    // Iniciar cuenta regresiva cada segundo
    idIntervalo = setInterval(restarTiempo, 1000);
}

// 3. LÓGICA DEL TIEMPO
function restarTiempo() {
    tiempo--; // Restar 1 al tiempo
    actualizarTiempo(tiempo); // Llama a utilitarios.js

    if (tiempo <= 0) {
        clearInterval(idIntervalo);
        alert("GAME OVER - Se acabó el tiempo");
    }
}

// 4. FUNCIONES DE DIBUJO
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

// 5. MOVIMIENTOS
function actualizarPantalla() {
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverIzquierda() { gatoX -= 10; actualizarPantalla(); }
function moverDerecha() { gatoX += 10; actualizarPantalla(); }
function moverArriba() { gatoY -= 10; actualizarPantalla(); }
function moverAbajo() { gatoY += 10; actualizarPantalla(); }

// 6. COLISIONES Y PUNTAJES
function detectarColision() {
    if (gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY) {
        
        comerComida();
    }
}

function comerComida() {
    puntos++;
    actualizarPuntos(puntos); // Llama a utilitarios.js

    if (puntos >= 6) {
        clearInterval(idIntervalo);
        alert("¡FELICIDADES! Has ganado");
        return;
    }

    // Nueva posición aleatoria
    comidaX = obtenerNumeroAleatorio(0, canvas.width - ANCHO_COMIDA);
    comidaY = obtenerNumeroAleatorio(0, canvas.height - ALTO_COMIDA);

    actualizarPantalla();
}
// puinto del reinicio
function reiniciarJuego() {
    clearInterval(idIntervalo);
    puntos = 0;
    tiempo = 10;
    actualizarPuntos(puntos);
    actualizarTiempo(tiempo);
    iniciarJuego();
}