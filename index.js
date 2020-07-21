const R = require('ramda');
const { promises: fs } = require('fs');

const lotto649loader = require('./lotto649loader');
const lotto649checker = require('./lotto649checker');

async function main() {
  const winningTickets = await lotto649loader();
  const pickedTickets = JSON.parse(await fs.readFile(`${__dirname}/lotto649.json`));

  R.forEach((pickedNumbers) => {
    console.log(`\npicked numbers: ${pickedNumbers}`);
    R.forEach((winningTicket) => {
      const { date } = winningTicket;
      const { nums, spl, prize } = lotto649checker({ winningTicket, pickedNumbers });

      console.log(`${date} ${prize === -1 ? '沒中' : `中了 ${prize} 獎`} ${[...nums, ...spl]}`);
    }, winningTickets);
  }, pickedTickets);
}

main();
