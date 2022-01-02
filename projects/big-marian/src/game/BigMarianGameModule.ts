import { NgModule } from '@angular/core';
import { BigMarianGameComponent } from './BigMarianGameComponent';
import * as Phaser from 'phaser';

@NgModule({
  declarations: [BigMarianGameComponent],
  exports: [BigMarianGameComponent]
})
export class BigMarianGameModule {

  constructor() {
    // necessary to add phaser.js to bundle. Do not remove.
    Phaser.Game
  }

}
