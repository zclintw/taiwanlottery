const debug = require('debug')('lotto649loader');
const R = require('ramda');
const puppeteer = require('puppeteer');
const moment = require('moment');
const Promise = require('bluebird');

const lotto649parser = require('./lotto649parser');

const now = moment().utcOffset(480);
const getPastPeriods = R.pipe(
  R.times(() => now.subtract('1', 'M').format('YYYY-M')),
  R.map(R.split('-')),
  R.map(([year, month]) => [`${parseInt(year, 10) - 1911}`, month]),
);

const LOTTO649 = 'https://www.taiwanlottery.com.tw/Lotto/Lotto649/history.aspx';
const QUERY_BY_YM_SEL = '#Lotto649Control_history_radYM';
const DROP_YEAR_SEL = '#Lotto649Control_history_dropYear';
const DROP_MONTH_SEL = '#Lotto649Control_history_dropMonth';
const DROP_SUBMIT_SEL = '#Lotto649Control_history_btnSubmit';
const QUERY_RESULTS_TABLE_SEL = '#Lotto649Control_history_dlQuery';

module.exports = async () => {
  const pastPeriods = getPastPeriods(3);
  debug({ pastPeriods });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(LOTTO649);

  await page.click(QUERY_BY_YM_SEL);
  await page.waitForSelector(QUERY_RESULTS_TABLE_SEL);
  const latestContent = await page.content();
  const latestData = lotto649parser(latestContent);

  const historyData = await Promise.mapSeries(pastPeriods, async ([optY, optM]) => {
    await page.select(DROP_YEAR_SEL, optY);
    await page.select(DROP_MONTH_SEL, optM);
    await page.click(DROP_SUBMIT_SEL);
    await page.waitForSelector(QUERY_RESULTS_TABLE_SEL);
    const content = await page.content();
    const data = lotto649parser(content);
    return data;
  });

  page.close();
  browser.close();

  const winningTickets = R.uniq(R.flatten([latestData, historyData]));

  return winningTickets;
};
