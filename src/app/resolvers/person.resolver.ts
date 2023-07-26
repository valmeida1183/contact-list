import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { PersonDataService } from '../services/person-data.service';

export const personResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot
) => {
  inject(PersonDataService).findPersonById(route.params['id']);
};
