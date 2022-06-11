import { scale } from "./consts";

class Grid {
  constructor(yTotal, xTotal, game) {
    this.g = game;
    this.data = [];
    this.xTotal = xTotal;
    this.yTotal = yTotal;
    return this;
  }

  create() {
    for(let y = 0; y < this.yTotal; y++) {
      this.data.push([]);
      for(let x = 0; x < this.xTotal; x++) {
        if(x === 0 && y < this.yTotal || y === 0 && x < this.xTotal) {
          this.data[y].push({x,y, fill: 55, type: 'wall'})
        }
        else if(x === this.xTotal-1 && y < this.yTotal || y === this.yTotal-1 && x < this.xTotal) {
          this.data[y].push({x,y, fill: 55, type: 'wall'})
        } else {
          this.data[y].push({x,y, fill: 32, type: 'ground'})
        }
      }
    }
    return this;
  }
  show() {
    this.data.forEach(
      row => row.forEach(
        b => this.#drawTile(b, this.g.metaTiles[b.type])
      )
    )
  }

  #drawTile(block, sprite) {
    // this.g.fill(block.fill);
    // this.g.rect(block.x * scale, block.y * scale, scale, scale);
    this.g.image(
      this.g.tileset,
      block.x * scale, block.y * scale, // pos on grid in px
      scale, scale, // size in px
      sprite.x, sprite.y, 31, 31 // pos & size in tileset
    )
  }

  isCollidingWall = (x, y) => {
    return this.data[y][x].type === 'wall';
  }
}

export default Grid;