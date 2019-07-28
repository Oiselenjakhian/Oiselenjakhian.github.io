var div_map = $('#map');
var set_first = div_map.width();
div_map.height(set_first);
arr = new Array();

var map = Raphael("map", daWidth, daHeight);
map.setViewBox(0, 0, 1500, 1500, true);
map.canvas.setAttribute('preserveAspectRatio', 'none');

var daWidth = div_map.width();
var daHeight = div_map.width();

title = map.text(300, 780, "All");
summary = map.text(300, 840, "First Held: 1957")
info1 = map.text(300, 900, "3 Teams in Participation")
info2 = map.text(300, 960, "16 Teams in 1998")
info3 = map.text(300, 1020, "24 Teams in 2017")
info4 = map.text(300, 1080, "")
info5 = map.text(300, 1140, "")
info6 = map.text(300, 1200, "")
info7 = map.text(300, 1260, "")

winners = new Array('Algeria', 'Cameroon', 'Democratic Republic of The Congo', 'Egypt', 'Ethiopia', 'Ghana', 'Ivory Coast', 'Morocco', 'Nigeria', 'Republic of Congo', 'South Africa', 'Sudan', 'Tunisia', 'Zambia');

function valueInWinnersArray(testValue) {
	var inArray = false;
	
	for (var i = 0; i < winners.length; i++) {
		if (testValue === winners[i]) {
			inArray = true;
			break;
		}
	}
	
	return inArray;
}

$(document).ready(function() {
	$('input[type="radio"]').on('change', function(e) {
		var radioValue = $("input[name='country']:checked").val();
		title.attr({text: radioValue});
		
		if (radioValue == "All") {
			summary.attr({text: "First Held: 1957"});
			info1.attr({text: "3 Teams in Participation"});
			info2.attr({text: "16 Teams in 1998"});
			info3.attr({text: "24 Teams in 2017"});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Algeria") {
			summary.attr({text: "2 Time Winner"});
			info1.attr({text: "First Time: 1990"});
			info2.attr({text: "Second Time: 2019"});
			info3.attr({text: ""});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Cameroon") {
			summary.attr({text: "5 Time Winner"});
			info1.attr({text: "First Time: 1984"});
			info2.attr({text: "Second Time: 1988"});
			info3.attr({text: "Third Time: 2000"});
			info4.attr({text: "Fourth Time: 2002"});
			info5.attr({text: "Fifth Time: 2017"});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Congo") {
			summary.attr({text: "1 Time Winner"});
			info1.attr({text: "First Time: 1972"});
			info2.attr({text: ""});
			info3.attr({text: ""});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "DR Congo") {
			summary.attr({text: "2 Time Winner"});
			info1.attr({text: "First Time: 1968"});
			info2.attr({text: "Second Time: 1974"});
			info3.attr({text: ""});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Egypt") {
			summary.attr({text: "7 Time Winner"});
			info1.attr({text: "First Time: 1957"});
			info2.attr({text: "Second Time: 1959"});
			info3.attr({text: "Third Time: 1986"});
			info4.attr({text: "Fourth Time: 1998"});
			info5.attr({text: "Fifth Time: 2006"});
			info6.attr({text: "Sixth Time: 2008"});
			info7.attr({text: "Seventh Time: 2010"});
		}
		else if (radioValue == "Ethiopia") {
			summary.attr({text: "1 Time Winner"});
			info1.attr({text: "First Time: 1976"});
			info2.attr({text: ""});
			info3.attr({text: ""});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Ghana") {
			summary.attr({text: "4 Time Winner"});
			info1.attr({text: "First Time: 1963"});
			info2.attr({text: "Second Time: 1965"});
			info3.attr({text: "Third Time: 1978"});
			info4.attr({text: "Fourth Time: 1982"});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Ivory Coast") {
			summary.attr({text: "2 Time Winner"});
			info1.attr({text: "First Time: 1992"});
			info2.attr({text: "Second Time: 2015"});
			info3.attr({text: ""});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Morocco") {
			summary.attr({text: "1 Time Winner"});
			info1.attr({text: "First Time: 1976"});
			info2.attr({text: ""});
			info3.attr({text: ""});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Nigeria") {
			summary.attr({text: "3 Time Winner"});
			info1.attr({text: "First Time: 1980"});
			info2.attr({text: "Second Time: 1994"});
			info3.attr({text: "Third Time: 2013"});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "South Africa") {
			summary.attr({text: "1 Time Winner"});
			info1.attr({text: "First Time: 1996"});
			info2.attr({text: ""});
			info3.attr({text: ""});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Sudan") {
			summary.attr({text: "1 Time Winner"});
			info1.attr({text: "First Time: 1970"});
			info2.attr({text: ""});
			info3.attr({text: ""});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Tunisia") {
			summary.attr({text: "1 Time Winner"});
			info1.attr({text: "First Time: 2004"});
			info2.attr({text: ""});
			info3.attr({text: ""});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
		else if (radioValue == "Zambia") {
			summary.attr({text: "1 Time Winner"});
			info1.attr({text: "First Time: 2012"});
			info2.attr({text: ""});
			info3.attr({text: ""});
			info4.attr({text: ""});
			info5.attr({text: ""});
			info6.attr({text: ""});
			info7.attr({text: ""});
		}
	});
	
	drawAfricaMap();
	
	function drawAfricaMap() {
		var style = {
			fill: "",
			stroke: '#3899E6',
			"stroke-width": 1,
			"stroke-linejoin": "round",
			cursor: "pointer"
		};

		for (var region in paths) {
			var obj = map.path(paths[region].path);
			obj.attr(style);
			arr[obj.id] = region;
			obj.attr(style);
			
			if (valueInWinnersArray(paths[arr[obj.id]].name)) {
				style.fill = "#FFD700";
				obj.fill = "#FFD700";
				obj.attr(style);
			}	
			else {
				style.fill = "#FFF";
				obj.fill = "#FFF";
				obj.attr(style);
			}
			
			obj
			.hover(function(){
				this.animate({
					fill: '#1669AD'
				}, 300);
			}, function(){
				this.animate({
					fill: this.fill
				}, 300);
			});
			
			$(obj.node)
			.qtip({ 
				content: { text: 'Name: ' +  paths[arr[obj.id]].name },
				style: {
					background: '#000000',
					color: '#ffffff',
					border: { width: 6, radius: 3, color: '#ff0000' }
				},
				position: {
					my: 'left center',
					at: 'bottom center',
					target: 'mouse',
					adjust: { x: 5, y: 20 }
				}
			});
		}
		
		title.attr({ "font-size": 70, "font-family": "Arial, Helvetica, sans-serif" });
		summary.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		info1.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		info2.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		info3.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		info4.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		info5.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		info6.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
		info7.attr({ "font-size": 50, "font-family": "Arial, Helvetica, sans-serif" });
	}
});

$(window).resize(function(){
	daWidth = Math.round((div_map.width()));
	daHeight = Math.round((div_map.width()));
	
	map.setSize(daWidth,daHeight);
	div_map.height(daWidth);
});
