$( document ).ready(function() {
	/* Declare a variable for the map */
    var map = Raphael("map");
	map.setViewBox(0, -100, 1000, 1000, true);
	map.canvas.setAttribute('preserveAspectRatio', 'xMidYMin');
	
	/* Extras for map */
	var boundingBox;
	var circle;
	var name;
	var pathString;

	// Arrays
	pointX	= new Array();
	pointY	= new Array();
	zone = new Array('Benue', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kogi', 'Kwara', 'Lagos', 'Niger', 'Ogun', 'Osun', 'Oyo');

	/* Define a style for the regions */
	var style = {
		fill: "",
		stroke: "black",
		"stroke-width": 1,
		"stroke-linejoin": "round",
		cursor: "pointer"
	};

	/* Loop through the path and draw each region */
	for (var region in paths) {		
		/* Get a region and set its style */
		var obj = map.path(paths[region].path);
		obj.attr(style);
		
		/* Display states in the zone differently */
		if (jQuery.inArray(paths[region].name, zone) >= 0) {
			// Set the fill of the path
			style.fill = "#FFF1AD";
			obj.attr(style);
			
			/* Draw a circle on the center of the object */
			boundingBox = obj.getBBox();
			circle = map.circle(
				(boundingBox.x + (boundingBox.width / 2)),
				(boundingBox.y + (boundingBox.height / 2)),
				5
			);
			circle.attr("fill", "#f00");
			
			/* Place the name for specific states*/
			if (paths[region].name  == 'Lagos') {
				name = map.text(
						(boundingBox.x + (boundingBox.width / 2)), 
						((boundingBox.y + (boundingBox.height / 2)) + 30),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
				
				/* Push the values from boundary */
				pointX.push(boundingBox.x + (boundingBox.width / 2));
				pointY.push(boundingBox.y + boundingBox.height);
				
				/* Push the values from the center of the bounding box */
				pointX.push(boundingBox.x + (boundingBox.width / 2));
				pointY.push(boundingBox.y + (boundingBox.height / 2));
			}
			else if (paths[region].name  == 'Ogun') {
				name = map.text(
						(boundingBox.x + (boundingBox.width / 2)), 
						((boundingBox.y + (boundingBox.height / 2)) + 15),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
				
				/* Push the values from the center of the bounding box */
				pointX.push(boundingBox.x + (boundingBox.width / 2));
				pointY.push(boundingBox.y + (boundingBox.height / 2));
			}
			else if (paths[region].name  == 'Niger') {
				name = map.text(
						(boundingBox.x + (boundingBox.width / 2)), 
						((boundingBox.y + (boundingBox.height / 2)) + 15),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
				
				/* Push the values from the center of the bounding box */
				pointX.push(boundingBox.x + (boundingBox.width / 2));
				pointY.push(boundingBox.y + (boundingBox.height / 2));
			}			
			else if (paths[region].name  == 'Kano') {
				name = map.text(
						(boundingBox.x + (boundingBox.width / 2)), 
						((boundingBox.y + (boundingBox.height / 2)) + 15),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
				
				/* Push the values from the center of the bounding box */
				pointX.push(boundingBox.x + (boundingBox.width / 2));
				pointY.push(boundingBox.y + (boundingBox.height / 2));
			}
			else if (paths[region].name  == 'Katsina') {
				name = map.text(
						(boundingBox.x + (boundingBox.width / 2)), 
						((boundingBox.y + (boundingBox.height / 2)) + 15),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
				
				/* Push the values from the center of the bounding box */
				pointX.push(boundingBox.x + (boundingBox.width / 2));
				pointY.push(boundingBox.y + (boundingBox.height / 2));
				
				/* Push the final values */
				pointX.push(boundingBox.x + (boundingBox.width / 2));
				pointY.push(boundingBox.y);
			}
			else if (paths[region].name  == 'Osun') {
				name = map.text(
						(boundingBox.x + (boundingBox.width / 2)), 
						((boundingBox.y + (boundingBox.height / 2)) + 15),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
			}
			else if (paths[region].name  == 'Kwara') {
				name = map.text(
						((boundingBox.x + (boundingBox.width / 2)) - 45), 
						((boundingBox.y + (boundingBox.height / 2)) - 30),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
			}
			else if (paths[region].name  == 'Kogi') {
				name = map.text(
						((boundingBox.x + (boundingBox.width / 2)) - 10), 
						((boundingBox.y + (boundingBox.height / 2)) - 30),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
			}
			else if (paths[region].name  == 'Benue') {
				name = map.text(
						((boundingBox.x + (boundingBox.width / 2)) - 10), 
						((boundingBox.y + (boundingBox.height / 2)) - 20),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
			}
			else if (paths[region].name  == 'Jigawa') {
				name = map.text(
						((boundingBox.x + (boundingBox.width / 2)) + 10), 
						((boundingBox.y + (boundingBox.height / 2)) - 30),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
			}
			else {
				name = map.text(
						(boundingBox.x + (boundingBox.width / 2)), 
						((boundingBox.y + (boundingBox.height / 2)) - 30),
						paths[region].name);
				name.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });
			}
		}
		else {
			style.fill = "#FFF";
			obj.attr(style);
		}
		
		$(obj.node).qtip({ 
			content: { text: 'Name: ' +  paths[region].name },
            style: {
                background: '#000000',
                color: '#ffffff',
                border: { width: 6, radius: 3, color: '#ff0000' }
            },
			position: {
				my: 'left center',
				at: 'bottom center',
				target: 'mouse',
				adjust: { x: 5, y: 5 }
			}
        });
	}
	
	/* Print out the values of the point arrays */
	for (i = 0; i < pointX.length; i++) {
		if (pointX.length == (i + 1)) {
			break;
		}
		else if (i == 0) {
			pathString = "M"+pointX[i]+" "+pointY[i]+"L"+pointX[i + 1]+" "+pointY[i + 1];
			map.path(pathString).attr({stroke:"#f00","stroke-width":5});
		}
		else if (i == 2) {
			/* Connect Lagos to Ogun State */
			pathString = "M"+pointX[i-1]+" "+pointY[i-1]+"L"+pointX[i + 1]+" "+pointY[i + 1];
			map.path(pathString).attr({stroke:"#f00","stroke-width":5});
		}
		else if (i == 3) {
			/* Connect from Ogun to Niger */
			pathString = "M"+pointX[i]+" "+pointY[i]+"L"+pointX[i - 1]+" "+pointY[i - 1];
			map.path(pathString).attr({stroke:"#f00","stroke-width":5});
			
			/* Connect Niger to Kano State */
			pathString = "M"+pointX[i-1]+" "+pointY[i-1]+"L"+pointX[i + 1]+" "+pointY[i + 1];
			map.path(pathString).attr({stroke:"#f00","stroke-width":5});
		}
		else if (i > 3) {
			// Make path string
			pathString = "M"+pointX[i]+" "+pointY[i]+"L"+pointX[i + 1]+" "+pointY[i + 1];
			map.path(pathString).attr({stroke:"#f00","stroke-width":5});
		}
	}
	
	/* Make the map responsive */
	$(window).resize(function(){
		var width = $("#map").width();
		var height = $("#map").height();
		
		if (width > height) {
			map.setSize(height, height);		
		}
		else {
			map.setSize(width, width);
		}		
	});
});
