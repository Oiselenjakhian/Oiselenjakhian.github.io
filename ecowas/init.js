var div_map = $('#map');
var set_first = div_map.width();
div_map.height(set_first);
arr = new Array();

var daWidth = div_map.width();
var daHeight = div_map.width();

var map = Raphael("map", daWidth, daHeight);
map.setViewBox(100, 70, 800, 800, true);
map.canvas.setAttribute('preserveAspectRatio', 'xMidYMin');

countryName = map.text(335, 740, "");
countryName.attr({ "font-size": 40, "font-family": "Arial, Helvetica, sans-serif" });

$( document ).ready(function() {
	drawMap();
	
	function drawMap() {
		var style = {
			fill: "",
			stroke: '#000',
			"stroke-width": 1,
			"stroke-linejoin": "round",
			cursor: "pointer"
		};
		
		/* Loop through the path and draw each region */
		for (var region in paths) {		
			/* Get a country and colour it */
			var obj = map.path(paths[region].path);
			arr[obj.id] = region;
			
			if (paths[region].name  == 'Nigeria') {
				obj.fill = "#41AE76";
				style.fill = "#41AE76";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Niger') {
				obj.fill = "#41B6C4";
				style.fill = "#41B6C4";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Burkina Faso') {
				obj.fill = "#41B6C4";
				style.fill = "#41B6C4";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Benin') {
				obj.fill = "#E08214";
				style.fill = "#E08214";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Togo') {
				obj.fill = "#E08214";
				style.fill = "#E08214";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Ghana') {
				obj.fill = "#0868AC";
				style.fill = "#0868AC";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Ivory Coast') {
				obj.fill = "#0868AC";
				style.fill = "#0868AC";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Guinea') {
				obj.fill = "#0868AC";
				style.fill = "#0868AC";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Guinea Bissau') {
				obj.fill = "#0868AC";
				style.fill = "#0868AC";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Gambia') {
				obj.fill = "#0868AC";
				style.fill = "#0868AC";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Sierra Leone') {
				obj.fill = "#E08214";
				style.fill = "#E08214";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Liberia') {
				obj.fill = "#E08214";
				style.fill = "#E08214";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Mali') {
				obj.fill = "#8E388E";
				style.fill = "#8E388E";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Mauritania') {
				obj.fill = "#8E388E";
				style.fill = "#8E388E";
				obj.attr(style);
			}
			else if (paths[region].name  == 'Senegal') {
				obj.fill = "#8E388E";
				style.fill = "#8E388E";
				obj.attr(style);
			}
			else {
				obj.fill = "#D1DBDD";
				style.fill = "#D1DBDD";
				obj.attr(style);
			}
			
			/* Hover function */
			obj
			.hover(function(){
				this.animate({
					fill: '#F00'
				}, 300);
				countryName.attr({text: paths[arr[this.id]].name});
			}, function(){
				this.animate({
					fill: this.fill
				}, 300);
				countryName.attr({text: ""});
			});
			
			/* Click function */
			obj
			.click(function(){
				countryName.attr({text: paths[arr[this.id]].name});
			});
		}
	}
	
	$(window).resize(function(){
		daWidth = Math.round((div_map.width()));
		daHeight = Math.round((div_map.width()));
	
		map.setSize(daWidth,daHeight);
		div_map.height(daWidth);
	});
});
