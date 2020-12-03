import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from './pipe';



@NgModule({
  declarations: [FirstLetterPipe],
  imports: [],
  exports: [FirstLetterPipe]
})
export class PipesModule { }
