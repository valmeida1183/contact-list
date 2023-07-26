import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { personListResolver } from './resolvers/person-list.resolver';
import { ContactListComponent } from './contact-list/contact-list.component';
import { personResolver } from './resolvers/person.resolver';
import { contactTypeListResolver } from './resolvers/contact-type-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: PersonsListComponent,
    resolve: {
      persons: personListResolver,
    },
  },
  {
    path: 'person/:id',
    component: ContactListComponent,
    resolve: {
      person: personResolver,
      contactTypes: contactTypeListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
