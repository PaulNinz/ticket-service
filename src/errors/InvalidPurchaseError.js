export class InvalidPurchaseError extends Error {
  constructor(message = 'Invalid ticket purchase request') {
    super(message);
    this.name = 'InvalidPurchaseError';
  }
}