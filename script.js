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

    var dirs = calculateDirs(frogPosition, flyPosition)

    let primaryDirection = dirs[0]     // 1 up| 2 right| 3 down| 4 left
    let secundaryDirection = dirs[1]     // 1 up| 2 right| 3 down| 4 left

    console.log("Primary: ", primaryDirection, "   Secundary: ", secundaryDirection)
}


function setFrogToPosition(frogPosition){
    spacesList[frogPosition].appendChild(frog)
    spacesList[frogPosition].classList.add('gameObject')
    spacesList[frogPosition].children[0].src = 'images/waterLilyHover.png'
}


let checkAvailabeSpaces = (position) => {
    let currentPosition = position

    let availabeSpaces = [
        currentPosition + 1, //rigth
        currentPosition - 1, //left
        currentPosition + 8, //below
        currentPosition - 8 //above
    ]

    for(var i = 0; i < availabeSpaces.length; i++){
        if(!spacesList[availabeSpaces[i]].classList.contains('selected')){
            availabeSpaces.splice(i, 1)
            i--
        }
    }

    return availabeSpaces
} 

function getDecimalPart(num) { //function that returns decimal num of float
    if (Number.isInteger(num)) {
      return 0;
    }
  
    const decimalStr = num.toString().split('.')[1];
    return Number(decimalStr);
}
let calculateDirs = (frogPosition, flyPosition) => {
    var moveX
    var moveY
    var dirs = []

    // calc num of rows to move (up down)
    var numOfRows
    if(getDecimalPart(Math.abs(frogPosition - flyPosition)/8) === 5){ // round rounds to oposite of what we need
        numOfRows = Math.round(Math.abs(frogPosition - flyPosition)/8) - 1
    }else{
        numOfRows = Math.round(Math.abs(frogPosition - flyPosition)/8)
    }
    
    if(frogPosition > flyPosition && numOfRows >= 1){
        moveY = 1
    }else if(frogPosition < flyPosition && numOfRows >= 1)
        moveY = 3

    //calc num of cols to move (left right)
    var numOfCols
    if(frogPosition > flyPosition){
        var ajacentSpace = frogPosition - (numOfRows * 8)
        numOfCols = Math.abs(flyPosition - ajacentSpace)
        
        if(ajacentSpace < flyPosition){
            moveX = 4
        }else
            moveX = 2
        
    }else{
        var ajacentSpace = (numOfRows * 8) + frogPosition
        numOfCols = Math.abs(flyPosition - ajacentSpace)
        
        if(ajacentSpace > flyPosition){
            moveX = 4
        }else
            moveX = 2
    }

    if(numOfCols < numOfRows){
        dirs.push(moveX, moveY)
    }else
        dirs.push(moveY, moveX)

    return dirs
}