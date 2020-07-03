$(document).ready(function(){
	var canvas=$("#gameCanvas");
	var context=canvas.get(0).getContext("2d");
	var uiIntro=$("#gameIntro");
	var uiStats=$("#gameStats");
	var uiComplete=$("#gameComplete");
	var uiPlay=$("#gamePlay");
	var uiReset=$(".gameReset");
	var uiScore=$(".gameScore");
	var uiCountry=$(".countryName");
	var uiMoves=$(".moves");
	var uiCountryFlag=$("#countryFlag");
	var uiTime=$(".gameTime");
	var uiDisplayCountry=$("#displayCountry");
	var uiCountryAccuracy=$("#countryAccuracy");
	var UPPERLIMIT=48;var numberGenerator;
	var generatedNumber;
	var africanStates=new Array();
	var generatedArray=new Array();
	var paper=Raphael("maparea",600,600);
	paper.setViewBox(0,0,1500,1500,true);
	var playGame;
	var timeSpent;
	var scoreTimeout;
	var numberOfMoves;
	var score;
	var countryName;
	var countryAccuracy;
	
	function timer(){
		if(playGame){
			scoreTimeout=setTimeout(function(){
				timeSpent++;
				uiTime.html(timeSpent);
				timer();
			},1000);
		}
	}
	
	function NumberGenerator(){}
	
	NumberGenerator.prototype.getNumber=function(){
		this.generatedValue=0;
		
		if(generatedArray.length===0){
			this.generatedValue=Math.floor(Math.random()*UPPERLIMIT)+1;
		}
		else{
			do{
				this.generatedValue=Math.floor(Math.random()*UPPERLIMIT)+1;
			}while(numberInArray(this.generatedValue,generatedArray));
		}
		
		generatedArray.push(this.generatedValue);return this.generatedValue;
	}
	
	function numberInArray(testNumber,inputArray){
		var inArray=false;
		
		for(var i=0;i<inputArray.length;i++){
			if(testNumber===inputArray[i]){
				inArray=true;
				break;
			}
		}
		
		return inArray;
	}
	
	function getCountry(id){
		var countryName="";
		countryName=africanStates[id-1].name;
		return countryName;
	}
	
	function loadFlagImage(id){
		var flagPath=africanStates[id-1].flag;
		uiCountryFlag.css('background-image','url('+flagPath+')');
	}

	function computeAccuracy(centerX,centerY,old_centerX,old_centerY){
		var accuracy;
		var distance=Math.sqrt(Math.pow(centerX-old_centerX,2)+Math.pow(centerY-old_centerY,2));
		
		if((distance>=0)&&(distance<=25)){
			accuracy=100;
		}
		else if((distance>25)&&(distance<=50)){
			accuracy=95;
		}
		else if((distance>50)&&(distance<=75)){
			accuracy=90;
		}
		else if((distance>75)&&(distance<=100)){
			accuracy=80;
		}
		else if((distance>100)&&(distance<=125)){
			accuracy=70;
		}
		else if((distance>125)&&(distance<=150)){
			accuracy=65;
		}
		else if((distance>150)&&(distance<=175)){
			accuracy=55;
		}
		else if((distance>175)&&(distance<=200)){
			accuracy=50;
		}
		else if((distance>200)&&(distance<=225)){
			accuracy=45;
		}
		else if((distance>225)&&(distance<=250)){
			accuracy=40;
		}
		else if((distance>250)&&(distance<=300)){
			accuracy=30;
		}
		else if((distance>300)&&(distance<=400)){
			accuracy=20;
		}
		else if((distance>400)&&(distance<=500)){
			accuracy=10;
		}
		else{
			accuracy=0;
		}
	
		return accuracy;
	}
	
	function showCountry(id){
		var attributes={
			fill:"#000",
			stroke:"#fff",
			"stroke-width":1,
			"stroke-linejoin":"round"
		};
		
		var attributes1={
			fill:"#fff",
			stroke:"#fff",
			"stroke-width":1,
			"stroke-linejoin":"round"
		};
		
		var element=paper.path(africanStates[id-1].path);
		element.attr(attributes).transform(africanStates[id-1].transform);
		
		var originalElement=paper.path(africanStates[id-1].path);
		var boundingBox=originalElement.getBBox();
		var old_centerX=boundingBox.x+boundingBox.width/2;
		var old_centerY=boundingBox.y+boundingBox.height/2;
		
		var start=function(){
			this.ox=0;
			this.oy=0;
		};
		
		var move=function(dx,dy){
			var comp_x=2.5*dx;
			var comp_y=2.5*dy;
			var trans_x=comp_x-this.ox;
			var trans_y=comp_y-this.oy;
			
			this.translate(trans_x,trans_y);
			this.ox=comp_x;
			this.oy=comp_y;
		};
		
		var up=function(){
			originalElement.attr(attributes1);
			uiDisplayCountry.html(africanStates[id-1].name);
			boundingBox=this.getBBox();
			
			var move_centerX=boundingBox.x+boundingBox.width/2;
			var move_centerY=boundingBox.y+boundingBox.height/2;
			countryAccuracy=computeAccuracy(old_centerX,old_centerY,move_centerX,move_centerY);
			uiCountryAccuracy.html(countryAccuracy);
			this.remove();
			updateStatusArea(countryAccuracy);
			
			if(generatedArray.length==UPPERLIMIT){
				playGame=false;
				timeSpent=0;
				clearTimeout(scoreTimeout);
				uiScore.html(score);
				$(window).unbind("mousedown");
				uiStats.hide();
				uiComplete.show();
			}
			else{
				generatedNumber=numberGenerator.getNumber();
				displayCountry(generatedNumber);
			}
		};
		
		element.drag(move,start,up);
	}

	function updateStatusArea(countryAccuracy){
		numberOfMoves++;
		uiMoves.html(numberOfMoves);
		var newScore=countryAccuracy*10/100;
		newScore=Math.round(newScore);
		score=score+newScore;
		uiScore.html(score);
	}
	
	function displayCountry(id){
		countryName=getCountry(id);
		uiCountry.html(countryName);
		loadFlagImage(id);
		showCountry(id);
	}
	
	function drawAfrica(){
		var attributes={
			fill:"#000",
			stroke:"#000",
			"stroke-width":1,
			"stroke-linejoin":"round"
		};
		
		for(var country in paths){
			var element=paper.path(paths[country].path);
			element.attr(attributes);
			africanStates.push(paths[country]);
		}
	}
	
	function startGame(){
		uiStats.show();
		uiTime.html("0");
		playGame=false;
		timeSpent=0;
		clearTimeout(scoreTimeout);
		numberOfMoves=0;
		score=0;
		uiMoves.html(numberOfMoves);
		uiScore.html(score);
		paper.clear();
		africanStates=new Array();
		generatedArray=new Array();
		numberGenerator=new NumberGenerator;
		generatedNumber=numberGenerator.getNumber();
		drawAfrica();
		displayCountry(generatedNumber);
		
		$(window).mousedown(function(e){
			if(!playGame){
				playGame=true;timer();
			}
		});
	}
	
	function hideScreens(){
		uiStats.hide();
		uiComplete.hide();
	}
	
	function init(){
		hideScreens();
		uiPlay.click(function(e){
			e.preventDefault();
			uiIntro.hide();
			startGame();
		});
		
		uiReset.click(function(e){
			e.preventDefault();
			uiComplete.hide();
			startGame();
		});
	}

	init();
});