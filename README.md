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


# 🚀 **Future Improvements **

## **Future Improvements**

### **1. Add Logging & Monitoring**
Integrate Winston or pino for structured logs.

### **2. Add More API Endpoints**
Examples:

- `/health`  
- `/pricing`  
- `/events/:id/tickets`  

### **3. Add Authentication**
Require login before purchasing tickets.

### **4. Add Real Payment Gateway Integration**

### **5. Add Real Seat Allocation Logic**
Integrate with a real seat map or event inventory system.

### **6. Add CI/CD Pipeline**
GitHub Actions to run tests on every push.

### **7. Add More UI Features**
- Seat selection  
- Event selection  
- Price breakdown animations  

### **8. Add Unit Test**
- Unit tests (Jest)

---


## 📄 License
This project is provided as part of a coding exercise.
