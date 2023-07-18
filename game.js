var game;
window.onload = function () {
  let gameConfig = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0, x: 0 },
      }
    },

    scene: [preloadGame, scene1]
  }
  game = new Phaser.Game(gameConfig);
}
