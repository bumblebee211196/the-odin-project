var COLOR = "black";
const GRIDSIZE = 32;

function generateColor() {
  return Math.floor(Math.random()*16777215).toString(16);
}

function getColor() {
  if (COLOR === "black") {
    return COLOR;
  }
  return "#" + COLOR();
}

function changeBackground(e) {
  e.target.style.backgroundColor = getColor();
}

function setupGrid(size) {
  const grid = document.querySelector('.grid');
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const divElement = document.createElement('div');
    divElement.addEventListener('mouseover', changeBackground);
    grid.appendChild(divElement);
  }
}

function resetGrid() {
  const grid = document.querySelector('.grid');
  grid.innerHTML = '';
}

const clearButton = document.querySelector('.btn.clear');
clearButton.addEventListener('click', () => {
  resetGrid();
  setupGrid(gridResizer.value);
});

const blackButton = document.querySelector('.btn.black');
blackButton.addEventListener('click', () => {
  COLOR = "black";
});

const rainbowButton = document.querySelector('.btn.rainbow');
rainbowButton.addEventListener('click', () => {
  COLOR = generateColor;
});

const gridResizer = document.querySelector('.grid-resizer');
const gridResizerOutput = document.querySelector('.grid-resizer-output');
gridResizer.addEventListener('change', (e) => {
  gridResizerOutput.textContent = `${e.target.value} X ${e.target.value}`;
  resetGrid();
  setupGrid(e.target.value);
});


window.onload = () => {
  setupGrid(GRIDSIZE);
  gridResizerOutput.textContent = `${gridResizer.value} X ${gridResizer.value}`;
};
