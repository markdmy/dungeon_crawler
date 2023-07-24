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
        gravity: {y: 200}
      }
    },

    scene: [preloadGame, scene1, scene2]
  }
  game = new Phaser.Game(gameConfig);
}
