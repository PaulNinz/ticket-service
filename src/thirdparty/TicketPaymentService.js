// Simulated external payment service
export class TicketPaymentService {
  makePayment(accountId, totalAmountToPay) {
	console.log(
      `[PaymentService] Charging account ${accountId} £${totalAmountToPay}`
    );

  }
}
