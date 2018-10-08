window.onload = initAll;
//array of all possible values 1-75 
var usedNums = new Array(76); 

function initAll() {
	//checks to see if browser is smart enough
	if(document.getElementById){
		document.getElementById("reload").onclick = anotherCard; 
		newCard(); 
	}
	else{
		alert("Sorry, your browser doesn't support this script"); 
	}
}
//function that creates new board
function newCard() {
	for(var i = 0; i < 24; i++) {
		setSquare(i); 
	}
}
//initialized each square with a number 
function setSquare(thisSquare) {
	var currentSquare = "square" + thisSquare; 
	//array that represents the board
	var colPlace = new Array(0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,4); 
	var colBasis = colPlace[thisSquare] * 15;  
	var newNum; 
	do {
		newNum = colBasis + getNewNum() + 1; 
	}
	while(usedNums[newNum]);

	usedNums[newNum] = true; 
	document.getElementById(currentSquare).innerHTML = newNum; 

	document.getElementById(currentSquare).className = ""; 
	document.getElementById(currentSquare).onmousedown = toggleColor; 
}
//generates random number
function getNewNum(){
	return Math.floor(Math.random() * 15); 
}
//resets board
function anotherCard() {
	for(var i = 1; i < usedNums.length; i++){
		usedNums[i] = false; 
	}
	newCard(); 
	//stop processing the user's click so the href page doesn't get loaded. 
	return false; 
}
//event handler
function toggleColor(evt){
	if(evt){
		var thisSquare = evt.target; 
	}
	else {//for IE
		var thisSquare = window.event.srcElement; 
	}
	//check the calss attribute has a value
	if(thisSquare.className == "") {
		thisSquare.className = "pickedBG"; 
	}
	else {//toggle class attribute to empty 
		thisSquare.className = ""; 
	}
	checkWin(); 
}
//checks win on the board
function checkWin() {
	//stores which of the possible winning options the user has hit (if any)
	var winningOption = -1; 
	//stores which square have been clicked
	var setSquares = 0; 
	//encoded value of a possible winning line
	var winners = new Array(31,992,15360,507904,541729,557328,1083458,2162820,4329736,8519745,8659472,16252928);
	//checks if number has already been called
	for(var i = 0; i < 24; i++){
		var currentSquare = "square"+i; 
		if(document.getElementById(currentSquare).className != "") {
			document.getElementById(currentSquare).className = "pickedBG"; 
			//bitwise  arithmetic
			setSquares = setSquares | Math.pow(2, i); 
		}
	} 
	//check winning state
	for(var i = 0; i < winners.length; i++){
		//bitwise & between winning state and current state that 
		//results in in a new state that only has true values for each
		//square that is in both of the two 
		if((winners[i] & setSquares) == winners[i]){
			winningOption = i; 
		}
	}
	if(winningOption > -1){
		for(var i = 0; i < 24; i++){
			if(winners[winningOption] & Math.pow(2, i)){
				currentSquare = "square" + i; 
				document.getElementById(currentSquare).className = "winningBG"; 
			}
		}
	}
}