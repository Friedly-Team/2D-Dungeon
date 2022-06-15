import Player from "./player.js";
import Grid from "./grid.js";
// mete tiles positions
import { MetaTiles } from "./metaTiles.js";
// consts
import { FPS, h, scale, w, xTotal, yTotal } from "../consts.js";
// assets
import heroImage from "../../assets/hero.png";
import tileset from "../../assets/tileset3.png";

function GameObject(g) {
  g.player = null;
  g.playerImg = null;
  g.grid = null;
  g.tileset = null;
  g.metaTiles = null;

  g.preload = function () {
    g.playerImg = g.loadImage(heroImage);
    g.tileset = g.loadImage(tileset);
  };

  g.setup = function () {
    //set UI Events
    g.createCanvas(w, h).parent("app");

    g.pixelDensity(3.0);
    g.frameRate(FPS);

    g.metaTiles = MetaTiles;

    g.player = new Player(1, 1, scale, g.playerImg, g);
    g.grid = new Grid(yTotal, xTotal, g).create();
  };

  g.draw = function () {
    g.background(5);
    g.grid.show();
    g.player.show();
    // player.update();
  };

  g.keyPressed = function () {
    g.player.move(g.keyCode, g.grid.isCollidingWall);
  };

  g.mousePressed = function () {
    // TODO: rewrite that's part
    const xIndex = g.floor(g.mouseX / scale);
    const yIndex = g.floor(g.mouseY / scale);
    //console.log({x, y})
  };
}

export default GameObject;
