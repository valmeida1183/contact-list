import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../models/person';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { PersonDataService } from '../services/person-data.service';
import { Subscription, concatMap, switchMap } from 'rxjs';
import { PersonDialogComponent } from './person-dialog/person-dialog.component';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss'],
})
export class PersonsListComponent implements OnDestroy {
  personsSubscription: Subscription;

  constructor(
    protected personDataService: PersonDataService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.personsSubscription.unsubscribe();
  }

  onDeletePerson(person: Person) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25rem',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        title: 'Delete Person?',
        message: `Would you like to delete ${person.name}?`,
        id: person.id,
      },
    });

    this.personsSubscription = dialogRef.componentInstance.onDeleteEmitter
      .pipe(
        concatMap((personId) =>
          this.personDataService.deletePersonById(personId)
        ),
        concatMap(() => this.personDataService.findAllPersons())
      )
      .subscribe();
  }

  onCreatePerson() {
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '25rem',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        title: 'Create Person',
      },
    });

    this.personsSubscription = dialogRef.componentInstance.onSaveEmitter
      .pipe(
        concatMap((person) => this.personDataService.createPerson(person)),
        concatMap(() => this.personDataService.findAllPersons())
      )
      .subscribe();
  }
}
