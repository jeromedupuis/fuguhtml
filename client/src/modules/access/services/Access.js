import Vue from 'vue';

export default function() {
  return {

    /**
     * hasModuleAccess : check if module can be use or not
     * @key (string) namespace on the module
     * = return Boolean
     */
    hasModuleAccess(key) {
      if(key in Vue.$module && Vue.$module[key] !== true) return false;

      let module = Vue.$store.state.access.modules[key];
      if(module) {
        if(module === true) {
          return true;
        }
        if(module.access === true) {
          return true;
        }
      }
      return false;
    }
  };
}
