MathRun.Preloader = function(game){
	// define width and height of the game
	MathRun.GAME_WIDTH = 640;
	MathRun.GAME_HEIGHT = 960;
};
MathRun.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((MathRun.GAME_WIDTH-311)/2, (MathRun.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img/background.png');
		this.load.image('monster-cover', 'img/monster-cover.png');
		this.load.image('title', 'img/title.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
		// load spritesheets
		this.load.image('button-start', 'img/button-start.png');
		this.load.image('restart', 'img/restart.png');
		this.load.image('resume', 'img/resume.png');
		this.load.image('exit', 'img/exit.png');
		this.load.image('pause-screen', 'img/pause.png');
		this.load.image('number', 'img/number.png');
		this.load.image('timer-screen', 'img/timer-screen.png');
		this.load.image('timer', 'img/timer.png');
		this.load.image('number-green', 'img/number-green.png');
		this.load.image('number-red', 'img/number-red.png');
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};
