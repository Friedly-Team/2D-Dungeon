import P5 from "p5";
import UI from "./ui/withDOM.js";

import GameObject from "./js/game/index.js";
import { EditorDefaultSettings, MODES} from "./js/consts.js";

let p5Canvas = null;
let editorSettings = { ...EditorDefaultSettings };
const ui = new UI();


const currentMode = ui.subscribe("mode", { ...MODES.game });

ui
  // header buttons
  .trigger("dungeon", 'onclick',() => {
    if (currentMode.name !== "game" && MODES.game.active) {
      currentMode.name = MODES.game.name;
      p5Canvas = new P5(GameObject);
    }
  })
  .trigger("editor", 'onclick',() => {
    if (currentMode.name !== "editor" && MODES.editor.active) {
      currentMode.name = MODES.editor.name;
      p5Canvas.remove();
    }
  })
  // modal settings inputs
  .trigger('sWidth', 'onchange', ({ target }) => {
    ui.trackInputValue('sWidth', target, editorSettings)
  })
  .trigger('sHeight', 'onchange', ({ target }) => {
    ui.trackInputValue('sHeight', target, editorSettings)
  })
  .trigger('xTotal', 'onchange', ({ target }) => {
    ui.trackInputValue('xTotal', target, editorSettings)
  })
  .trigger('yTotal', 'onchange', ({ target }) => {
    ui.trackInputValue('yTotal', target, editorSettings)
  })
  .trigger('bSize', 'onchange', ({ target }) => {
    ui.trackInputValue('bSize', target, editorSettings)
  })
  // modal bottom buttons
  .trigger('closeModal', 'onclick', () => {
    editorSettings = {};
  })
  .trigger('createScreen', 'onclick', () => {
    // set whole values from modal inputs
    ui.withInputs(['sWidth', 'sHeight', 'xTotal', 'yTotal', 'bSize'], editorSettings);
    console.log(editorSettings);
  })


p5Canvas = new P5(GameObject);
