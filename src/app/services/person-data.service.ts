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
  constructor(private http: HttpClient) {}

  findAllPersons(): Observable<any[]> {
    return this.http
      .get<ResultViewModel<Person[]>>(`${environment.apiUrl}/persons`)
      .pipe(map((response) => response.data));
  }

  findPersonById(id: string): Observable<Person> {
    return this.http
      .get<ResultViewModel<Person>>(`${environment.apiUrl}/persons/${id}`)
      .pipe(map((response) => response.data));
  }

  // Todo POST / PUT / DELETE
}
