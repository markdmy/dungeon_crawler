class sceneMenu extends Phaser.Scene {
    constructor() {
        super("sceneMenu");
    }
    create() {

        this.bg = this.add.sprite(0, 0, 'bgMenu').setOrigin(0).setDepth(0);
        this.bgRabbit = this.add.sprite(-50, 100, 'bgMenuRabbit').setOrigin(0).setDepth(0);
        this.bgFrog = this.add.sprite(0, 100, 'bgMenuFrog').setOrigin(0).setDepth(0);
 
        this.title = this.add.text(470, 151, 'Leapbound: Bunny\'s Journey', {
            fontSize: '50px',
            fill: '#fff',
            fontFamily: 'pixeloid, "Goudy Bookletter 1911", Times, serif'
        }).setOrigin(0.5);


        this.titleStart = this.add.text(470, 271, 'Use Arrow Keys to Move.\n        Click to Start', {
            fontSize: '30px',
            fill: '#fff',
            fontFamily: 'pixeloid, "Goudy Bookletter 1911", Times, serif'
        }).setOrigin(0.5);

        this.credits = this.add.text(180, 621, 'By: Mark Dmytryshyn', {
            fontSize: '30px',
            fill: '#fff',
            fontFamily: 'pixeloid, "Goudy Bookletter 1911", Times, serif'
        }).setOrigin(0.5);

        this.bgFrog.alpha = 0;
        this.tweens.add({
            targets: this.bgFrog,
            alpha: 0.4,
            ease: 'Sine.InOut',
            duration: 4000,
            delay: 2000
        });

        this.bgRabbit.alpha = 0;
        this.tweens.add({
            targets: this.bgRabbit,
            alpha: 0.6,
            ease: 'Sine.InOut',
            duration: 7000,
            delay: 3000
        });

        this.title.alpha = 0;
        this.tweens.add({
            targets: this.title,
            alpha: 1,
            ease: 'Sine.InOut',
            duration: 2000
        });

        this.titleStart.alpha = 0;
        this.tweens.add({
            targets: this.titleStart,
            alpha: 1,
            ease: 'Sine.InOut',
            duration: 2000,
            delay: 1000 // Delay before the tween starts (in milliseconds)
        });

        this.credits.alpha = 0;
        this.tweens.add({
            targets: this.credits,
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
