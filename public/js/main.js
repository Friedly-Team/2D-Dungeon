let TileSet1, TileSet2, TileSet3;
let imageSprite;

let ground;
let LayerGround;
let LayerGroundWalls;

let heroImg;
const Hero = {
	sprite: null,
	image: null,
	x: 32,
	y: 32
}


class Layer {
	constructor(img, layerMap, sprite) {
		this.img = img;
		this.layerMap = layerMap;
		this.sprite = sprite;
	}

	draw() {
		let posX = 0;
		let posY = 0;
		this.layerMap.forEach(row => {
			row.map(exist => {
				if(exist) {
					 //image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
					 image(this.img, posX, posY, 32, 32, this.sprite.x, this.sprite.y, 32, 32);
				}
				posX += 32;
			})
			posX = 0;
			posY += 32;
		})
	}
}

function preload() {
	TileSet1 = loadImage('./assets/tileset1.jpg');
  TileSet2 = loadImage('./assets/tileset2.png');
  TileSet3 = loadImage('./assets/tileset3.png');
  Hero.image = loadImage('./assets/hero.png');
}


function setup() {
	// const {stoneWall} = DataTiles1;
	//const {ground, groundWall} = DataTiles2;
	const {wall, ground, noExit} = DataTiles3;
  createCanvas(800,480); // 25x  15y
  background(51);

  Hero.sprite = createSprite(47, 47, 32,32);
  Hero.sprite.addImage(Hero.image);
  // createSprite(400, 200, 32, 32);
  // imageSprite = createSprite(64, 0);
  // imageSprite.addImage(ground);
  LayerGround = new Layer(TileSet3, LayerGroundMap, ground)
  LayerGroundWalls = new Layer(TileSet3, LayerWallsMap, wall);
}

function draw() {
	noStroke();
	LayerGround.draw();
	LayerGroundWalls.draw();
  //drawSprites();
  image(Hero.image, Hero.x, Hero.y)
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
  	if (checkColliding((Hero.x - 32) / 32, Hero.y / 32)) Hero.x -= 32;
  }
  if (keyCode === RIGHT_ARROW) {
  	if (checkColliding((Hero.x + 32) / 32, Hero.y / 32)) Hero.x += 32;
  }
  if (keyCode === UP_ARROW) {
  	if (checkColliding(Hero.x / 32, (Hero.y - 32) / 32)) Hero.y -= 32;
  }
  if (keyCode === DOWN_ARROW && Hero.y + 32 < height - 32) {
  	if (checkColliding(Hero.x / 32, (Hero.y + 32) / 32)) Hero.y += 32;
  }
}

function checkColliding(x, y) {
	if(!LayerWallsMap[y][x]) {
		return true;
	}
	return false;
}