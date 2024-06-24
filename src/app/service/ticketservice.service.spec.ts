/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TicketserviceService } from './ticketservice.service';

describe('Service: Ticketservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketserviceService]
    });
  });

  it('should ...', inject([TicketserviceService], (service: TicketserviceService) => {
    expect(service).toBeTruthy();
  }));
});
