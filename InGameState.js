
var InGameState = function(){
    var gameMode = getGameInstance();
    this.name = "InGame";
    var matrix  = Game.matrixLength;
    var turns = [];
    var player1Turn = "";
    var player2Turn = "";
    var gameOn = false;
    var count = 0;

    this.onEnter = function(){
        var startTurn = prompt("Choose Your Move", "Type X or O").toUpperCase();
        choice(startTurn);
        turns = fillToMatrix(turns, parseInt(Game.matrixLength));
    };


    this.update = function(){
        $("canvas").click(function(event){
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
    };


    this.render = function(){
        if(gameOn == true){
            gameMode.pop();
            $("canvas").remove();
            // setupCanvas()(Game.matrixLength);
            gameMode.push(new StateSetup());
            gameOn = false;
        }
    };


    this.onExit = function(){
        console.log('Exit');
        // setupCanvas()(Game.matrixLength);
        turns = [];
        turns = fillToMatrix(turns, matrix);
        count = 0;
    };

    /*
    * Function
    */
    function choice(startTurn){
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
    };
    function fillToMatrix(arr, maxtrixLength){
        for(let i = 0; i < maxtrixLength; i++){
            arr[i] = new Array();
            for(let j = 0; j < maxtrixLength; j++){
                arr[i][j] = "#";
            }
        }
        return arr;
    };
    function getMousePos(event) {
        var canvas = document.getElementsByTagName('canvas')[0];
        // var ctx = canvas.getContext('2d');
        var rect = canvas.getBoundingClientRect();
        
        x = event.clientX - rect.left;
        y = event.clientY - rect.top
        posX = Math.floor((x - 10) / 50);
        posY = Math.floor((y - 10) / 50);
        
        return {
            x: posX,
            y: posY
        }
    };
    function fillToTurns(arr, pos , currentPlayer, nextPlayer){
        return new Promise(function(resolve, reject){
            var canvas = document.getElementsByTagName('canvas')[0];
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
    };
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
                gameOn = true;
            }
        } else {
            if(pointColumn == 4 || pointRow == 4 || pointDiagonalTop == 4 || pointDiagonalBottom == 4){
                alert(currentMove + ' wins.');
                gameOn = true;
            }
        }
        if(count == matrix * matrix){
            alert("It's a draw");
            gameOn = true;
        }
    };
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
}

