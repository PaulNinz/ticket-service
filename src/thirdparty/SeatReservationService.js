// Simulated external seat reservation service
export class SeatReservationService {
  reserveSeat(accountId, totalSeatsToAllocate) {
	  if (!Number.isInteger(accountId)) {
      throw new TypeError('accountId must be an integer');
    }

    if (!Number.isInteger(totalSeatsToAllocate)) {
      throw new TypeError('totalSeatsToAllocate must be an integer');
    }
	console.log(
      `[SeatService] Reserving ${totalSeatsToAllocate} seats for account ${accountId}`
    );

  }
}
