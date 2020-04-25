import { TestBed } from '@angular/core/testing';

import { FirestoreStorageService } from './firestore-storage.service';

describe('FirestoreStorageService', () => {
  let service: FirestoreStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
