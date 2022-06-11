import * as p5 from 'p5';
// import Layer from './js/Layer.js';
import Player from './js/Player.js';

import heroImage from './assets/hero.png';


//BLOCK SIZE: 24px
const scale = 24;
const xTotal = 32;
const yTotal = 26;
// WINDOW SIZE: 800 x 480
const w  = scale  *  xTotal;
const h  = scale  *  yTotal;

let player = null;
let playerImg = null;
let grid = [[]];


function preload(g) {
	playerImg = g.loadImage(heroImage)
}

function setup(g) {
	console.log('here');
	g.createCanvas(w,h);
	player = new Player(1,1, scale, playerImg, g);
	g.pixelDensity(3.0);
	g.frameRate(30);

	for(let y = 0; y < yTotal; y++) {
		grid.push([]);
		for(let x = 0; x < xTotal; x++) {
			if(x === 0 && y < yTotal || y === 0 && x < xTotal) {
				grid[y].push({x,y, fill: 55, type: 'wall'})
			}
			else if(x === xTotal-1 && y < yTotal || y === yTotal-1 && x < xTotal) {
				grid[y].push({x,y, fill: 55, type: 'wall'})
			} else {
				grid[y].push({x,y, fill: 32, type: null})
			}
		}
	}
}

function draw(g) {
	g.background(5);

	grid.forEach(
		row => row.forEach(
			(b) => {
				g.fill(b.fill);
				g.rect(b.x * scale, b.y * scale, scale, scale);
			}
		)
	)

	player.show();
	// player.update();
}

function keyPressed(g) {
	player.move(g.keyCode, checkColliding);
}

function mousePressed(g) {
	// TODO: rewrite that's part
	const xPos = floor(g.mouseX / scale);
	const yPos = floor(g.mouseY / scale);
	if(xPos >= 0 && xPos < w / scale &&  yPos >= 0 && yPos < h / scale ) {
		//  closedDoor => 6
		if (LayerWallsMap[yPos][xPos] === 6) {
			alert('Door is closed! Find a key!');
			//LayerWallsMap[yPos][xPos] = 7;
		}
	}
}

function checkColliding(x, y) {
	// TODO: replace it in class Grid
	if(grid[y][x].type === 'wall') {
		return false;
	}
	return true;
}

new p5((game) => {
	game.preload = () => preload(game);
	game.setup = () => setup(game);
	game.draw = () => draw(game);
	game.keyPressed = () => keyPressed(game);
	game.mousePressed =  () => mousePressed(game);
});