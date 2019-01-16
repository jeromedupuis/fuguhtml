import Vue from 'vue';
import VueI18n from 'vue-i18n';
import LangStore from './store/lang';

Vue.use(VueI18n);

const messages = Vue.$service.lang;
export default new VueI18n({
  locale: LangStore.state.locale,
  messages
});
