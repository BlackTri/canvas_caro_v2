var Game = {
    // Canvas to draw on
    matrixLength : 0,
    // The game loop
    FPS: 30,
    timer:null,
    timerID: null, // interval


    gameMode: new StateStack(),

    update: function () {
        this.gameMode.update();
        this.gameMode.render();
    },


    startGame: function() {
        this.gameMode.push(new StateSetup());
        this.timerID = setInterval(this.update.bind(this),this.timer);
    },

    pauseGame:function (){
        clearInterval(this.timerID);
    },

    resumeGame: function (){
        this.timerID = setInterval(this.update.bind(this),this.timer);
    },
    /**
     * Initialize the canvas to the page
     */
    
    setupCanvas: function (matrix) {
        var canvasElement = document.createElement("canvas");
        canvasElement.width = 10 + matrix * 50;
        canvasElement.height = 10 + matrix * 50;
        console.log(canvasElement, matrix);
        var canvas = canvasElement.getContext("2d");

        for (var i = 0; i < matrix; i++) {
            for (var j = 0; j < matrix; j++) {
                canvas.save();
                canvas.fillStyle = '#09F';
                canvas.translate(10 + j * 50, 10 + i * 50);
                canvas.strokeRect(0, 0, 45, 45);
                canvas.restore();
            }
        }
        document.body.appendChild(canvasElement);
    },
    init: function () {
        this.timer = 1000/this.FPS;
        this.startGame();
    },
}
window.onload = function () {
    window.getGameInstance = function () {
        return Game.gameMode;
    };
    window.setupCanvas = function(){
        return Game.setupCanvas;
    }
    Game.init();
}