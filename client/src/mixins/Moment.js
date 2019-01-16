import moment from 'moment';
import _ from 'lodash';
export default {
  filters: {
    moment: function(value, format) {
      let date = new Date;
      if(_.isObject(value)) {
        date = value.toDate();
      } else {
        date = value;
      }
      return moment(date).format(format);
    }
  }
};
