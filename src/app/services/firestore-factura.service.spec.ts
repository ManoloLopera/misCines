import { TestBed } from '@angular/core/testing';

import { FirestoreFacturaService } from './firestore-factura.service';

describe('FirestoreFacturaService', () => {
  let service: FirestoreFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreFacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
