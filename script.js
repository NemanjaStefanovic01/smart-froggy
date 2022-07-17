    //CREATE THE MAP    
const pondSize = 8*8
const pond = document.querySelector('.pond')
pond.classList.add("pond")

for(var i = 0; i < pondSize; i++){
    const space = document.createElement("div")
    space.setAttribute("id", i);
    space.classList.add('space')
    space.onclick = placeLily
    space.onmouseover = select
    space.onmouseout = removeSelection
    const water = document.createElement("img")
    water.src = 'images/water.png'
    water.classList.add('water')


    space.appendChild(water)
    pond.appendChild(space)
}


    //ADD MOVABLE SPACES
const spacesList = document.querySelectorAll('.space')

//hover
function select(){
    const space = event.target.parentElement

    if(!space.classList.contains('selected') && !space.classList.contains('gameObject')){
        event.target.src = 'images/waterLilyHover.png'
    }
}
function removeSelection(){
    const space = event.target.parentElement
    if(!space.classList.contains('selected') && !space.classList.contains('gameObject')){
        event.target.src = 'images/water.png'
    }
}

//place
function placeLily(){
    const space = event.target.parentElement
    if(!space.classList.contains('selected') && !space.classList.contains('gameObject')){
        event.target.src = 'images/waterLily.png'
        space.classList.add('selected')
    }    
}


    //ADD FROG AND FLY
//frog
let frogPosition = Math.floor(Math.random() * ((8*8)+1))

const frog = document.createElement('img')
frog.src = "images/froggy.png"
frog.classList.add('frog')

spacesList[frogPosition].appendChild(frog)
spacesList[frogPosition].classList.add('gameObject')
spacesList[frogPosition].children[0].src = 'images/waterLilyHover.png'

//fly
let flyPosition = Math.floor(Math.random() * ((8*8)+1))

while(Math.abs(flyPosition - frogPosition) < 30){
    flyPosition = Math.floor(Math.random() * ((8*8)+1))
}

const fly = document.createElement('img')
fly.src = "images/fly.png"
fly.classList.add('fly')
fly.classList.add('rotate')

spacesList[flyPosition].appendChild(fly)
spacesList[flyPosition].classList.add('gameObject')