import P5 from 'p5';
import UI from './ui/workWithDOM.js';

import GameObject from "./js/game/index.js";
import { MODES } from "./js/consts.js";

const currentMode = UI.subscribe('mode', { ...MODES.game });
let p5Canvas = null;

UI.onClick('dungeon', () => {
	if(currentMode.name !== 'game' && MODES.game.active) {
		currentMode.name = MODES.game.name;
		p5Canvas = new P5((GameObject));
	}
});
UI.onClick('editor', () => {
	if(currentMode.name !== 'editor' && MODES.editor.active) {
		currentMode.name = MODES.editor.name;
		p5Canvas.remove();
	}
});

p5Canvas = new P5((GameObject));
