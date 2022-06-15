class Player {
  constructor(x, y, scale, image, game) {
    this.g = game;
    this.pos = this.g.createVector(x,y);
    this.image = image;
    this.step = 1;
    this.scale = scale;
    this.keys = {
      d:     68, // KEY_D,
      w:     87, // KEY_W,
      a:     65, // KEY_W,
      s:     83, // KEY_W,
      left:  37, // LEFT_ARROW
      up:    38, // UP_ARROW
      right: 39, // RIGHT_ARROW
      down:  40, // DOWN_ARROW
    }
  }

  getPosition() {
    // scale 32px to 1 block on Map of Tiles
    return this.g.Vector.mul(this.pos, this.scale)
  }

  update() {}

  show() {
    // this.g.fill('silver');
    this.g.noFill();
    this.g.rect(
      this.pos.x * this.scale,
      this.pos.y * this.scale,
      this.scale,
      this.scale
    );
    this.g.image(
      this.image,
      this.pos.x * this.scale,
      this.pos.y * this.scale,
      this.scale, this.scale
    );
  }

  move(keyCode, collidingWall) {
    const {x, y} = this.pos;
    switch (keyCode) {
      case this.keys.a:
      case this.keys.left:
        if (!collidingWall(x - this.step, y)) {
          this.pos.add(-1, 0)
        }
        break;
      case this.keys.d:
      case this.keys.right:
        if (!collidingWall(x + this.step, y)) {
          this.pos.add(1, 0)
        }
        break;
      case this.keys.w:
      case this.keys.up:
        if (!collidingWall(x, y - this.step)) {
          this.pos.add(0, -1)
        }
        break;
      case this.keys.s:
      case this.keys.down:
        if (!collidingWall(x, y + this.step)) {
          this.pos.add(0, 1);
        }
        break;
      default: break;
    }
  }
}

export default Player;