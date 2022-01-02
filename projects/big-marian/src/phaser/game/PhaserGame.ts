import { PhaserGameConfig } from './PhaserGameConfig';
import { PhaserBootScene } from '../scenes/PhaserBootScene';
import { PhaserMainScene } from '../scenes/PhaserMainScene';

export class PhaserGame extends Phaser.Game {

  constructor(config: PhaserGameConfig) {
    super(config.getConfig());
    this.scene.add(PhaserBootScene.SCENE_ID, new PhaserBootScene(), true);
    this.scene.add(PhaserMainScene.SCENE_ID, new PhaserMainScene());
  }

}
