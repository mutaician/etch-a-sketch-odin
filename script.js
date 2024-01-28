
function createGrid() {
    const container = document.getElementById('container')
    document.documentElement.style.setProperty('--grid-size', `${squares}`)

    while (container.firstChild){
        container.removeChild(container.firstChild);
    }
    for (let i = 0; i < squares; i++) {
        const rowContainer = document.createElement('div')
        rowContainer.className += 'row'
        for (let j = 0; j < squares; j++) {
            const colContainer = document.createElement('div')
            colContainer.className += 'grid'
            rowContainer.appendChild(colContainer)
        }
        container.appendChild(rowContainer)
    }

    const grids = document.querySelectorAll('.grid')
    grids.forEach((grid) => {
        grid.addEventListener('mouseover', () => {
            grid.style.cssText = `background-color: ${randomcolors()}; border-color: ${randomcolors()}`
        })
    })

}

function randomcolors() {
    const red = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    return `rgb(${red}, ${blue} ,${green})`
}


function startSimulation() {
    if (!simulationState) {
        simulationState = true;
        simulationButton.textContent = 'Stop Simulation'
        simulate();
    } else {
        simulationState = false;
        simulationButton.textContent = 'Start Simulation'
        clearTimeout(simtimeoutId)
    }
}

function simulate(){
    const grids = document.querySelectorAll('.grid')
    if (!simulationState) return;

    let randomGrid = grids[Math.floor(Math.random() * grids.length)]
    randomGrid.style.cssText = `background-color: ${randomcolors()}; border-color: ${randomcolors()}`

    simtimeoutId = setTimeout(simulate, interval)
}

function resetGrids(){
    const grids = document.querySelectorAll('.grid')

    for (let i = 0; i < grids.length; i++){
        grids[i].style.cssText = "background-color: white"
    }
}

function updateIntervalText(){
    const intervalValue = document.getElementById('intervalValue')
    intervalValue.textContent = interval + 'ms'
}

function editSquares(){
    const input = prompt('Enter the number of squares (1-100):')
    const parsedInput = parseInt(input)
    if (isNaN(parsedInput) || parsedInput < 1 || parsedInput > 100){
        editSquares()
    } else {
        squares = parsedInput
        createGrid()
    }
}

let squares = 16
const simulationButton = document.querySelector('.sim')
simulationButton.addEventListener('click', startSimulation)
const resetButton = document.querySelector('.reset')
resetButton.addEventListener('click', resetGrids)
const intervalRange = document.getElementById('intervalRange')
intervalRange.addEventListener('input', function(event){
    interval = parseInt(event.target.value)
    updateIntervalText()
})
const editSquaresBtn = document.querySelector('.squares')
editSquaresBtn.addEventListener('click', editSquares)


let simulationState = false
let simtimeoutId;
let interval = 500

createGrid()
