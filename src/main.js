import * as P5 from 'p5';
import Player from './js/player';
import Grid from "./js/grid";
import  { w, h, scale, xTotal, yTotal } from './js/consts';
import { MetaTiles3 } from './js/metaTiles';
// ASSETS
import heroImage from './assets/hero.png';
import tileset3 from './assets/tileset3.png';

let player = null;
let playerImg = null;
let grid = null;
let tileset3Img = null;

function preload(g) {
	playerImg = g.loadImage(heroImage)
	tileset3Img = g.loadImage(tileset3)
}

function setup(game) {
	game.createCanvas(w,h);
	player = new Player(1,1, scale, playerImg, game);
	grid = new Grid(yTotal, xTotal, game).create();
	game.pixelDensity(3.0);
	game.frameRate(30);

}

function draw(g) {
	g.background(5);
	grid.show();
	player.show();
	// player.update();
}

function keyPressed(g) {
	player.move(g.keyCode, grid.isCollidingWall);
}

function mousePressed(g) {
	// TODO: rewrite that's part
	const xPos = g.floor(g.mouseX / scale);
	const yPos = g.floor(g.mouseY / scale);
	if(xPos >= 0 && xPos < w / scale &&  yPos >= 0 && yPos < h / scale ) {
		//  closedDoor => 6
		if (LayerWallsMap[yPos][xPos] === 6) {
			alert('Door is closed! Find a key!');
			//LayerWallsMap[yPos][xPos] = 7;
		}
	}
}

new P5((game) => {
	game.preload = () => preload(game);
	game.setup = () => setup(game);
	game.draw = () => draw(game);
	game.keyPressed = () => keyPressed(game);
	game.mousePressed =  () => mousePressed(game);
});