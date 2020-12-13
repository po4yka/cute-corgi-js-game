class Player extends Entity {
    fireBlock = false;
    impulse = 0;
    lifetime = 0;
    move_x = 0;
    move_y = 0;
    size_x = 0;
    size_y = 0;
    speed = 2;
    lastSpriteType = "Player_idle_right"; //  save prev direction
    currentSpriteType = null;
    score = 0;

    constructor(lifetime, type, name, pos_x, pos_y, gameManager) {
        super(type, name, pos_x, pos_y, gameManager);
        // Because player character has several possible posisitions, there aren't
        // just "Player" sprite. Consider start sprite is idle in right direction 
        let sprite = this.gameManager.spriteManager.getSprite(`${this.type}_idle_right`);
        this.currentSpriteType = this.type;
        this.size_x = sprite.w;
        this.size_y = sprite.h;
        this.lifetime = lifetime;
    }

    /**
     * Draw object.
     * Also based on direction of movement.
     */
    draw() {
        this.currentSpriteType = this.type;
        this.currentSpriteType += "_idle";
        if (this.move_x < 0) {
            this.currentSpriteType += "_left";
            this.lastSpriteType = this.currentSpriteType;
        }
        if (this.move_x > 0) {
            this.currentSpriteType += "_right";
            this.lastSpriteType = this.currentSpriteType;
        }
        if(this.move_x === 0) {
            this.currentSpriteType = this.lastSpriteType;
        }
        // console.log(`Drawing Player: ${this.currentSpriteType}`);
        this.gameManager.spriteManager.drawSprite(
            this.currentSpriteType,
            this.pos_x,
            this.pos_y
        );
    }

    update() {
        this.gameManager.physicManager.update(this);
    }

    onTouchEntity(obj) {
        if (obj.type === "BonusDuck") {
            this.gameManager.soundsManager.playSound("bonus");
            this.gameManager.addScore(50);
            obj.kill();
        }
        if (obj.type === "Enemy") {
            this.kill();
        }
    }

    /**
     * Handle obstacle meet
     * @param {*} tileset 
     */
    onTouchMap(tileset) {
        if (tileset === LAVA_TILE_ID) {
            console.log('LAVE_TILE was triggered');
            this.kill(false);
        }
        if (tileset === EXIT_TILE_ID_1 || tileset === EXIT_TILE_ID_2) {
            console.log('EXIT_TILE was triggered');
            this.kill(true);
            this.gameManager.goToNextLevel();
        }
    }

    kill(goNextLevel) {
        // destroy this
        if (goNextLevel === true) {
            this.gameManager.kill(this, goNextLevel);
            this.gameManager.soundsManager.playSound("next level");
        } else {
            this.gameManager.soundsManager.playSound("hero death");
            this.gameManager.kill(this);
        }
    }

    fire() {
        if (this.fireBlock) return;

        let heartMove_x = this.move_x;
        let heartMove_y = this.move_y;
        let heartName = "Heart_" + ++this.gameManager.fireNum;
        let heart = new Heart(
            "Heart",
            heartName,
            heartMove_x,
            heartMove_y,
            0,
            0,
            this.gameManager
        );
        switch (this.move_x + 2 * this.move_y) {
            case -1:
                heart.pos_x = this.pos_x - heart.size_x;
                heart.pos_y = this.pos_y + heart.size_y / 2;
                this.gameManager.soundsManager.playSound("pew");
                break;
            case 1:
                heart.pos_x = this.pos_x + this.size_x;
                heart.pos_y = this.pos_y + heart.size_y / 2;
                this.gameManager.soundsManager.playSound("pew");
                break;
            default:
                return;
        }
        this.fireBlock = true;
        let self = this;
        setTimeout(function () {
            self.fireBlock = false;
        }, 500);
        this.gameManager.entities.push(heart);
    }
}