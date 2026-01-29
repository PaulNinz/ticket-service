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
This project includes a full Jest test suite that validates all business rules and service interactions.

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

## ▶️ Running the Application (Two Options)

You can run the TicketService in two different ways depending on what you want to test:  
**(1) Command‑line execution** or **(2) API + Browser UI**.

---

## **Option 1 — Run via Command Line (`run.js`)**

This mode executes the TicketService directly using predefined inputs.

### Run the script:
```bash
node run.js
```

This is useful for quickly verifying backend logic without using the UI.

---

## **Option 2 — Run the API + Browser Interface (`api.js`)**

The project also exposes a simple HTTP API and a browser‑based UI for interacting with the TicketService visually.

### Start the API server:
```bash
node api.js
```

### Then open the UI in your browser:
```
http://localhost:3000
```

From here you can:

- Enter account ID  
- Select ticket quantities  
- View the summary  
- Submit a purchase  
- See validation errors  
- View the success screen  

This provides a complete end‑to‑end demonstration of the TicketService.

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

# 🧠 **Design Decisions **

## **Design Decisions**

### **1. Strong Domain Modelling**
`TicketTypeRequest` is an immutable value object.  
This ensures:

- No accidental mutation  
- Validation happens at construction time  
- Business logic receives only valid domain data  

This mirrors real enterprise DDD (Domain‑Driven Design) patterns.

---

### **2. Dependency Injection**
`TicketService` receives its dependencies (`TicketPaymentService`, `SeatReservationService`) via constructor injection.

Benefits:

- Easy to mock in tests  
- No hard‑coded dependencies  
- Clear separation of concerns  
- Matches real‑world service architecture  

---

### **3. Encapsulation with Private Fields**
All internal logic is hidden using `#private` methods.

Benefits:

- Prevents misuse  
- Keeps the public API clean  
- Ensures business rules cannot be bypassed  

---

### **4. Fail‑Fast Validation**
Invalid requests throw `InvalidPurchaseError` immediately.

Benefits:

- No partial processing  
- Clear error semantics  
- Predictable behaviour  

---

### **5. Pure Calculation Methods**
Seat and payment calculations are isolated and deterministic.

Benefits:

- Easy to test  
- Easy to reason about  
- No side effects  

---

### **6. Separation of Layers**
- **Domain** (TicketTypeRequest)  
- **Service** (TicketService)  
- **Infrastructure** (third‑party services)  
- **API** (Express server)  
- **UI** (HTML wizard)  

---

# 🚀 **Future Improvements **

## **Future Improvements**

### **1. Add TypeScript**
Would provide stronger type safety and clearer contracts.

### **2. Add Logging & Monitoring**
Integrate Winston or pino for structured logs.

### **3. Add More API Endpoints**
Examples:

- `/health`  
- `/pricing`  
- `/events/:id/tickets`  

### **4. Add Rate Limiting**
Prevent abuse of the purchase endpoint.

### **5. Add Authentication**
Require login before purchasing tickets.

### **6. Add Real Payment Gateway Integration**
Stripe, Adyen, or Braintree.

### **7. Add Real Seat Allocation Logic**
Integrate with a real seat map or event inventory system.

### **8. Add CI/CD Pipeline**
GitHub Actions to run tests on every push.

### **9. Add Swagger/OpenAPI Documentation**
Auto‑generated API docs.

### **10. Add More UI Features**
- Seat selection  
- Event selection  
- Price breakdown animations  

---


## 📄 License
This project is provided as part of a coding exercise.
