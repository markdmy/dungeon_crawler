class scene2 extends Phaser.Scene {
  constructor() {
    super("scene2");
  }

  create() {

    this.physics.world.setBoundsCollision(true, true, true, true);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.bg1 = this.add.tileSprite(0, 0, 3960, 640, 'bg_1') // Use tileSprite for seamless looping
      .setOrigin(0, 0)
      .setScrollFactor(0.05, 0);

    this.bg2 = this.add.tileSprite(0, 0, 3960, 640, 'bg_2') // Use tileSprite for seamless looping
      .setOrigin(0, 0)
      .setScrollFactor(0.1, 0);

    this.mapDungeon = this.make.tilemap({ key: 'mapDungeon' })
    const tiles = this.mapDungeon.addTilesetImage('fantasy-tileset', 'tilesDungeon');
    this.door = this.mapDungeon.createStaticLayer('door', tiles, 0, 0);
    this.exit = this.mapDungeon.createStaticLayer('exit', tiles, 0, 0);

    this.particles = this.add.particles('explode');

    this.emitterPlayerTrail = this.particles.createEmitter({
      lifespan: 200,
      accelerationY: 1500,
      y: 3,
      scale: { start: .05, end: 0 },
      blendMode: 'ADD',
      tint: 0x000000,
      frequency: 100, // Decrease the frequency to space out the particles
      alpha: { start: 0.8, end: 0 }, // Adjust alpha to make particles a little transparent
  });


    this.player = this.physics.add.sprite(65, 560, "player");
    this.emitterPlayerTrail.startFollow(this.player);
    this.emitterPlayerTrail.setVisible(false);
    
    this.physics.world.gravity.y = 900;
    this.physics.world.setBounds(0, 0, 20000, 3000);


    this.floor = this.mapDungeon.createStaticLayer('floor', tiles, 0, 0);
    this.platforms = this.mapDungeon.createStaticLayer('platforms', tiles, 0, 0);

    this.exit.setCollisionByProperty({ collides: true });
    this.floor.setCollisionByProperty({ collides: true });
    this.platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.exit, this.exitToMap, null, this);
    this.physics.add.collider(this.player, this.floor, this.hit, null, this);
    this.physics.add.collider(this.player, this.platforms, this.hit, null, this);

    //camera functions
    this.cameras.main.setBounds(0, 0, 20000, 640);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.isPlayerMoving = false;

    // player animations
    this.player.anims.play('idleAnimation');

    // Create animations
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


    //audio

    this.music = this.sound.add("dungeonmusic");
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

  hit() {
    console.log('ouch')
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
      this.player.setVelocityX(-300); // Move left
      this.player.anims.play('moveLeft', true);
      this.player.setOffset(32, 0); // Adjust the body offset when facing left
      
      
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300); // Move right
      this.player.anims.play('moveRight', true);
      this.player.setOffset(0, 0); // Adjust the body offset when facing left
      this.player.setScale(1, 1);
    } else {
      this.player.setVelocityX(0); // Stop horizontal movement
      this.player.anims.play('idleAnimation');
    }

    if (this.player.body.onFloor()) {
      this.emitterPlayerTrail.setVisible(false);
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-700); // Jump if on the floor
      this.player.anims.play('idleAnimation');
      this.emitterPlayerTrail.setVisible(true);
      this.sound.play('jumpSound', { volume: 0.5 });
    }
   


    const yInRange = this.player.y >= 640;

    if (yInRange) {
      this.scene.restart(scene2);

    }
  }
}