import { Component, OnDestroy } from '@angular/core';
import { Person } from '../models/person';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { PersonDataService } from '../services/person-data.service';
import { Subscription, concatMap } from 'rxjs';
import { PersonDialogComponent } from './person-dialog/person-dialog.component';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss'],
})
export class PersonsListComponent implements OnDestroy {
  private personDialogConfig: MatDialogConfig = {
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
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
    this.createSubscription?.unsubscribe();
    this.editSubscription?.unsubscribe();
  }

  onDeletePerson(person: Person) {
    this.personDialogConfig.data = {
      title: 'Delete Person?',
      message: `Would you like to delete ${person.name}?`,
      id: person.id,
    };

    const dialogRef = this.dialog.open(
      DeleteDialogComponent,
      this.personDialogConfig
    );

    this.deleteSubscription = dialogRef.componentInstance.onDeleteEmitter
      .pipe(
        concatMap((personId) =>
          this.personDataService.deletePersonById(personId)
        ),
        concatMap(() => this.personDataService.findAllPersons())
      )
      .subscribe();
  }

  onCreatePerson() {
    this.personDialogConfig.data = {
      title: 'Create Person',
    };

    const dialogRef = this.dialog.open(
      PersonDialogComponent,
      this.personDialogConfig
    );

    this.createSubscription = dialogRef.componentInstance.onCreateEmitter
      .pipe(
        concatMap((person) => this.personDataService.createPerson(person)),
        concatMap(() => this.personDataService.findAllPersons())
      )
      .subscribe();
  }

  onEditPerson(person: Person) {
    this.personDialogConfig.data = {
      title: 'Edit Person',
      person,
    };

    const dialogRef = this.dialog.open(
      PersonDialogComponent,
      this.personDialogConfig
    );

    this.editSubscription = dialogRef.componentInstance.onUpdateEmitter
      .pipe(
        concatMap((person) => this.personDataService.editPersonById(person)),
        concatMap(() => this.personDataService.findAllPersons())
      )
      .subscribe();
  }
}
