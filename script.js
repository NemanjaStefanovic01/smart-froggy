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

setFrogToPosition(frogPosition)

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


    //STARTING THE SEARCH   
//Start
const startBtn = document.querySelector('.btn-start')

startBtn.addEventListener("click", startSearch)

function startSearch(){
    let availableSp = checkAvailabeSpaces(frogPosition)
    console.log(availableSp);
    let primaryDirection     // 1 up| 2 right| 3 down| 4 left
    let secundaryDirection   // 1 up| 2 right| 3 down| 4 left

    // function to calculate primary and secundary directions
}

let checkAvailabeSpaces = (position) => {
    let currentPosition = position

    let availabeSpaces = [
        currentPosition + 1, //rigth
        currentPosition - 1, //left
        currentPosition + 8, //below
        currentPosition - 8 //above
    ]

    // availabeSpaces.forEach((element, index) => {
    //     if(!spacesList[element].classList.contains('selected')){
    //         availabeSpaces.splice(index, 1)
    //         index--
    //     }
    // });

    for(var i = 0; i < availabeSpaces.length; i++){
        if(!spacesList[availabeSpaces[i]].classList.contains('selected')){
            availabeSpaces.splice(i, 1)
            i--
        }
    }

    return availabeSpaces
} 

function setFrogToPosition(frogPosition){
    spacesList[frogPosition].appendChild(frog)
    spacesList[frogPosition].classList.add('gameObject')
    spacesList[frogPosition].children[0].src = 'images/waterLilyHover.png'
}