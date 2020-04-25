import { TestBed } from '@angular/core/testing';

import { FirestoreCineService } from './firestore-cine.service';

describe('FirestoreCineService', () => {
  let service: FirestoreCineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreCineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
