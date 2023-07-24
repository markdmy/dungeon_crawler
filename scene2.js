class scene2 extends Phaser.Scene {
  constructor() {
    super("scene2");
  }
  create() {
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.bg1 = this.add.tileSprite(0, 0, 3960, 640, 'bg_1') // Use tileSprite for seamless looping
      .setOrigin(0, 0)
      .setScrollFactor(0.2, 0);

    this.bg2 = this.add.tileSprite(0, 0, 3960, 640, 'bg_2') // Use tileSprite for seamless looping
      .setOrigin(0, 0)
      .setScrollFactor(0.3, 0);

      this.mapDungeon = this.make.tilemap({ key: 'mapDungeon' })
      const tiles = this.mapDungeon.addTilesetImage('fantasy-tileset', 'tilesDungeon');
      this.door = this.mapDungeon.createStaticLayer('door', tiles, 0, 0);

    this.player = this.physics.add.sprite(65, 560, "player");
    this.physics.world.gravity.y = 900;
    this.physics.world.setBounds(0, 0, 10000, 3000);
    this.physics.world.setBoundsCollision(true, true, true, true);



    this.floor = this.mapDungeon.createStaticLayer('floor', tiles, 0, 0);
    this.platforms = this.mapDungeon.createStaticLayer('platforms', tiles, 0, 0);


    this.floor.setCollisionByProperty({ collides: true });
    this.platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.floor, this.hit, null, this);
    this.physics.add.collider(this.player, this.platforms, this.hit, null, this);

    //camera functions
    this.cameras.main.setBounds(0, 0, 10000, 640);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.isPlayerMoving = false;
  }

  hit() {
    console.log('ouch')
  }

  update() {
    this.bg1.setTilePosition(this.cameras.main.scrollX);
    this.bg2.setTilePosition(this.cameras.main.scrollX);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300); // Move left
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300); // Move right
    } else {
      this.player.setVelocityX(0); // Stop horizontal movement
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-700); // Jump if on the floor
    }

    const yInRange = this.player.y >= 640;
  
    if (yInRange) {
      this.scene.restart();

  }
}
}