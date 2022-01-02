import { PhaserMainScene } from './PhaserMainScene';
import { PhaserScene } from './PhaserScene';

export class PhaserBootScene extends PhaserScene {

  static readonly SCENE_ID = 'BootScene';

  constructor() {
    super({ key: PhaserBootScene.SCENE_ID });
  }

  create(): void {
    console.log('BootScene Create');
    this.scene.start(PhaserMainScene.SCENE_ID);
  }

  preload(): void {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet(
      'dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    console.log('BootScene Preload');
  }

  update(time: number, delta: number) {
    console.log('BootScene Update');
    console.log('BootScene, time', time);
    console.log('BootScene, delta', delta);
  }
}
