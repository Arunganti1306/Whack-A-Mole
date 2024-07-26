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
            const snake = document.createElement('img');
            snake.src = 'public/images/snake.jpg';
            snake.className = 'snake';
            block.appendChild(mole);
            block.appendChild(snake);
            this.gameBoard.appendChild(block);
            this.blocks.push(block);
        }
    }

    updateScore(score) {
        this.scoreCounter.textContent = `Let's Go, your total score is ${score}`;
    }

    updateTime(time) {
        this.timer.innerHTML = `<b>Timer left:</b><br>${time}`;
    }

    updateBlock(blockId, type, show = true) {
        if (blockId !== null) {
            const block = this.blocks[blockId];
            const element = block.querySelector(`.${type}`);
            if (show) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        } else {
            this.blocks.forEach(block => {
                const element = block.querySelector(`.${type}`);
                element.classList.remove('visible');
            });
        }
    }

    resetBoard() {
        this.blocks.forEach(block => {
            this.updateBlock(block.dataset.id, 'mole', false);
            this.updateBlock(block.dataset.id, 'snake', false);
        });
    }

    disableStartButton() {
        this.startButton.disabled = true;
    }

    enableStartButton() {
        this.startButton.disabled = false;
    }
}
