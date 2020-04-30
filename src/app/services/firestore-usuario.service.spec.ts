import { TestBed } from '@angular/core/testing';

import { FirestoreUsuarioService } from './firestore-usuario.service';

describe('FirestoreUsuarioService', () => {
  let service: FirestoreUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
