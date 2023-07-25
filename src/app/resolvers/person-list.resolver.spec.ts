import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { personListResolver } from './person-list.resolver';

describe('personListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => personListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
