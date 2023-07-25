import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { AboutComponent } from './about/about.component';
import { personListResolver } from './resolvers/person-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: PersonsListComponent,
    resolve: {
      persons: personListResolver,
    },
  },
  {
    path: 'about',
    component: AboutComponent,
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
