class SoundsManager {
    heroDeathSound = null;
    enemyDeathSound = null;
    nextLevelSound = null;
    shotSound = null;
    themeSound = null;
    gameManager = null;
    bonusSound = null;

    constructor(gameManager) {
        this.gameManager = gameManager;
        this.heroDeathSound = new Audio("/sounds/hero-death-sound.mp3");
        this.enemyDeathSound = new Audio("/sounds/enemy-death-sound.mp3");
        this.nextLevelSound = new Audio("/sounds/next-level-sound.mp3");
        this.shotSound = new Audio("/sounds/shot-sound.mp3");
        this.themeSound = new Audio("/sounds/theme-sound.mp3");
        this.bonusSound = new Audio("/sounds/bonus-sound.mp3");
        let self = this;
        this.themeSound.addEventListener(
            "canplaythrough",
            function () {
                self.toggleMainTheme();
            },
            false
        );
    }

    playSound(name) {
        switch (name) {
            case "pew":
                this.shotSound.currentTime = 0;
                this.shotSound.volume = 0.5;
                this.shotSound.play();
                setTimeout(() => {
                    this.shotSound.stop();
                }, 1000);
                break;

            case "hero death":
                this.heroDeathSound.currentTime = 0;
                this.heroDeathSound.volume = 0.5;
                this.heroDeathSound.play();
                setTimeout(() => {
                    this.heroDeathSound.stop();
                }, 1000);
                
                break;

            case "enemy death":
                this.enemyDeathSound.currentTime = 0;
                this.enemyDeathSound.volume = 1;
                this.enemyDeathSound.play();
                setTimeout(() => {
                    this.enemyDeathSound.stop();
                }, 1000);
                break;

            case "next level":
                this.nextLevelSound.currentTime = 0;
                this.nextLevelSound.volume = 0.5;
                this.nextLevelSound.play();
                setTimeout(() => {
                    this.nextLevelSound.stop();
                }, 1000);
                break;

            case "bonus":
                this.bonusSound.currentTime = 0;
                this.bonusSound.volume = 0.5;
                this.bonusSound.play();
                setTimeout(() => {
                    this.bonusSound.stop();
                }, 1000);
                break;

            default:
                break;
        }
    }

    toggleMainTheme() {
        if (this.themeSound.paused) {
            this.themeSound.loop = true;
            this.themeSound.play();
        } else {
            this.themeSound.pause();
        }
    }
}
