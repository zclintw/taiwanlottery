const cheerio = require('cheerio');
const R = require('ramda');

const HISTORY_TABLE = '#Lotto649Control_history_dlQuery > tbody > tr > td > table';
const getDrawTermSel = (period) => `#Lotto649Control_history_dlQuery_L649_DrawTerm_${period}`;
const getDrawDateSel = (period) => `#Lotto649Control_history_dlQuery_L649_DDate_${period}`;
const getDrawNoSel = (period, index) => `#Lotto649Control_history_dlQuery_No${index}_${period}`;
const getDrawSNoSel = (period) => `#Lotto649Control_history_dlQuery_SNo_${period}`;

module.exports = (html) => {
  const $ = cheerio.load(html);
  const data = [];

  $(HISTORY_TABLE).each((period) => {
    const term = $(getDrawTermSel(period)).text();
    const date = $(getDrawDateSel(period)).text();
    const spl = parseInt($(getDrawSNoSel(period)).text(), 10);
    const nums = R.compose(
      R.map((i) => parseInt($(getDrawNoSel(period, i + 1)).text(), 10)),
      R.times(R.identity),
    )(6);

    data.push({
      term, date, nums, spl,
    });
  });

  return data;
};
