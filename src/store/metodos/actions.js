/*
export function someAction (context) {
}
*/
import { axiosIntranet } from "boot/axios";
import { LocalStorage, SessionStorage } from "quasar";

const REGISTER_ROUTE = "/users";
const LOGIN_ROUTE = "/authentication";
const USER_ROUTE = "/auth/user";

const GET_PERSONASGA = "/personasga";
const GET_APODERADOHIJOSSGA = "/apoderadohijos";

// fetch staff details
export function getPersonaSGA(state, data) {
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
    if (data) {
      return axiosIntranet
        .get(GET_PERSONASGA + "?per_login=" + data.per_login)
        .then(res => {
          //state.commit('setUser', res.data.user)
          //   console.log('fetch staff exit with user: ', res.data.data)
          return res.data.data;
        });
    } else {
    }
  }
}

export async function getPersonaSGA2(data) {
  let token;
  if (LocalStorage.has("token")) {
    token = LocalStorage.getItem("token");
  } else if (SessionStorage.has("token")) {
    token = SessionStorage.getItem("token");
  }

  axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
  await axiosIntranet.get(GET_PERSONASGA + "?per_login=" + data.per_login)
    .then((res) => {
      if (res.status === 200) {
        commit('set', res.data.data)
      }
    })
}

export function register(state, data) {
  return axiosIntranet.post(REGISTER_ROUTE, data);
}
