
class Player {
  constructor(x, y, image) {
    this.pos = createVector(x,y);
    this.image = image;
    this.step = 1;
    this.keys = {
      left: 37, // LEFT_ARROW
      up: 38, // UP_ARROW
      right: 39, // RIGHT_ARROW
      down: 40, // DOWN_ARROW
    }
  }

  getPositionOnMap() {
    // scale 32px to 1 block on Map of Tiles
    return p5.Vector.div(this.pos, 32)
  }

  update() {}

  show() {
    image(this.image, this.pos.x, this.pos.y)
  }

  move(keyCode, checkColliding) {
    const { x, y } = this.getPositionOnMap();
    switch (keyCode) {
      case this.keys.left:
        if (checkColliding(x - this.step, y)) {
          this.pos.add(-32, 0)
        }
        break;
      case this.keys.right:
        if (checkColliding(x + this.step, y)) {
          this.pos.add(32, 0)
        }
        break;
      case this.keys.up:
        if (checkColliding(x, y - this.step)) {
          this.pos.add(0, -32)
        }
        break;
      case this.keys.down:
        if (checkColliding(x, y + this.step)) {
          this.pos.add(0, 32)
        }
        break;
      default: break;
    }
  }
}