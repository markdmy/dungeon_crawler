class scene5 extends Phaser.Scene {
  constructor() {
    super("scene5");
  }

  create() {

    this.physics.world.setBoundsCollision(true, true, true, true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.world.gravity.y = 500;
    this.physics.world.setBounds(0, 0, 20000, 10000);
    this.bg1 = this.add.tileSprite(0, 0, 3960, 940, 'bg_5') 
      .setOrigin(0, 0)
      .setScrollFactor(1, 0);

    this.bg2 = this.add.tileSprite(0, 0, 3960, 940, 'bg_6') 
      .setOrigin(0, 0)
      .setScrollFactor(1, 0);

    this.bgMain = this.add.tileSprite(0, 0, 3960, 940, 'bg_7') 
      .setOrigin(0, 0)
      .setScrollFactor(1, 0);

    this.mapWoods = this.make.tilemap({ key: 'mapWoods' })
    const tiles = this.mapWoods.addTilesetImage('MainLevBuild', 'tilesWoods');
    this.collisionHidden = this.mapWoods.createStaticLayer('collisionhidden', tiles, 0, 0);
    this.background2 = this.mapWoods.createStaticLayer('background2', tiles, 0, 0);
    this.background = this.mapWoods.createStaticLayer('background', tiles, 0, 0);
    this.ground = this.mapWoods.createStaticLayer('ground', tiles, 0, 0);

    this.ground.setCollisionByProperty({ collides: true });
    this.collisionHidden.setCollisionByProperty({ collides: true });
    this.particles = this.add.particles('explode');

    this.emitterPlayerTrail = this.particles.createEmitter({
      lifespan: 200,
      accelerationY: 1500,
      y: 3,
      scale: { start: .05, end: 0 },
      blendMode: 'ADD',
      tint: 0x000000,
      frequency: 100, 
      alpha: { start: 0.8, end: 0 }, 
    });

    this.anims.create({
      key: 'moveRight',
      frames: this.anims.generateFrameNumbers('player', { start: 11, end: 20 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'moveLeft',
      frames: this.anims.generateFrameNumbers('player', { start: 11, end: 20 }),
      frameRate: 10,
      repeat: -1
    });

    this.player = this.physics.add.sprite(100, 2130, "player");
    this.emitterPlayerTrail.startFollow(this.player);
    this.emitterPlayerTrail.setVisible(false);
    this.isPlayerMoving = false;

    this.physics.add.collider(this.player, this.ground, null, null, this);
    this.physics.add.collider(this.player, this.collisionHidden, null, null, this);
    this.cameras.main.setBounds(0, 0, 20000, 10080);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.music = this.sound.add("woodsmusic");
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
    this.scene.switch('scene3');
  }

  update() {
    this.bg1.setTilePosition(this.cameras.main.scrollX);
    this.bg2.setTilePosition(this.cameras.main.scrollX);

    if (this.cursors.left.isDown) {
      this.player.setScale(-1, 1);
      this.player.setVelocityX(-300); 
      this.player.setOffset(32, 0); 

    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300); 

      this.player.setOffset(0, 0); 
      this.player.setScale(1, 1);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.player.body.onFloor()) {
      this.emitterPlayerTrail.setVisible(false);
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-500); 

      this.emitterPlayerTrail.setVisible(true);
      this.sound.play('jumpSound', { volume: 0.5 });
    }
    const xInRange = this.player.x >= 2050 && this.player.x <= 2250;
    const yInRange = this.player.y >= 100 && this.player.y <= 210;
  
    if (xInRange && yInRange) {
      this.sound.stopAll(); 
      this.scene.switch('scene3');
  
    }
  }
}
