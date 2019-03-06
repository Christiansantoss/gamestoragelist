import { TestBed, inject } from '@angular/core/testing';

import { GamestorageService } from './gamestorage.service';

describe('GamestorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamestorageService]
    });
  });

  it('should be created', inject([GamestorageService], (service: GamestorageService) => {
    expect(service).toBeTruthy();
  }));
});
