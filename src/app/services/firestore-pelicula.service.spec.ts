import { TestBed } from '@angular/core/testing';

import { FirestorePeliculaService } from './firestore-pelicula.service';

describe('FirestorePeliculaService', () => {
  let service: FirestorePeliculaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestorePeliculaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
