import axios from "axios";
import { Notify, Loading, QSpinnerFacebook, QSpinnerPuff } from "quasar";
import { i18nInstance } from "boot/i18n";
// import route from '../router';
import router from '../router';
// import router from 'router';
import store from '../store';
// import Vue from 'vue';

const axiosApp = axios.create({
  baseURL: process.env.BACKEND_API_APP
  // baseURL: "http://localhost:3100/api/v1"
});

let loadFunction = config => {
  Loading.show({
    spinner: QSpinnerPuff,
    spinnerColor: 'light-blue',
  });
  return config;
};
let finishFunction = response => {
  Loading.hide();
  return response;
};
let errorFunction = error => {
  Loading.hide();
  return Promise.reject(error);
};

axiosApp.interceptors.request.use(loadFunction);
axiosApp.interceptors.response.use(finishFunction, errorFunction);

axiosApp.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let code = error.response.data.code;
    // console.log(error.response);
    // debugger;
    if (401 === error.response.status && error.response.config.url !== "/authentication") {
      store().dispatch('auth/logout')
      location.reload(true)

    } else {
      if (!error.response) {
        Notify.create(i18nInstance.t("errors.network"));
      }
      // console.log(error)

      return Promise.reject(error);
    }
  }
);

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosApp;
  Vue.axios = Vue.prototype.$axios;
};

export { axiosApp };
