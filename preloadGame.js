class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  
  preload() {
    this.load.spritesheet("player", "assets/images/character.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.tilemapTiledJSON('map', 'assets/tiles/map.json');
    this.load.image('tiles', 'assets/tiles/ground_tiles.png');
    this.physics.world.setBounds(0, 0, 1800, 1800);
  }
  
  create() {
    this.scene.start("scene1");
  }
}