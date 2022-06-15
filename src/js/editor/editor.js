import {EditorDefaultSettings} from "../consts.js";

function EditorScreen(g, settings = EditorDefaultSettings) {
  const { sWidth, sHeight, xTotal, yTotal, bSize } = settings;

  g.setup = () => {
    g.createCanvas(sWidth, sHeight).parent('app');
    g.background(54);
  }
}

export default EditorScreen;