import * as P5 from 'p5';
import Player from './js/player';
import Grid from "./js/grid";
import {w, h, scale, xTotal, yTotal, FPS} from './js/consts';
import { MetaTiles } from './js/metaTiles';
// ASSETS
import heroImage from './assets/hero.png';
import tileset from './assets/tileset3.png';

function preload(g) {
	g.playerImg = g.loadImage(heroImage)
	g.tileset = g.loadImage(tileset)
}

function setup(g) {
	g.createCanvas(w,h);
	g.pixelDensity(3.0);
	g.frameRate(FPS);

	g.metaTiles = MetaTiles;

	g.player = new Player(1,1, scale, g.playerImg, g);
	g.grid = new Grid(yTotal, xTotal, g).create();
}

function draw(g) {
	g.background(5);
	g.grid.show();
	g.player.show();
	// player.update();
}

function keyPressed(g) {
	g.player.move(g.keyCode, g.grid.isCollidingWall);
}

function mousePressed(g) {
	// TODO: rewrite that's part
	const x = g.floor(g.mouseX / scale);
	const y = g.floor(g.mouseY / scale);
	console.log({x, y})
}

new P5((game) => {
	game.player 	 = null;
	game.playerImg = null;
	game.grid 		 = null;
	game.tileset  = null;
	game.metaTiles = null

	game.preload = () => preload(game);
	game.setup = () => setup(game);
	game.draw = () => draw(game);
	game.keyPressed = () => keyPressed(game);
	game.mousePressed =  () => mousePressed(game);
});