var StateSetup = function(){
    var clicked = false;
    var gameMode = getGameInstance();
    
    this.onEnter = function(){
        //setupCanvas()(5);
        $("#message").html("Choose the size");
    };
    this.update = function(){
        if(clicked == false){
            $("#submitBtn").click(function(){
                clicked = true;
            });
        }
        console.log("update");
    }
    this.render = function(){
        console.log("render");
        if(clicked == true){
            Game.matrixLength = $("#matrixInput").val();
            setupCanvas()(Game.matrixLength);
            gameMode.pop();
            gameMode.push(new InGameState());
        }
    };
    this.onExit = function(){
        console.log("exit");
        var setupEmlement = document.getElementById("setup");
        setupEmlement.innerHTML = '';
    };
}