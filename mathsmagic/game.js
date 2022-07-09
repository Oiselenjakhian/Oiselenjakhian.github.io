var game;
var one;
var two;
var three;
var four;
var five;
var six;
var seven;
var eight;
var nine;
var clear;
var start;
var pause;
var time = 0;
var timeText;
var total = 0;
var totalText;
var score = 0;
var scoreText;
var pausedOverlay;
var gameTimer;
var gameOverOverlay;
var upperLimit;
var displayValue = 0;
var display;
var target;

window.onload = function() {
	var config = {
		type: Phaser.AUTO,
		parent: 'phaser-example',
		width: 540,
		height: 960,
		scene: [bootGame, playGame]
	};
	game = new Phaser.Game(config);
	window.focus();
	resizeGame();
	window.addEventListener("resize", resizeGame);
}

class bootGame extends Phaser.Scene {
	constructor() {
		super("BootGame");
	}
	preload() {
		this.load.image("logo", "logo.png");
		this.load.atlas('atlas', 'texture.png', 'texture.json');
		this.load.image("paused", "pause-overlay.png");
		this.load.image("gameOver", "game-over.png");
	}
	create() {
		var logo = this.add.image(270, 360, "logo");
		var timer = this.time.delayedCall(1000, this.delayOver, [], this);
	}
	delayOver() {
		this.scene.start("PlayGame");
	}
}

class playGame extends Phaser.Scene {
	constructor() {
		super("PlayGame");
	}
	create() {
		this.initialTime = getTime(score);
		gameTimer = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
		gameTimer.paused = true;
		timeText = this.add.text(20, 50, 'Time: 0', { fontSize: '30px', fill: '#fff' });
		totalText = this.add.text(170, 50, 'Total: 0', { fontSize: '30px', fill: '#fff' });
		scoreText = this.add.text(340, 50, 'Score: 0', { fontSize: '30px', fill: '#fff' });
		pausedOverlay = this.add.image(270, 480, "paused");
		pausedOverlay.visible = false;
		gameOverOverlay = this.add.image(270, 480, "gameOver");
		gameOverOverlay.visible = false;

		one = this.add.sprite(90, 375, 'atlas', '1-over.png')
					.on('pointerdown', () => {
						total = total + 1;
						totalText.setText("Total: " + total.toString());
						if (total == displayValue) {
							score = score + 1;
							scoreText.setText("Score: " + score.toString());
							this.initialTime = getTime(score);
							this.time.delayedCall(1000, changeTargetNumber, [], this);
						}
						one.setFrame("1-over.png");
						one.removeInteractive();
					});
		two = this.add.sprite(270, 375, 'atlas', '2-over.png')
					.on('pointerdown', () => {
						total = total + 2;
						totalText.setText("Total: " + total.toString());
						if (total == displayValue) {
							score = score + 1;
							scoreText.setText("Score: " + score.toString());
							this.initialTime = getTime(score);
							this.time.delayedCall(1000, changeTargetNumber, [], this);
						}
						two.setFrame("2-over.png");
						two.removeInteractive();
					});
		three = this.add.sprite(450, 375, 'atlas', '3-over.png')
					.on('pointerdown', () => {
						total = total + 3;
						totalText.setText("Total: " + total.toString());
						if (total == displayValue) {
							score = score + 1;
							scoreText.setText("Score: " + score.toString());
							this.initialTime = getTime(score);
							this.time.delayedCall(1000, changeTargetNumber, [], this);
						}
						three.setFrame("3-over.png");
						three.removeInteractive();
					});
		four = this.add.sprite(90, 525, 'atlas', '4-over.png')
					.on('pointerdown', () => {
						total = total + 4;
						totalText.setText("Total: " + total.toString());
						if (total == displayValue) {
							score = score + 1;
							scoreText.setText("Score: " + score.toString());
							this.initialTime = getTime(score);
							this.time.delayedCall(1000, changeTargetNumber, [], this);
						}
						four.setFrame("4-over.png");
						four.removeInteractive();
					});
		five = this.add.sprite(270, 525, 'atlas', '5-over.png')
					.on('pointerdown', () => {
						total = total + 5;
						totalText.setText("Total: " + total.toString());
						if (total == displayValue) {
							score = score + 1;
							scoreText.setText("Score: " + score.toString());
							this.initialTime = getTime(score);
							this.time.delayedCall(1000, changeTargetNumber, [], this);
						}
						five.setFrame("5-over.png");
						five.removeInteractive();
					});
		six = this.add.sprite(450, 525, 'atlas', '6-over.png')
					.on('pointerdown', () => {
						total = total + 6;
						totalText.setText("Total: " + total.toString());
						if (total == displayValue) {
							score = score + 1;
							scoreText.setText("Score: " + score.toString());
							this.initialTime = getTime(score);
							this.time.delayedCall(1000, changeTargetNumber, [], this);
						}
						six.setFrame("6-over.png");
						six.removeInteractive();
					});
		seven = this.add.sprite(90, 675, 'atlas', '7-over.png')
					.on('pointerdown', () => {
						total = total + 7;
						totalText.setText("Total: " + total.toString());
						if (total == displayValue) {
							score = score + 1;
							scoreText.setText("Score: " + score.toString());
							this.initialTime = getTime(score);
							this.time.delayedCall(1000, changeTargetNumber, [], this);
						}
						seven.setFrame("7-over.png");
						seven.removeInteractive();
					});
		eight = this.add.sprite(270, 675, 'atlas', '8-over.png')
					.on('pointerdown', () => {
						total = total + 8;
						totalText.setText("Total: " + total.toString());
						if (total == displayValue) {
							score = score + 1;
							scoreText.setText("Score: " + score.toString());
							this.initialTime = getTime(score);
							this.time.delayedCall(1000, changeTargetNumber, [], this);
						}
						eight.setFrame("8-over.png");
						eight.removeInteractive();
					});
		nine = this.add.sprite(450, 675, 'atlas', '9-over.png')
					.on('pointerdown', () => {
						total = total + 9;
						totalText.setText("Total: " + total.toString());
						if (total == displayValue) {
							score = score + 1;
							scoreText.setText("Score: " + score.toString());
							this.initialTime = getTime(score);
							this.time.delayedCall(1000, changeTargetNumber, [], this);
						}
						nine.setFrame("9-over.png");
						nine.removeInteractive();
					});
		clear = this.add.sprite(165, 825, 'atlas', 'clear-red.png')
					.on('pointerdown', function(){
						clearButtons();
					});
		pause = this.add.sprite(375, 825, 'atlas', 'pause.png')
					.setInteractive()
					.setVisible(false)
					.on('pointerdown', function(){
						pauseGame();
					});
		target = this.add.sprite(270, 225, 'atlas', '1-display.png')
					.setVisible(false);
		start = this.add.sprite(375, 825, 'atlas', 'start.png')
					.setInteractive()
					.on('pointerdown', function(){
						pause.visible = true;
						start.visible = false;
						startGame();
					});
		pausedOverlay.setInteractive()
					.on('pointerdown', function(){
						startPausedGame();
					});
		gameOverOverlay.setInteractive()
					.on('pointerdown', function(){
						restartGame();
					});
	}
	onEvent() {
		this.initialTime -= 1;
		timeText.setText("Time: " + this.initialTime.toString());
		if (this.initialTime == 0) {
			this.initialTime = 10;
			gameTimer.paused = true;
			gameOver();
		}
	}
}

function clearButtons() {
	one.setFrame("1.png");
	one.setInteractive();
	two.setFrame("2.png");
	two.setInteractive();
	three.setFrame("3.png");
	three.setInteractive();
	four.setFrame("4.png");
	four.setInteractive();
	five.setFrame("5.png");
	five.setInteractive();
	six.setFrame("6.png");
	six.setInteractive();
	seven.setFrame("7.png");
	seven.setInteractive();
	eight.setFrame("8.png");
	eight.setInteractive();
	nine.setFrame("9.png");
	nine.setInteractive();
	
	total = 0;
	totalText.setText("Total: " + total.toString());
}

function changeTargetNumber() {
	clearButtons();
	upperLimit = getUpperLimit(score);
	displayValue = Math.floor(Math.random() * upperLimit) + 1;
	display = displayValue.toString() + "-display.png";
	target.visible = true;
	target.setFrame(display);
}

function startGame() {
	one.setFrame("1.png");
	one.setInteractive();
	two.setFrame("2.png");
	two.setInteractive();
	three.setFrame("3.png");
	three.setInteractive();
	four.setFrame("4.png");
	four.setInteractive();
	five.setFrame("5.png");
	five.setInteractive();
	six.setFrame("6.png");
	six.setInteractive();
	seven.setFrame("7.png");
	seven.setInteractive();
	eight.setFrame("8.png");
	eight.setInteractive();
	nine.setFrame("9.png");
	nine.setInteractive();
	clear.setFrame("clear.png");
	clear.setInteractive();
	
	gameTimer.paused = false;
	
	time = getTime(score);
	timeText.setText("Time: " + time.toString());
	
	changeTargetNumber();
}

function pauseGame() {	
	pausedOverlay.visible = true;
	timeText.visible = false;
	totalText.visible = false;
	scoreText.visible = false;
	one.visible = false;
	two.visible = false;
	three.visible = false;
	four.visible = false;
	five.visible = false;
	six.visible = false;
	seven.visible = false;
	eight.visible = false;
	nine.visible = false;
	clear.visible = false;
	pause.visible = false;
	target.visible = false;
	
	gameTimer.paused = true;
}

function startPausedGame() {
	pausedOverlay.visible = false;
	timeText.visible = true;
	totalText.visible = true;
	scoreText.visible = true;
	one.visible = true;
	two.visible = true;
	three.visible = true;
	four.visible = true;
	five.visible = true;
	six.visible = true;
	seven.visible = true;
	eight.visible = true;
	nine.visible = true;
	clear.visible = true;
	pause.visible = true;
	target.visible = true;
	
	gameTimer.paused = false;
}

function gameOver() {
	gameOverOverlay.visible = true;
	timeText.visible = false;
	totalText.visible = false;
	scoreText.visible = false;
	one.visible = false;
	two.visible = false;
	three.visible = false;
	four.visible = false;
	five.visible = false;
	six.visible = false;
	seven.visible = false;
	eight.visible = false;
	nine.visible = false;
	clear.visible = false;
	pause.visible = false;
	target.visible = false;
	start.visible = false;
	score = 0;
	scoreText.setText("Score: " + score.toString());
	
	gameTimer.paused = true;
}

function restartGame() {
	gameOverOverlay.visible = false;
	timeText.visible = true;
	totalText.visible = true;
	scoreText.visible = true;
	one.visible = true;
	two.visible = true;
	three.visible = true;
	four.visible = true;
	five.visible = true;
	six.visible = true;
	seven.visible = true;
	eight.visible = true;
	nine.visible = true;
	clear.visible = true;
	start.visible = true;
	target.visible = false;
	
	one.removeInteractive();
	two.removeInteractive();
	three.removeInteractive();
	four.removeInteractive();
	five.removeInteractive();
	six.removeInteractive();
	seven.removeInteractive();
	eight.removeInteractive();
	nine.removeInteractive();
	clear.removeInteractive();
	
	one.setFrame("1-over.png");
	two.setFrame("2-over.png");
	three.setFrame("3-over.png");
	four.setFrame("4-over.png");
	five.setFrame("5-over.png");
	six.setFrame("6-over.png");
	seven.setFrame("7-over.png");
	eight.setFrame("8-over.png");
	nine.setFrame("9-over.png");
	clear.setFrame("clear-red.png");
	
	total = 0;
	totalText.setText("Total: " + total.toString());
}

function getUpperLimit(score) {
	if (score >= 0 || score < 50) {
		return 15;
	}
	else if (score >= 50 || score < 100) {
		return 25;
	}
	else {
		return 35;
	}
}

function getTime(score) {
	if (score >= 0 || score < 50) {
		return 10;
	}
	else if (score >= 50 || score < 100) {
		return 8;
	}
	else if (score >= 100 || score < 150) {
		return 6;
	}
	else if (score >= 150 || score < 200) {
		return 4;
	}
	else {
		return 3;
	}
}

function resizeGame() {
	var canvas = document.querySelector("canvas");
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var windowRatio = windowWidth / windowHeight;
	var gameRatio = game.config.width / game.config.height;
	if (windowRatio < gameRatio) {
		canvas.style.width = windowWidth + "px";
		canvas.style.height = (windowWidth / gameRatio) + "px";
	}
	else {
		canvas.style.width = (windowHeight * gameRatio) + "px";
		canvas.style.height = windowHeight + "px";
	}
}