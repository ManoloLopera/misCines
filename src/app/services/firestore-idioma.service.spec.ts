import { TestBed } from '@angular/core/testing';

import { FirestoreIdiomaService } from './firestore-idioma.service';

describe('FirestoreIdiomaService', () => {
  let service: FirestoreIdiomaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreIdiomaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
