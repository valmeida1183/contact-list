import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactTypeEnum } from 'src/app/enums/contact-type.enum';
import { Contact } from 'src/app/models/contacts';
import { ContacDataService } from 'src/app/services/contac-data.service';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss'],
})
export class ContactDialogComponent implements OnInit {
  form: FormGroup;
  onCreateEmitter = new EventEmitter<Contact>();
  onUpdateEmitter = new EventEmitter<Contact>();

  constructor(
    protected contactDataService: ContacDataService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ContactDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadFormConfiguration();

    this.contactType.valueChanges.subscribe((selectedContactType) => {
      this.setValidationFnByContactType(selectedContactType);
    });
  }

  get contactValue() {
    return this.form.get('contactValue') as FormControl;
  }

  get contactType() {
    return this.form.get('contactType') as FormControl;
  }

  onSave(): void {
    if (!this.data) {
      return;
    }

    const contact: Contact = {
      ...this.data.contact,
      value: this.form.controls['contactValue'].value,
      contactTypeId: this.form.controls['contactType'].value,
    };

    const emmiter = this.data.contact?.id
      ? this.onUpdateEmitter
      : this.onCreateEmitter;

    emmiter.emit(contact);
    this.dialogRef.close();
  }

  errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  };

  private loadFormConfiguration() {
    const { value, contactTypeId } = this.data?.contact ?? {};

    this.form = this.formBuilder.group({
      contactValue: [
        value,
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
          updateOn: 'blur',
        },
      ],
      contactType: [contactTypeId, Validators.required],
    });
  }

  private setValidationFnByContactType(contactTypeId: number): void {
    // const validators = [
    //   Validators.required,
    //   Validators.minLength(3),
    //   Validators.maxLength(50),
    // ];

    if (contactTypeId === ContactTypeEnum.Email) {
      this.contactValue.addValidators(Validators.email);
    } else if (
      contactTypeId === ContactTypeEnum.Phone ||
      contactTypeId === ContactTypeEnum.Email
    ) {
      this.contactValue.addValidators(Validators.pattern('[- +()0-9]+'));
    }
  }
}
