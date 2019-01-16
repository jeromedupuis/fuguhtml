/*
 * module name : 通知
 * spacename : notification
 * version : 1.0.1
 * author: Jerome Dupuis
 * last updated : 2018.08.31
 */

/*
 * Cross Browser :
 * -- Chrome (MacOS, ver. 68) : OK
 * -- Safari (MacOS, ver 11.0.2) : OK
 * -- Safari (W10, ver 5.1.7) : OK
 * -- Firefox (MacOS, ver 61.0.2) : OK
 * -- Edge (W10, ver 42.17074) : OK
 */

import Store from './store';
import NotificationMixins from './mixins/Notification.js';

export default {
  stores: {
    notification: Store
  },
  mixins: {
    notification: NotificationMixins
  }
};
