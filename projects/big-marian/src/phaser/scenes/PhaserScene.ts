export abstract class PhaserScene extends Phaser.Scene {

  abstract preload(): void;

  abstract create(): void;

  abstract update(time: number, delta: number): void;

}
