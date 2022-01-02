import { PhaserScene } from './PhaserScene';

export class PhaserMainScene extends PhaserScene {

  static readonly SCENE_ID = 'MainScene';

  private platforms: Phaser.Physics.Arcade.StaticGroup;
  private sprite: Phaser.Physics.Arcade.Sprite;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private stars: Phaser.Physics.Arcade.Group;
  private scoreText: Phaser.GameObjects.Text;
  private score = 0;

  constructor() {
    super({ key: PhaserMainScene.SCENE_ID });
  }

  preload(): void {

  }

  create(): void {
    this.add.image(400, 300, 'sky');
    this.initializeScoreText();
    this.initializePlatforms();
    this.initializeSprite();
    this.initializeCursorKeys();
    this.initializeStars();
  }

  update(time: number, delta: number): void {
    if (this.cursorKeys.left.isDown) {
      this.sprite.setVelocityX(-160);
      this.sprite.anims.play('left', true);
    } else if (this.cursorKeys.right.isDown) {
      this.sprite.setVelocityX(160);
      this.sprite.anims.play('right', true);
    } else {
      this.sprite.setVelocityX(0);
      this.sprite.anims.play('turn');
    }
    if (this.cursorKeys.up.isDown && this.sprite.body.touching.down) {
      this.sprite.setVelocityY(-330);
    }
  }

  private initializePlatforms(): void {
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
  }

  private initializeSprite(): void {
    this.sprite = this.physics.add.sprite(100, 450, 'dude');

    this.sprite.setBounce(0.2);
    this.sprite.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.physics.add.collider(this.sprite, this.platforms);

  }

  private initializeCursorKeys(): void {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  private initializeStars(): void {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate((child) => {
      (child as Phaser.Physics.Arcade.Sprite).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);
    const onStartCollectFn = (sprite: Phaser.Types.Physics.Arcade.GameObjectWithBody, star: Phaser.Types.Physics.Arcade.GameObjectWithBody) => {
      (star as Phaser.Physics.Arcade.Sprite).disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
    };
    this.physics.add.overlap(this.sprite, this.stars, onStartCollectFn, undefined, this);

  }

  private initializeScoreText(): void {
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px' });

  }

}
