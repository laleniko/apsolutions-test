import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';



@NgModule({
  declarations: [],
  imports: [
    NzTableModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule
  ],
  exports: [
    NzTableModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule
  ]
})
export class UiModule { }
