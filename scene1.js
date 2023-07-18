class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
    this.map = null; // Declare map as a class property
    this.groundLayer = null; // Declare groundLayer as a class property
    this.backgroundLayer = null; // Declare backgroundLayer as a class property
  }

  create() {

    // The assets should be loaded in the cache, so we can access them
    this.map = this.make.tilemap({ key: 'map' });
    this.cameras.main.setBounds(0, 0, 3392, 100);
    this.physics.world.setBounds(0, 0, 3000, 3000);
    this.physics.world.setBoundsCollision(true, true, true, true);
    
    const tiles = this.map.addTilesetImage('ground_tiles', 'tiles');

 
    this.floor = this.map.createStaticLayer('ground', tiles, 0, 0);
    this.walls = this.map.createStaticLayer('walls', tiles, 0, 0);
    this.trees = this.map.createStaticLayer('trees', tiles, 0, 0);
    this.stairs = this.map.createStaticLayer('bridge_stairs', tiles, 0, 0);
    this.walls.setCollisionByProperty({ collides: true });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.enemy = this.physics.add.sprite(250, 250, 'enemy').setScale(0.15);
    this.player = this.physics.add.sprite(200, 200, 'player');

    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.player, this.enemy);

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


  update() {
    let speed = 1;
    if (this.cursors.up.isDown) {
      this.player.y -= speed;
    }

    if (this.cursors.down.isDown) {
      this.player.y += speed;
    }

    if (this.cursors.left.isDown) {
      this.player.x -= speed;
      this.player.anims.play('moveLeft', true);
    } else if (this.cursors.right.isDown) {
      this.player.x += speed;
      this.player.anims.play('moveRight', true);
    } else {
      this.player.anims.stop(); // Stop the animation when no arrow key is pressed
    }
  }
}
