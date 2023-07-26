import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss'],
})
export class PersonDialogComponent implements OnInit {
  form: FormGroup;
  onCreateEmitter = new EventEmitter<Person>();
  onUpdateEmitter = new EventEmitter<Person>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PersonDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadFormConfiguration();
  }

  onSave(): void {
    if (!this.data) {
      return;
    }

    const person: Person = {
      ...this.data.person,
      name: this.form.controls['name'].value,
    };

    const emmiter = this.data.person?.id
      ? this.onUpdateEmitter
      : this.onCreateEmitter;

    emmiter.emit(person);
    this.dialogRef.close();
  }

  errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  };

  private loadFormConfiguration() {
    const { name } = this.data?.person ?? {};

    this.form = this.formBuilder.group({
      name: [
        name,
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
          updateOn: 'blur',
        },
      ],
    });
  }
}
