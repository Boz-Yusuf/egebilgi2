import { TestBed } from '@angular/core/testing';

import { AnswerSetsService } from './answer-sets.service';

describe('AnswerSetsService', () => {
  let service: AnswerSetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerSetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
