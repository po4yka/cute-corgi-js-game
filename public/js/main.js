const EMPTY_SPACE_ID = 11;
const LAVA_TILE_ID = 12;
const EXIT_TILE_ID_1 = 7;
const EXIT_TILE_ID_2 = 9;

function startGame() {
    console.info('GAME STARTED');

    let canvas = document.getElementById("gameCanvas");

    let infoBlock = document.getElementById("game-info");
    let infoWindow = document.getElementById("game-info-block");
    let scoreElem = document.getElementById("score");
    let hideMePlz = document.getElementById("interact-with-page");

    gameManager = new GameManager(
        canvas,
        ["/levels/lvl_1.json", "/levels/lvl_2.json", "/levels/lvl_3.json"],
        "/sprites/sprites.json",
        "/img/spritesheet.png",
        scoreElem,
        infoBlock,
        infoWindow,
        hideMePlz
    );
}
