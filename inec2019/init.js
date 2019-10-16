/* Map parameters */
var divMap = $( '#map' );
var divWidth = divMap.width();
divMap.height( divWidth );

// Array to store ids of paths
arr = new Array();

/* Map initialisation */
var map = Raphael( "map", divWidth, divWidth );
map.setViewBox( 0, -100, 1000, 1000, true );
map.canvas.setAttribute( 'preserveAspectRatio', 'xMidYMin' );

/* Map Display */
var title;
var footer;

/* Legend Items */
var text1;
var rect1;
var text2;
var rect2;
var text3;
var rect3;
var text4;
var rect4;
var text5;
var rect5;

/* jQuery function to run once the page finishes loading */
$(document).ready(function() {
	// Draw the map of Nigeria
	drawNigeria();
	
	/* Create the title text and set its properties */
	title = map.text( 500, -50, "Tap or mouseover on a state" );
	title.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif" });
	
	/* Create the footer text and set its properties */
	footer = map.text( 500, 820, "All" );
	footer.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif", fill: "#f00" });
	
	/* Create the first legend item */
	text1 = map.text( 825, 505, "15%-24%" );
	text1.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif" });
	rect1 = map.rect( 920, 480, 50, 50 ).attr({ fill: "#b3ffb3", stroke: '#000', "stroke-width": 3 });
	
	/* Create the second legend item */
	text2 = map.text( 825, 575, "25%-34%" );
	text2.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif" });
	rect2 = map.rect( 920, 550, 50, 50 ).attr({ fill: "#4dff4d", stroke: '#000', "stroke-width": 3 });
	
	/* Create the third legend item */
	text3 = map.text( 825, 645, "35%-44%" );
	text3.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif" });
	rect3 = map.rect( 920, 620, 50, 50 ).attr({ fill: "#00e600", stroke: '#000', "stroke-width": 3 });
	
	/* Create the fourth legend item */
	text4 = map.text( 825, 715, "45%-54%" );
	text4.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif" });
	rect4 = map.rect( 920, 690, 50, 50 ).attr({ fill: "#009900", stroke: '#000', "stroke-width": 3 });
	
	/* Create the fifth legend item */
	text5 = map.text( 825, 785, "55%-64%" );
	text5.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif" });
	rect5 = map.rect( 920, 760, 50, 50 ).attr({ fill: "#004d00", stroke: '#000', "stroke-width": 3 });
	
	/* Redraw the map when the user selects from the dropdown menu */
	$( 'select' ).on( 'change', function() {
		/* Change the value of the footer and redraw the map */
		if ( this.value == "All" ) {
			// Set the footer text to all
			footer.attr({ text: this.value });
			
			// Draw the map of Nigeria
			drawNigeria();
		}
		/* Change the value of the footer, redraw the map but highlight the selected state */
		else {
			// Draw the map of Nigeria
			drawNigeria();
			
			/* Loop through the paths and find the state with a matching name */
			for ( var state in paths ) {
				/* Compare state to selected state */
				if ( paths[state].name == this.value ) {
					// Display the name of the state and the percentage turnout
					footer.attr({ text: this.value + ": " + paths[state].percentage });
					
					/* Get the path of the state and paint it red */
					var obj = map.path( paths[state].path );
					obj.attr({ fill: "#f00" });
				}
			}
		}
	});
	
	/* Draw the map of Nigeria */
	function drawNigeria() {
		// Set the style for all the states
		var style = {
			stroke: '#000',
			"stroke-width": 1,
			"stroke-linejoin": "round",
			cursor: "pointer"
		};
		
		/* Loop through the paths */
		for ( var state in paths ) {
			/* Get the path of a state and style it */
			var obj = map.path( paths[state].path );
			obj.attr( style );
			obj.attr({ fill: paths[state].colour_code })
			arr[ obj.id ] = state;
			
			/* Make the path respond to mouseovers */
			obj
			.hover(function(){
				this.animate({
					fill: '#fff'
				}, 300);
				
				// When focus is set, display the name of the state and percentage turnout
				title.attr({ text: paths[arr[this.id]].name + ": " + paths[arr[this.id]].percentage });
			}, function(){
				this.animate({
					fill: paths[arr[this.id]].colour_code
				}, 300);
				
				// When the path loses focus, display the instruction
				title.attr({text: "Tap or mouseover on a state"});
			});
		}
	}
});

/* Resize the map */
$(window).resize(function() {
	// Get the width of the div for the map
	divWidth = Math.round((divMap.width()));
	
	// Set the size for the map using the width
	map.setSize(divWidth, divWidth);
	
	// Make the height of the div equal to the width
	divMap.height(divWidth);
});