class sceneMenu extends Phaser.Scene {
    constructor() {
        super("sceneMenu");
    }
    create() {

        this.bg = this.add.sprite(0, 0, 'bgMenu').setOrigin(0).setDepth(0);
        this.title = this.add.text(470, 151, 'The Bunny and Frog are Friends: The Game', {
            fontSize: '45px',
            fill: '#fff',
            fontFamily: 'Trebuchet MS, "Goudy Bookletter 1911", Times, serif'
        }).setOrigin(0.5);

        this.title.alpha = 0;
        this.tweens.add({
            targets: this.title,
            alpha: 1,
            ease: 'Sine.InOut',
            duration: 2000
        });

        this.title = this.add.text(470, 261, 'Click to Start', {
            fontSize: '33px',
            fill: '#fff',
            fontFamily: 'Trebuchet MS, "Goudy Bookletter 1911", Times, serif'
        }).setOrigin(0.5);

        this.title.alpha = 0;
        this.tweens.add({
            targets: this.title,
            alpha: 1,
            ease: 'Sine.InOut',
            duration: 2000,
            delay: 1000 // Delay before the tween starts (in milliseconds)
        });

    }

    update() {
        this.input.on('pointerdown', function () {
            this.scene.switch('scene1');
        }, this);

    }
}
