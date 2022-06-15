import P5 from 'p5';
import UI from './ui/workWithDOM.js';
import GameObject from "./js/game/index.js";

UI.onClick('dungeon', () => {
	if(location.pathname !== '/') {
		console.log('next page')
	}
});
UI.onClick('editor', () => {
	if(location.pathname !== '/editor') {
		location.pathname = '/editor'
		console.log('next page')
		console.log('editor')
	}
});

new P5((GameObject));
