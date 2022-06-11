import Player from "./Player";

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
          image(this.img, 0, 0, 32, 32, sprite.x, sprite.y, 31, 31);
        }
        posX += 32;
      });
      posX = 0;
      posY += 32;
    })
  }
}

export default Layer;
