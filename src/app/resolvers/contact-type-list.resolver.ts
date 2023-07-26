import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContacDataService } from '../services/contac-data.service';

export const contactTypeListResolver: ResolveFn<void> = () => {
  inject(ContacDataService).findAllContactTypes();
};
