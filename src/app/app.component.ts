import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { Data } from './models/data.model';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  dataSub!: Subscription;
  data!: Data[];

  constructor(private service: AppService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

  getData(): void {
    this.dataSub = this.service.getData().subscribe(
      data => this.data = data
    );
  }

  delete(guid: string): void {
    this.data = this.data.filter(d => d.guid !== guid);
  }

  editData(i: number): void {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'Редактирование',
      nzContent: ModalComponent,
      nzWidth: 500,
      nzComponentParams: {
        data: this.data[i]
      },
      nzFooter: [
        {
          label: 'Сохранить',
          disabled: component => !component?.form.valid,
          type: 'primary',
          onClick: (component) => {
            if (component?.form.valid) {
              const updateData = [...this.data];
              updateData[i] = component.formNewValues();
              this.data = updateData;
              modal.destroy();
            }
          }
        }
      ]
    });
  }

  addData(): void {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'Создание',
      nzContent: ModalComponent,
      nzWidth: 500,
      nzFooter: [
        {
          label: 'Сохранить',
          disabled: component => !component?.form.valid,
          type: 'primary',
          onClick: (component) => {
            if (component?.form.valid) {
              console.log(component.formNewValues())
              this.data = [...this.data, component.formNewValues()];
              modal.destroy();
            }
          }
        }
      ]
    });
  }
}
