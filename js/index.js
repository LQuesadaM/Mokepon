let ataqueJugador
let ataqueEnemigo

function iniciarJuego() {
    let botonMascotaJugador = document.querySelector('#boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)  

    let botonFuego = document.querySelector('#boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.querySelector('#boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.querySelector('#boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)
}

function seleccionarMascotaJugador() {
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
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
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

    crearMensaje()
}

function crearMensaje() {
    let sectionMensajes = document.querySelector('#mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = `Tu mascota atacó con ${ataqueJugador}, la mascota del enemigo atacó con ${ataqueEnemigo}` 
    sectionMensajes.appendChild(parrafo)
}



window.addEventListener('load', iniciarJuego)



