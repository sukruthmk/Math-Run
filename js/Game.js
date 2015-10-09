MathRun.Game = function(game){
	// define game variables to reuse them in MathRun.item functions
	this._scoreText = null;
	this._score = 0;
	this._min = 1;
	this._max = 99;
	this._fontStyle = { font: "80px Arial", fill: "#FFBC6B", stroke: "#333", strokeThickness: 5, align: "center" };
	this._answer = 0;
	this._qText = null;
	this._timerStart = 0;
};
MathRun.Game.prototype = {

	init: function(clear) {
		if(clear) {
			this._score = 0;
			this._timerStart = 0;
		}
	},

	create: function(){
		this.add.sprite(0, 0, 'background');
		this.add.sprite(10, 5, 'score-bg');
		// add pause button
		this.add.button(MathRun.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);

		// initialize the score text with 0
		var fontStyle = { font: "35px Arial", fill: "#ffffff", stroke: "#333", strokeThickness: 3, align: "center" };
		this._scoreText = this.add.text(120, 22, "0", fontStyle);
		this._numberGroup = this.add.group();

		var yMultiple = -1;
		for(var i=0;i<9;i++) {
			var xMultiple = i % 3;
			if(xMultiple == 0) {
				yMultiple++;
			}
			var x = (640/3)*xMultiple+(640/8);
			var y = (960/2) + (960/6)*yMultiple;
			this.addNumbers(i+1, x, y);
		}

		this._qText = this.add.text(640/3+(640/8), (960/2) - (960/4), "0", this._fontStyle);
		this._numberGroup.add(this._qText);
		this.showQuestion();

		this.add.sprite(210, 15, 'timer-screen');
		this._timer = this.add.sprite(254, 23, 'timer');
		this._timer.maxWidth = this._timer.width;
	},

	managePause: function(){
		// pause the game
		this.game.paused = true;
		this._numberGroup.visible = false;
		var pauseGroup = this.add.group();
		// show pause screen
		var pauseScreen = this.add.sprite(20, 150, 'pause-screen');
		var resumeButton = this.add.sprite(150, 350, 'resume');
		var restartButton = this.add.sprite(150, 500, 'restart');
		var exitButton = this.add.sprite(150, 650, 'exit');
		pauseGroup.add(pauseScreen);
		pauseGroup.add(resumeButton);
		pauseGroup.add(restartButton);
		pauseGroup.add(exitButton);

		this._pauseGroup = pauseGroup;
		// Add a input listener that can help us return from being paused
    	this.input.onDown.add(this.registerUnpause, this);
	},

	registerUnpause: function(event) {
		var x1 = 150
 		var x2 = x1+350;
		var resumeY1 = 350;
		var resumeY2 = resumeY1+132;
		var restartY1 = 500;
 		var restartY2 = restartY1+132;
		var exitY1 = 650, exitY2 = exitY1+132;
		if(event.x > x1 && event.x < x2) {
	        // Check if the click was inside resume button
	        if(event.y > resumeY1 && event.y < resumeY2){
				this.resumeGame();
	        }

			// Check if the click was inside restart button
			if(event.y > restartY1 && event.y < restartY2) {
				this.restartGame();
			}

			// Check if the click was inside exit button
			if(event.y > exitY1 && event.y < exitY2) {
				this.exitGame();
			}
		}
	},

	resumeGame: function() {
		this._numberGroup.visible = true;
		this._pauseGroup.destroy();
		this.game.paused = false;
	},

	restartGame: function() {
		this._numberGroup.visible = true;
		this.game.paused = false;
		// start the Game state with scores cleared
		this.state.start('Game',true,false,true);
	},

	exitGame: function() {
		this._numberGroup.visible = true;
		this.game.paused = false;
		// redirect to main menu
		this.state.start('MainMenu',true,false);
	},

	showQuestion: function() {
		var q = this.getRandomInt(this._min, this._max);
		this._answer = getAnswer(q);
		this._qText.setText(q);
	},

	update: function() {
		if(this._timerStart) {
			var endTime = getCurrentTime();
			var elapsedTime = Math.abs((endTime - this._timerStart)/1000);
			if(elapsedTime < 3) {
				this._timer.width = this._timer.maxWidth - (elapsedTime/3 * this._timer.maxWidth);
			} else {
				this._timer.width = 0;
				this.state.start('GameOver', true, false, this._score);
			}
		}

		this.updateScore();
	},

	updateScore: function() {
		this._scoreText.setText(this._score);
	},

	addNumbers: function(n, x, y) {
		var element = this.add.sprite(x-30, y-20, 'number');
		var text = this.add.text(x, y, n, this._fontStyle);
		this._numberGroup.add(element);
		this._numberGroup.add(text);
		element.inputEnabled = true;
		element.events.onInputDown.add(function(){this.validate(n)}, this);
	},

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	getRandomInt: function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	validate: function(n) {
		var self = this;
		if(this._answer == n) {
			this._score = this._score + 1;
			this.showQuestion();
			this._timerStart = getCurrentTime();
		} else {
			this.game.paused = true;
			var xMultiple = (n-1) % 3;
			yMultiple = Math.floor((n-1)/3);
			var x = (640/3)*xMultiple+(640/8);
			var y = (960/2) + (960/6)*yMultiple;
			this.showNumberBackground(x,y,n,'red');
			var xMultiple = (this._answer-1) % 3;
			yMultiple = Math.floor((this._answer-1)/3);
			var x = (640/3)*xMultiple+(640/8);
			var y = (960/2) + (960/6)*yMultiple;
			this.showNumberBackground(x,y,this._answer,'green');
			setTimeout(function() {
				self.game.paused = false;
				self.state.start('GameOver', true, false, self._score);
			}, 1500);
		}
	},

	showNumberBackground: function(x, y, n, color) {
		var element = this.add.sprite(x-30, y-20, 'number-'+color);
		this.add.text(x, y, n, this._fontStyle);
	},

	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};

function getAnswer(n) {
	while(n.toString().length != 1) {
		n = sumDigits(n);
	}

	return n;
}

function sumDigits(n) {
	var sum=0;
	while(n>0) {
	   sum=sum+n%10;
	   n=Math.floor(n/10);
	}

	return sum;
}

function getCurrentTime() {
	var currentDate = new Date();
	return currentDate.getTime();
}
