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
                    Participantes Eventos Académicos
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
                    <q-tab name="mails0" icon="list_alt" label="Subida Participantes" />
                    <!-- <q-tab name="alarms" icon="store_mall_directory" label="R.U.C." />
                    <q-tab name="movies" icon="local_hospital" label="ESSALUD" /> -->
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="mails0">
                      
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-item-section>
                              <!-- <q-select outlined dense option-value="ausp_id" option-label="ausp_denominacion" v-model="auspiciadorid" :options="listAuspicios" label="Auspicio" color="blue"
                                  @input="ListarParticipantes()"
                                  :error="$v.auspicio.ausp_id.$error"
                                  :error-message="mensajeError('Auspicio')"/> -->

                              <q-select outlined dense option-value="ausp_id" color="teal"
                                      use-input         hide-selected         fill-input @filter="filterFn" @input="ListarParticipantes()"
                                      :option-label="opt => Object(opt) === opt && 'apd_id' in opt ? opt.ausp_denominacion + ' / ' + opt.emp_nombre_comercial : '- Null -'"
                                    v-model="auspiciadorid" :options="listAuspicios" label="Auspicio"
                                    :error="$v.auspicio.ausp_id.$error"
                                    :error-message="mensajeError('Auspicio')">
                                <template v-slot:no-option>
                                  <q-item>
                                    <q-item-section class="text-grey">
                                      No resultados
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>

                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-file filled bottom-slots v-model="auspicio.ausp_file_participantes" label="Archivo" counter
                                  accept=".csv" max-file-size="2097152"
                                  :error="$v.auspicio.ausp_file_participantes.$error"
                                  :error-message="mensajeError('Auspicio')">
                            <template v-slot:prepend>
                              <q-icon name="cloud_upload" @click.stop />
                            </template>
                            <template v-slot:append>
                              <q-icon name="close" @click.stop="auspicio.ausp_file_participantes = null" class="cursor-pointer" />
                            </template>
                            <template v-slot:hint>
                              Solo archivos .csv <br/>
                              Tamaño Max 2MB  <br/>
                              <a href="/files/example.csv" color="deep-purple" target="_blanck">Archivo Ejemplo</a>
                              <!-- <q-btn color="deep-purple" @click="DescargarEjemplo()">Archivo Ejemplo</q-btn> -->
                            </template>
                          </q-file>
                        </q-item>
                      </div>
                      <!-- <q-separator /> -->
                      <div class="row">
                        <!-- <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-btn                              
                              color="green"
                              icon="note_add"
                              class="q-px-sm"
                              label="Nuevo"
                              @click="NuevoAuspicio"
                            >
                            </q-btn>
                        </q-item> -->
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-btn                              
                              color="blue"
                              icon="save"
                              class="q-px-sm"
                              label="Guardar Participantes"
                              @click="GuardarParticipantes"
                            >
                            </q-btn>
                        </q-item>
                      </div>
                      <q-separator />

                      <q-table class="" :data="listParticipantes"
                      title="Listado de Participantes Auspicio" :hide-header="mode === 'grid'"
                      :columns="columnslistParticipantes" row-key="name"
                      :filter="filterlistAuspicios" :pagination.sync="pagination">
                      <template v-slot:top-right="props">
                        <q-input borderless
                          dense debounce="300" v-model="filterlistAuspicios" placeholder="Buscar">
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>

                        <q-btn flat round dense
                          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                          @click="props.toggleFullscreen" v-if="mode === 'list'" class="q-px-sm">
                          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"}}
                          </q-tooltip>
                        </q-btn>
                      </template>
                      <template v-slot:body="props">
                        <q-tr :props="props">                          
                          <q-td key="aupar_nro_doc_identidad" :props="props" class="text-weight-bold text-blue">
                            {{ props.row.aupar_nro_doc_identidad }}
                          </q-td>
                          <q-td key="aupar_ap_paterno" :props="props">
                            {{ props.row.aupar_ap_paterno }}
                          </q-td>
                          <q-td key="aupar_ap_materno" :props="props">
                            {{ props.row.aupar_ap_materno }}
                          </q-td>
                          <q-td key="aupar_nombres" :props="props">
                            {{ props.row.aupar_nombres }}
                          </q-td>
                          <q-td key="aupar_celular" :props="props">
                            {{ props.row.aupar_celular }}
                          </q-td>
                          <q-td key="aupar_email" :props="props">
                            {{ props.row.aupar_email }}
                          </q-td>
                          <q-td key="aupar_codigo_constancia" :props="props">
                            {{ props.row.aupar_codigo_constancia }}
                          </q-td>
                          <q-td key="aupar_created" :props="props">
                            <!-- {{ props.row.apd_created }} -->
                            {{formatDateDDMMYYYY(props.row.aupar_created)}}
                          </q-td>
                          <q-td key="aupar_estado" :props="props" :class="props.row.aupar_estado == true
                                ? 'text-blue-10' : 'text-red-14'">
                                <q-toggle
                                  v-model="props.row.aupar_estado"
                                  :true-value="true"
                                  :false-value="false"
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
              Auspicio [{{dataAuspiciador.ausp_id}}]
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
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Denominación</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">{{dataAuspiciador.ausp_denominacion}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Modalidad</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">{{dataAuspiciador.lm_descripcion}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                 <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Resolución</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">Fecha: {{dataAuspiciador.ausp_resolucion_fecha}} <br/> Resol.: {{dataAuspiciador.ausp_resolucion}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Fechas</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">Fecha Inicio: {{dataAuspiciador.ausp_fecha_inicio}} 
                        <br/> Fecha Fin: {{dataAuspiciador.ausp_fecha_fin}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

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

                <q-separator spaced />

                <q-item>
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">Archivo Resolución</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label caption  lines="3" class="self-center">
                      <span class="text-weight-medium">-</span>
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
import { Notify, exportFile  } from "quasar";
import moment from "moment";

// import {VueCsvImport} from "vue-csv-import";
// import { VueCsvImport } from 'vue-csv-import';

export default {
  name: "Listar_auspicio",
  // components: { VueCsvImport },
  data() {
    return {
      tab: "mails0",
      mode: "list",
      user: {},
      seleccionar: "Seleccionar",
      empresa: {},
      auspicio: {
        	ausp_id: 0,
          apd_id: 0,
          modalidad_id: 0,
          ausp_resolucion: "",
          ausp_resolucion_fecha: null,
          ausp_fecha_inicio: null,
          ausp_fecha_fin: null,
          ausp_estado: 1,
          ausp_created: null,
          ausp_updated: null,
          ausp_denominacion: "",
          ausp_resolucion_file: null,
          ausp_file_participantes: null
      },
      listAuspicios: [],
      optionsauspicios: [],
      auspiciadorid: null,
      filterlistAuspicios: "",
      pagination: {
        rowsPerPage: 10,
      },
      columnslistAuspicios: [
        {
          name: "ausp_created",
          align: "left",
          label: "Fecha Registro",
          field: "ausp_created",
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
          name: "ausp_denominacion",
          align: "left",
          label: "Denominación",
          field: "ausp_denominacion",
          sortable: true,
        },
        {
          name: "lm_descripcion",
          align: "left",
          label: "Modalidad",
          field: "lm_descripcion",
          sortable: true,
        },
        {
          name: "ausp_resolucion",
          align: "left",
          label: "Resolución",
          field: "ausp_resolucion",
          sortable: true,
        },
        {
          name: "ausp_resolucion_fecha",
          align: "left",
          label: "Resolución Fecha",
          field: "ausp_resolucion_fecha",
          sortable: true,
        },
        {
          name: "ausp_fecha_inicio",
          align: "left",
          label: "Fecha Inicio",
          field: "ausp_fecha_inicio",
          sortable: true,
        },
        {
          name: "ausp_fecha_fin",
          align: "left",
          label: "Fecha Fin",
          field: "ausp_fecha_fin",
          sortable: true,
        },
        {
          name: "ausp_estado",
          align: "left",
          label: "Estado",
          field: "ausp_estado",
          sortable: true,
        }
      ],
      card: false,
      file: null,
      dataAuspiciador: {},
      listParticipantes: [],
      columnslistParticipantes: [
        {
          name: "aupar_nro_doc_identidad",
          align: "left",
          label: "D.N.I",
          field: "aupar_nro_doc_identidad",
          sortable: true,
        },
        {
          name: "aupar_ap_paterno",
          align: "left",
          label: "Ap. Paterno",
          field: "aupar_ap_paterno",
          sortable: true,
        },
        {
          name: "aupar_ap_materno",
          align: "left",
          label: "Ap. Materno",
          field: "aupar_ap_materno",
          sortable: true,
        },
        {
          name: "aupar_nombres",
          align: "left",
          label: "Nombres",
          field: "aupar_nombres",
          sortable: true,
        },
        {
          name: "aupar_celular",
          align: "left",
          label: "Celular",
          field: "aupar_celular",
          sortable: true,
        },
        {
          name: "aupar_email",
          align: "left",
          label: "Email",
          field: "aupar_email",
          sortable: true,
        },       
        {
          name: "aupar_codigo_constancia",
          align: "left",
          label: "Código Diplomado",
          field: "aupar_codigo_constancia",
          sortable: true,
        },         
        {
          name: "aupar_created",
          align: "left",
          label: "Fecha Registro",
          field: "aupar_created",
          sortable: true,
        },        
        {
          name: "aupar_estado",
          align: "left",
          label: "Estado",
          field: "aupar_estado",
          sortable: true,
        },
      ],
    };
  },
  validations: {
    auspicio:{
      ausp_id:{
        required,
      },
      ausp_file_participantes:{
        required,
      },
    },
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

    this.ListarAuspicios();
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
      if (campo === "RUC") {
        if (!this.$v.auspiciador.empresa.emp_ruc.required) return "Campo requerido";
        if (!this.$v.auspiciador.empresa.emp_ruc.numeric) return "Campo númerico";
      }
      if (campo === "Auspiciador") {
        if (!this.$v.auspiciador.ausp_id.required) return "Campo requerido";
        if (!this.$v.auspiciador.ausp_file_participantes.required) return "Campo requerido";
        // if (!this.$v.auspiciador.apd_denominacion.required) return "Campo requerido";
        // if (!this.$v.auspiciador.apd_resolucion.required) return "Campo requerido";
      }
      if (campo === "Auspicio") {
        if (!this.$v.auspicio.ausp_id.required) return "Campo requerido";
        if (!this.$v.auspicio.ausp_file_participantes.required) return "Campo requerido";
      }
    },
    // NuevoAuspiciador(){
    //   this.auspiciador = {
    //     empresa:  {
    //       emp_id: 0,
    //       emp_ruc: "",
    //       emp_razon_social: "",
    //       emp_nombre_comercial: "",
    //       emp_sunat_estado: "",
    //       emp_sunat_condicion: "",
    //       emp_sunat_direccion: "",
    //       emp_sunat_finicio: "",
    //       emp_sunat_finscripcion: "",
    //       emp_ubigeo: "",
    //       emp_sunat_rep_legal_docident: "",
    //       emp_sunat_rep_legal_nombre: "",
    //       emp_sunat_rep_legal_cargo: "",
    //     },
    //     apd_id: 0,
    //     apd_resolucion: "",
    //     apd_resolucion_fecha: "",
    //     // apd_denominacion: "",
    //     apd_resolucion_file: null
    //   };
    // },
    ListarAuspicios(){
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      // this.$v.auspiciador.$touch();
      // if (!this.$v.auspiciador.$error) {

        axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/getlistauspicios", { 
            // auspiciador: this.auspiciador 
          })
          .then((res) => {
            // this.auspiciador = {};
            let success = res.data.success;

            if (success == true) {
              // console.log(res.data.data)
              // let data = res.data.result;
              // Notify.create({
              //   message: res.data.message,
              //   color: "positive",
              // });
              // this.NuevoAuspiciador();
              this.listAuspicios = res.data.data;
              this.optionsauspicios = res.data.data;
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
    ListarParticipantes(){
      // console.log("Call ListarParticipantes")
      let token = LocalStorage.getItem("token");
      const ausp_id = this.auspiciadorid == null ? null : this.auspiciadorid.ausp_id;      
      // console.log(ausp_id)

      if(ausp_id !== null){
          axiosApp.defaults.headers.common["Authorization"] =
            "Bearer " + token;
          axiosApp
          .get("/auspicios-participantes?ausp_id="+ ausp_id +"&$limit=100", { 
            // auspiciador: this.auspiciador 
          })
          .then((res) => {
            // this.auspiciador = {};
            // let success = res.data.success;

            // if (success == true) {
              // console.log(res.data)
              // let data = res.data.result;
              // Notify.create({
              //   message: res.data.message,
              //   color: "positive",
              // });
              // this.NuevoAuspiciador();
              this.listParticipantes = res.data.data;
            // } else {
            //   Notify.create({
            //     message: res.data.data.message,
            //     color: "warning",
            //   });
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
    GuardarParticipantes(){

      this.auspicio.ausp_id = this.auspiciadorid == null ? null : this.auspiciadorid.ausp_id;
      let token = LocalStorage.getItem("token");

      // console.log(token)

      this.$v.auspicio.$touch();
      if (!this.$v.auspicio.$error) {

        let formData = new FormData();
        formData.append('archivo', this.auspicio.ausp_file_participantes);
        formData.append('auspicio', JSON.stringify(this.auspicio));

        axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/uploadparticipantesauspicio", 
            formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then((res) => {
            console.log(res.data)
            // this.auspiciador = {};
            let success = res.data.success;

            if (success == true) {
              // console.log(res.data)
              // let data = res.data.result;
              Notify.create({
                message: res.data.message,
                color: "positive",
              });
              // this.NuevoAuspiciador();
              // this.listAuspicios = res.data.data;
              this.ListarParticipantes();
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
                message: "Error. Please contact support." + JSON.stringify(err.response),
                color: "negative",
              });
              console.log(err.response)
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
                ausp_id: row.ausp_id,
                aupar_estado_old: row.aupar_estado,
                aupar_estado_new: row.aupar_estado
            },            
            codeapp: process.env.CODE_APP      
      }

      let audit = this.$store.getters['auth/audit'](dataAudit)

      axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/updateauspicioparticipante", {
            participante: row,
            auditoria: audit
          })
          .then((res) => {
            // this.convalidaciones = {};
            let success = res.data.success;
            // console.log(res.data)

            if (success == true) {
              
              Notify.create({
                message: res.data.data.message,
                color: "info",
              });
            }

            this.ListarParticipantes();
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
    filterFn (val, update, abort) {
      // console.log(this.optionsAnio)
      update(() => {
        const needle = val.toLowerCase()
        // console.log(needle)
        this.listAuspicios = this.optionsauspicios.filter(v => (v.ausp_denominacion + " / " + v.emp_nombre_comercial).toLowerCase().indexOf(needle) > -1)
      })
    },
    // DescargarEjemplo(){
    //     const status = exportFile('/public/files/example.csv', 'éà; ça; 12\nà@€; çï; 13', {
    //       encoding: 'windows-1252',
    //       mimeType: 'text/csv;charset=windows-1252;'
    //     })

    //     if (status === true) {
    //       // browser allowed it
    //     }
    //     else {
    //       // browser denied it
    //       console.error('Error: ' + status)
    //     }
    // }
  },
};
</script>

