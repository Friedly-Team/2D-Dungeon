import P5 from "p5";
import UI from "./ui/withDOM.js";

import GameScreen from "./js/game/index.js";
import { EditorDefaultSettings, MODES} from "./js/consts.js";
import EditorScreen from "./js/editor/editor.js";

const ui = new UI();
const currentMode = ui.subscribe("mode", { ...MODES.game });

let p5Canvas = null;
let eSettings = { ...EditorDefaultSettings };

currentMode.name = 'editor'

ui
  // header buttons
  .setEvent("dungeon", 'onclick',() => {
    if (currentMode.name !== "game" && MODES.game.active) {
      currentMode.name = MODES.game.name;
      if(p5Canvas) p5Canvas.remove();
      p5Canvas = new P5(GameScreen);
    }
  })
  .setEvent("editor", 'onclick',() => {
    if (currentMode.name !== "editor" && MODES.editor.active) {
      currentMode.name = MODES.editor.name;
      p5Canvas.remove();
    }
  })
  // modal settings inputs
  .setEvent('xTotal',  'oninput', ({target}) => {
    const xTotal = +target.value;
    const sWidth = ui.getElement('sWidth');
    const rect = ui.getElement('preCanvasLook');
    const screenWidth = xTotal * eSettings.bSize;

    eSettings.xTotal = xTotal;

    sWidth.value = screenWidth;
    // scale pre look canvas
    rect.style.width = (screenWidth/2) + 'px';
  })
  .setEvent('yTotal',  'oninput', ({target}) => {
    const yTotal = +target.value;
    const sHeight = ui.getElement('sHeight');
    const rect = ui.getElement('preCanvasLook');
    const screenHeight = yTotal * eSettings.bSize;

    eSettings.yTotal = yTotal;

    sHeight.value = screenHeight
    // scale pre look canvas
    rect.style.height = (screenHeight/2) + 'px';
  })
  .setEvent('bSize',   'oninput', ({target}) => {
    const bSize = +target.value;
    const sWidth = ui.getElement('sWidth');
    const sHeight = ui.getElement('sHeight');
    const rect = ui.getElement('preCanvasLook');
    eSettings.bSize = bSize;
    // update screen w & h
    sWidth.value  = eSettings.xTotal * bSize;
    sHeight.value = eSettings.yTotal * bSize;
    // update preview screen grid look
    rect.style['background-size'] = `${bSize/2}px ${bSize/2}px`;
    // update editor settings
    const ids = Object.keys(EditorDefaultSettings);
    ui.fromInputsToObject(ids, eSettings);
  })
  .setEvent('closeModal', 'onclick', () => { eSettings = {}; })
  .setEvent('createScreen', 'onclick', () => {
    // update editor settings
    const ids = Object.keys(EditorDefaultSettings);
    ui.fromInputsToObject(ids, eSettings);
    // get values from each input by id & set in settings object
    if(p5Canvas) p5Canvas.remove();
    p5Canvas = new P5((g) => EditorScreen(g, eSettings));
  })


p5Canvas = currentMode.name === 'game' ? new P5(GameScreen) : null;
