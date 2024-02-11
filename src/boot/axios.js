import axios from "axios";
import { Notify, Loading, QSpinnerFacebook, QSpinnerPuff  } from "quasar";
import { i18nInstance } from "boot/i18n";
// import route from '../router';
import router from '../router';
// import router from 'router';
import store from '../store';
// import Vue from 'vue';

// Vue.prototype.$axios = axios

const axiosIntranet = axios.create({
  //  baseURL: "http://localhost:3030"
  // baseURL: "http://192.168.11.13"
  // baseURL: "http://192.168.11.13"
  // baseURL: "https://apps-bkn.unitru.edu.pe",
  baseURL: process.env.BACKEND_API_INTRANET
  //baseURL: "http://localhost:3100/api/v1"

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

axiosIntranet.interceptors.request.use(loadFunction);
axiosIntranet.interceptors.response.use(finishFunction, errorFunction);

axiosIntranet.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let code = error.response.data.code;
    // console.log(error.response);
    // debugger;
    if (401 === error.response.status && error.response.config.url !== "/authentication") {
      // console.log(error.response);
      store().dispatch('auth/logout')
      // console.log(error.response.status);

      // if (LocalStorage.has("token"))
      //   console.log(LocalStorage.has("token"))
      // console.log("inicio redireccion")
      // router().push("/")
      // console.log("fin redireccion")
      // redirect('/')
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
  Vue.prototype.$axios = axiosIntranet;
  Vue.axios = Vue.prototype.$axios;
};

export { axiosIntranet };
