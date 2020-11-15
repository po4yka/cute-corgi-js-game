class SpriteManager {
    image = new Image();
    sprites = new Array();
    imgLoaded = false;
    jsonLoaded = false;
    gameManager = null;

    constructor(atlasJSON, atlasImg, gameManager) {
        this.gameManager = gameManager;
        let self = this;
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                self.parseAtlas(request.responseText);
            }
        };
        request.open("GET", atlasJSON, true);
        request.send();
        self.loadImg(atlasImg);
    }

    loadImg(imgName) {
        let self = this;
        self.image.onload = function () {
            self.imgLoaded = true;
        };
        this.image.src = imgName;
    }

    parseAtlas(atlasJSON) {
        let atlas = JSON.parse(atlasJSON);
        for (let name in atlas.frames) {
            let frame = atlas.frames[name].frame;
            this.sprites.push({
                name: name,
                x: frame.x,
                y: frame.y,
                w: frame.w,
                h: frame.h,
            });
        }
        this.jsonLoaded = true;
    }

    drawSprite(name, x, y) {
        // console.log('drawsprite() was called');
        let self = this;
        if (!self.imgLoaded || !self.jsonLoaded) {
            setTimeout(function () {
                self.drawSprite(self.gameManager.ctx, name, x, y);
            }, 100);
        } else {
            // console.log(`Getting sprite with name: ${name}`);
            let sprite = self.getSprite(name);
            if (sprite === null) {
                console.error(`Sprite with name: ${name} doesn't exists!`);
                return;
            }
            if (
                !self.gameManager.mapManager.isVisible(x, y, sprite.w, sprite.h)
            )
                return;

            x -= self.gameManager.mapManager.view.x;
            y -= self.gameManager.mapManager.view.y;
            // console.log('drawImage from SpriteManager was called');
            self.gameManager.ctx.drawImage(
                self.image,
                sprite.x,
                sprite.y,
                sprite.w,
                sprite.h,
                x,
                y,
                sprite.w,
                sprite.h
            );
        }
    }

    getSprite(name) {
        // console.log(`getting sprite with name: ${name}`);
        for (let i = 0; i < this.sprites.length; i++) {
            let sprite = this.sprites[i];
            if (sprite.name === name) {
                // console.log("Sprite was found!");
                return sprite;
            }
        }
        return null;
    }
}
