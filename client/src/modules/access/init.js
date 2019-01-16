/*
 * module name : アクセス
 * spacename : Access
 * version : 1.0.0
 * author: Jerome Dupuis
 * last updated : 2018.08.31
 */

import Store from './store';
import AccessMixins from './mixins/Access';
import AccessService from './services/Access';

export default {
  mixins: {
    access: AccessMixins
  },
  stores: {
    access: Store
  },
  services: {
    access: new AccessService
  }
};
