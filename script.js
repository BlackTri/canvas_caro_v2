var matrix = prompt("Type input >= 3");
while(matrix < 3){
    matrix = prompt("Type again value >= 3")
}
// draw the Gameboard
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = 10 + matrix * 50;
    canvas.height = 10 + matrix * 50;
    for (var i = 0; i < matrix; i++) {
        for (var j = 0; j < matrix; j++) {
            ctx.save();
            ctx.fillStyle = '#09F';
            ctx.translate(10 + j * 50, 10 + i * 50);
            ctx.strokeRect(0, 0, 45, 45);
            ctx.restore();
        }
    }
}
$(document).ready(function(){
    var turns = [];
    turns = fillToMatrix(turns, matrix);
    var player1Turn = "";
	var player2Turn = "";
	var gameOn = false;
    var count = 0;
    
    var startTurn = prompt("Choose Your Move", "Type X or O").toUpperCase();
    // Choice
    switch(startTurn){
        case "X":
			player2Turn = "O";
			player1Turn = "X";
			$("#message").html("Player 1 " + player1Turn + " gets to start!");
			break;
		case "O":
			player2Turn = "X";
			player1Turn = "O";
			$("#message").html("Player 1 " + player1Turn + " gets to start!");
			break;
		case null:
			alert("Sorry. Please type X or O");
			window.location.reload(true);
		break;
		default:
			alert("Sorry. Please type X or O");
			window.location.reload(true);
			break;
    }
    // Create 2D arr
    function fillToMatrix(arr, maxtrixLength){
        for(let i = 0; i < matrix; i++){
            arr[i] = new Array();
            for(let j = 0; j < matrix; j++){
                arr[i][j] = "#";
            }
        }
        return arr;
    }
    // Get Mouse Position and fill to turns arr;
    function getMousePos(event, currentPlayer, nextPlayer) {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var rect = canvas.getBoundingClientRect();
        
        x = event.clientX - rect.left;
        y = event.clientY - rect.top
        posX = Math.floor((x - 10) / 50);
        posY = Math.floor((y - 10) / 50);
        
        return {
            x: posX,
            y: posY
        }
    }
    function fillToTurns(arr, pos , currentPlayer, nextPlayer){
        return new Promise(function(resolve, reject){
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            if(arr[pos.x][pos.y] == "#"){
                count++;
                arr[pos.x][pos.y] = currentPlayer;
                $("#message").html("It's " + nextPlayer + "'s turn.");
                ctx.font = '48px serif';
                ctx.strokeText(currentPlayer, 10 + 5 + pos.x * 50, 10 + pos.y * 50 + 40);
            }
            resolve();
        });
    }
    
    // Win Condition
    function winCondition(trackMoves, currentMove, position){
        
        let pointColumn = 0;
        let pointRow = 0;
        let pointDiagonalTop = 0;
        let pointDiagonalBottom = 0;
        //Check column
        for(let i = 0 ; i < matrix; i++){
            if(trackMoves[position.x][i] == currentMove){
                pointColumn++;
            } else if (trackMoves[position.x][i]=="#"){

            } else if (pointColumn == 4){
                break;
            } else {
                pointColumn = 0;
            }
        }
        //Check row
        for(let i = 0 ; i < matrix; i++){
            if(trackMoves[i][position.y] == currentMove){
                pointRow++;
            } else if (trackMoves[i][position.y]=="#"){

            } else if (pointRow == 4){
                break;
            } else {
                pointRow = 0;
            }
        }
        //Check diagonal top
        let diagonalTop = getDiagonalTop(trackMoves,position);
        for(let i = 0 ; i < diagonalTop.length; i++){
            if(diagonalTop[i] == currentMove){
                pointDiagonalTop++;
            } else if(diagonalTop[i] == '#'){

            } else if(pointDiagonalTop == 4){
                break;
            } else {
                pointDiagonalTop = 0;
            }
        }
        //check diagonal bottom
        let diagonalBottom = getDiagonalBottom(trackMoves,position);
        for(let i = 0 ; i < diagonalBottom.length; i++){
            if(diagonalBottom[i] == currentMove){
                pointDiagonalBottom++;
            } else if(diagonalBottom[i] == '#'){

            } else if(pointDiagonalBottom == 4){
                break;
            } else {
                pointDiagonalBottom = 0;
            }
        }
        // check point to win
        if(matrix <= 3){
            if(pointColumn == matrix || pointRow == matrix || pointDiagonalTop == matrix || pointDiagonalBottom == matrix){
                alert(currentMove + ' wins.');
                reset();
            }
        } else {
            if(pointColumn == 4 || pointRow == 4 || pointDiagonalTop == 4 || pointDiagonalBottom == 4){
                alert(currentMove + ' wins.');
                reset();
            }
        }
        if(count == matrix * matrix){
            alert("It's a draw");
            reset();
        }
        
    }

    function getDiagonalTop(tracksMove,position){
        let arr = [];
        for(let i = 3; i >= 0; i--){
            if((position.x - i) >= 0 && (position.y -i) >= 0){
                arr.push(tracksMove[position.x -i][position.y - i]);
            }
        }
        for(let i = 1; i < 4; i++){
            if((position.x + i) <= (matrix-1) && (position.y + i) <= (matrix - 1)){
                arr.push(tracksMove[position.x + i][position.y + i]);
            }
        }
        return arr;
    }
    function getDiagonalBottom(trackMoves, position){
        let arr = [];
        for( let i = 3; i >= 0; i--){
            if((position.x - i) >= 0 && (position.y +i) <= (matrix -1)){
                arr.push(trackMoves[position.x -i][position.y + i]);
            }
        }
        for(let i = 1; i < 4; i++){
            if((position.x + i) <= (matrix-1) && (position.y - i) >= 0 ){
                arr.push(trackMoves[position.x + i][position.y - i]);
            }
        }
        return arr;
    }
    //Reset Gameboard
    function reset(){
        turns = [];
        turns = fillToMatrix(turns, matrix);
        count = 0;
        draw();
    }

    // Onclick();
    $("#reset").click(function(){
        reset();
    })
    $("#canvas").click(function(event){
        if((count % 2) == 0){
            var pos = getMousePos(event);
            fillToTurns(turns, pos, player1Turn, player2Turn).then(function(){
                setTimeout(function(){
                    winCondition(turns,player1Turn, pos);
                },0);
            });
        } else if((count % 2) == 1){
            var pos = getMousePos(event);
            fillToTurns(turns, pos, player2Turn, player1Turn).then(function(){
                setTimeout(function(){
                    winCondition(turns, player2Turn, pos);
                },0);
            });
        }
        console.log(count);
    });
});