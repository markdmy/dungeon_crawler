class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  
  preload() {
    this.load.spritesheet("player", "assets/images/player_spritesheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("friend", "assets/images/friend_spritesheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("fireworks", "assets/images/fireworks.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.physics.world.setBounds(0, 0, 960, 640);

    this.load.tilemapTiledJSON('map', 'assets/tiles/map.json');
    this.load.image('tiles', 'assets/tiles/ground_tiles.png');
    this.load.tilemapTiledJSON('mapDungeon', 'assets/tiles/dungeon_map.json');
    this.load.image('tilesDungeon', 'assets/tiles/dungeon_tiles.png');
    this.load.tilemapTiledJSON('map2', 'assets/tiles/map2.json');
    
    this.load.image("bgMenu", "assets/images/bg_menu.png");
    this.load.image('bg_1', 'assets/images/bg-1.png');
    this.load.image('bg_2', 'assets/images/bg-2.png');
    this.load.image('stoneGround', 'assets/images/stone_ground.jpg');

    this.load.audio("overworldmusic", ["assets/audio/overworld.mp3"]);
    this.load.audio("dungeonmusic", ["assets/audio/dungeon1.mp3"]);
    this.load.audio("victoryMusic", ["assets/audio/victory_theme.mp3"]);
  }
  
  create() {
    this.scene.start("scene3");
  }
}


// https://opengameart.org/content/lpc-tile-atlas 