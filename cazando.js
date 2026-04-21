// 1. VARIABLES GLOBALES
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;
let puntos = 0;
let tiempo = 15; // Punto 1: Tiempo inicial de 15s
let limiteActual = 15; // Para la dificultad progresiva
let idIntervalo; 

// Imágenes
let gatoImg = new Image();
gatoImg.src = "gato.jpg"; // Asegúrate de que el archivo exista

let comidaImg = new Image();
comidaImg.src = "comida.jpg"; // AQUÍ PONES EL NOMBRE DE TU IMAGEN

// Constantes de tamaño
const ALTO_GATO = 60;
const ANCHO_GATO = 60;
const ALTO_COMIDA = 30;
const ANCHO_COMIDA = 30;

let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// 2. INICIO DEL JUEGO
function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    comidaX = obtenerNumeroAleatorio(0, canvas.width - ANCHO_COMIDA);
    comidaY = obtenerNumeroAleatorio(0, canvas.height - ALTO_COMIDA);

    actualizarPantalla();
    
    // Limpiamos cualquier intervalo previo para evitar errores de velocidad
    clearInterval(idIntervalo); 
    idIntervalo = setInterval(restarTiempo, 1000);
}

// 3. LÓGICA DEL TIEMPO
function restarTiempo() {
    tiempo--; 
    actualizarTiempo(tiempo); 

    if (tiempo <= 0) {
        clearInterval(idIntervalo);
        alert("GAME OVER - Se acabó el tiempo");
    }
}

// 4. FUNCIONES DE DIBUJO
function graficarGato() {
    ctx.drawImage(gatoImg, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
}

function graficarComida() {
    // Punto: Cambio de la comida por imagen
    ctx.drawImage(comidaImg, comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
}

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function actualizarPantalla() {
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

// 5. MOVIMIENTOS
function moverIzquierda() { gatoX -= 15; actualizarPantalla(); }
function moverDerecha() { gatoX += 15; actualizarPantalla(); }
function moverArriba() { gatoY -= 15; actualizarPantalla(); }
function moverAbajo() { gatoY += 15; actualizarPantalla(); }

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
    actualizarPuntos(puntos);

    if (puntos >= 6) {
        clearInterval(idIntervalo);
        alert("¡FELICIDADES! Has ganado");
        return;
    }

    // Punto 2 y 3: Reinicio de tiempo con dificultad progresiva
    limiteActual--; 
    tiempo = limiteActual; 
    actualizarTiempo(tiempo);

    // Nueva posición aleatoria
    comidaX = obtenerNumeroAleatorio(0, canvas.width - ANCHO_COMIDA);
    comidaY = obtenerNumeroAleatorio(0, canvas.height - ALTO_COMIDA);

    actualizarPantalla();
}

// BOTÓN REINICIAR
function reiniciarJuego() {
    clearInterval(idIntervalo); // Detener el tiempo actual
    puntos = 0;
    limiteActual = 15; // Reset de dificultad
    tiempo = 15;       // Reset de tiempo
    actualizarPuntos(puntos);
    actualizarTiempo(tiempo);
    iniciarJuego();
}