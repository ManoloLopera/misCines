import { TestBed } from '@angular/core/testing';

import { FirestoreSalaService } from './firestore-sala.service';

describe('FirestoreSalaService', () => {
  let service: FirestoreSalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreSalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
