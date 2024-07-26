class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.startButton.addEventListener('click', () => this.startGame());
        this.view.gameBoard.addEventListener('click', (e) => this.handleBlockClick(e));
    }

    startGame() {
        if (this.model.timerInterval || this.model.moleInterval || this.model.snakeInterval) return; // Prevent starting a new game if one is already running

        this.model.stopIntervals(); // Stop any existing game intervals
        this.model.resetGame();
        this.view.resetBoard(); // Clear the game board of any moles or snakes
        this.view.updateScore(this.model.score);
        this.view.updateTime(this.model.time);
        this.view.disableStartButton(); // Disable the start button

        this.model.startTimer(
            time => this.view.updateTime(time),
            () => this.endGame()
        );

        this.model.generateMole((blockId, type, show = true) => this.view.updateBlock(blockId, type, show));
        this.model.generateSnake((blockId, type, show = true) => this.view.updateBlock(blockId, type, show));
    }

    handleBlockClick(event) {
        const blockId = event.target.closest('.block')?.dataset.id;
        if (blockId !== undefined && this.model.isActive) { // Check if the game is active
            if (this.model.board[blockId].hasMole) {
                this.model.removeMole(blockId);
                this.model.increaseScore();
                this.view.updateScore(this.model.score);
                this.view.updateBlock(blockId, 'mole', false);
            }
            if (this.model.board[blockId].hasSnake) {
                this.model.isActive = false; // Set game as inactive
                this.model.stopIntervals(); // Stop all intervals
                this.model.board.forEach((block, id) => {
                    block.hasMole = false;
                    block.hasSnake = true;
                    this.view.updateBlock(id, 'mole', false);
                    this.view.updateBlock(id, 'snake', true);
                });
                this.endGame(false); // End the game without showing a popup
            }
        }
    }

    endGame(showAlert = true) {
        this.model.stopIntervals();
        this.view.enableStartButton(); // Re-enable the start button
        if (showAlert) {
            alert('Game Over! Time is Over!');
        }
    }
}
