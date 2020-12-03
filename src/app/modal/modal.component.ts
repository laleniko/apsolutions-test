import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../models/data.model';
import { UUID } from 'angular2-uuid';
import { AppService } from '../app.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input()
  data!: Data;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: AppService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      firstName: [this.data ? this.data.name.first : '', Validators.required],
      lastName: [this.data ? this.data?.name.last : '', Validators.required],
      email: [this.data ? this.data?.email : '', [Validators.required, Validators.email]],
      age: [this.data ? this.data?.age : '', [Validators.required, Validators.max(150)]],
    });
  }

  formNewValues(): Data {
    return {
      guid: this.data ? this.data.guid : UUID.UUID(),
      age: this.form.get('age')?.value,
      name: {
        first: this.form.get('firstName')?.value,
        last: this.form.get('lastName')?.value,
      },
      email: this.form.get('email')?.value,
      avatarUrl: this.service.getAvatarUrl(this.form.get('age')?.value)
    };
  }
}

