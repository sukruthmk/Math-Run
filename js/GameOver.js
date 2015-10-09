MathRun.GameOver = function(game){};
MathRun.GameOver.prototype = {
    init: function(score) {
        if(score == 0) {
            score = "0";
        }
        this._score = score;
    },
	create: function(){
		this.add.sprite(0, 0, 'background');
		this.add.sprite(10, 5, 'score-bg');
        this.add.sprite(200, 250, 'game-over');
        this.add.button(150, 500, 'restart', this.startGame, this);
        this.add.button(150, 650, 'exit', this.exitGame, this);
		var fontStyle = { font: "35px Arial", fill: "#ffffff", stroke: "#333", strokeThickness: 3, align: "center" };
		this.add.text(120, 22, this._score, fontStyle);
        var highScore = localStorage.getItem("high-score");
        if(!highScore) {
            localStorage.setItem("high-score",this._score);
        } else if(parseInt(this._score) > parseInt(highScore) ) {
            localStorage.setItem("high-score",parseInt(this._score));
        }
	},
	startGame: function() {
		// start the Game state with scores cleared
		this.state.start('Game',true,false,true);
	},
    exitGame: function() {
        // redirect to main menu
		this.state.start('MainMenu',true,false);
    }
};
