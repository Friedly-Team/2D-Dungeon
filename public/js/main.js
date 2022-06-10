// WINDOW SIZE: 800 x 480
const w  = 32  *  25;
const h  = 32  *  15;
//BLOCK SIZE: 32px
const scale = 32;
// TILES
let TileSet1, TileSet2, TileSet3;
let LayerGround;
let LayerGroundWalls;
let player = null;


function preload() {
	TileSet1 = loadImage('./assets/tileset1.jpg');
  TileSet2 = loadImage('./assets/tileset2.png');
  TileSet3 = loadImage('./assets/tileset3.png');
  const playerImg = loadImage('./assets/hero.png');
	// const playerSprite = createSprite(47, 47, scale,scale);
	// playerSprite.addImage(playerImg);

	player = new Player(32,32, playerImg) // playerSprite
}


function setup() {
	createCanvas(w,h);
	//const { stoneWall } = DataTiles1;
	//const { ground, groundWall } = DataTiles2;
	// TODO: REWRITE FOR BETTER ACCESS TO META DATA
	const { 
		wall, ground, noExit, 
		devilDoor, warriorInBlock, 
		waterSave, closedDoor, openDoor
	} = MetaTiles3;

  LayerGround = new Layer(TileSet3, LayerGroundMap, { 1: ground,})
  LayerGroundWalls = new Layer(
  	TileSet3, LayerWallsMap, 
  	{1: wall, 2: noExit, 3: devilDoor, 4: warriorInBlock, 5: waterSave, 6: closedDoor, 7: openDoor }
  );
}

function draw() {
	background(54);

	LayerGround.draw();
	LayerGroundWalls.draw();

	player.show();
	player.update();
}

function keyPressed() {
	//console.log(player.move)
	player.move(keyCode, checkColliding);
}

function mousePressed() {
	// TODO: rewrite that's part
	const xPos = floor(mouseX / scale);
	const yPos = floor(mouseY / scale);
	if(xPos >= 0 && xPos < w / scale &&  yPos >= 0 && yPos < h / scale ) {
		//  closedDoor => 6
		if (LayerWallsMap[yPos][xPos] === 6) {
			alert('Door is closed! Find a key!');
			//LayerWallsMap[yPos][xPos] = 7;
		}
	}
}

function checkColliding(x, y) {
	/* 
		TODO: update this & move it in special file for colliding on a map
	*/
	return !LayerWallsMap[y][x] || LayerWallsMap[y][x] === 7;
}
