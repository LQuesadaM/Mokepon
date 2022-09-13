const sectionSeleccionarAtaque = document.querySelector('#seleccionar-ataque')
const sectionReiniciar = document.querySelector('#reiniciar')
const botonMascotaJugador = document.querySelector('#boton-mascota')
const botonReiniciar = document.querySelector('#boton-reiniciar')
const sectionSeleccionarMascota = document.querySelector('#seleccionar-mascota')

const spanMascotaJugador = document.querySelector('#mascota-jugador')
const spanMascotaEnemigo = document.querySelector('#mascota-enemigo')

const spanVidasJugador = document.querySelector('#vidas-jugador')
const spanVidasEnemigo = document.querySelector('#vidas-enemigo')

const spanAtaqueDelJugador = document.querySelector('#ataque-del-jugador')
const spanAtaqueDelEnemigo = document.querySelector('#ataque-del-enemigo')
const spanResultadoBatalla = document.querySelector('#resultado-batalla')
const contenedorTarjetas = document.querySelector('#contenedor-tarjetas')
const contenedorAtaques = document.querySelector('#contenedor-de-ataques')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let botones = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let indexAtaqueJudador
let indexAtaqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', '../imagen/hipodoge.png', 5)
let capipepo = new Mokepon('Capipepo', '../imagen/capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya', '../imagen/ratigueya.png', 5)

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascotas" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepone" for=${mokepon.nombre} />
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} />
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.querySelector('#Hipodoge')
    inputCapipepo = document.querySelector('#Capipepo')
    inputRatigueya = document.querySelector('#Ratigueya')
    })


    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)  
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
        reiniciarJuego()
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataque) {
    ataque.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.querySelector('#boton-fuego')
    botonAgua = document.querySelector('#boton-agua')
    botonTierra = document.querySelector('#boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent == '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            } else if (e.target.textContent == '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = numeroAleatorio(0, mokepones.length -1)
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = numeroAleatorio(0, ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    starBattle()
}

function starBattle() {
    if (ataqueJugador.length == 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJudador = ataqueEnemigo[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] == ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje('EMPATE!🤝')
        }        
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
    
    //Crear nodos
    let elementoAtaqueJugador = document.createElement('p')
    let elementoAtaqueEnemigo = document.createElement('p')
    /* let resultadoBatalla = document.createElement('p') */
    
    // Agregar nodos
    spanAtaqueDelJugador.appendChild(elementoAtaqueJugador)
    spanAtaqueDelEnemigo.appendChild(elementoAtaqueEnemigo)
    /* spanResultadoBatalla.appendChild(resultadoBatalla) */

    elementoAtaqueJugador.innerHTML = indexAtaqueJudador
    elementoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
    spanResultadoBatalla.innerHTML = resultado
}

function desabilitarBotonesElementos() {
    if (vidasJugador == 0 || vidasEnemigo == 0) {
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
        
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



