const { promises: fs } = require('fs');

const lotto649parser = require('../lotto649parser');

describe('lotto649', () => {
  test('parse latest page', async () => {
    const html = await fs.readFile(`${__dirname}/mockdata/latest`, 'utf-8');

    expect.assertions(1);
    expect(lotto649parser(html)).toMatchSnapshot();
  });

  test('parse history page', async () => {
    const html = await fs.readFile(`${__dirname}/mockdata/history`, 'utf-8');

    expect.assertions(1);
    expect(lotto649parser(html)).toMatchSnapshot();
  });

  test('parse period page', async () => {
    const html = await fs.readFile(`${__dirname}/mockdata/givenperiod`, 'utf-8');

    expect.assertions(1);
    expect(lotto649parser(html)).toMatchSnapshot();
  });
});
