import { TicketService } from '../src/TicketService.js';
import { TicketTypeRequest, TicketType } from '../src/domain/TicketTypeRequest.js';
import { InvalidPurchaseError } from '../src/errors/InvalidPurchaseError.js';

class MockPaymentService {
  constructor() {
    this.calls = [];
  }
  makePayment(accountId, totalAmountToPay) {
    this.calls.push({ accountId, totalAmountToPay });
  }
}

class MockSeatService {
  constructor() {
    this.calls = [];
  }
  reserveSeat(accountId, totalSeatsToAllocate) {
    this.calls.push({ accountId, totalSeatsToAllocate });
  }
}

describe('TicketService', () => {
  let paymentService;
  let seatService;
  let service;

  beforeEach(() => {
    paymentService = new MockPaymentService();
    seatService = new MockSeatService();
    service = new TicketService(paymentService, seatService);
  });

  test('valid purchase calls payment and seat reservation with correct values', () => {
    const adult = new TicketTypeRequest(TicketType.ADULT, 2);
    const child = new TicketTypeRequest(TicketType.CHILD, 1);

    service.purchaseTickets(1, adult, child);

    expect(paymentService.calls).toHaveLength(1);
    expect(paymentService.calls[0]).toEqual({ accountId: 1, totalAmountToPay: 65 });

    expect(seatService.calls).toHaveLength(1);
    expect(seatService.calls[0]).toEqual({ accountId: 1, totalSeatsToAllocate: 3 });
  });

  test('no adult but child present throws', () => {
    const child = new TicketTypeRequest(TicketType.CHILD, 1);

    expect(() => service.purchaseTickets(1, child)).toThrow(InvalidPurchaseError);
  });

  test('infants more than adults throws', () => {
    const adult = new TicketTypeRequest(TicketType.ADULT, 1);
    const infant = new TicketTypeRequest(TicketType.INFANT, 2);

    expect(() => service.purchaseTickets(1, adult, infant)).toThrow(InvalidPurchaseError);
  });

  test('more than 25 tickets throws', () => {
    const adult = new TicketTypeRequest(TicketType.ADULT, 26);

    expect(() => service.purchaseTickets(1, adult)).toThrow(InvalidPurchaseError);
  });

  test('invalid account id throws', () => {
    const adult = new TicketTypeRequest(TicketType.ADULT, 1);

    expect(() => service.purchaseTickets(0, adult)).toThrow(InvalidPurchaseError);
  });
});