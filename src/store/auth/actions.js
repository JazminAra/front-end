import { axiosIntranet } from "boot/axios";
import { LocalStorage, SessionStorage } from "quasar";
import { axiosApp } from "boot/axiosapp";

const REGISTER_ROUTE = "/usuarios";
const LOGIN_ROUTE = "/authentication";
const USER_ROUTE = "/auth/user";
const RECOVERY_PASSWORD = "/recoverypassword";
const LOGIN_ROUTE_V2 = "/auth/login";

export function register(state, data) {
  return axiosIntranet.post(REGISTER_ROUTE, data);
}

export function login(state, data) {
  return axiosIntranet.post(LOGIN_ROUTE, data).then(response => {
    // console.log(response.data)
    const token = response.data.accessToken;
    axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;

    //if (data.rememberMe) {
    LocalStorage.set("token", token);
    //} else {
    //  SessionStorage.set('token', token)
    //}
    const user = response.data.usuario;
    // console.log(user)

    LocalStorage.set("user", user);
  });
}

// fetch staff details
export function fetch(state, data) {
  //  console.log('fetch staff routine entered')
  //  console.log('staff email set as ', data)
  let token;
  if (LocalStorage.has("token")) {
    token = LocalStorage.getItem("token");
  } else if (SessionStorage.has("token")) {
    token = SessionStorage.getItem("token");
  }
  // console.log('fetch token set as ', token)
  if (token) {
    axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
    if (data === undefined) {
      return axiosIntranet.get(USER_ROUTE).then(res => {
        state.commit("setUser", res.data.user);
      });
    } else if (data) {
      return axiosIntranet
        .get(USER_ROUTE + "?apo_nro_doc_identidad=" + data)
        .then(res => {
          state.commit("setUser", res.data.user);
          //   console.log('fetch staff exit with user: ', res.data.data)
        });
    }
  }
}

export function recoverypassword(state, data) {
  axiosIntranet.defaults.headers.common["x-access-token"] = process.env.APIKEYBK;
  return axiosIntranet.post(RECOVERY_PASSWORD, data).then(response => {
    return response.data;
  })
  .catch((error) => {
    return error.response;
  })
  ;
}

export function logout(state) {
  if (LocalStorage.has("token")) {
    LocalStorage.remove("token");
  }
  if (LocalStorage.has("user")) {
    LocalStorage.remove("user");
  }
  if (SessionStorage.has("token")) {
    SessionStorage.remove("token");    
  }
  if (SessionStorage.has("token")) {
    SessionStorage.remove("user");
  }
  // console.log("call logout")

  state.commit("setUser", null);
}

export function loginv2(state, data) {
  return axiosApp.post(LOGIN_ROUTE_V2, data).then(response => {
    // console.log(response.data)    
    axiosApp.defaults.headers.common["Authorization"] = "Bearer " + token;

    const token = response.data.token;
    LocalStorage.set("token", token);
    const user = response.data.user;
    LocalStorage.set("user", user);
  });
}
