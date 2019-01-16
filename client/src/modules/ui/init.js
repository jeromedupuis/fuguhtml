/*
 * module name : UI
 * spacename : ui
 * version : 1.0.1.c
 * author: Jerome Dupuis
 * last updated : 2018.09.01
 */

/*
 * UI list
 * -- Datepicker
 * -- input radio
 * -- input checkbox
 * -- input switch checkbox
 * -- select (with multiple option)
 */

/*
 * Cross Browser :
 * -- Chrome (MacOS, ver. 68) : OK
 * -- Safari (MacOS, ver 11.0.2) : OK
 * -- Safari (W10, ver 5.1.7) : OK
 * -- Firefox (MacOS, ver 61.0.2) : OK
 * -- Edge (W10, ver 42.17074) : OK
 */

import UiMixins from './mixins/Ui.js';

export default {
  mixins: {
    ui: UiMixins
  }
};
