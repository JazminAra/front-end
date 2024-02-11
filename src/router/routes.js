import { LocalStorage } from 'quasar'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('pages/Usuario/Login.vue')
  },
  {
    path: '/recoverypassword',
    component: () => import('pages/Usuario/RecoveryPassword.vue')
  },
  {
    path: '/BusquedaExterna',
    name: 'BusquedaExterna',
    component: () => import('pages/BusquedaExterna.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayoutApp.vue'),
    children: [
   
      {path: '/Dashboard', name: 'Dashboard',component: () => import('pages/Inicio.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      /* 
      {path: '/Crud_auspiciador', name: 'Crud_auspiciador', component: () => import('pages/Crud_auspiciador.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      {path: '/Listar_auspiciador', name: 'Listar_auspiciador', component: () => import('pages/Listar_auspiciador.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      {path: '/Crud_auspicio', name: 'Crud_auspicio', component: () => import('pages/Crud_auspicio.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      {path: '/Listar_auspicio', name: 'Listar_auspicio', component: () => import('pages/Listar_auspicio.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      {path: '/Subir_participantes', name: 'Subir_participantes', component: () => import('pages/Subir_participantes.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
       */
      {path: '/Perfil', name: 'Perfil', component: () => import('pages/MiPerfil.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      {path: '/ListUsuarios', name: 'ListUsuarios', component: () => import('pages/ListUsuarios.vue'),
        beforeEnter: (to, from, next) => {
          ifAuthenticated(to, from, next)
        }
      },
      {path: '/Prestamos', name: 'Prestamos',component: () => import('pages/Prestamos.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      {path: '/Academico/Oficinas', name: 'Oficinas',component: () => import('pages/Academico/Oficinas.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      {path: '/Academico/Escuelas', name: 'Escuelas',component: () => import('pages/Academico/Escuelas.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      {path: '/Academico/Sedes', name: 'Sedes',component: () => import('pages/Academico/Sedes.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      {path: '/Academico/Facultades', name: 'Facultades',component: () => import('pages/Academico/Facultades.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      {path: '/Academico/TipoOrgano', name: 'AcademicoAdmiTipoOrgano',component: () => import('pages/Academico/TipoOrgano.vue'), beforeEnter: (to, from, next) => {
        ifAuthenticated(to, from, next)
      }},
      // {path: '/Report', name: '/Report',component: () => import('pages/Report.vue'), beforeEnter: (to, from, next) => {
      //   ifAuthenticated(to, from, next)
      // }},
      {path: '/AccesoRestringido', name: 'AccesoRestringido', component: () => import('pages/AccesoRestringido.vue')},
]},
     
]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}
const ifAuthenticated = (to, from, next) => {
  if (LocalStorage.getItem('token')) {
    next()
    return
  }
  window.location.href = '/'
}
export default routes
