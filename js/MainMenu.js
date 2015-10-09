MathRun.MainMenu = function(game){};
MathRun.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-130, MathRun.GAME_HEIGHT-514, 'monster-cover');
		this.add.sprite(180, 50, 'title');
		// add the button that will start the game
		this.add.button(300, 650, 'button-start', this.startGame, this);
		this.add.sprite(10, 5, 'score-bg');
		var highScore = localStorage.getItem("high-score");
		if(!highScore || highScore == 0){
			highScore = "0";
		}
		// initialize the score text with 0
		var fontStyle = { font: "35px Arial", fill: "#ffffff", stroke: "#333", strokeThickness: 3, align: "center" };
		this.add.text(120, 22, highScore, fontStyle);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game',true,false,true);
	}
};
