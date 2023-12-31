import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultViewModel } from '../models/result-view-model';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class PersonDataService {
  persons$: Observable<Person[]>;
  person$: Observable<Person>;

  constructor(private http: HttpClient) {}

  findAllPersons(): Observable<Person[]> {
    this.persons$ = this.http
      .get<ResultViewModel<Person[]>>(`${environment.apiUrl}/persons`)
      .pipe(
        map((response) => {
          console.log(response.data);
          return response.data;
        })
      );

    return this.persons$;
  }

  findPersonById(id: string): Observable<Person> {
    this.person$ = this.http
      .get<ResultViewModel<Person>>(`${environment.apiUrl}/persons/${id}`)
      .pipe(map((response) => response.data));

    return this.person$;
  }

  createPerson(person: Person): Observable<Person> {
    return this.http
      .post<ResultViewModel<Person>>(`${environment.apiUrl}/persons`, person)
      .pipe(map((response) => response.data));
  }

  editPersonById(person: Person): Observable<Person> {
    return this.http
      .put<ResultViewModel<Person>>(
        `${environment.apiUrl}/persons/${person.id}`,
        person
      )
      .pipe(map((response) => response.data));
  }

  deletePersonById(id: string): Observable<Person> {
    return this.http
      .delete<ResultViewModel<Person>>(`${environment.apiUrl}/persons/${id}`)
      .pipe(map((response) => response.data));
  }
}
