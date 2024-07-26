class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.startButton.addEventListener('click', () => this.startGame());
        this.view.gameBoard.addEventListener('click', (e) => this.handleBlockClick(e));
    }

    startGame() {
        if (this.model.timerInterval || this.model.moleInterval) return; 

        this.model.stopIntervals(); 
        this.model.resetGame();
        this.view.resetBoard();
        this.view.updateScore(this.model.score);
        this.view.updateTime(this.model.time);
        this.view.disableStartButton();

        this.model.startTimer(
            time => this.view.updateTime(time),
            () => this.endGame()
        );

        this.model.generateMole(blockId => this.view.showMole(blockId));
    }

    handleBlockClick(event) {
        const blockId = event.target.closest('.block')?.dataset.id;
        if (blockId !== undefined) {
            if (this.model.board[blockId].hasMole) {
                this.model.removeMole(blockId);
                this.model.increaseScore();
                this.view.updateScore(this.model.score);
                this.view.hideMole(blockId);
            }
        }
    }

    endGame() {
        this.model.stopIntervals();
        this.view.enableStartButton(); 
        alert('Time is Over!');
    }
}
