import { TestBed } from '@angular/core/testing';

import { FirestoreSesionService } from './firestore-sesion.service';

describe('FirestoreSesionService', () => {
  let service: FirestoreSesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreSesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
