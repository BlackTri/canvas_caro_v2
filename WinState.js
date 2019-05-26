var WinState = function(){
    var gameMode = getGameInstance();
    this.onEnter = function(){
        alert("winstate");
    };
    this.update = function(){
        
    };
    this.render = function(){
        gameMode.pop();
        gameMode.push(new InGameState());
    };
    this.onExit = function(){
        alert("exit win");
    }
}