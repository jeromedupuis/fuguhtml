import Vue from 'vue';
import axios from 'axios';
axios.defaults.timeout = 5000;

var Api = axios.create({
  baseURL: `http://localhost:8082`,
  headers: {
    'x-access-token': localStorage.getItem('jwt') || ''
  }
});

export default new Vue({
  methods: {
    post(url, params) {
      return new Promise((resolve, reject) => {
        this.$Progress.start();
        Api.post(url, params)
          .then((response) => {
            if(response.data.error) {
              this.$Progress.fail();
              reject(response.data.error);
            } else {
              this.$Progress.finish();
              resolve(response.data);
            }
          })
          .catch((err) => {
            this.$Progress.fail();
            reject(err);
          });
      });
    },
    get(url, params) {
      return new Promise((resolve, reject) => {
        this.$Progress.start();
        Api.get(url, params)
          .then((response) => {
            if(response.data.error) {
              this.$Progress.fail();
              reject(response.data.error);
            } else {
              this.$Progress.finish();
              resolve(response.data);
            }
          })
          .catch((err) => {
            this.$Progress.fail();
            reject(err);
          });
      });
    },
    put(url, params) {
      return new Promise((resolve, reject) => {
        this.$Progress.start();
        Api.put(url, params)
          .then((response) => {
            if(response.data.error) {
              this.$Progress.fail();
              reject(response.data.error);
            } else {
              this.$Progress.finish();
              resolve(response.data);
            }
          })
          .catch((err) => {
            this.$Progress.fail();
            reject(err);
          });
      });
    },
    delete(url, params) {
      return new Promise((resolve, reject) => {
        this.$Progress.start();
        Api.delete(url, params)
          .then((response) => {
            if(response.data.error) {
              this.$Progress.fail();
              reject(response.data.error);
            } else {
              this.$Progress.finish();
              resolve(response.data);
            }
          })
          .catch((err) => {
            this.$Progress.fail();
            reject(err);
          });
      });
    }
  }
});
