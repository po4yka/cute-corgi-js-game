class Heart extends Entity {
    move_x = 0;
    move_y = 0;
    speed = 4;
    rotateInterval = null;
    spriteType = null;

    constructor(name, type, move_x, move_y, pos_x, pos_y, gameManager) {
        super(name, type, pos_x, pos_y, gameManager);
        let sprite = this.gameManager.spriteManager.getSprite(this.type);
        this.size_x = sprite.w;
        this.size_y = sprite.h;
        this.move_x = move_x;
        this.move_y = move_y;
        this.spriteType = this.type;
        let self = this;
        let spriteCounter = 0;
        this.rotateInterval = setInterval(function () {
            spriteCounter++;
            if (spriteCounter === 0) {
                self.spriteType = "Heart";
            } else {
                self.spriteType = `Heart_${spriteCounter}`;
            }
            if (spriteCounter === 3) {
                spriteCounter = 0;
            }
        }, 100);
    }

    draw() {
        this.gameManager.spriteManager.drawSprite(
            this.spriteType,
            this.pos_x,
            this.pos_y
        );
    }

    update() {
        this.gameManager.physicManager.update(this);
    }

    onTouchEntity(obj) {
        if (
            obj.type === "Enemy" ||
            obj.type === "Player" ||
            obj.type === "Heart"
        ) {
            this.gameManager.addScore(25);
            obj.kill();
        }
        this.kill();
    }

    onTouchMap(idx) {
        this.kill();
    }

    kill() {
        this.gameManager.kill(this);
    }
}