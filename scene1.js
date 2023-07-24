class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.world.gravity.y = 0;

    this.map = this.make.tilemap({ key: 'map' });
    this.cameras.main.setBounds(0, 0, 3392, 100);
    this.physics.world.setBounds(0, 0, 3000, 3000);
    this.physics.world.setBoundsCollision(true, true, true, true);

    const tiles = this.map.addTilesetImage('ground_tiles', 'tiles');
    this.hiddenMap = this.map.createStaticLayer('collide_hidden', tiles, 0, 0);
    this.floor = this.map.createStaticLayer('ground', tiles, 0, 0);
    this.walls = this.map.createStaticLayer('walls', tiles, 0, 0);
    this.trees = this.map.createStaticLayer('trees', tiles, 0, 0);
    this.stairs = this.map.createStaticLayer('bridge_stairs', tiles, 0, 0);


    this.enemy = this.physics.add.sprite(162, 500, 'enemy').setScale(0.13);
    this.player = this.physics.add.sprite(150, 150, 'player');

    //physics
    this.hiddenMap.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.hiddenMap, this.hit, null, this);
    this.physics.add.collider(this.enemy, this.hiddenMap, this.hit, null, this);
    this.physics.add.collider(this.player, this.enemy, this.hit, null, this);



    // Create animations
    this.anims.create({
      key: 'moveRight',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'moveLeft',
      frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.cameras.main.setBounds(0, 0, 3392, 1900);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);



  }

  hit() {
    console.log('ouch')
  }

  update() {
    // Set the player's velocity to control movement
    const speed = 300;
  
    this.player.setVelocity(0, 0); // Reset the velocity on each update
  
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play('moveLeft', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play('moveRight', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.stop(); // Stop the animation when no arrow key is pressed
    }
    // Moves to next map when player has reached coordinates
    const xInRange = this.player.x >= 140 && this.player.x <= 180;
    const yInRange = this.player.y >= 500 && this.player.y <= 520;
  
    if (xInRange && yInRange) {
      this.scene.switch('scene2');
    }
  }
}
