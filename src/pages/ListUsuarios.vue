<template>
  <q-page class="q-pa-sm">
    <!-- <div class="q-pa-md"> -->
    <!-- <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"> -->
        <div class="q-pa-sm q-gutter-sm">
          <q-card>
            <q-card-section class="text-h6 q-pa-none">
              <q-item>
                <q-item-section avatar class="">
                  <q-icon color="blue" name="manage_accounts" size="34px" />
                </q-item-section>
                <q-item-section>
                  <div
                    class="text-overline text-weight-medium"
                    style="font-size: 20px"
                  >
                    Lista Usuarios
                  </div>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
        <div class="q-pa-sm q-gutter-sm">
          <q-card>
            <q-separator />
            <q-card-section class="q-pa-none">
              <!-- <q-item>
                <q-item-section> -->
                  <q-tabs v-model="tab" dense class="text-grey" active-color="blue" indicator-color="blue" align="justify" narrow-indicator>
                    <q-tab name="mails0" icon="list_alt" label="Lista" />
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="mails0">
                      
                      <q-table class="no-shadow" :data="listUsuarios"
                      title="Listado" :hide-header="mode === 'grid'"
                      :columns="columnslist" row-key="name"
                      :pagination.sync="pagination">
                      <template v-slot:top-right="props">

                        <q-btn flat round dense
                          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                          @click="props.toggleFullscreen" v-if="mode === 'list'" class="q-px-sm">
                          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{
                              props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
                            }}
                          </q-tooltip>
                        </q-btn>

                        <q-btn
                          @click="showPopupRegistroUsuario()" push
                          size="sm" color="green" class="text-capitalize text-white" icon-right="">
                          <q-icon name="add" color="blue-grey"/>
                          &nbsp; Agregar Usuario
                        </q-btn>
                      </template>
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td key="usu_id" :props="props"  class="text-weight-bold text-blue">
                            {{ props.row.usu_id }}
                          </q-td>                       
                          <q-td key="usu_login" :props="props"  class="text-weight-bold text-blue">
                            {{ props.row.usu_login }}
                          </q-td>
                          <q-td key="usu_last_access" :props="props">
                            {{ formatDateDDMMYYYYHHMM(props.row.usu_last_access) }}
                          </q-td>
                          <q-td key="per_ap_paterno" :props="props">
                            {{ props.row.persona.per_ap_paterno + ' ' + props.row.persona.per_ap_materno + ', ' + props.row.persona.per_nombres}}
                          </q-td>
                          <q-td key="per_email_institucional" :props="props">
                            {{ props.row.persona.per_email_institucional }}
                          </q-td>     
                          <q-td key="roles" :props="props">
                            {{ getRol(props.row.roles) }}
                          </q-td>
                          <q-td key="usu_estado" :props="props" :class="props.row.usu_estado == true
                                ? 'text-blue-10' : 'text-red-14'">
                                <q-toggle v-model="props.row.usu_estado"
                                  checked-icon="check" color="green"
                                  unchecked-icon="clear" @input="savedEstado(props.row)"/>
                          </q-td>
                        </q-tr>
                      </template>
                    </q-table>
                      
                    </q-tab-panel>
                  </q-tab-panels>
                <!-- </q-item-section>
              </q-item> -->
            </q-card-section>
          </q-card>
        </div>
      <!-- </div>
    </div> -->

    <template>
      <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="showPopupRegUsuario">
          <q-card style="width: 600px; max-width: 80vw">
          <q-toolbar>
            <q-avatar>
              <q-icon color="blue" name="person_add" size="34px" />
            </q-avatar>

            <q-toolbar-title class="text-weight-light">
              <span class="text-weight-bold"></span>
              Registrar Usuario
            </q-toolbar-title>

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-separator></q-separator>

          <q-card-section class="q-pt-none">

            <q-list bordered class="rounded-borders" style="max-width: 550px">

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-bold">Usuario(DNI):</q-item-label>
                  </q-item-section>

                  <q-item-section top class="col-lg-6 col-md-6">
                        <q-input dense outlined stack-label maxlength="8" mask="########"
                            class="full-width col-lg-8 col-md-8" v-model="usuario.per_nro_doc_identidad">
                            <template v-slot:append>
                              <q-icon name="badge" />
                            </template>
                        </q-input>
                  </q-item-section>
                  <q-item-section top class="col-lg-1 col-md-1">
                        <q-btn color="blue" icon-right="person_search" @click="BuscarPersonaDni()">
                          <q-tooltip class="bg-accent">Buscar DNI en Reniec</q-tooltip>
                        </q-btn>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-bold">Ap. Paterno:</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <div class="row">
                        <q-input dense outlined stack-label maxlength="20"
                            class="full-width" v-model="usuario.per_ap_paterno"/>
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-bold">Ap. Materno:</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <div class="row">
                        <q-input dense outlined stack-label maxlength="20"
                            class="full-width" v-model="usuario.per_ap_materno"/>
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-bold">Nombres:</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <div class="row">
                        <q-input dense outlined stack-label maxlength="20"
                            class="full-width" v-model="usuario.per_nombres"/>
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-bold">Email:</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <div class="row">
                        <q-input dense outlined stack-label maxlength="60" type="email"
                            class="full-width" v-model="usuario.per_email_personal">
                            <template v-slot:append>
                              <q-icon name="mail" />
                            </template>
                        </q-input>
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-bold">Celular:</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <div class="row">
                        <q-input dense outlined stack-label maxlength="60" type="text"
                            class="full-width" v-model="usuario.per_celular" mask="(##) ### ### ###" fill-mask unmasked-value>
                            <template v-slot:append>
                              <q-icon name="phone_iphone" />
                            </template>
                        </q-input>
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-bold">Rol:</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <div class="row">
                      <q-select outlined dense option-value="apr_id" option-label="apr_descripcion" v-model="usuario.rol" :options="optionsRol" 
                          @input="getListMenuRolAccesos()" color="purple" label-color="purple">
                          <template v-slot:append>
                            <q-icon name="menu_open" />
                          </template>
                      </q-select>
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-bold">Accesos:</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <div class="row">
                      <div class="q-pa-md q-gutter-sm">
                        <q-tree
                          :nodes="listMenuRolAccesos"
                          dense
                          node-key="label"
                        />
                      </div>
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-bold"></q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <div class="row">
                      <div class="q-pa-sm q-gutter-sm">
                        <q-btn color="blue" icon-right="save" @click="GuardarUsuario()" label="Guardar Usuario" />
                      </div>
                    </div>
                  </q-item-section>
                </q-item>

              </q-list>
          </q-card-section>
        </q-card>
        </q-dialog>
      </div>
    </template>

  </q-page>
</template>

<script>
import {
  email,
  required,
  numeric,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import { LocalStorage, SessionStorage } from "quasar";
import { axiosIntranet } from "../boot/axios";
import Constants from "../utils/constants";

import { mapState, mapActions } from "vuex";
import { Notify } from "quasar";
import moment from "moment";
import XLSX from 'sheetjs-style';

export default {
  name: "ListUsuarios",
  data() {
    return {
      tab: "mails0",
      mode: "list",
      user: {},
      seleccionar: "Seleccionar",
      empresa: {},
      filterlist: "",
      pagination: {
        rowsPerPage: 10,
      },
      columnslist: [
        {
          name: "usu_id",
          align: "left",
          label: "ID",
          field: "usu_id",
          sortable: true,
        },
        {
          name: "usu_login",
          align: "left",
          label: "Usuario",
          field: "usu_login",
          sortable: true
        },
        {
          name: "usu_last_access",
          align: "left",
          label: "Ult. Logueo",
          field: "usu_last_access",
          sortable: true,
        },
        {
          name: "per_ap_paterno",
          align: "left",
          label: "Nombre Completo",
          field: "per_ap_paterno",
          sortable: true,
        },
        {
          name: "per_email_institucional",
          align: "left",
          label: "Email",
          field: "per_email_institucional",
          sortable: true,
        },
        {
          name: "roles",
          align: "left",
          label: "Rol",
          field: "roles",
          sortable: true,
        },
        {
          name: "usu_estado",
          align: "left",
          label: "Estado",
          field: "usu_estado",
          sortable: true,
        }
      ],
      card: false,
      showPopupRegUsuario: false,
      urlBackend: "",      
      userSeleccionado: {},
      listUsuarios: [],
      usuario: {
        usu_id: 0,
        per_id: 0,
        per_nro_doc_identidad: "",
        per_ap_paterno: "",
        per_ap_materno: "",
        per_nombres: "",
        per_email_personal: "",
        per_celular: "51",
        rol: null
      },
      optionsRol: Constants.ROLES,
      expanded: [ '', '' ],
      listMenuRolAccesos: []
    };
  },
  validations(){
        return {
          selectTenant :{
                required
            },
            selectAlmacen :{
                required
            }
        }
    },
  beforeCreate() {
    if (LocalStorage.has("token") && LocalStorage.has("user")) {
      const user = LocalStorage.getItem("user");
      this.user = user;
    }
  },
  created() {
    this.urlBackend = process.env.BACKEND_API_INTRANET;
    this.ListarUsuarios();
    let token = LocalStorage.getItem("token");
    // console.log(token)
  },
  mounted() {
  },
  beforeUpdate() {
  },
  methods: {
    formatDateDDMMYYYY: function (date) {
      return moment(date).format("DD/MM/YYYY");
    },
    mensajeError(campo) {
    },
    ListarUsuarios(){
      let token = LocalStorage.getItem("token");

        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
          axiosIntranet.get("/usuarios")
          .then((res) => {
            let total = res.data.total;

            if (total > 0) {
              let users = res.data.data;
              // console.log(users)
              this.listUsuarios = users.filter(x => x.roles.some(data => 
                                                {
                                                    let result = false;
                                                    let foundItem = Constants.ROLES.find(r => r.apr_id == data.apr_id);
                                                    if (foundItem !== undefined) {
                                                      result = true;
                                                    }
                                                    return result;
                                                }))
              // console.log(this.listUsuarios)
            } else {
              Notify.create({
                message: res.data.data.message,
                color: "warning",
              });
            }
          })
          .catch((err) => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Error. Please contact support." + err.response,
                color: "negative",
              });
            }
          });
    },
    savedEstado (row) {
      let token = LocalStorage.getItem("token");
      
      axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
      axiosIntranet.patch("/usuarios/" + row.usu_id, { 
              "usu_estado": row.usu_estado
            }).then((res) => {            
              Notify.create({
                message: "Operación exitosa!",
                color: "info",
              });
          }).catch((err) => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Error. Please contact support." + err.response,
                color: "negative",
              });
            }
          });
    },
    showPopupRegistroUsuario(){
      this.usuario = {
        usu_id: 0,
        per_id: 0,
        per_nro_doc_identidad: "",
        per_ap_paterno: "",
        per_ap_materno: "",
        per_nombres: "",
        per_email_personal: "",
        per_celular: "51",
        rol: null
      }
      this.showPopupRegUsuario = true;
    },
    GuardarUsuario(){
      const user = LocalStorage.getItem("user");
      if(this.usuario.per_nro_doc_identidad == ""){
        Notify.create({
                message: "Ingrese usuario(DNI)",
                color: "warning",
              });
        return
      }

      if(this.usuario.per_ap_paterno == ""){
        Notify.create({
                message: "Ingrese Ap. Paterno",
                color: "warning",
              });
        return
      }

      if(this.usuario.per_ap_materno == ""){
        Notify.create({
                message: "Ingrese Ap. Materno",
                color: "warning",
              });
        return
      }

      if(this.usuario.per_nombres == ""){
        Notify.create({
                message: "Ingrese Nombres",
                color: "warning",
              });
        return
      }

      if(this.usuario.per_email_personal == ""){
        Notify.create({
                message: "Ingrese el Email",
                color: "warning",
              });
        return
      }

      const found = this.listUsuarios.find(x => x.per_nro_doc_identidad == this.usuario.per_nro_doc_identidad)
      if(found !== undefined){
        Notify.create({
                message: "Ya existe un usuario con el mismo D.N.I.",
                color: "warning",
              });
        return
      }
      
      let token = LocalStorage.getItem("token");
      axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/createuser", { 
            user: this.usuario, usu_id: user.usu_id
          })
          .then((res) => {
            let success = res.data.success;

            if (success) {
              this.$q.dialog({
                title: 'Operación Exitosa',
                message: res.data.message,
                html: true,
                ok: {
                  push: true,
                  color: 'blue'
                },
                persistent: true
              }).onOk(() => {
                // console.log('>>>> OK')
              }).onCancel(() => {
                // console.log('>>>> Cancel')
              }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              })

              this.showPopupRegUsuario = false;
              this.ListarUsuarios();
            } else {
              Notify.create({
                message: res.data.message,
                color: "warning",
              });
            }
          })
          .catch((err) => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Error. Please contact support." + err.response,
                color: "negative",
              });
            }
          });

    },
    getListMenuRolAccesos(){
      let token = LocalStorage.getItem("token");
      const _apr_id = this.usuario.rol == null ? null : this.usuario.rol.apr_id;

      if(_apr_id !== null){
      axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
      axiosIntranet.post("/getlistpaginasrolapp",
              {
                apr_id: _apr_id,
                app_codigo: process.env.CODE_APP
              }).then((res) => {              
                this.listMenuRolAccesos = res.data.data.menu;
            }).catch((err) => {
              if (err.response) {
                let code = err.response.data.code;
                Notify.create({
                  message: "Error. " + err.response,
                  color: "negative",
                });
              }
            });
          }

    },
    formatDateDDMMYYYYHHMM: function (date) {
      return moment(date).format("DD/MM/YYYY HH:mm");
    },
    getRol: function (row) {
      let roles = "";
      for (const item of row) {
        let foundItem = Constants.ROLES.find(x => x.apr_id == item.apr_id);
        if (foundItem !== undefined) {
          roles += ` ${foundItem.apr_descripcion}`
        }
      }
      return roles;
    },
    BuscarPersonaDni(){
      if(this.usuario.per_nro_doc_identidad == ""){
        Notify.create({
                message: "Ingrese usuario(DNI)",
                color: "warning",
              });
        return
      }
      
      let token = LocalStorage.getItem("token");
      axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
      axiosIntranet.post("/externo/getpersonadni", { 
            dni: this.usuario.per_nro_doc_identidad
          })
          .then((res) => {
            let success = res.data.success;
            if (success) {
              this.usuario.per_nombres = res.data.data.nombres
              this.usuario.per_ap_paterno = res.data.data.apellido_paterno
              this.usuario.per_ap_materno = res.data.data.apellido_materno
            } else {
              Notify.create({
                message: res.data.message,
                color: "warning",
              });
            }
          }).catch((err) => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Error. Please contact support." + err.response,
                color: "negative",
              });
            }
          });

    },
  }
};
</script>

<style>
.my-table-details {
  font-size: 0.95em;
  font-style: italic;
  width: 350px;
  white-space: normal;
  color: #555;
  margin-top: 2px;
}
</style>

