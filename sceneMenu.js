class sceneMenu extends Phaser.Scene {
    constructor() {
        super("sceneMenu");
    }
    create() {

        this.title = this.add.text(21, 300, 'Working Title: click to start', {
            fontSize: '34px',
            fill: '#fff', fontFamily: 'Trebuchet MS, "Goudy Bookletter 1911", Times, serif'
        }).setOrigin(0);
    }

    update() {
        this.input.on('pointerdown', function () {
            this.scene.switch('scene1');
        }, this);

    }
}
