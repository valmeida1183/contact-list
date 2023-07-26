import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { contactTypeListResolver } from './contact-type-list.resolver';

describe('contactTypeListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => contactTypeListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
