import Vue from 'vue';

import UtilMixins from './Util';
import LayoutMixins from './Layout';
import MomentMixins from './Moment';
import FirestoreMixins from './Firestore';

Vue.mixin(UtilMixins);
Vue.mixin(LayoutMixins);
Vue.mixin(MomentMixins);
Vue.mixin(FirestoreMixins);
