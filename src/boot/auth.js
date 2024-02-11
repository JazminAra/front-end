function isArrayOrString (variable) {
  if (typeof variable === typeof [] || typeof variable === typeof '') {
    return true
  }
  return false
}

export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    const record = to.matched.find(record => record.meta.auth)
    if (record) {
      if (!store.getters['auth/authenticated']) {
        router.push('/')
      } else if (isArrayOrString(record.meta.auth) && !store.getters['auth/check'](record.meta.auth)) {
        router.push('/account')
      }
    }
    next()
  })

  var helper = {}
  helper.register = (data) => { return store.dispatch('auth/register', data) }
  helper.login = (data) => { return store.dispatch('auth/login', data) }
  helper.loginv2 = (data) => { return store.dispatch('auth/loginv2', data) }
  helper.logout = () => { return store.dispatch('auth/logout') }
  helper.fetch = () => { return store.dispatch('auth/fetch') }
  helper.authenticated = () => { return store.getters['auth/authenticated'] }
  helper.check = (roles) => { return store.getters['auth/check'](roles) }
  // helper.audit = (data) => { return store.getters['auth/audit'](codeapp, data) }
  helper.user = () => { return store.getters['auth/user'] }
  helper.recoverypassword = (data) => { return store.dispatch('auth/recoverypassword', data) }
  Vue.prototype.$auth = helper
}
