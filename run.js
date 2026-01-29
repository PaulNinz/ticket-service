import { TicketService } from './src/TicketService.js';
import { TicketTypeRequest } from './src/domain/TicketTypeRequest.js';
import { TicketPaymentService } from './src/thirdparty/TicketPaymentService.js';
import { SeatReservationService } from './src/thirdparty/SeatReservationService.js';

// Instantiate the real third‑party services
const paymentService = new TicketPaymentService();
const seatService = new SeatReservationService();

// Inject them into TicketService
const service = new TicketService(paymentService, seatService);

// Create some ticket requests
const adult = new TicketTypeRequest('ADULT', 2);
const child = new TicketTypeRequest('CHILD', 1);

// Run the purchase
service.purchaseTickets(123, adult, child);

console.log('Purchase completed successfully');