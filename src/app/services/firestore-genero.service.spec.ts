import { TestBed } from '@angular/core/testing';

import { FirestoreGeneroService } from './firestore-genero.service';

describe('FirestoreGeneroService', () => {
  let service: FirestoreGeneroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreGeneroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
