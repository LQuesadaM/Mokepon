let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.querySelector('#seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.querySelector('#reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonMascotaJugador = document.querySelector('#boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)  

    let botonFuego = document.querySelector('#boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.querySelector('#boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.querySelector('#boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.querySelector('#boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.querySelector('#seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let sectionSeleccionarAtaque = document.querySelector('#seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'


    let inputHipodoge = document.querySelector('#hipodoge')
    let inputCapipepo = document.querySelector('#capipepo')
    let inputRatigueya = document.querySelector('#ratigueya')

    let spanMascotaJugador = document.querySelector('#mascota-jugador')

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge'
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya'
    } else {
        alert('Selecciona una mascota')
        reiniciarJuego()
    }

    
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = numeroAleatorio(1, 3)
    spanMascotaEnemigo = document.querySelector('#mascota-enemigo')

    if (mascotaAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else if (mascotaAleatoria == 3) {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
}


function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = numeroAleatorio(1, 3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate() {
    let spanVidasJugador = document.querySelector('#vidas-jugador')
    let spanVidasEnemigo = document.querySelector('#vidas-enemigo')   

    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje('EMPATE!🤝')
    } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje('GANASTE!🏆')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = `${vidasEnemigo} 💓`
    } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje('GANASTE!🏆')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = `${vidasEnemigo} 💓`
    } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje('GANASTE!🏆')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = `${vidasEnemigo} 💓`
    } else {
        crearMensaje('PERDISTE!😢')
        vidasJugador--
        spanVidasJugador.innerHTML = `${vidasJugador} 💓`
    }

    revizarVidas()
    desabilitarBotonesElementos()
}

function revizarVidas() {
    if (vidasEnemigo == 0) {
        alert('GANASTE EL JUEGO!🎉')
    } else if (vidasJugador == 0) {
        alert('PERDISTE EL JUEGO!😜')
    }
    
}


function crearMensaje(resultado) {
    // Seleccionar elemento padre
    let spanAtaqueDelJugador = document.querySelector('#ataque-del-jugador')
    let spanAtaqueDelEnemigo = document.querySelector('#ataque-del-enemigo')
    let spanResultadoBatalla = document.querySelector('#resultado-batalla')

    //Crear nodos
    let elementoAtaqueJugador = document.createElement('p')
    let elementoAtaqueEnemigo = document.createElement('p')
    /* let resultadoBatalla = document.createElement('p') */
    
    // Agregar nodos
    spanAtaqueDelJugador.appendChild(elementoAtaqueJugador)
    spanAtaqueDelEnemigo.appendChild(elementoAtaqueEnemigo)
    /* spanResultadoBatalla.appendChild(resultadoBatalla) */

    elementoAtaqueJugador.innerHTML = ataqueJugador
    elementoAtaqueEnemigo.innerHTML = ataqueEnemigo
    spanResultadoBatalla.innerHTML = resultado
}

function desabilitarBotonesElementos() {
    if (vidasJugador == 0 || vidasEnemigo == 0) {
        let botonFuego = document.querySelector('#boton-fuego')
        botonFuego.disabled = true
        let botonAgua = document.querySelector('#boton-agua')
        botonAgua.disabled = true
        let botonTierra = document.querySelector('#boton-tierra')
        botonTierra.disabled = true

        let sectionReiniciar = document.querySelector('#reiniciar')
        sectionReiniciar.style.display = 'block'
    }
}

function reiniciarJuego() {
    location.reload()
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
}

window.addEventListener('load', iniciarJuego)



