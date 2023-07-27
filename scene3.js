function createPopUpBox(scene, width, height, text) {
  const style = { font: '50px Arial', fill: '#ffffff', align: 'center' };
  const textBox = scene.add.text(scene.cameras.main.width / 2, scene.cameras.main.height / 2, text, style).setOrigin(0.5);
  textBox.setScrollFactor(0);

  // Set the initial alpha (transparency) of the text to 0 (completely transparent)
  textBox.alpha = 0;

  // Create a tween to gradually change the alpha of the text to 1 (completely opaque)
  scene.tweens.add({
    targets: textBox,
    alpha: 1,
    duration: 8000, // Duration of the fade-in effect in milliseconds
    ease: 'Linear', // You can experiment with different easing functions for different effects
    onComplete: function () {
      // This function will be called when the tween is completed.
      // You can add any additional logic here if needed.
    }
  });
}

class scene3 extends Phaser.Scene {
  constructor() {
    super("scene3");
  }

  create() {

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.world.gravity.y = 0;

    this.map = this.make.tilemap({ key: 'map2' });
    this.cameras.main.setBounds(0, 0, 3392, 100);
    this.physics.world.setBounds(0, 0, 3000, 3000);
    this.physics.world.setBoundsCollision(true, true, true, true);


    const tiles = this.map.addTilesetImage('ground_tiles', 'tiles');
    this.hiddenMap = this.map.createStaticLayer('hidden_collision', tiles, 0, 0);
    this.floor = this.map.createStaticLayer('ground', tiles, 0, 0);
    this.walls = this.map.createStaticLayer('walls', tiles, 0, 0);
    this.stairs = this.map.createStaticLayer('bridge_stairs', tiles, 0, 0);
    this.fireworks = this.physics.add.staticGroup();



    // Create the 'fireworksAnimation' animation
    this.anims.create({
        key: 'fireworksAnimation',
        frames: this.anims.generateFrameNumbers('fireworks', { start: 0, end: 23 }),
        frameRate: 15,
        repeat: -1
    });
    


    this.friend = this.physics.add.sprite(334, 267, 'friend');
    this.friend.setImmovable(true);
    this.player = this.physics.add.sprite(882, 127, 'player');
    this.trees = this.map.createStaticLayer('other', tiles, 0, 0);

    // Add the sprites to the fireworks group
    this.fireworks.create(180, 145, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(150, 475, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(380, 295, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(410, 445, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(750, 395, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(890, 220, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(870, 500, 'fireworks').setScale(7).refreshBody();
    this.fireworks.create(570, 200, 'fireworks').setScale(7).refreshBody();

    this.fireworksSprites = this.fireworks.getChildren();

    // Makes all the fireworks sprites invisible
    this.fireworksSprites.forEach(sprite => {
        sprite.alpha = 0;
    });

    //physics  
    this.hiddenMap.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.hiddenMap, null, null, this);
    this.physics.add.collider(this.player, this.friend, this.hit, null, this);

    this.anims.create({
      key: 'idleAnimation',        // Unique key for the animation
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
      frameRate: 5,  // Frames per second for the animation
      repeat: -1,                  // Set to -1 to make the animation loop, set to a positive integer for a specific number of repetitions
    });

    this.anims.create({
      key: 'idleFriendAnimation',        // Unique key for the animation
      frames: this.anims.generateFrameNumbers('friend', { start: 0, end: 10 }),
      frameRate: 5,  // Frames per second for the animation
      repeat: -1,                  // Set to -1 to make the animation loop, set to a positive integer for a specific number of repetitions
    });

    // Play the animations for 'player', 'friend', and 'fireworks'
    this.player.anims.play('idleAnimation');
    this.friend.anims.play('idleFriendAnimation');


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

    this.anims.create({
      key: 'moveUp',
      frames: this.anims.generateFrameNumbers('player', { start: 11, end: 20 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'moveDown',
      frames: this.anims.generateFrameNumbers('player', { start: 11, end: 20 }),
      frameRate: 10,
      repeat: -1
    });

    this.cameras.main.setBounds(0, 0, 3392, 1900);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.music = this.sound.add("overworldmusic");
    this.musicVictory = this.sound.add("victoryMusic");
    var musicConfig = {
      mute: false,
      volume: 0.6,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.music.play(musicConfig);

    


  }

  hit() {
    
    createPopUpBox(this, 400, 200, "You found your friend! You beat the game!");
    this.fireworks.playAnimation('fireworksAnimation');
    this.sound.stopAll(); 
    this.musicVictory.play();
    this.fireworksSprites.forEach(sprite => {
      sprite.alpha = 1;
  });
  }

  update() {

    const speed = 300;
  
    this.player.setVelocity(0, 0); // Reset the velocity on each update
  
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play('moveUp', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play('moveDown', true);
    }
  
    if (this.cursors.left.isDown) {
      this.player.setScale(-1, 1);
      this.player.setVelocityX(-speed);
      this.player.anims.play('moveLeft', true);
      this.player.setOffset(32, 0); // Adjust the body offset when facing left
      
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play('moveRight', true);
      this.player.setOffset(0, 0); // Adjust the body offset when facing left
      this.player.setScale(1, 1);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idleAnimation', true);
      this.player.setOffset(0, 0); // Adjust the body offset when facing left
    }
    // Moves to next map when player has reached coordinates
    const xInRange = this.player.x >= 140 && this.player.x <= 180;
    const yInRange = this.player.y >= 500 && this.player.y <= 520;

    if (xInRange && yInRange) {
      this.sound.stopAll();
      this.music.play(musicConfigVictory);
      this.scene.switch('sceneMenu');

    }
  }
}
