class GameModel {
    constructor() {
        this.score = 0;
        this.time = 30;
        this.board = Array.from({ length: 12 }, (v, i) => ({ id: i, hasMole: false }));
        this.timerInterval = null;
        this.moleInterval = null;
    }

    resetGame() {
        this.score = 0;
        this.time = 30;
        this.board.forEach(block => block.hasMole = false);
    }

    startTimer(callback, endGameCallback) {
        this.timerInterval = setInterval(() => {
            this.time -= 1;
            callback(this.time);
            if (this.time <= 0) {
                this.stopIntervals();
                callback(0); 
                endGameCallback();
            }
        }, 1000);
    }

    stopIntervals() {
        clearInterval(this.timerInterval);
        clearInterval(this.moleInterval);
        this.timerInterval = null;
        this.moleInterval = null;
    }

    generateMole(callback) {
        this.moleInterval = setInterval(() => {
            if (this.board.filter(block => block.hasMole).length < 3) {
                let randomBlock = Math.floor(Math.random() * 12);
                if (!this.board[randomBlock].hasMole) {
                    this.board[randomBlock].hasMole = true;
                    callback(randomBlock);
                }
            }
        }, 1000);
    }

    removeMole(blockId) {
        this.board[blockId].hasMole = false;
    }

    increaseScore() {
        this.score += 1;
    }
}
