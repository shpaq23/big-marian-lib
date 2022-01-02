import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { PhaserGame } from '../phaser/game/PhaserGame';
import { PhaserGameConfig } from '../phaser/game/PhaserGameConfig';

@Component({
  selector: 'big-marian-game',
  templateUrl: './BigMarianGameComponent.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigMarianGameComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  cssClass = '';

  @Input()
  height = 600;

  @Input()
  width = 800;

  @Output()
  readonly gameReady = new EventEmitter<void>();

  private phaserGame: PhaserGame;

  constructor(private readonly elementRef: ElementRef,
              private readonly renderer: Renderer2) {
  }

  ngOnInit(): void {
    const gameConfig = new PhaserGameConfig(this.width, this.height);
    this.phaserGame = new PhaserGame(gameConfig);
  }

  ngAfterViewInit(): void {
    debugger;
    this.elementRef.nativeElement.appendChild(this.phaserGame.canvas);
    if (this.cssClass) {
      this.renderer.addClass(this.phaserGame.canvas, this.cssClass);
    }
    this.gameReady.emit();
  }

  ngOnDestroy(): void {
    if (this.phaserGame && typeof this.phaserGame.destroy === 'function') {
      this.phaserGame.destroy(true);
    }
  }

}
