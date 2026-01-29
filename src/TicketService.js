import { InvalidPurchaseError } from './errors/InvalidPurchaseError.js';
import { TicketType } from './domain/TicketTypeRequest.js';

const MAX_TICKETS = 25;
const ADULT_PRICE = 25;
const CHILD_PRICE = 15;

export class TicketService {
  #paymentService;
  #seatService;

  constructor(paymentService, seatService) {
    this.#paymentService = paymentService;
    this.#seatService = seatService;
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.#validateAccount(accountId);
    this.#validateRequests(ticketTypeRequests);

    const totalTickets = this.#calculateTotalTickets(ticketTypeRequests);
    this.#validateTicketLimit(totalTickets);

    const adultCount = this.#count(ticketTypeRequests, TicketType.ADULT);
    const childCount = this.#count(ticketTypeRequests, TicketType.CHILD);
    const infantCount = this.#count(ticketTypeRequests, TicketType.INFANT);

    this.#validateAdultPresence(adultCount, childCount, infantCount);

    const totalAmount = this.#calculateTotalAmount(adultCount, childCount);
    const seatsToReserve = this.#calculateSeatsToReserve(adultCount, childCount);

    this.#paymentService.makePayment(accountId, totalAmount);
    this.#seatService.reserveSeat(accountId, seatsToReserve);
  }

  #validateAccount(accountId) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new InvalidPurchaseError('Account ID must be a positive integer');
    }
  }

  #validateRequests(requests) {
    if (!Array.isArray(requests) || requests.length === 0) {
      throw new InvalidPurchaseError('At least one ticket request is required');
    }
  }

  #calculateTotalTickets(requests) {
    return requests.reduce((sum, r) => sum + r.getNoOfTickets(), 0);
  }

  #validateTicketLimit(totalTickets) {
    if (totalTickets > MAX_TICKETS) {
      throw new InvalidPurchaseError('Cannot purchase more than 25 tickets');
    }
  }

  #count(requests, type) {
    return requests
      .filter(r => r.getTicketType() === type)
      .reduce((sum, r) => sum + r.getNoOfTickets(), 0);
  }

  #validateAdultPresence(adultCount, childCount, infantCount) {
    if (adultCount === 0 && (childCount > 0 || infantCount > 0)) {
      throw new InvalidPurchaseError(
        'Child and Infant tickets require at least one Adult ticket',
      );
    }
    if (infantCount > adultCount) {
      throw new InvalidPurchaseError(
        'Each Infant must be accompanied by an Adult',
      );
    }
  }

  #calculateTotalAmount(adultCount, childCount) {
    //return adultCount * ADULT_PRICE + childCount * CHILD_PRICE;
	const total = adultCount * ADULT_PRICE + childCount * CHILD_PRICE;
	console.log(`[TicketService] Total amount: £${total}`);
	return total;

  }

  #calculateSeatsToReserve(adultCount, childCount) {
    //return adultCount + childCount; // infants do not get seats
	const seats = adultCount + childCount;
	console.log(`[TicketService] Seats to reserve: ${seats}`);
	return seats;

  }
}