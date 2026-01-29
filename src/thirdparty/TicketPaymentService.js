// Simulated external payment service
export class TicketPaymentService {
  makePayment(accountId, totalAmountToPay) {
    // Real implementation omitted; assume this charges a stored card.
    // No return value needed.
	console.log(
      `[PaymentService] Charging account ${accountId} £${totalAmountToPay}`
    );

  }
}