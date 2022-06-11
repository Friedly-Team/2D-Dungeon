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
    const wall = this.g.metaTiles.wall;
    const ground = this.g.metaTiles.ground;
    this.data.forEach(
      row => row.forEach(
        (b) => {
          if(b.type === 'wall') {
            // JUST FOR TEST
            this.g.image(
              this.g.tileset,
              b.x * scale, b.y * scale, // pos on grid in px
              scale, scale, // size in px
              wall.x, wall.y, 31, 31 // pos & size in tileset
            )
          } else if(b.type === 'ground') {
            // this.g.fill(b.fill);
            // this.g.rect(b.x * scale, b.y * scale, scale, scale);
            this.g.image(
              this.g.tileset,
              b.x * scale, b.y * scale, // pos on grid in px
              scale, scale, // size in px
              ground.x, ground.y, 31, 31 // pos & size in tileset
            )
          }

        }
      )
    )
  }

  isCollidingWall = (x, y) => {
    return this.data[y][x].type === 'wall';
  }

}

export default Grid;