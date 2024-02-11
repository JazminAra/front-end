// import something here
import VueAnalytics from 'vue-analytics'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue, router }) => {
  // something to do
  Vue.use(VueAnalytics, {
    id: 'G-7246XX42G9',
    router,
  })
}
