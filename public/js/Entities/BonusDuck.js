class BonusDuck extends Entity {
    impulse = 0;
    speed = 1;
    move_x = 0;
    move_y = 0;

    constructor(lifetime, type, name, pos_x, pos_y, gameManager) {
        super(type, name, pos_x, pos_y, gameManager);
        let sprite = this.gameManager.spriteManager.getSprite(this.type);
        this.size_x = sprite.w;
        this.size_y = sprite.h;
    }

    draw() {
        this.gameManager.spriteManager.drawSprite(
            this.type,
            this.pos_x,
            this.pos_y
        );
    }

    update() {
        this.gameManager.physicManager.update(this);
    }

    kill() {
        this.gameManager.kill(this);
    }
}
