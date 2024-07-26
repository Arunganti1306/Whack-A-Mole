class GameModel {
    constructor() {
        this.score = 0;
        this.time = 30;
        this.board = Array.from({ length: 12 }, (v, i) => ({ id: i, hasMole: false, hasSnake: false }));
        this.timerInterval = null;
        this.moleInterval = null;
        this.snakeInterval = null;
        this.isActive = false; // Add a flag to track game state
    }

    resetGame() {
        this.score = 0;
        this.time = 30;
        this.isActive = true; // Set the game as active when it starts
        this.board.forEach(block => {
            block.hasMole = false;
            block.hasSnake = false;
        });
    }

    startTimer(callback, endGameCallback) {
        this.timerInterval = setInterval(() => {
            this.time -= 1;
            callback(this.time);
            if (this.time <= 0) {
                this.stopIntervals();
                this.isActive = false; // Set the game as inactive when it ends
                callback(0); // Ensure the time is set to 0
                endGameCallback(); // Call endGameCallback to handle the game end
            }
        }, 1000);
    }

    stopIntervals() {
        clearInterval(this.timerInterval);
        clearInterval(this.moleInterval);
        clearInterval(this.snakeInterval);
        this.timerInterval = null;
        this.moleInterval = null;
        this.snakeInterval = null;
    }

    generateMole(callback) {
        this.moleInterval = setInterval(() => {
            if (this.board.filter(block => block.hasMole).length < 3) {
                let randomBlock = Math.floor(Math.random() * 12);
                if (!this.board[randomBlock].hasMole && !this.board[randomBlock].hasSnake) {
                    this.board[randomBlock].hasMole = true;
                    callback(randomBlock, 'mole', true);
                    setTimeout(() => {
                        if (this.board[randomBlock].hasMole) {
                            this.board[randomBlock].hasMole = false;
                            callback(randomBlock, 'mole', false);
                        }
                    }, 2000);
                }
            }
        }, 1000);
    }

    generateSnake(callback) {
        this.snakeInterval = setInterval(() => {
            // Clear previous snake
            this.board.forEach(block => block.hasSnake = false);
            callback(null, 'snake', false);

            let randomBlock = Math.floor(Math.random() * 12);
            this.board[randomBlock].hasSnake = true;
            callback(randomBlock, 'snake', true);
        }, 2000);
    }

    removeMole(blockId) {
        this.board[blockId].hasMole = false;
    }

    increaseScore() {
        if (this.isActive) { // Only increase score if the game is active
            this.score += 1;
        }
    }
}
