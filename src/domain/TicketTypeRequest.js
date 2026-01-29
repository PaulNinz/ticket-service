export const TicketType = Object.freeze({
  ADULT: 'ADULT',
  CHILD: 'CHILD',
  INFANT: 'INFANT',
});

export class TicketTypeRequest {
  #type;
  #noOfTickets;

  constructor(type, noOfTickets) {
    if (!Object.values(TicketType).includes(type)) {
      throw new Error('Invalid ticket type');
    }
    if (!Number.isInteger(noOfTickets) || noOfTickets <= 0) {
      throw new Error('Number of tickets must be a positive integer');
    }
    this.#type = type;
    this.#noOfTickets = noOfTickets;
    Object.freeze(this); // shallow immutability
  }

  getTicketType() {
    return this.#type;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }
}