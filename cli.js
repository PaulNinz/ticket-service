import readline from 'readline';
import chalk from 'chalk';
import { TicketService } from './src/TicketService.js';
import { TicketTypeRequest } from './src/domain/TicketTypeRequest.js';
import { TicketPaymentService } from './src/thirdparty/TicketPaymentService.js';
import { SeatReservationService } from './src/thirdparty/SeatReservationService.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(q) {
  return new Promise(resolve => rl.question(q, a => resolve(a)));
}

function parseFlags() {
  const args = process.argv.slice(2);
  const flags = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = parseInt(args[i + 1], 10);
    flags[key] = value;
  }

  return flags;
}

async function purchaseFlow() {
  const flags = parseFlags();

  const accountId = flags.accountId || parseInt(await ask(chalk.cyan('Account ID: ')), 10);
  const adult = flags.adult ?? parseInt(await ask('Adult tickets: '), 10);
  const child = flags.child ?? parseInt(await ask('Child tickets: '), 10);
  const infant = flags.infant ?? parseInt(await ask('Infant tickets: '), 10);

  const paymentService = new TicketPaymentService();
  const seatService = new SeatReservationService();
  const service = new TicketService(paymentService, seatService);

  const requests = [];
  if (adult > 0) requests.push(new TicketTypeRequest('ADULT', adult));
  if (child > 0) requests.push(new TicketTypeRequest('CHILD', child));
  if (infant > 0) requests.push(new TicketTypeRequest('INFANT', infant));

  console.log(chalk.yellow('\nProcessing purchase...\n'));

  try {
    service.purchaseTickets(accountId, ...requests);
    console.log(chalk.green('Purchase completed successfully\n'));
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}\n`));
  }
}

async function menu() {
  while (true) {
    console.log(chalk.blue('\n=== Ticket Service Menu ==='));
    console.log('1. Purchase Tickets');
    console.log('2. Help');
    console.log('3. Exit\n');

    const choice = await ask(chalk.cyan('Choose an option: '));

    switch (choice.trim()) {
      case '1':
        await purchaseFlow();
        break;

      case '2':
        console.log(chalk.magenta('\nUse this system to purchase tickets.'));
        console.log('You can also use flags like:');
        console.log(chalk.yellow('--accountId 123 --adult 2 --child 1 --infant 1\n'));
        break;

      case '3':
        console.log(chalk.green('\nGoodbye!\n'));
        rl.close();
        return;

      default:
        console.log(chalk.red('Invalid option\n'));
    }
  }
}

menu();

