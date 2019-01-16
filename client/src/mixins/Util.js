import moment from 'moment';

export default {
  filters: {
    uppercase: function(value) {
      if(!value) {
        return value;
      }
      return value.toUpperCase() || "";
    },
    capitalize: function(value) {
      if(!value) {
        return value;
      }
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    getDateFormat(date) {
      return moment(date).format('YYYY/MM/DD');
    },
    isDeepEqual(a, b) {
      if (typeof a !== "object" || typeof b !== "object") {
        return a === b;
      }
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) {
        return false;
      }
      return aKeys.every(key => this.isDeepEqual(a[key], b[key]));
    }
  }
};
