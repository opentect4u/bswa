/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecrectDataService } from './SecrectData.service';

describe('Service: SecrectData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecrectDataService]
    });
  });

  it('should ...', inject([SecrectDataService], (service: SecrectDataService) => {
    expect(service).toBeTruthy();
  }));
});
