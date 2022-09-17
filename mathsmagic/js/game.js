var game;
var bg_plain;
var pos_target_num;
var pos_buttons;
var timeText;
var totalText;
var scoreText;
var time = 0;
var total = 0;
var score = 0;
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
var target;
var pause;
var start;
var retry;
var info;
var upperLimit;
var displayValue = 0;
var display;
var playGame;
var gameTimeout;
var gameOverOverlay;
var pausedOverlay;
var instructionsOverlay;
var aboutOverlay;
var creditsOverlay;
var reloadScreen;
var yesButton;
var noButton;

window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        parent: "phaser-example",
        width: 540,
        height: 960,
        scene: [bootGame, menuScreen, gameScreen],
    };
    game = new Phaser.Game(config);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
};

class bootGame extends Phaser.Scene {
    constructor() {
        super("BootGame");
    }

    preload() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 70, 320, 50);

        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 100,
            text: "Loading...",
            style: {
                font: "30px monospace",
                fill: "#ffffff",
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 45,
            text: "0%",
            style: {
                font: "25px monospace",
                fill: "#ffffff",
            },
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.image("logo", "assets/images/logo.png");
        this.load.image("bg_plain", "assets/images/bg_plain.png");
        this.load.image("pos_target_num", "assets/images/pos_target_num.png");
        this.load.image("pos_buttons", "assets/images/pos_buttons.png");
        this.load.image("gameOver", "assets/images/game-over.png");
        this.load.image("paused", "assets/images/pause-overlay.png");
        this.load.image("play_btn", "assets/images/play.png");
        this.load.image("about_btn", "assets/images/about.png");
        this.load.image("instructions_btn", "assets/images/instructions.png");
        this.load.image("click_start", "assets/images/click.png");
        this.load.image(
            "instructions",
            "assets/images/instructions-overlay.png"
        );
        this.load.image("aboutOverlay", "assets/images/aboutOverlay.png");
        this.load.image("reload_screen", "assets/images/reload.png");
        this.load.image("yes_btn", "assets/images/yes.png");
        this.load.image("no_btn", "assets/images/no.png");
        this.load.atlas(
            "atlas",
            "assets/images/texture.png",
            "assets/images/texture.json"
        );
        this.load.audio("background_music", "assets/sounds/background.mp3");
        this.load.audio("click", "assets/sounds/click.ogg");
        this.load.audio("bubble", "assets/sounds/bubble.ogg");
        this.load.audio("startgame", "assets/sounds/startgame.wav");

        this.load.on("progress", function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(
                width / 2 - 150,
                height / 2 - 60,
                300 * value,
                30
            );
            percentText.setText(parseInt(value * 100) + "%");
        });

        this.load.on("complete", function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });
    }

    create() {
        var bg_plain = this.add.image(270, 480, "bg_plain");
        var logo = this.add.image(270, 480, "logo");
        var click = this.add.image(270, 240, "click_start");
        this.input.once(
            "pointerdown",
            function () {
                this.scene.start("MenuScreen");
            },
            this
        );
    }
}

class menuScreen extends Phaser.Scene {
    constructor() {
        super("MenuScreen");
    }

    create() {
        var music = this.sound.add("background_music");
        music.play({ loop: true, volume: 0.15 });
        var bg_plain = this.add.image(270, 480, "bg_plain");
        var logo = this.add.image(270, 150, "logo");
        logo.setDepth(1);
        var play = this.add.image(270, 360, "play_btn");
        play.setInteractive();
        play.on(
            "pointerdown",
            function () {
                this.scene.start("GameScreen");
            },
            this
        );
        aboutOverlay = this.add.image(270, 480, "aboutOverlay");
        aboutOverlay.setDepth(1);
        aboutOverlay.visible = false;
        aboutOverlay.setInteractive();
        aboutOverlay.on("pointerdown", function () {
            aboutOverlay.visible = false;
        });
        var about = this.add.image(270, 540, "about_btn");
        about.setInteractive();
        about.on("pointerdown", () => {
            aboutOverlay.visible = true;
        });
        instructionsOverlay = this.add.image(270, 480, "instructions");
        instructionsOverlay.setDepth(1);
        instructionsOverlay.visible = false;
        instructionsOverlay.setInteractive();
        instructionsOverlay.on("pointerdown", function () {
            instructionsOverlay.visible = false;
        });
        var instructions = this.add.image(270, 720, "instructions_btn");
        instructions.setInteractive();
        instructions.on("pointerdown", () => {
            instructionsOverlay.visible = true;
        });
    }
}

class gameScreen extends Phaser.Scene {
    constructor() {
        super("GameScreen");
    }

    create() {
        this.clickSound = this.sound.add("click");
        this.bubbleSound = this.sound.add("bubble");
        this.startGameSound = this.sound.add("startgame");

        bg_plain = this.add.image(270, 480, "bg_plain");
        pos_target_num = this.add.image(270, 480, "pos_target_num");
        pos_buttons = this.add.image(270, 480, "pos_buttons");
        timeText = this.add.text(20, 50, "Time: 0", {
            fontSize: "35px",
            fill: "#fff",
            fontFamily: "roboto-slab, serif",
        });
        totalText = this.add.text(170, 50, "Total: 0", {
            fontSize: "35px",
            fill: "#fff",
            fontFamily: "roboto-slab, serif",
        });
        scoreText = this.add.text(340, 50, "Score: 0", {
            fontSize: "35px",
            fill: "#fff",
            fontFamily: "roboto-slab, serif",
        });
        one = this.add.sprite(140, 660, "atlas", "1-over.png");
        one.on("pointerdown", () => {
            total = total + 1;
            totalText.setText("Total: " + total.toString());
            totalText.setFont("roboto-slab, serif");
            totalText.setFontSize("35px");

            this.clickSound.play();

            if (total == displayValue) {
                playGame = false;

                one.setFrame("1-over.png");
                removeAllInteractive();
                this.bubbleSound.play();

                const reset = setTimeout(resetTimer, 500);
                const update = setTimeout(updateHUD, 1000);
            } else {
                one.setFrame("1-over.png");
                one.removeInteractive();
            }
        });
        two = this.add.sprite(60, 550, "atlas", "2-over.png");
        two.on("pointerdown", () => {
            total = total + 2;
            totalText.setText("Total: " + total.toString());
            totalText.setFont("roboto-slab, serif");
            totalText.setFontSize("35px");

            this.clickSound.play();

            if (total == displayValue) {
                playGame = false;

                two.setFrame("2-over.png");
                removeAllInteractive();
                this.bubbleSound.play();

                const reset = setTimeout(resetTimer, 500);
                const update = setTimeout(updateHUD, 1000);
            } else {
                two.setFrame("2-over.png");
                two.removeInteractive();
            }
        });
        three = this.add.sprite(60, 410, "atlas", "3-over.png");
        three.on("pointerdown", () => {
            total = total + 3;
            totalText.setText("Total: " + total.toString());
            totalText.setFont("roboto-slab, serif");
            totalText.setFontSize("35px");

            this.clickSound.play();

            if (total == displayValue) {
                playGame = false;

                three.setFrame("3-over.png");
                removeAllInteractive();
                this.bubbleSound.play();

                const reset = setTimeout(resetTimer, 500);
                const update = setTimeout(updateHUD, 1000);
            } else {
                three.setFrame("3-over.png");
                three.removeInteractive();
            }
        });
        four = this.add.sprite(140, 300, "atlas", "4-over.png");
        four.on("pointerdown", () => {
            total = total + 4;
            totalText.setText("Total: " + total.toString());
            totalText.setFont("roboto-slab, serif");
            totalText.setFontSize("35px");

            this.clickSound.play();

            if (total == displayValue) {
                playGame = false;

                four.setFrame("4-over.png");
                removeAllInteractive();
                this.bubbleSound.play();

                const reset = setTimeout(resetTimer, 500);
                const update = setTimeout(updateHUD, 1000);
            } else {
                four.setFrame("4-over.png");
                four.removeInteractive();
            }
        });
        five = this.add.sprite(270, 260, "atlas", "5-over.png");
        five.on("pointerdown", () => {
            total = total + 5;
            totalText.setText("Total: " + total.toString());
            totalText.setFont("roboto-slab, serif");
            totalText.setFontSize("35px");

            this.clickSound.play();

            if (total == displayValue) {
                playGame = false;

                five.setFrame("5-over.png");
                removeAllInteractive();
                this.bubbleSound.play();

                const reset = setTimeout(resetTimer, 500);
                const update = setTimeout(updateHUD, 1000);
            } else {
                five.setFrame("5-over.png");
                five.removeInteractive();
            }
        });
        six = this.add.sprite(400, 300, "atlas", "6-over.png");
        six.on("pointerdown", () => {
            total = total + 6;
            totalText.setText("Total: " + total.toString());
            totalText.setFont("roboto-slab, serif");
            totalText.setFontSize("35px");

            this.clickSound.play();

            if (total == displayValue) {
                playGame = false;

                six.setFrame("6-over.png");
                removeAllInteractive();
                this.bubbleSound.play();

                const reset = setTimeout(resetTimer, 500);
                const update = setTimeout(updateHUD, 1000);
            } else {
                six.setFrame("6-over.png");
                six.removeInteractive();
            }
        });
        seven = this.add.sprite(480, 410, "atlas", "7-over.png");
        seven.on("pointerdown", () => {
            total = total + 7;
            totalText.setText("Total: " + total.toString());
            totalText.setFont("roboto-slab, serif");
            totalText.setFontSize("35px");

            this.clickSound.play();

            if (total == displayValue) {
                playGame = false;

                seven.setFrame("7-over.png");
                removeAllInteractive();
                this.bubbleSound.play();

                const reset = setTimeout(resetTimer, 500);
                const update = setTimeout(updateHUD, 1000);
            } else {
                seven.setFrame("7-over.png");
                seven.removeInteractive();
            }
        });
        eight = this.add.sprite(480, 550, "atlas", "8-over.png");
        eight.on("pointerdown", () => {
            total = total + 8;
            totalText.setText("Total: " + total.toString());
            totalText.setFont("roboto-slab, serif");
            totalText.setFontSize("35px");

            this.clickSound.play();

            if (total == displayValue) {
                playGame = false;

                eight.setFrame("8-over.png");
                removeAllInteractive();
                this.bubbleSound.play();

                const reset = setTimeout(resetTimer, 500);
                const update = setTimeout(updateHUD, 1000);
            } else {
                eight.setFrame("8-over.png");
                eight.removeInteractive();
            }
        });
        nine = this.add.sprite(400, 660, "atlas", "9-over.png");
        nine.on("pointerdown", () => {
            total = total + 9;
            totalText.setText("Total: " + total.toString());
            totalText.setFont("roboto-slab, serif");
            totalText.setFontSize("35px");

            this.clickSound.play();

            if (total == displayValue) {
                playGame = false;

                nine.setFrame("9-over.png");
                removeAllInteractive();
                this.bubbleSound.play();

                const reset = setTimeout(resetTimer, 500);
                const update = setTimeout(updateHUD, 1000);
            } else {
                nine.setFrame("9-over.png");
                nine.removeInteractive();
            }
        });
        clear = this.add.sprite(270, 700, "atlas", "clear-red.png");
        clear.on("pointerdown", () => {
            clearButtons();
            clearTotal();
        });
        target = this.add.sprite(270, 480, "atlas", "0-display.png");
        pause = this.add.sprite(270, 870, "atlas", "pause_button.png");
        pause.setScale(2);
        pause.setInteractive();
        pause.setVisible(false);
        pause.on("pointerdown", () => {
            pauseGame();
        });
        start = this.add.sprite(270, 870, "atlas", "start_button.png");
        start.setScale(2);
        start.setInteractive();
        start.on("pointerdown", () => {
            this.startGameSound.play();
            startGame();
        });
        reloadScreen = this.add.image(270, 480, "reload_screen");
        reloadScreen.visible = false;
        reloadScreen.setDepth(1);
        yesButton = this.add.image(180, 500, "yes_btn");
        yesButton.setInteractive();
        yesButton.visible = false;
        yesButton.setDepth(2);
        yesButton.on("pointerdown", () => {
            reloadScreen.visible = false;
            yesButton.visible = false;
            noButton.visible = false;
            restartGame();
        });
        noButton = this.add.image(350, 500, "no_btn");
        noButton.setInteractive();
        noButton.visible = false;
        noButton.setDepth(2);
        noButton.on("pointerdown", () => {
            reloadScreen.visible = false;
            yesButton.visible = false;
            noButton.visible = false;
            if (time > 0) {
                playGame = true;
                timer();
            }
        });
        retry = this.add.sprite(100, 860, "atlas", "retry_b.png");
        retry.setInteractive();
        retry.on("pointerdown", () => {
            reloadScreen.visible = true;
            yesButton.visible = true;
            noButton.visible = true;
            playGame = false;
        });
        instructionsOverlay = this.add.image(270, 480, "instructions");
        instructionsOverlay.visible = false;
        instructionsOverlay.setInteractive();
        instructionsOverlay.on("pointerdown", function () {
            instructionsOverlay.visible = false;
        });
        info = this.add.sprite(450, 860, "atlas", "info_b.png");
        info.setInteractive();
        info.on("pointerdown", () => {
            instructionsOverlay.visible = true;
        });
        gameOverOverlay = this.add.image(270, 480, "gameOver");
        gameOverOverlay.visible = false;
        gameOverOverlay.setInteractive();
        gameOverOverlay.setDepth(0);
        gameOverOverlay.on("pointerdown", function () {
            restartGame();
        });
        pausedOverlay = this.add.image(270, 480, "paused");
        pausedOverlay.visible = false;
        pausedOverlay.setInteractive();
        pausedOverlay.on("pointerdown", function () {
            startPausedGame();
        });
    }
}

function timer() {
    if (playGame) {
        gameTimeout = setTimeout(function () {
            timeText.setText("Time: " + time.toString());
            timeText.setFont("roboto-slab, serif");
            timeText.setFontSize("35px");
            time--;
            if (time == -1) {
                gameOver();
            } else {
                timer();
            }
        }, Phaser.Timer.SECOND * 1000);
    }
}

function startGame() {
    pause.visible = true;
    start.visible = false;

    resetTimer();

    const myTimeout = setTimeout(changeDisplay, 1000);
}

function changeDisplay() {
    clearButtons();
    changeTargetNumber();
}

function updateHUD() {
    increaseScore();
    clearTotal();
    changeDisplay();
}

function resetTimer() {
    playGame = true;
    time = getTime(score);
    timer();
}

function restartGame() {
    pause.visible = false;
    start.visible = true;
    gameOverOverlay.visible = false;
    resetButtons();
    resetTargetNumber();
    time = 0;
    timeText.setText("Time: " + time.toString());
    timeText.setFont("roboto-slab, serif");
    timeText.setFontSize("35px");
    total = 0;
    totalText.setText("Total: " + total.toString());
    totalText.setFont("roboto-slab, serif");
    totalText.setFontSize("35px");
    score = 0;
    scoreText.setText("Score: " + score.toString());
    scoreText.setFont("roboto-slab, serif");
    scoreText.setFontSize("35px");
    scoreText.x = 340;
    scoreText.y = 50;
}

function pauseGame() {
    playGame = false;
    pausedOverlay.visible = true;
}

function startPausedGame() {
    playGame = true;
    pausedOverlay.visible = false;
    timer();
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
    clear.setFrame("clear.png");
    clear.setInteractive();
}

function resetButtons() {
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

    removeAllInteractive();
}

function removeAllInteractive() {
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
}

function resetTargetNumber() {
    target.setFrame("0-display.png");
}

function changeTargetNumber() {
    upperLimit = getUpperLimit(score);
    displayValue = Math.floor(Math.random() * upperLimit) + 1;
    display = displayValue.toString() + "-display.png";
    target.visible = true;
    target.setFrame(display);
}

function gameOver() {
    gameOverOverlay.visible = true;
    playGame = false;
    scoreText.setText("Score: " + score.toString());
    scoreText.setFont("roboto-slab, serif");
    scoreText.setFontSize("60px");
    scoreText.setDepth(1);
    scoreText.x = 135;
    scoreText.y = 285;
}

function clearTotal() {
    total = 0;
    totalText.setText("Total: " + total.toString());
    totalText.setFont("roboto-slab, serif");
    totalText.setFontSize("35px");
}

function increaseScore() {
    score = score + 1;
    scoreText.setText("Score: " + score.toString());
    scoreText.setFont("roboto-slab, serif");
    scoreText.setFontSize("35px");
}

function getUpperLimit(score) {
    if (score >= 0 && score < 50) {
        return 15;
    } else if (score >= 50 && score < 100) {
        return 20;
    } else {
        return 30;
    }
}

function getTime(score) {
    if (score >= 0 && score < 50) {
        return 10;
    } else if (score >= 50 && score < 100) {
        return 8;
    } else if (score >= 100 && score < 150) {
        return 6;
    } else if (score >= 150 && score < 200) {
        return 4;
    } else {
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
        canvas.style.height = windowWidth / gameRatio + "px";
    } else {
        canvas.style.width = windowHeight * gameRatio + "px";
        canvas.style.height = windowHeight + "px";
    }
}
