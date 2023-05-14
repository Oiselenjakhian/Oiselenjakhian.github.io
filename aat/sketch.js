// Define the x position of the first image
var imageOne = 0;

// Define the x position of the second image
var imageTwo;

// Define the scroll speed
var scrollSpeed = 0.5;

// Variable to start the game
var start = false;

// Define an array of asteroids
var asteroids = [];

// Define the number of asteroids
var asteroidNumber = 10;

// Variable for the score
var score = 0;

// Variable for start time
var startTime;

class SpaceShip {
  // Define the class constructor
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  display() {
    // Display the spaceship image
    image(rocketImage, player.x, player.y, 98, 67);
  }
  
  move() {
    // Only activate if a key is pressed
    if (keyIsPressed) {
      if (keyCode === UP_ARROW) {
        if (this.y > 0) {
          this.y = this.y - 5;  
        }
      }
      else if (keyCode === DOWN_ARROW) {
        if ((this.y + 67) < height) {
          this.y = this.y + 5;  
        }
      }
      else if (keyCode === LEFT_ARROW) {
        if (this.x > 0) {
          this.x = this.x - 5;
        }
      }
      else if (keyCode === RIGHT_ARROW) {
        if ((this.x + 203) < width) {
          this.x = this.x + 5;
          this.forward = true;
        }
      }
    }
    else {
      // Move the spaceship back based on the scroll speed
      if (this.x > 0) {
        this.x = this.x - scrollSpeed;
      }
    }
  }
}

class Asteroid {
  // Define the class constructor
  constructor(x, y, r, speed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;
  }
  
  display() {
    // Use a fill colour of white
    fill(255, 255, 255);
    
    // Draw a circle
    circle(this.x, this.y, this.r * 2);
  }
  
  move() {
    // Move the asteroid from right to left
    this.x = this.x - this.speed;
  }
  
  outOfBounds() {
    // If the asteroid x value is less than 0, return true
    if (this.x < 0) {
      return true;
    }
    else {
      return false;
    }
  }
}

function preload() {
  // Load the background image into the program
  backgroundImage = loadImage("background.jpg");
  
  // Load the rocket image
  rocketImage = loadImage("rocket.png");
  
  // Load the background song
  backgroundSong = loadSound("background.mp3");
}

function setup() {
  createCanvas(726, 480);
  
  // Assign the width to the second image
  imageTwo = width;
  
  // Define the spaceship
  player = new SpaceShip(100, 190);
  
  // Populate the array of asteroids
  for (let i = 0; i < asteroidNumber; i++) {
    x = Math.floor(Math.random() * 726) + 726;
    y = Math.floor(Math.random() * 480) + 1;
    r = Math.floor(Math.random() * 20) + 5;
    speed = scrollSpeed * Math.floor(Math.random() * 10) + 1;
    asteroids.push(new Asteroid(x, y, r, speed));
  }
}

function draw() {
  // Draw the images to the screen behind each other
  image(backgroundImage, imageOne, 0, width, height);
  image(backgroundImage, imageTwo, 0, width, height);
  
  if (start) {
    // Subtract the scroll speed
    imageOne -= scrollSpeed;
    imageTwo -= scrollSpeed;

    // When the image reaches the end, take it back to the beginning
    if (imageOne < -width) {
      imageOne = width;
    }

    // When the image reaches the end, take it back to the beginning
    if (imageTwo < -width) {
      imageTwo = width;
    }
    
    // Display the spaceship
    player.display();
    
    // Move the spaceship
    player.move();
    
    // Loop through the asteroids array
    asteroids.forEach(asteroid => {
      // Display the asteroid
      asteroid.display();

      // Move the asteroid
      asteroid.move();
      
      if (asteroid.outOfBounds()) {
        // Delete the balls that go off the screen
        let index = asteroids.indexOf(asteroid);
        asteroids.splice(index, 1);
        
        // Add a new ball
        x = Math.floor(Math.random() * 726) + 726;
        y = Math.floor(Math.random() * 480) + 1;
        r = Math.floor(Math.random() * 20) + 5;
        speed = scrollSpeed * Math.floor(Math.random() * 10) + 1;
        asteroids.push(new Asteroid(x, y, r, speed));
      }
      
      // Display the score
      textSize(20);
      score = (millis() - startTime) / 1000;
      text("Score: " + floor(score), 50, 20);
      
      if (checkCollision(player, asteroid)) {
        // Display the game over text
        textSize(45);
        text("GAME OVER!", 363, 200);
        
        // Display the score
        textSize(40);
        text("YOUR SCORE: " + floor(score), 363, 250);
        
        // Stop the game
        noLoop();
      }
    });
    
    // Loop the background song
    if (!backgroundSong.isPlaying()) {
      backgroundSong.play();
    }
    
    // Increase the scroll speed
    scrollSpeed = scrollSpeed + 0.0001;
  }
  else {
    // Align text to the center
    fill(255, 255, 255);

    // Define the stroke weight
    strokeWeight(4);

    // Define the stroke colour
    stroke(51);

    // Define the text size
    textSize(45);

    // Define the text alignment
    textAlign(CENTER, CENTER);

    // Display the text
    text("Press The Space Bar To Start", 363, 200);

    // Define the text size
    textSize(40);

    // Display the text
    text("Use The Arrow Keys To Move", 363, 250); 
  }
}

function keyPressed() {
  // When the space bar is pressed, start the game
  if (key === " ") {
    // Start the game
    start = true;
    
    // Note the time the game starts
    startTime = millis();
  }
}

function checkCollision(player, asteroid) {
  let testX = asteroid.x;
  let testY = asteroid.y;
  
  // Check if the asteroid is to the left or right of the player
  if (asteroid.x < player.x + 15) {
    testX = player.x + 15;
  }
  else if (asteroid.x > player.x + 58) {
    testX = player.x + 58;
  }
  
  // Check if the asteroid is above or below the player
  if (asteroid.y < player.y + 15) {
    testY = player.y + 15; 
  }
  else if (asteroid.y > player.y + 38) {
    testY = player.y + 38; 
  }
  
  // Calculate the distance between the asteroid and the player
  let distX = asteroid.x - testX;
  let distY = asteroid.y - testY;
  let distance = sqrt((distX*distX) + (distY*distY));
  
  if (distance <= asteroid.r) {
    return true;
  }
  return false;
}