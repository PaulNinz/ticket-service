import express from 'express';
import { TicketService } from './src/TicketService.js';
import { TicketTypeRequest } from './src/domain/TicketTypeRequest.js';
import { TicketPaymentService } from './src/thirdparty/TicketPaymentService.js';
import { SeatReservationService } from './src/thirdparty/SeatReservationService.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.js';


const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.post('/purchase', (req, res) => {
  const { accountId, adult, child, infant } = req.body;

  const paymentService = new TicketPaymentService();
  const seatService = new SeatReservationService();
  const service = new TicketService(paymentService, seatService);

  const requests = [];
  if (adult > 0) requests.push(new TicketTypeRequest('ADULT', adult));
  if (child > 0) requests.push(new TicketTypeRequest('CHILD', child));
  if (infant > 0) requests.push(new TicketTypeRequest('INFANT', infant));

  try {
    service.purchaseTickets(accountId, ...requests);
    res.json({ status: 'success' });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});

app.get('/', (req, res) => {
  res.send('Server is alive');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

import cors from 'cors';
app.use(cors());