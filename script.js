    //CREATE THE MAP    
const pondSize = 6*6
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
    if(!event.target.classList.contains('selected')){
        event.target.src = 'images/waterLilyHover.png'
    }
}
function removeSelection(){
    if(!event.target.classList.contains('selected')){
        event.target.src = 'images/water.png'
    }
}

//place
function placeLily(){
    event.target.src = 'images/waterLily.png'
    event.target.classList.add('selected')
}
