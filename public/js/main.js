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
	constructor(img, layerMap, sprites) {
		this.img = img;
		this.layerMap = layerMap;
		this.sprites = sprites;
	}

	draw() {
		let posX = 0;
		let posY = 0;
		this.layerMap.forEach(row => {
			row.map(index => {
				if(index) {
					const sprite = this.sprites[index]
					//image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
					image(this.img, posX, posY, 32, 32, sprite.x, sprite.y, 31, 31);
				}
				posX += 32;
			});
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
	//const { stoneWall } = DataTiles1;
	//const { ground, groundWall } = DataTiles2;
	const { 
		wall, ground, noExit, 
		devilDoor, warriorInBlock, 
		waterSave, closedDoor, openDoor
	} = DataTiles3;
  createCanvas(800,480); // 25_x  15_y
  background(51);

  Hero.sprite = createSprite(47, 47, 32,32);
  Hero.sprite.addImage(Hero.image);

  LayerGround = new Layer(TileSet3, LayerGroundMap, { 1: ground,})
  LayerGroundWalls = new Layer(
  	TileSet3, LayerWallsMap, 
  	{1: wall, 2: noExit, 3: devilDoor, 4: warriorInBlock, 5: waterSave, 6: closedDoor, 7: openDoor }
  );
}

function draw() {
	LayerGround.draw();
	LayerGroundWalls.draw();

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

function mousePressed() {
	let xPos = floor(mouseX / 32);
	let yPos = floor(mouseY / 32);
	let block = LayerWallsMap[yPos][xPos]
	console.log(`x: ${xPos}, y: ${yPos}, block: ${block}`);
	if (block === 6) {
		alert('Door is closed! Find a key!');
		//LayerWallsMap[yPos][xPos] = 7;
	}
}

function checkColliding(x, y) {
	if(!LayerWallsMap[y][x] || LayerWallsMap[y][x] == 7) {
		return true;
	}
	return false;
}