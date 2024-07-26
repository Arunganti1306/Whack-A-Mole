class GameView {
    constructor() {
        this.scoreCounter = document.getElementById('score-counter');
        this.timer = document.getElementById('timer');
        this.gameBoard = document.getElementById('game-board');
        this.startButton = document.getElementById('start-button');
        this.blocks = [];
    }

    initializeBoard() {
        for (let i = 0; i < 12; i++) {
            const block = document.createElement('div');
            block.className = 'block';
            block.dataset.id = i;
            const mole = document.createElement('img');
            mole.src = 'public/images/mole.jpg';
            mole.className = 'mole';
            block.appendChild(mole);
            this.gameBoard.appendChild(block);
            this.blocks.push(block);
        }
    }

    updateScore(score) {
        this.scoreCounter.textContent = `Let's Go, your total score is ${score}`;
    }

    updateTime(time) {
        this.timer.textContent = time;
    }

    showMole(blockId) {
        this.blocks[blockId].querySelector('.mole').classList.add('visible');
    }

    hideMole(blockId) {
        this.blocks[blockId].querySelector('.mole').classList.remove('visible');
    }

    resetBoard() {
        this.blocks.forEach(block => {
            this.hideMole(block.dataset.id);
        });
    }

    disableStartButton() {
        this.startButton.disabled = true;
    }

    enableStartButton() {
        this.startButton.disabled = false;
    }
}
