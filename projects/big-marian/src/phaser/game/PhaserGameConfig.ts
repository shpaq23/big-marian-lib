export class PhaserGameConfig {

  constructor(private readonly width: number,
              private readonly height: number) {
  }

  getConfig(): Phaser.Types.Core.GameConfig {
    return {
      type: Phaser.AUTO,
      parent: 'content',
      width: this.width,
      height: this.height,
      backgroundColor: '#FFF',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 }
        }
      },
      render: {
        pixelArt: true
      }
    };
  }

}
