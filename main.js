let grid = document.getElementById("grid-container");
let size = 16;
let rainbow = false;

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
	resetGrid();
	setGrid(getGridSize());
});

const rainbowMode = document.querySelector("#rainbow");
rainbowMode.addEventListener("click", () => {
	rainbow ? (rainbow = false) : (rainbow = true);
	if (rainbow) {
		rainbowMode.style.background = "#71ba5e";
		document.getElementById("onoff").innerHTML = "(on)";
	} else {
		rainbowMode.style.background = "#ff433d";
		document.getElementById("onoff").innerHTML = "(off)";
	}
});

function resetGrid() {
	while (grid.firstChild) grid.removeChild(grid.firstChild);
}

function getGridSize() {
	size = prompt("Please give a grid size (Max 64)", 16);
	if (size > 64 || parseInt(size) != size) {
		alert("Invalid value. Resetting to default size (16*16)");
		setGrid(16);
	} else {
		return size;
	}
}

function setGrid(size) {
	for (let i = 1; i <= size; i++) {
		for (let j = 1; j <= size; j++) {
			let square = document.createElement("div");
			square.classList.add("square");
			square.style.width = 100 / size + "%";
			square.style.height = 100 / size + "%";
			grid.appendChild(square);
		}
	}
	colorSquares();
}

function colorSquares() {
	let square = document.querySelectorAll(".square");
	let touchSquare = function(e) {
		if (rainbow) {
			let r = Math.round(255 * Math.random());
			let g = Math.round(255 * Math.random());
			let b = Math.round(255 * Math.random());
			let color = `rgb(${r}, ${g}, ${b})`;
			console.log(color);
			e.target.style.background = color;
		} else {
			e.target.style.background = "black";
		}
	};
	square.forEach(square => {
		square.addEventListener("mouseenter", touchSquare);
		square.addEventListener("touchstart", touchSquare);
	});
}

setGrid(size);
