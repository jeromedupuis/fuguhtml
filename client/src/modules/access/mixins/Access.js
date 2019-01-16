import Vue from 'vue';

export default {
  methods: {

    /**
     * hasModuleAccess : check if module can be use or not
     * @key (string) namespace on the module
     * = return Boolean from service hasModuleAccess
     */
    hasModuleAccess(key) {
      return Vue.$service.access.hasModuleAccess(key);
    }
  }
};
