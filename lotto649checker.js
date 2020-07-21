// eslint-disable-next-line
const debug = require('debug')('lotto649checker');
const R = require('ramda');

module.exports = ({ winningTicket = {}, pickedNumbers = [] }) => {
  const { nums: winningNumbers = [], spl: special = NaN } = winningTicket;
  const nums = R.filter(R.flip(R.contains)(winningNumbers), pickedNumbers);
  const spl = R.filter(R.equals(special), pickedNumbers);
  debug({ nums, spl });

  let prize = `${nums.length}${spl.length}`;
  debug({ prize });

  switch (prize) {
    case '61':
    case '60': prize = 1; break;
    case '51': prize = 2; break;
    case '50': prize = 3; break;
    case '41': prize = 4; break;
    case '40': prize = 5; break;
    case '31': prize = 6; break;
    case '21': prize = 7; break;
    case '30': prize = 8; break;
    default: prize = -1;
  }

  return { nums, spl, prize };
};
