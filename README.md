# ticket-service
Implementation of Ticket Service 


# 🎟️ Ticket Service – Coding Exercise

A clean, fully tested implementation of the **TicketService** as described in the coding exercise brief.  
This project demonstrates correct handling of business rules, immutability, validation, payment processing, seat reservation, and error handling.

---

## 📌 Overview

This project implements a `TicketService` responsible for:

- Validating ticket purchase requests  
- Enforcing all business rules  
- Calculating total payment  
- Calculating number of seats to reserve  
- Calling external services for payment and seat reservation  
- Rejecting invalid requests with meaningful errors  

The implementation is written in **JavaScript (ES2022)** using:

- Private class fields  
- Immutable domain objects  
- Dependency injection  
- Unit tests (Jest)

---

## 🧠 Business Rules Implemented

### ✔ Ticket Types
- **ADULT** – £25  
- **CHILD** – £15  
- **INFANT** – £0  

### ✔ Rules
- Up to **25 tickets** may be purchased in a single request  
- **Infants do not get seats**  
- **Child and Infant tickets require at least one Adult ticket**  
- **Infants cannot exceed the number of Adults**  
- All accounts with ID > 0 are considered valid  
- Payment always succeeds  
- Seat reservation always succeeds  

### ✔ External Services (Provided)
- `TicketPaymentService`  
- `SeatReservationService`  

These are treated as unmodifiable third‑party dependencies.

---

## 🏗️ Architecture

```
src/
  domain/
    TicketTypeRequest.js   # Immutable ticket request object
  errors/
    InvalidPurchaseError.js
  thirdparty/
    TicketPaymentService.js
    SeatReservationService.js
  TicketService.js          # Main implementation

test/
  TicketService.test.js     # Jest unit tests
```

### Key Design Choices
- **Immutability**: `TicketTypeRequest` uses private fields + `Object.freeze()`
- **Encapsulation**: All TicketService logic is private (`#methods`)
- **Dependency Injection**: External services passed into constructor
- **Pure Functions**: Validation and calculations isolated and testable
- **Fail Fast**: Invalid requests throw `InvalidPurchaseError`

---

## 🧪 Running Tests

### Install dependencies
```bash
npm install
```

### Run the test suite
```bash
npm test
```

All tests are located in `test/TicketService.test.js`.

---

## ▶️ Usage Example

```js
import { TicketService } from './src/TicketService.js';
import { TicketTypeRequest, TicketType } from './src/domain/TicketTypeRequest.js';
import { TicketPaymentService } from './src/thirdparty/TicketPaymentService.js';
import { SeatReservationService } from './src/thirdparty/SeatReservationService.js';

const paymentService = new TicketPaymentService();
const seatService = new SeatReservationService();

const service = new TicketService(paymentService, seatService);

service.purchaseTickets(
  1,
  new TicketTypeRequest(TicketType.ADULT, 2),
  new TicketTypeRequest(TicketType.CHILD, 1),
  new TicketTypeRequest(TicketType.INFANT, 1)
);
```

---

## 🚫 Invalid Requests (Examples)

The following will throw `InvalidPurchaseError`:

- `purchaseTickets(0, ...)` — invalid account  
- `purchaseTickets(1)` — no ticket requests  
- More than 25 total tickets  
- Child or Infant tickets without an Adult  
- More Infants than Adults  
- Negative or zero ticket quantities  

---

## ✔️ What This Implementation Demonstrates

- Clean, maintainable code  
- Strong domain modelling  
- Correct enforcement of business rules  
- Proper error handling  
- Test‑driven approach  
- Clear separation of concerns  
- Immutable data structures  
- Realistic service integration  

---

## 📄 License
This project is provided as part of a coding exercise.
