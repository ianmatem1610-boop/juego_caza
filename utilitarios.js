function actualizarPuntos(n) {
    let elemento = document.getElementById("puntos");
    elemento.innerHTML = n;
}

function actualizarTiempo(t) {
    let elemento = document.getElementById("tiempo");
    elemento.innerHTML = t;
}

function obtenerNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}