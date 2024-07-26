document.addEventListener('DOMContentLoaded', () => {
    const model = new GameModel();
    const view = new GameView();
    const controller = new GameController(model, view);

    view.initializeBoard();
});
