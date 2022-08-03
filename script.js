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
    //moveFrog()
    setInterval(moveFrog, 250);
}

let moveFrog = () =>{
    //Calculate direction
    var dirs = caluclateDirs(frogPosition, flyPosition)

    let primaryDirection = dirs[0]     // 1 up| 2 right| 3 down| 4 left
    let secundaryDirection = dirs[1]     // 1 up| 2 right| 3 down| 4 left

    //console.log("Primary: ", primaryDirection, "   Secundary: ", secundaryDirection)

//MOVE FROG 
    //check if any of dirs alre available
    let availableSp = checkAvailabeSpaces(frogPosition)
    //console.log("available spaces: " + availableSp)
    let availableDirs = checkAvailableDirections(availableSp)
    //console.log("available dirs: " + availableDirs)
    let moveDirection = checkMoveDirection(availableDirs, primaryDirection, secundaryDirection)
    //console.log("move direction: " + moveDirection)

    //move the froggy
    if(moveDirection > 0){
        let movePos
        
        if(moveDirection === 1){
            movePos = frogPosition - 8
        }else if(moveDirection === 2){
            movePos = frogPosition + 1
        }else if(moveDirection === 3){
            movePos = frogPosition + 8
        }else if(moveDirection === 4){
            movePos = frogPosition - 1
        }

        setFrogToPosition(movePos)
    }
}

//helpfull functions
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

let getRowOfPosition = (num) => {
    let decimal  = num / 8

    const intStr = decimal.toString().split('.')[0];
    return Number(intStr);
}
let caluclateDirs = (frogPosition, targetPosition) => {
    let numOfCols
    let numOfRows
    let dirs = []

    //calculate num of rows
    let frogRow = getRowOfPosition(frogPosition)
    let flyRow = getRowOfPosition(targetPosition)
    
    numOfRows = Math.abs(frogRow - flyRow)

    //get ajacent space in target row
    let ajacentSp
    if(frogPosition > targetPosition){
        ajacentSp = frogPosition - numOfRows * 8
    }else{
        ajacentSp = frogPosition + numOfRows * 8
    }

    //get nu of cols
    if(ajacentSp > targetPosition){
        numOfCols = ajacentSp - targetPosition
    }else{
        numOfCols = ajacentSp + targetPosition
    }

    //form primary and secundary direction
    let moveY
    if(frogPosition > targetPosition){
        moveY = 1
    }else{
        moveY = 3
    }

    let moveX
    if(ajacentSp > targetPosition){
        moveX = 4
    }else {
        moveX = 2
    }

    if(numOfCols > numOfRows){
        dirs.push(moveY, moveX)
    }else{
        dirs.push(moveX, moveY)
    }

    return dirs
}


let checkAvailableDirections = (availabeSpaces) =>{
    let d = []
    availabeSpaces.forEach(element => {
        if(element === frogPosition + 1){
            d.push(2)
        }else if(element === frogPosition - 1){
            d.push(4)
        }else if(element === frogPosition + 8){
            d.push(3)
        }else if(element=== frogPosition - 8){
            d.push(1)
        }
    });
    return d
}
let checkMoveDirection = (availableDirs, pd, sd) =>{
    let dir
    availableDirs.forEach(element => {
        if(element === pd){
            dir = pd
        }else if(element === sd){
            dir = sd
        }else{
            //Vrati bilo koju slobodnu direkciju
            dir = 0
        }
    });
    return dir
}

// let calculateDirs = (frogPosition, flyPosition) => {
//     var moveX
//     var moveY
//     var dirs = []

//     // calc num of rows to move (up down)
//     var numOfRows

//     if(getDecimalPart(Math.abs(frogPosition - flyPosition)/8) === 5){ // round rounds to oposite of what we need
//         console.log("0.5")
//         if(flyPosition > frogPosition){
//             numOfRows = Math.round(Math.abs(frogPosition - flyPosition)/8) + 1
//         }else{
//             numOfRows = Math.round(Math.abs(frogPosition - flyPosition)/8) - 1
//         }
//     }else{
//         numOfRows = Math.round(Math.abs(frogPosition - flyPosition)/8)
//     }
    
//     if(frogPosition > flyPosition && numOfRows >= 1){
//         moveY = 1
//     }else if(frogPosition < flyPosition && numOfRows >= 1)
//         moveY = 3

//     //calc num of cols to move (left right)
//     var numOfCols

//     if(frogPosition > flyPosition){
//         console.log("below")

//         var ajacentSpace = frogPosition - (numOfRows * 8)
//         numOfCols = Math.abs(flyPosition - ajacentSpace)
        
//         if(ajacentSpace < flyPosition){
//             moveX = 2
//         }else
//             moveX = 4
        
//     }
//     else{
//         console.log("abowe")
//         var ajacentSpace = (numOfRows * 8) + frogPosition
//         numOfCols = Math.abs(flyPosition - ajacentSpace)
        
        
//         console.log("ajacent:" + ajacentSpace)

//         if(ajacentSpace > flyPosition){
//             moveX = 4
//         }else
//             moveX = 2
//     }

//     if(numOfCols < numOfRows){
//         dirs.push(moveX, moveY)
//     }else
//         dirs.push(moveY, moveX)

//     return dirs
// }
