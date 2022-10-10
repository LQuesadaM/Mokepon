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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

const anchoMaximoDelMapa = 350

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let botones = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let indexAtaqueJudador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext('2d')  /* Usar lienzo en 2d para dibujar en el canavas */
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './imagen/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = numeroAleatorio(0, mapa.width - this.ancho)
        this.y = numeroAleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
 /* Mascotas Jugador */
let hipodoge = new Mokepon('Hipodoge', '../imagen/hipodoge.png', 5, './imagen/hipodoge-face.png')
let capipepo = new Mokepon('Capipepo', '../imagen/capipepo.png', 5, './imagen/capipepo-face.png')
let ratigueya = new Mokepon('Ratigueya', '../imagen/ratigueya.png', 5, './imagen/ratigueya-face.png')

/* Mascota Enemigo */
let hipodogeEnemigo = new Mokepon('Hipodoge', '../imagen/hipodoge.png', 5, './imagen/hipodoge-face.png')
let capipepoEnemigo = new Mokepon('Capipepo', '../imagen/capipepo.png', 5, './imagen/capipepo-face.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya', '../imagen/ratigueya.png', 5, './imagen/ratigueya-face.png')


hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

hipodogeEnemigo.ataques.push(
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

capipepoEnemigo.ataques.push(
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

ratigueyaEnemigo.ataques.push(
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
    sectionVerMapa.style.display = 'none'

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

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
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
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
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
                boton.disabled = true
            } else if (e.target.textContent == '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
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
    console.log('Ataques Enemigos', ataquesMokeponEnemigo)
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
    indexAtaqueJudador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] == ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje('EMPATE!🤝')
        } else if (ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE!🏆')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE!🏆')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE!🏆')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje('PERDISTE!😢')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    } 
        
    revizarVidas()
    sectionReiniciar.style.display = 'block'
}

function revizarVidas() {
    if (victoriasJugador == victoriasEnemigo) {
        alert('Esto fue un empate!')
    } else if (victoriasJugador > victoriasEnemigo) {
        alert('FELICITACIONES Ganaste')
    } else {
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

function reiniciarJuego() {
    location.reload()
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
}

/** Canvas  */
function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionotecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionotecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y + 25
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto - 25
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho - 25
    const izquierdaMascota = mascotaJugadorObjeto.x + 25

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
        ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)



