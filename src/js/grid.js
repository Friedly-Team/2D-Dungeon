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
          this.data[y].push({x,y, fill: 32, type: null})
        }
      }
    }
    return this;
  }
  show() {
    this.data.forEach(
      row => row.forEach(
        (b) => {
          this.g.fill(b.fill);
          this.g.rect(b.x * scale, b.y * scale, scale, scale);
        }
      )
    )
  }

  isCollidingWall = (x, y) => {
    return this.data[y][x].type === 'wall';
  }

}

export default Grid;