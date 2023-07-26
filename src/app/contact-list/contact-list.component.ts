import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonDataService } from '../services/person-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Contact } from '../models/contacts';
import { ContacDataService } from '../services/contac-data.service';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { Subscription, concatMap } from 'rxjs';
import { ContactTypeEnum } from '../enums/contact-type.enum';
import { ActivatedRoute } from '@angular/router';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  private personId: string;
  private contactDialogConfig: MatDialogConfig = {
    width: '25rem',
    enterAnimationDuration: '100ms',
    exitAnimationDuration: '100ms',
    data: {},
  };

  private deleteSubscription: Subscription;
  private createSubscription: Subscription;
  private editSubscription: Subscription;

  constructor(
    protected personDataService: PersonDataService,
    protected contactDataService: ContacDataService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.personId = this.route.snapshot.params['id'];
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
    this.createSubscription?.unsubscribe();
    this.editSubscription?.unsubscribe();
  }

  onDeleteContact(contact: Contact): void {
    this.contactDialogConfig.data = {
      title: 'Delete Contact?',
      message: `Would you like to delete ${contact.value}?`,
      id: contact.id,
    };

    const dialogRef = this.dialog.open(
      DeleteDialogComponent,
      this.contactDialogConfig
    );

    this.deleteSubscription = dialogRef.componentInstance.onDeleteEmitter
      .pipe(
        concatMap((contactId) =>
          this.contactDataService.deleteContactById(contactId)
        ),
        concatMap(() => this.personDataService.findPersonById(this.personId))
      )
      .subscribe();
  }

  onCreateContact(): void {
    this.contactDialogConfig.data = {
      title: 'Create Contact',
      contact: {
        personId: this.personId,
      },
    };

    const dialogRef = this.dialog.open(
      ContactDialogComponent,
      this.contactDialogConfig
    );

    this.createSubscription = dialogRef.componentInstance.onCreateEmitter
      .pipe(
        concatMap((contact) =>
          this.contactDataService.createContact(
            contact,
            this.contatTypeLabel(contact.contactTypeId)
          )
        ),
        concatMap(() => this.personDataService.findPersonById(this.personId))
      )
      .subscribe();
  }

  onEditContact(contact: Contact): void {
    this.contactDialogConfig.data = {
      title: 'Edit Contact',
      contact,
    };

    const dialogRef = this.dialog.open(
      ContactDialogComponent,
      this.contactDialogConfig
    );

    this.editSubscription = dialogRef.componentInstance.onUpdateEmitter
      .pipe(
        concatMap((contact) =>
          this.contactDataService.editContactById(
            contact,
            this.contatTypeLabel(contact.contactTypeId)
          )
        ),
        concatMap(() => this.personDataService.findPersonById(this.personId))
      )
      .subscribe();
  }

  private contatTypeLabel(contactTypeId: number): string {
    const indexOf = Object.values(ContactTypeEnum).indexOf(contactTypeId);

    return Object.keys(ContactTypeEnum)[indexOf].toLowerCase();
  }
}
