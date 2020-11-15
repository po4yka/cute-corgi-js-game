class Enemy extends Entity {
    impulse = 0;

    lifetime = 0;
    move_x = 1;
    move_y = 0;
    speed = 1;

    constructor(lifetime, type, name, pos_x, pos_y, gameManager) {
        // console.log('Enemy constructor was called');
        super(type, name, pos_x, pos_y, gameManager);
        let sprite = this.gameManager.spriteManager.getSprite(this.type);
        this.size_x = sprite.w;
        this.size_y = sprite.h;
        this.lifetime = lifetime;
        this.currentSpriteType = this.type;
    }

    draw() {
        // console.log(`Drawing Enemy: ${this.currentSpriteType}`);
        this.gameManager.spriteManager.drawSprite(
            this.currentSpriteType,
            this.pos_x,
            this.pos_y
        );
    }

    onTouchMap() {
        this.move_x = this.move_x * -1;
    }

    /**
     * Rotate direction of enemy moving
     */
    rotate() {
        console.log('Enemy rotate method was called');
        if (this.currentSpriteType === this.type) {
            this.currentSpriteType = this.type + "_right";
        } else {
            this.currentSpriteType = this.type;
        }
    }

    update() {
        this.gameManager.physicManager.update(this);
    }

    onTouchEntity(obj) {
        // collide entities handle
        if (obj.type === "Player") {
            obj.kill();
        } else if (obj.type === "Enemy" || obj.type === "BonusDuck") {
            if (this.move_x > 0) {
                this.currentSpriteType = this.type + "_right";
                this.move_x = this.move_x * -1;
            } else {
                this.currentSpriteType = this.type;
                this.move_x = this.move_x * -1;
            }
        } else {
            this.move_x = this.move_x * -1;
        }
    }

    kill() {
        this.gameManager.soundsManager.playSound("enemy death");
        this.gameManager.kill(this);
    }

    fire() {
        // Possible attack
    }
}