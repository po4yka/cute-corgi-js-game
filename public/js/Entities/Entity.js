class Entity {
    name = "";
    type = "";
    pos_x = 0;
    pos_y = 0;
    gameManager = null;

    constructor(type, name, pos_x, pos_y, gameManager) {
        this.gameManager = gameManager;
        this.type = type;
        this.name = name;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
    }
}
