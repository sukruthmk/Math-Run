var MathRun = {};
MathRun.Boot = function(game){};
MathRun.Boot.prototype = {
	preload: function(){
		// preload the loading indicator first before anything else
		this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function(){
		// set scale options
		this.input.maxPointers = 1;

		// For desktop
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// For mobile
        //this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.updateLayout(true);
		// start the Preloader state
		this.state.start('Preloader');
	}
};
