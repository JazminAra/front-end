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
                  <q-icon color="blue" name="domain" size="34px" />
                </q-item-section>
                <q-item-section>
                  <div
                    class="text-overline text-weight-medium"
                    style="font-size: 20px"
                  >
                    Instituciones
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
                    <q-tab name="mails0" icon="list_alt" label="Lista Instituciones" />
                    <!-- <q-tab name="alarms" icon="store_mall_directory" label="R.U.C." />
                    <q-tab name="movies" icon="local_hospital" label="ESSALUD" /> -->
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="mails0">
                      
                      <q-table class="no-shadow" :data="listAuspiciadores"
                      title="Listado de Instituciones" :hide-header="mode === 'grid'"
                      :columns="columnslistAuspiciadores" row-key="name"
                      :filter="filterlistAuspiciadores" :pagination.sync="pagination">
                      <template v-slot:top-right="props">
                        <q-input borderless
                          dense debounce="300" v-model="filterlistAuspiciadores" placeholder="Buscar">
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>

                        <q-space/>

                        <q-btn flat round dense
                          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                          @click="props.toggleFullscreen" v-if="mode === 'list'" class="q-px-sm">
                          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                            >{{
                              props.inFullscreen
                                ? "Exit Fullscreen"
                                : "Toggle Fullscreen"
                            }}
                          </q-tooltip>
                        </q-btn>

                        <q-btn
                          @click="downloadReporte()"
                          push
                          size="sm"
                          color="green"
                          class="text-capitalize text-white"
                          icon-right=""
                        >
                          <q-icon name="downloading" color="blue-grey"/>
                          &nbsp; Reporte
                        </q-btn>
                      </template>
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td key="apd_created" :props="props">
                            <!-- {{ props.row.apd_created }} -->
                            {{formatDateDDMMYYYY(props.row.apd_created)}}
                          </q-td>
                          <q-td key="emp_ruc" :props="props">
                            {{ props.row.emp_ruc }}
                          </q-td>
                          <q-td key="emp_razon_social" :props="props"  class="text-weight-bold text-blue" :style="{width: '300px', whiteSpace: 'normal'}">
                            {{ props.row.emp_razon_social }}
                          </q-td>
                          <q-td key="emp_nombre_comercial" :props="props"  class="text-weight-bold text-blue" :style="{width: '250px', whiteSpace: 'normal'}">
                            {{ props.row.emp_nombre_comercial }}
                          </q-td>
                          <q-td key="emp_sunat_rep_legal_nombre" :props="props">
                            {{ props.row.emp_sunat_rep_legal_nombre }}
                          </q-td>
                          <q-td key="apd_resolucion" :props="props">
                            <q-btn dense
                                  color="light-blue" icon="cloud_download"                                  
                                  @click="downloadFile(props.row)">
                                  <q-tooltip class="bg-accent">Descargar</q-tooltip>
                            </q-btn>
                            {{ props.row.apd_resolucion }}
                          </q-td>
                          <q-td key="apd_resolucion_fecha" :props="props">
                            {{ props.row.apd_resolucion_fecha }}
                          </q-td>
                          <q-td key="apd_estado" :props="props" :class="props.row.apd_estado == true
                                ? 'text-blue-10' : 'text-red-14'">
                                <q-btn
                                  dense
                                  color="light-blue"
                                  icon="manage_search"                                  
                                  @click="showAuspiciador(props.row)"
                                >
                                  <q-tooltip class="bg-accent">Ver mas Detalles</q-tooltip>
                                </q-btn>

                                <q-space />

                                <q-btn
                                  dense
                                  color="teal"
                                  icon="mode_edit"                                  
                                  @click="Editar(props.row)"
                                >
                                  <q-tooltip class="bg-accent">Editar</q-tooltip>
                                </q-btn>

                                <q-toggle
                                  v-model="props.row.apd_estado"
                                  :true-value="1"
                                  :false-value="0"
                                  checked-icon="check"
                                  color="green"
                                  unchecked-icon="clear"
                                  @input="savedEstado(props.row)"
                                />
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
        <!-- <q-btn label="Card" color="primary" @click="card = true" /> -->
        <q-dialog v-model="card">
          <q-card style="width: 550px; max-width: 80vw">
          <q-toolbar>
            <q-avatar>
              <img src="man.svg" />
            </q-avatar>

            <q-toolbar-title class="text-weight-light">
              <span class="text-weight-bold"></span>
              Institución [{{dataAuspiciador.apd_id}}]
              <!-- {{dataAuspiciador.emp_ruc}} - {{dataAuspiciador.emp_razon_social}} -->
            </q-toolbar-title>

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-separator></q-separator>

          <q-card-section class="q-pt-none">
              <!-- <div class="text-subtitle1">
                $・Italian, Cafe
              </div> -->
              <!-- <div class="text-caption text-grey">
                {{dataAuspiciador.emp_razon_social}}
              </div> -->

            <q-list bordered class="rounded-borders" style="max-width: 550px">
                <!-- <q-item-label header>Datos</q-item-label> -->

                <q-item>
                  <!-- <q-item-section avatar top>
                    <q-icon name="account_tree" color="black" size="34px" />
                  </q-item-section> -->

                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">RUC</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">{{dataAuspiciador.emp_ruc}}</span>
                      <!-- <span class="text-grey-8"> - GitHub repository</span> -->
                    </q-item-label>
                    <!-- <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                      <span class="cursor-pointer">Open in GitHub</span>
                    </q-item-label> -->
                  </q-item-section>

                  <!-- <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                      <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
                      <q-btn size="12px" flat dense round icon="more_vert" />
                    </div>
                  </q-item-section> -->
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Razón Social</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">{{dataAuspiciador.emp_razon_social}}</span>
                      <!-- <span class="text-grey-8"> - GitHub repository</span> -->
                    </q-item-label>
                    <!-- <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                      <span class="cursor-pointer">Open in GitHub</span>
                    </q-item-label> -->
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Nombre Comercial</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">{{dataAuspiciador.emp_nombre_comercial}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Dirección</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">{{dataAuspiciador.emp_sunat_direccion}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Representante Legal</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">{{dataAuspiciador.emp_sunat_rep_legal_docident}} - {{dataAuspiciador.emp_sunat_rep_legal_nombre}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <!-- <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Denominación</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">{{dataAuspiciador.apd_denominacion}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item> -->

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Resolución</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">Fecha: {{dataAuspiciador.apd_resolucion_fecha}} <br/> Resol.: {{dataAuspiciador.apd_resolucion}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Archivo Resolución</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">
                            <q-btn dense
                                  color="light-blue" icon="cloud_download"                                  
                                  @click="downloadFile(dataAuspiciador)">
                                  <q-tooltip class="bg-accent">Descargar</q-tooltip>
                            </q-btn>
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
          </q-card-section>
        </q-card>
        </q-dialog>
      </div>
    </template>
    <!-- <card-social icon_position="left" /> -->

    <!-- <card-charts /> -->

    <!-- <div class="row q-col-gutter-sm  q-py-sm">
      <tab-social />
      <card-with-image />
    </div> -->

    <!-- <div class="row q-col-gutter-sm  q-py-sm"> -->
    <!-- <todo-list /> -->

    <!-- <card-time-line /> -->
    <!-- </div> -->

    <!-- <table-visits /> -->
    <!-- </div> -->
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
import { axiosApp } from "../boot/axiosapp";

// import sgaService from "../services/sga";
import { mapState, mapActions } from "vuex";
import { Notify } from "quasar";
import moment from "moment";

export default {
  name: "Crud_auspiciador",
  data() {
    return {
      tab: "mails0",
      mode: "list",
      user: {},
      seleccionar: "Seleccionar",
      empresa: {},
      auspiciador: {
        empresa: {
          emp_id: 0,
          emp_ruc: "",
          emp_razon_social: "",
          emp_nombre_comercial: "",
          emp_sunat_estado: "",
          emp_sunat_condicion: "",
          emp_sunat_direccion: "",
          emp_sunat_finicio: "",
          emp_sunat_finscripcion: "",
          emp_ubigeo: "",
          emp_sunat_rep_legal_docident: "",
          emp_sunat_rep_legal_nombre: "",
          emp_sunat_rep_legal_cargo: "",
        },
        apd_id: 0,
        apd_resolucion: "",
        apd_resolucion_fecha: "",
        // apd_denominacion: "",
        apd_resolucion_file: null
      },
      listAuspiciadores: [],
      filterlistAuspiciadores: "",
      pagination: {
        rowsPerPage: 10,
      },
      columnslistAuspiciadores: [
        {
          name: "apd_created",
          align: "left",
          label: "Fecha Registro",
          field: "apd_created",
          sortable: true,
        },
        {
          name: "emp_ruc",
          align: "left",
          label: "RUC",
          field: "emp_ruc",
          sortable: true,
        },
        {
          name: "emp_razon_social",
          align: "left",
          label: "Razón Social",
          field: "emp_razon_social",
          sortable: true,
        },
        {
          name: "emp_nombre_comercial",
          align: "left",
          label: "Nombre Comercial",
          field: "emp_nombre_comercial",
          sortable: true,
        },
        {
          name: "emp_sunat_rep_legal_nombre",
          align: "left",
          label: "Repres. Legal",
          field: "emp_sunat_rep_legal_nombre",
          sortable: true,
        },
        {
          name: "apd_resolucion",
          align: "left",
          label: "Resolución",
          field: "apd_resolucion",
          sortable: true,
        },
        {
          name: "apd_resolucion_fecha",
          align: "left",
          label: "Resolución Fecha",
          field: "apd_resolucion_fecha",
          sortable: true,
        },
        {
          name: "apd_estado",
          align: "left",
          label: "Estado",
          field: "apd_estado",
          sortable: true,
        }
      ],
      card: false,
      dataAuspiciador: {}
    };
  },
  validations: {
    auspiciador:{
      empresa:{
        emp_ruc: {
          required,
          numeric,
        }
      },
      apd_resolucion:{
        required,
      },
      apd_resolucion_fecha:{
        required,
      },
      // apd_denominacion:{
      //   required,
      // },
    },
  },
  beforeCreate() {
    if (LocalStorage.has("token") && LocalStorage.has("user")) {
      const user = LocalStorage.getItem("user");
      // console.log(user);
      this.user = user;
    }
  },
  created() {
    const user = LocalStorage.getItem("user");
    let token = LocalStorage.getItem("token");

    this.ListarAuspiciadores();
  },
  mounted() {
    //this.getDatosPersonaAlumno();
    // console.log("mounted=============================");
  },
  beforeUpdate() {
    // console.log("beforeUpdate=============================");
  },
  methods: {
    formatDateDDMMYYYY: function (date) {
      return moment(date).format("DD/MM/YYYY");
    },
    mensajeError(campo) {
      // if (campo === "codigo") {
      //   if (!this.$v.alumno.codigo.required) return "Campo requerido";
      //   if (!this.$v.alumno.codigo.numeric) return "Campo númerico";
      // }
      // if (campo === "DNI") {
      //   if (!this.$v.persona.DNI.required) return "Campo requerido";
      //   if (!this.$v.persona.DNI.numeric) return "Campo númerico";
      // }
      if (campo === "RUC") {
        if (!this.$v.auspiciador.empresa.emp_ruc.required) return "Campo requerido";
        if (!this.$v.auspiciador.empresa.emp_ruc.numeric) return "Campo númerico";
      }
      if (campo === "Auspiciador") {
        if (!this.$v.auspiciador.apd_resolucion.required) return "Campo requerido";
        if (!this.$v.auspiciador.apd_resolucion_fecha.required) return "Campo requerido";
        // if (!this.$v.auspiciador.apd_denominacion.required) return "Campo requerido";
        // if (!this.$v.auspiciador.apd_resolucion.required) return "Campo requerido";
      }
      // if (campo === "Essaluddni") {
      //   if (!this.$v.personaEssalud.datos_personales.dni.required) return "Campo requerido";
      //   if (!this.$v.personaEssalud.datos_personales.dni.numeric) return "Campo númerico";
      // }
      // if (campo === "DNIALL") {
      //   if (!this.$v.personaAll.dni.required) return "Campo requerido";
      //   if (!this.$v.personaAll.dni.numeric) return "Campo númerico";
      // }
    },
    busquedaRUC() {
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      this.$v.auspiciador.empresa.$touch();
      if (!this.$v.auspiciador.empresa.$error) {

        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/getsunatruc", { ruc: this.auspiciador.empresa.emp_ruc })
          .then((res) => {
            // this.auspiciador = {};
            let success = res.data.success;

            if (success == true) {
              // console.log(res.data)
              let data = res.data.result;
              // this.alumno.codigo = this.alumno.idalumno;
              this.auspiciador.empresa.emp_ruc = data.RUC;
              this.auspiciador.empresa.emp_razon_social = data.RazonSocial;
              this.auspiciador.empresa.emp_nombre_comercial = data.NombreComercial;
              this.auspiciador.empresa.emp_sunat_estado = data.Estado;
              this.auspiciador.empresa.emp_sunat_condicion = data.Condicion;
              this.auspiciador.empresa.emp_sunat_direccion = data.Direccion;
              this.auspiciador.empresa.emp_sunat_finicio = data.FechaInicio;
              this.auspiciador.empresa.emp_sunat_finscripcion = data.FechaInscripcion;
              this.auspiciador.empresa.emp_ubigeo = data.Ubigeo;
              this.auspiciador.empresa.emp_sunat_rep_legal_docident = data.RepresentanteLegal[0].NroDocumento;
              this.auspiciador.empresa.emp_sunat_rep_legal_nombre = data.RepresentanteLegal[0].Nombre;
              this.auspiciador.empresa.emp_sunat_rep_legal_cargo = data.RepresentanteLegal[0].Cargo;
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
      }
    },
    NuevoAuspiciador(){
      this.auspiciador = {
        empresa:  {
          emp_id: 0,
          emp_ruc: "",
          emp_razon_social: "",
          emp_nombre_comercial: "",
          emp_sunat_estado: "",
          emp_sunat_condicion: "",
          emp_sunat_direccion: "",
          emp_sunat_finicio: "",
          emp_sunat_finscripcion: "",
          emp_ubigeo: "",
          emp_sunat_rep_legal_docident: "",
          emp_sunat_rep_legal_nombre: "",
          emp_sunat_rep_legal_cargo: "",
        },
        apd_id: 0,
        apd_resolucion: "",
        apd_resolucion_fecha: "",
        // apd_denominacion: "",
        apd_resolucion_file: null
      };
    },
    ListarAuspiciadores(){
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      // this.$v.auspiciador.$touch();
      // if (!this.$v.auspiciador.$error) {

        axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/getlistauspiciadores", { 
            // auspiciador: this.auspiciador 
          })
          .then((res) => {
            // this.auspiciador = {};
            let success = res.data.success;

            if (success == true) {
              // console.log(res.data)
              // let data = res.data.result;
              // Notify.create({
              //   message: res.data.message,
              //   color: "positive",
              // });
              // this.NuevoAuspiciador();
              this.listAuspiciadores = res.data.data;
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
      // }
    },
    GuardarAuspiciador(){
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      this.$v.auspiciador.$touch();
      if (!this.$v.auspiciador.$error) {

        axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/mantenedorauspiciador", { 
            auspiciador: this.auspiciador 
          })
          .then((res) => {
            // this.auspiciador = {};
            let success = res.data.success;

            if (success == true) {
              // console.log(res.data)
              // let data = res.data.result;
              Notify.create({
                message: res.data.message,
                color: "positive",
              });
              this.NuevoAuspiciador();
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
      }
    },
    savedEstado (row) {
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      // console.log(row)

      let dataAudit = {
            object: {
                apd_id: row.apd_id,
                apd_estado_old: row.apd_estado,
                apd_estado_new: row.apd_estado
            },            
            codeapp: process.env.CODE_APP      
      }

      let audit = this.$store.getters['auth/audit'](dataAudit)

      axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/updateauspiciador", {
            auspiciador: row,
            auditoria: audit
          })
          .then((res) => {
            // this.convalidaciones = {};
            let success = res.data.success;
            // console.log(res)

            if (success == true) {
              
              Notify.create({
                message: res.data.data.message,
                color: "info",
              });
            }

            this.ListarAuspiciadores();
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

      // console.log(`original value = ${initialValue}, new value = ${val}`)
    },
    showAuspiciador(row){
      console.log(row)
      this.card = true;
      this.dataAuspiciador = row;
    },
    Editar(data) {
      //Passing parameters
      this.$router.push({
        name: "Crud_auspiciador",
        params: { auspiciadorEdit: data },
      });
    },
    downloadFile(row){
      // console.log(row)
      let token = LocalStorage.getItem("token");

      axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/getdownloadfile", { pathfile: row.apd_resolucion_file  },
            {
              responseType: "blob", // important
            }).then((res) => {            
              // console.log(res);
              var mimeType = "";
              var blob = new Blob([res.data], {
                type: mimeType,
              });

              const extension = res.data.type.split('/')[1]; 
              var filename = row.apd_resolucion + "." + extension;

              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", filename);
              document.body.appendChild(link);
              link.click();

              Notify.create({
                type: "positive",
                message: "Se descargó correctamente el reporte.",
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
    downloadReporte(){
      let token = LocalStorage.getItem("token");
      // console.log(token)

      axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post(
            "/rpteauspiciados",
            {
              data: 0,
            },
            {
              responseType: "blob", // important
            }
          )
          .then((res) => {            
            // console.log(res);

            var mimeType = "";
            var blob = new Blob([res.data], {
              type: mimeType,
            });
            var filename = "rpte_auspiciados.xlsx";

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();

            this.$q.notify({
              type: "positive",
              message: "Se descargó correctamente el reporte.",
            });

            // if (window.cordova && cordova.platformId !== "browser") {
            //   // console.log("respondio", this.$q.platform.is.desktop);
            //   // console.log("Inicio descarga file cordova");
            //   // this.saveBlob2File("demo.pdf", blob);
            //   this.saveBlob2File(filename, blob, mimeType);
            // }
            
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
    }
  },
};
</script>

