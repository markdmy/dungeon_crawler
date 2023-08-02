class scene4 extends Phaser.Scene {
    constructor() {
        super("scene4");
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.gravity.y = 900;
        this.physics.world.setBounds(0, 0, 20000, 1260);
        this.bg1 = this.add.tileSprite(0, 0, 3960, 940, 'bg_4') 
            .setOrigin(0, 0)
            .setScrollFactor(0.1, 0);

        this.bgMain = this.add.tileSprite(0, 0, 3960, 940, 'bg_3') 
            .setOrigin(0, 0)
            .setScrollFactor(0.0001, 0);

        this.mapForest = this.make.tilemap({ key: 'mapForest' })
        const tiles = this.mapForest.addTilesetImage('Tiles', 'tilesForest');
        this.fence = this.mapForest.createStaticLayer('fence', tiles, 0, 0);
        this.exit = this.mapForest.createStaticLayer('exit', tiles, 0, 0);
        this.ground = this.mapForest.createStaticLayer('ground', tiles, 0, 0);


        this.player = this.physics.add.sprite(65, 1220, "player");
        this.exit.setCollisionByProperty({ collides: true });
        this.ground.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.ground, null, null, this);
        this.physics.add.collider(this.player, this.exit, this.exitToMap, null, this);

        this.cameras.main.setBounds(0, 0, 20000, 1280);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        this.isPlayerMoving = false;

        this.music = this.sound.add("forestmusic");
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);
    }

    exitToMap() {
        this.sound.stopAll();
        this.scene.switch('scene5');
    }

    update() {
        this.bgMain.setTilePosition(this.cameras.main.scrollX);
        this.bg1.setTilePosition(this.cameras.main.scrollX);

        if (this.cursors.left.isDown) {
            this.player.setScale(-1, 1);
            this.player.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            this.player.setOffset(0, 0);
            this.player.setScale(1, 1);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-650);
        }

        const yInRange = this.player.y >= 1290;
        if (yInRange) {
            this.sound.stopAll();
            this.scene.restart();
        }
    }
}