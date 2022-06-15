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
  .withEvent("dungeon", 'onclick',() => {
    if (currentMode.name !== "game" && MODES.game.active) {
      currentMode.name = MODES.game.name;
      if(p5Canvas) p5Canvas.remove();
      p5Canvas = new P5(GameScreen);
    }
  })
  .withEvent("editor", 'onclick',() => {
    if (currentMode.name !== "editor" && MODES.editor.active) {
      currentMode.name = MODES.editor.name;
      p5Canvas.remove();
    }
  })
  // modal settings inputs
  .withEvent('sWidth',  'onchange', ui.wrapWith('sWidth',  eSettings))
  .withEvent('sHeight', 'onchange', ui.wrapWith('sHeight', eSettings))
  .withEvent('xTotal',  'onchange', ui.wrapWith('xTotal',  eSettings))
  .withEvent('yTotal',  'onchange', ui.wrapWith('yTotal',  eSettings))
  .withEvent('bSize',   'onchange', ui.wrapWith('bSize',   eSettings))
  // modal bottom buttons
  .withEvent('closeModal', 'onclick', () => {
    eSettings = {};
  })
  .withEvent('createScreen', 'onclick', () => {
    // get values from each input by id & set in settings object
    const ids = Object.keys(EditorDefaultSettings);
    ui.fromInputsToObject(ids, eSettings);
    // console.log(editorSettings);
    if(p5Canvas) p5Canvas.remove();
    p5Canvas = new P5((g) => EditorScreen(g, eSettings));
  })


p5Canvas = currentMode.name === 'game' ? new P5(GameScreen) : null;
