const lotto649checker = require('../lotto649checker');

describe('lotto 649 checker', () => {
  const winningTicket = {
    nums: [1, 2, 3, 4, 5, 6],
    spl: 7,
  };

  test('get first prize - match 6 nums', () => {
    const pickedNumbers = [1, 2, 3, 4, 5, 6];
    const result = lotto649checker({ winningTicket, pickedNumbers });
    expect(result).toHaveProperty('prize', 1);
  });

  test('get second prize - match 5 nums, 1 spl', () => {
    const pickedNumbers = [1, 2, 3, 4, 5, 7];
    const result = lotto649checker({ winningTicket, pickedNumbers });
    expect(result).toHaveProperty('prize', 2);
  });

  test('get third prize - match 5 nums', () => {
    const pickedNumbers = [1, 2, 3, 4, 5, 16];
    const result = lotto649checker({ winningTicket, pickedNumbers });
    expect(result).toHaveProperty('prize', 3);
  });

  test('get fourth prize - match 4 nums, 1 spl', () => {
    const pickedNumbers = [11, 2, 3, 4, 5, 7];
    const result = lotto649checker({ winningTicket, pickedNumbers });
    expect(result).toHaveProperty('prize', 4);
  });

  test('get fifth prize - match 4 nums', () => {
    const pickedNumbers = [1, 2, 3, 4, 15, 16];
    const result = lotto649checker({ winningTicket, pickedNumbers });
    expect(result).toHaveProperty('prize', 5);
  });

  test('get sixth prize - match 3 nums, 1 spl', () => {
    const pickedNumbers = [11, 12, 3, 4, 5, 7];
    const result = lotto649checker({ winningTicket, pickedNumbers });
    expect(result).toHaveProperty('prize', 6);
  });

  test('get seventh prize - match 2 nums, 1 spl', () => {
    const pickedNumbers = [11, 12, 13, 4, 5, 7];
    const result = lotto649checker({ winningTicket, pickedNumbers });
    expect(result).toHaveProperty('prize', 7);
  });

  test('get eighth prize - match 3 nums', () => {
    const pickedNumbers = [11, 12, 13, 4, 5, 6];
    const result = lotto649checker({ winningTicket, pickedNumbers });
    expect(result).toHaveProperty('prize', 8);
  });

  test('miss it - match 1 num', () => {
    const pickedNumbers = [11, 12, 13, 14, 15, 6];
    const result = lotto649checker({ winningTicket, pickedNumbers });
    expect(result).toHaveProperty('prize', -1);
  });

  test('miss it - no match', () => {
    const pickedNumbers = [11, 12, 13, 14, 15, 16];
    const result = lotto649checker({ winningTicket, pickedNumbers });
    expect(result).toHaveProperty('prize', -1);
  });

  test('invalid data', () => {
    const result = lotto649checker({ winningTicket: undefined, pickedNumbers: undefined });
    expect(result).toHaveProperty('prize', -1);
  });
});
