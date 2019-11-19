// Get the reference to the map div
var divMap = $( '#map' );

// Get the width of the map div
var divWidth = divMap.width();

// Set the width of the map div to the height
divMap.height( divWidth );

// Get a reference to the paper object
var paper = Raphael( "map", divWidth, divWidth );

// Set the viewbox
paper.setViewBox( 0, -100, 1000, 1000, true );

// Preserve the aspect ratio of the canvas
paper.canvas.setAttribute( 'preserveAspectRatio', 'xMidYMin' );

// Heads Up Display
var instruction;

/* Array for states in safe and RUGA zones */
var safeZones = new Array( 'Abia State', 'Anambra State', 'Ebonyi State', 'Enugu State', 'Imo State', 'Lagos State' );
var rugaStates;

/* Variables to display the cow and handle timing */
var cow;
var time;
var score;
var stateName;
var playGame = false;
var timeSpent = 0;
var scoreTimeout;
var challenge;
var countdown = 0;
var timeEnd;
var selectedState;
var pathString;

/* Run once the page finishes loading */
$( document ).ready( function() {
	
	/* Challenge class for number of seconds to be used for countdown timer */
	var Challenge = function( timeSpent ) {
		// Declare a variable to be used in storing the time spent
		this.timeSpent = timeSpent;
		
		/* Adjust the time spent as the program progresses */
		this.setTimeSpent = function( currentTime ) {
			// Change the value of the timeSpent variable
			this.timeSpent =  currentTime;
		}
		
		/* Get the time limit for the user to click the cow */
		this.getTimeLimit = function() {
			// Initialise the time limit to 0
			this.timeLimit = 0;
			
			/* Find the time limit for 0 - 30 seconds */
			if ( ( this.timeSpent >= 0 ) && ( this.timeSpent <= 30 ) ) {
				this.timeLimit = 3;
			}
			/* Find the time limit for 31 - 60 seconds */
			else if ( ( this.timeSpent > 30 ) && ( this.timeSpent <= 60 ) ) {
				this.timeLimit = 2;
			}
			/* Once the time is more than a minute, reduce to 1 second */
			else {
				this.timeLimit = 1;
			}
			
			// Return the time limit
			return this.timeLimit;
		}
	}
	
	/* Display the Start Screen */
	function displayStartScreen() {
		// Display the cow image
		cow = paper.image( "cow.png", 225, -25, 568, 500 );
		
		/* Display the objective of the game */
		var objective = paper.text( 500, 550, "Stop cows from taking over Nigeria." );
		objective.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		
		/* Background of the first button */
		var bBox1 = paper.rect( 400, 650, 200, 100, 10 );
		bBox1.attr({
			fill: '#007F0E',
			stroke: '#3b4449',
			'stroke-width': 2
		});
		
		/* Text of the first button */
		var text1 = paper.text( bBox1.attrs.x + bBox1.attrs.width / 2, bBox1.attrs.y + bBox1.attrs.height / 2, 'Play' );
		text1.attr({
			"font-family": "Helvetica",
			"font-size": 40,
			fill: "#fff"
		});

		/* Create a set of rectangle + text = button */
		var button1 = paper.set().attr({
			cursor: 'pointer'
		});
		button1.push(bBox1);
		button1.push(text1);

		/* Add event listeners to the button */
		button1.mouseover( function (event) {
			// Display a glow around the box
			this.oGlow = bBox1.glow({
				opacity: 0.85,
				color: 'gray',
				width: 15
			});
		}).mouseout( function (event) {
			// Remove the glow
			this.oGlow.remove();
		}).mousedown( function (e) {
			// Second function call
			showMap();
		});		
	}
	
	/* Display the map of Nigeria on the Play Screen */
	function showMap() {
		// Instantiate the Challenge class
		challenge = new Challenge( timeSpent );
		
		// Add a RUGA state
		rugaStates = new Array( 'Niger State' );
		
		// Clear the screen
		paper.clear();
		
		// Set the time spent to 0
		timeSpent = 0;
		
		/* Display the instruction */
		instruction = paper.text( 500, -50, "Tap the cow" );
		instruction.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif" });
		
		// Style attributes for each path
		var style = {
			fill: "",
			stroke: '#000',
			"stroke-width": 1,
			"stroke-linejoin": "round",
		};
		
		/* Loop through the paths.js file */
		for ( var state in paths ) {	
			// Get the path for the state
			var obj = paper.path( paths[state].path );
			
			/* Display the safe zones */
			if ( jQuery.inArray(paths[state].name, safeZones) >= 0 ) {
				style.fill = "#00F";
				obj.attr(style);
			}
			/* Display the RUGA states in red */
			else if ( jQuery.inArray(paths[state].name, rugaStates) >= 0 ) {
				style.fill = "#F00";
				obj.attr(style);
			}
			else {
				/* Display the rest of the states */
				style.fill = "#D1DBDD";
				obj.attr(style);
			}
		}
		
		// Third function call
		displayCow();
	}
	
	/* Match a state's properties with its ID */
	function stateDetails( id ) {
		// Declare the variable for the state
		var state;
		
		/* Loop through the paths.js file until a match is found */
		for ( var region in paths ) {
			/* Store the state name and path string */
			if ( paths[region].id == id ) {
				// Assign the state name and path string to an array
				state = [ paths[region].name, paths[region].path ];
			}
		}
		
		// Return the state name and path string in an array
		return state;
	}
	
	/* Colour the path */
	function colourPath( pathString ) {
		var obj = paper.path( pathString );
		obj.attr({ fill: "#f00" });
	}
	
	/* Timer for the game */
	function timer() {
		/* This condition must be true to end the game */
		if ( rugaStates.length == 11 ) {
			// Switch off the timer
			playGame = false;
			
			// End the game
			endGame();
		}
		
		/* Timing for when the game is started */
		if ( playGame ) {
			scoreTimeout = setTimeout( function() {
				// Post increment the time spent
				timeSpent++;
				
				// Display the time spent as the score
				score.attr({ text: "Score: " + timeSpent });
				
				// Adjust the difficulty
				challenge.setTimeSpent(timeSpent)
				
				// Compute how much time is left
				timeEnd = challenge.getTimeLimit() - countdown;
			
				// Display the time left
				time.attr({ text: "Time: " + timeEnd });
				
				// Post increment the countdown variable
				countdown++;
								
				/* Once the countdown timer is at 0 */
				if ( timeEnd <= 0 ) {
					// Set the time end to 0
					timeEnd = 0;
					
					// Reset the countdown
					countdown = 0;
					
					// Remove the cow instance
					cow.remove();
					
					// Add the state to the list of rugaStates
					rugaStates.push( selectedState );
					
					// Display the number of states lost
					instruction.attr({ text: "States Lost: " + rugaStates.length });
					
					// Remove the state name
					stateName.remove();
					
					// Change the colour of the path
					colourPath( pathString );
					
					// Display a new cow instance
					displayCow();
				}
				
				// Call the timer again
				timer();
			}, 1000 );
		}
	}
	
	/* Display the cow */
	function displayCow() {
		var stateId;
		var stateProp;
		var boundingBox;
		var xPos;
		var yPos;
		
		/* Display the score and time */
		if ( !playGame ) {
			/* Display the time for the user to click the cow */
			time  = paper.text( 175, -50, "Time: 0" );
			time.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif", fill: "#f00" });
		
			/* Display the score */
			score = paper.text( 825, -50, "Score: 0" );
			score.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif", fill: "#f00" });
		}
		
		/* Get a state that is not in either of the two arrays */
		do {
			// Generate a random number from 1 to 37
			stateId = Math.floor( Math.random() * 37 ) + 1;
			
			// Match the state properties with the state ID
			stateProp = stateDetails( stateId );
		} while( ( jQuery.inArray(stateProp[0], safeZones) >= 0 ) ||
			( jQuery.inArray(stateProp[0], rugaStates) >= 0 ) );
			
		// Assign the name of the state
		selectedState = stateProp[0];
		
		// Get the path string
		pathString = stateProp[1];
		
		/* Display the name of the state */
		stateName = paper.text( 500, 800, selectedState );
		stateName.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif" });
		
		/* Get the bounding box */
		boundingBox = paper.path( pathString ).getBBox();
		xPos = boundingBox.x + ( boundingBox.width / 2 ) - 63;
		yPos = boundingBox.y + ( boundingBox.height / 2 ) - 53;
		
		/* Place the image of the cow using the coordinates of the bounding box */
		cow = paper.image( "cow.png", xPos, yPos, 126, 106 );
		cow.attr({
			cursor: 'pointer'
		});
		
		/* Event listener for the cow */
		cow.click( function(e){
			if ( !playGame ) {
				// Start the game
				playGame = true;
				
				// Display the number of states lost
				instruction.attr({ text: "States Lost: " + rugaStates.length });
				
				// Display the time limit
				time.attr({ text: "Time: " + challenge.getTimeLimit() });
				
				// Start the timer
				timer();
				
				// Remove the cow
				cow.remove();
				
				// Clear the name of the state
				stateName.remove();
				
				// Call the function again
				displayCow();
			}
			else {
				/* If the time for the location has not yet expired, reset the countdown */
				if ( timeEnd > 0 ) {
					countdown = 0;
				}
			
				// Remove the cow
				cow.remove();
				
				// Clear the name of the state
				stateName.remove();
				
				// Call the function again
				displayCow();
			}
		});
	}
	
	/* Display the Credits Screen */
	function endGame() {
		// Clear the screen
		paper.clear();
		
		// Reset the countdown variable to 0
		countdown = 0;
		
		//  Clear the time out variable
		clearTimeout( scoreTimeout );
	
		/* Display the first line of text */
		var line1 = paper.text( 500, 0, "The RUGA Game was developed by:" );
		line1.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		
		/* Display the second line of text */
		var line2 = paper.text( 500, 100, "Truston Ailende" );
		line2.attr({ 
						"font-size": 50,
						"font-family": "Arial, Helvetica, sans-serif", 
						fill: "#007F0E",
						cursor: 'pointer',
				});
		
		/* When the text is clicked, go to a URL */
		line2.click( function(e) {
			window.open("https://twitter.com/trustonailende");
		});
		
		/* Display the third line of text */
		var line3 = paper.text( 500, 200, "Your score:" );
		line3.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif", fill: "#f00", });
		
		/* Display the score */
		var score = paper.text( 500, 300, "" );
		score.attr({
			"font-size": 50,
			fill: "#f00",
			text: timeSpent
		});
		
		/* Display the fourth line of text */
		var line4 = paper.text( 500, 400, "Inspired by the article on" );
		line4.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		
		/* Display the fifth line of text */
		var line5 = paper.text( 500, 470, "RUGA by the Miyetti Allah" );
		line5.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		
		/* Display the sixth line of text */
		var line6 = paper.text( 500, 540, "You can find the story here" );
		line6.attr({ 
						"font-size": 50, 
						"font-family": "Arial, Helvetica, sans-serif",
						fill: "#007F0E",
						cursor: 'pointer' 
					});
		
		/* When the text is clicked, go to a URL */		
		line6.click( function(e) {
			window.open("https://www.sunnewsonline.com/ruga-only-way-to-have-peace-in-states-miyetti-allah-boss-bodejo/");
		});
					
		// Background of the second button
		var bBox2 = paper.rect( 375, 650, 250, 100, 10 ).attr({
			fill: '#007F0E',
			stroke: '#3b4449',
			'stroke-width': 2
		});
		
		// Text of the second button
		var text2 = paper.text( bBox2.attrs.x + bBox2.attrs.width / 2, bBox2.attrs.y + bBox2.attrs.height / 2, 'Play Again' ).attr({
			"font-family": "Helvetica",
			"font-size": 40,
			fill: "#fff"
		});

		/* Create a set of rectangle + text = button */
		var button2 = paper.set().attr({
			cursor: 'pointer'
		});
		button2.push(bBox2);
		button2.push(text2);

		/* Event listeners */
		button2.mouseover( function (event) {
			// Display a glow around the box
			this.oGlow = bBox2.glow({
				opacity: 0.85,
				color: 'gray',
				width: 15
			});
		}).mouseout( function (event) {
			// Remove the glow
			this.oGlow.remove();
		}).mousedown( function (e) {
			// Second function call
			showMap();
		});
	}
	
	// First function call
	displayStartScreen();
});

/* Resize event handler */
$( window ).resize( function() {
	// Get the new width of the map div
	divWidth = Math.round((divMap.width()));
	
	// Change the size of the paper
	paper.setSize( divWidth, divWidth );
	
	// Make the height of the div equal to the width
	divMap.height( divWidth );
});