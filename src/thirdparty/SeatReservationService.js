// Simulated external seat reservation service
export class SeatReservationService {
  reserveSeat(accountId, totalSeatsToAllocate) {
	console.log(
      `[SeatService] Reserving ${totalSeatsToAllocate} seats for account ${accountId}`
    );

  }
}
