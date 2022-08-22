function iniciarJuego() {
    let botonMascotaJugador = document.querySelector('#boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)  
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
    let ataqueAleatorio = numeroAleatorio(1, 3)
    spanMascotaEnemigo = document.querySelector('#mascota-enemigo')

    if (ataqueAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (ataqueAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
}

window.addEventListener('load', iniciarJuego)