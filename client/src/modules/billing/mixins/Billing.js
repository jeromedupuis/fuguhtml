import numeral from 'numeral';

const symbols = {
  'JPY': '¥'
};
export default {

  filters: {
    currencySymbol(currency) {
      if(currency in symbols) {
        return symbols[currency];
      }
      return currency;
    },
    dueAmountFormat(value) {
      return numeral(value).format('0,0');
    }
  }
};
