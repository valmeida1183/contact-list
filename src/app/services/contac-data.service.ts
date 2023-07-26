import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultViewModel } from '../models/result-view-model';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contacts';
import { Observable, map } from 'rxjs';
import { ContactType } from '../models/contact-type';

@Injectable({
  providedIn: 'root',
})
export class ContacDataService {
  contact$: Observable<Contact>;
  contactTypes$: Observable<ContactType[]>;

  constructor(private http: HttpClient) {}

  findAllContactTypes(): Observable<ContactType[]> {
    this.contactTypes$ = this.http
      .get<ResultViewModel<ContactType[]>>(
        `${environment.apiUrl}/contact-types`
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );

    return this.contactTypes$;
  }

  createContact(contact: Contact, contactType: string): Observable<Contact> {
    return this.http
      .post<ResultViewModel<Contact>>(
        `${environment.apiUrl}/contacts/${contactType}`,
        contact
      )
      .pipe(map((response) => response.data));
  }

  editContactById(contact: Contact, contactType: string): Observable<Contact> {
    return this.http
      .put<ResultViewModel<Contact>>(
        `${environment.apiUrl}/contacts/${contactType}/${contact.id}`,
        contact
      )
      .pipe(map((response) => response.data));
  }

  deleteContactById(id: string): Observable<Contact> {
    return this.http
      .delete<ResultViewModel<Contact>>(`${environment.apiUrl}/contacts/${id}`)
      .pipe(map((response) => response.data));
  }
}
