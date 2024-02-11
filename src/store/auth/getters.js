import { LocalStorage, SessionStorage } from "quasar";

export function user (state) {
  return state.user
}

export function authenticated (state) {
  return (state.user !== null)
}

export const check = state => (roles) => {
  const user = state.user
  //  console.log('user type is ' + usertype + ' and roles is ' + roles)
  if (roles === undefined) {
    if (!user) {
    //  console.log('check exit as no user false')
      return false
    } else if (user && (user.role !== roles)) {
      //  console.log('check exit with user and role false')
      return false
    } else if (user && (user.role === roles)) {
    //  console.log('check exit with user true')
      return true
    }
  }
}

export const audit = state => (data) => {

  const user = LocalStorage.getItem("user")
  let datos = {}
  datos = {
    usuario: user,
    codeapp: data.codeapp,
    data: data.object
  }

  return datos
}
