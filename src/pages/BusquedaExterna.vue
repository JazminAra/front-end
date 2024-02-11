<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '95%' } : { width: '95%' }"
        >
          <q-card-section>
            <q-avatar square 
              size="143px"
              class="absolute-center shadow-10"
              color="white"
            >
              <!-- <img src="profile_padre.svg" /> -->
              <!-- <lottie-player id="firstLottie" src="https://assets1.lottiefiles.com/packages/lf20_ror7n0mv.json" style="width:400px; height: 400px;"></lottie-player> -->
              <!-- <lottie-player id="firstLottie" src="https://assets1.lottiefiles.com/packages/lf20_ror7n0mv.json" style="width:400px; height: 400px;"></lottie-player> -->
              <lottie-player
                src="41476-search-document.json"
                background="#FFFFFF"
                speed="1"
                style="width: 120px; height: 120px"
                loop
                autoplay
              ></lottie-player>
            </q-avatar>
          </q-card-section>
          <br />
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis text-teal">
                <q-icon name="manage_search" size="34px" /> Buscador Eventos Académicos UNT
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-separator/>
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <!-- <q-radio v-model="tipoBusq" val="1" label="Auspicios" />
                  <q-radio v-model="tipoBusq" val="2" label="Auspiciadores" /> -->
                  <q-item-section>
                    <q-item-label>
                      <span class="text-weight-medium">Tipo de Búsqueda:</span>
                    </q-item-label>
                    <!-- <q-item-label caption>
                      Automatically add home screen widgets
                    </q-item-label> -->
                  </q-item-section>
                  <q-item-section>
                    <q-radio dense v-model="tipoBusq" color="cyan" val="1" label="Auspicios" @input="changeTipoBusq"/>
                    <q-radio dense v-model="tipoBusq" color="cyan" val="2" label="Auspiciadores" @input="changeTipoBusq"/>
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">                  
                </q-item>
              </div>
              <div class="row" v-if="showFiltroAuspicio">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-item-label>
                      <span class="text-weight-medium">Búsqueda Por:</span>
                    </q-item-label>
                    <!-- <q-item-label caption>
                      Automatically add home screen widgets
                    </q-item-label> -->
                  </q-item-section>
                  <q-item-section>
                    <q-radio dense v-model="tipoBusqAuspicio" val="1" label="Nombre del Auspicio" />
                    <q-radio dense v-model="tipoBusqAuspicio" val="2" label="Institución" />                    
                    <q-radio dense v-model="tipoBusqAuspicio" val="3" label="D.N.I Participante" />
                    <q-radio dense v-model="tipoBusqAuspicio" val="4" label="Apellidos Participante" />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input dense outlined
                            stack-label class="full-width"
                            v-model="textBusqueda" clearable @keyup.enter="buscarDocumentos"
                            maxlength="250" color="teal" bg-color="light-blue-1">
                    <template v-slot:prepend>
                      <q-icon name="manage_search" />
                    </template>
                  </q-input>
                </q-item>
              </div>

              <div class="row" v-if="showFiltroAuspiciador">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-item-label>
                      <span class="text-weight-medium">Búsqueda Por:</span>
                    </q-item-label>
                    <!-- <q-item-label caption>
                      Automatically add home screen widgets
                    </q-item-label> -->
                  </q-item-section>
                  <q-item-section>
                    <q-radio dense v-model="tipoBusqAuspiciador" val="4" label="R.U.C" />
                    <q-radio dense v-model="tipoBusqAuspiciador" val="5" label="Institución" />            
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input dense outlined
                            stack-label class="full-width"
                            v-model="textBusqueda" clearable @keyup.enter="buscarDocumentos"
                            maxlength="250" color="teal" bg-color="light-blue-1">
                    <template v-slot:prepend>
                      <q-icon name="manage_search" />
                    </template>
                  </q-input>
                </q-item>
              </div>
              <div class="row justify-center">
                <q-btn
                  icon-right="search"
                  label="Buscar"
                  :loading="loading"
                  @click="buscarDocumentos"
                  type="button"
                  color="primary"
                >
                  <span slot="loading">
                    <q-spinner-hourglass class="on-left" /> Buscando...
                  </span>
                </q-btn>
              </div>

              <q-separator/>

                  <q-table class="" :data="listAuspicios" v-if="showTabla"
                      title="Búsqueda" :hide-header="mode === 'grid'"
                      :columns="columnslistAuspicios" row-key="name"
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
                          <q-td key="ausp_created" :props="props">
                            <!-- {{ props.row.apd_created }} -->
                            <div v-if="props.row.ausp_created !== null">
                              {{formatDateDDMMYYYY(props.row.ausp_created)}}
                            </div>
                            <div v-else>
                              {{formatDateDDMMYYYY(props.row.apd_created)}}
                            </div>
                          </q-td>
                          <q-td key="emp_ruc" :props="props">
                            {{ props.row.emp_ruc }}
                          </q-td>
                          <q-td key="emp_razon_social" :props="props" :style="{width: '400px', whiteSpace: 'normal'}">
                            {{ props.row.emp_razon_social }}
                          </q-td>
                          <q-td key="apd_resolucion" :props="props">
                            <q-btn dense
                                  color="light-blue" icon="cloud_download"                                  
                                  @click="downloadFileAuspiciador(props.row)">
                                  <q-tooltip class="bg-accent">Descargar</q-tooltip>
                            </q-btn>
                            <b>Fecha:</b> {{formatDateDDMMYYYY(props.row.apd_resolucion_fecha)}} <br/>
                            <b>Resol.:</b> {{ props.row.apd_resolucion }}
                          </q-td>
                          <q-td key="ausp_denominacion" :props="props" class="text-weight-bold text-blue" :style="{width: '400px', whiteSpace: 'normal'}">
                            {{ props.row.ausp_denominacion }}
                          </q-td>
                          <q-td key="lm_descripcion" :props="props" :style="{width: '400px', whiteSpace: 'normal'}">
                            {{ props.row.lm_descripcion }}
                          </q-td>
                          <q-td key="ausp_resolucion" :props="props">
                            <div v-if="props.row.ausp_resolucion_fecha !== null">
                              <q-btn dense
                                    color="light-blue" icon="cloud_download"                                  
                                    @click="downloadFileAuspicio(props.row)">
                                    <q-tooltip class="bg-accent">Descargar</q-tooltip>
                              </q-btn>
                              <b>Fecha:</b> {{formatDateDDMMYYYY(props.row.ausp_resolucion_fecha)}} <br/>
                              <b>Resol.:</b> {{ props.row.ausp_resolucion }}
                            </div>
                          </q-td>
                          <q-td key="ausp_resolucion_fecha" :props="props">
                            {{ props.row.ausp_resolucion_fecha }}
                          </q-td>
                          <q-td key="ausp_fecha_inicio" :props="props">
                            {{ props.row.ausp_fecha_inicio }}
                          </q-td>
                          <q-td key="ausp_fecha_fin" :props="props">
                            {{ props.row.ausp_fecha_fin }}
                          </q-td>
                          <q-td key="ausp_estado_desc" :props="props">
                            {{ props.row.ausp_estado_desc }}
                          </q-td>
                          <q-td key="ausp_tipo_organizacion_desc" :props="props">
                            {{ props.row.ausp_tipo_organizacion_desc }}
                          </q-td>
                          <q-td key="aupar_nro_doc_identidad" :props="props">
                            {{ props.row.aupar_nro_doc_identidad }}
                          </q-td>
                          <q-td key="aupar_ap_paterno" :props="props">
                            {{ props.row.aupar_ap_paterno + " " + props.row.aupar_ap_materno }}
                          </q-td>
                          <q-td key="aupar_nombres" :props="props">
                            {{ props.row.aupar_nombres }}
                          </q-td>
                          <q-td key="aupar_codigo_constancia" :props="props">
                            {{ props.row.aupar_codigo_constancia }}
                          </q-td>
                        </q-tr>
                      </template>
                    </q-table>

              <q-separator/>

              <q-card-actions align="right">
                <q-btn
                  icon-right="face"
                  to="/Login"
                  flat
                  dense
                  label="Ingresar"
                  class="text-capitalize"
                  color="blue"
                ></q-btn>
              </q-card-actions>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { email, required, numeric } from "vuelidate/lib/validators";
import { LocalStorage, SessionStorage } from "quasar";
import { axiosApp } from "../boot/axiosapp";
import moment from "moment";

// import Tawk from "vue-tawk";
import Vue from "vue";
import Vuex from "vuex";
// import LottiePlayer from 'lottie-player-vue';

// Vue.use(Tawk, {
//   tawkSrc: "https://embed.tawk.to/604119c31c1c2a130d650057/1evv4p9bf",
// });

export default {
  name: "BusquedaExterna",
  components: {
    // LottiePlayer
  },
  data() {
    return {
      data: {
        body: {
          username: "",
          password: "",
        },
        rememberMe: false,
      },
      loading: false,
      isPwd: true,
      capsToolTip: false,
      tipoBusq: "1",
      tipoBusqAuspicio: "1",
      tipoBusqAuspiciador: "4",
      textBusqueda: "",
      showFiltroAuspicio: true,
      showFiltroAuspiciador: false,

      mode: "list",
      showTabla: false,
      listAuspicios: [],
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
          name: "apd_resolucion",
          align: "left",
          label: "Resolución Institución",
          field: "apd_resolucion",
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
          label: "Resolución Auspicio",
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
          name: "ausp_estado_desc",
          align: "left",
          label: "Estado",
          field: "ausp_estado_desc",
          sortable: true,
        },
        {
          name: "ausp_tipo_organizacion_desc",
          align: "left",
          label: "Tipo",
          field: "ausp_tipo_organizacion_desc",
          sortable: true,
        },
      ],
    };
  },
  validations: {
    data: {
      body: {
        username: {
          required,
          numeric,
        },
        password: {
          required,
        },
      },
    },
  },
  beforeCreate() {
    let value = LocalStorage.getItem("token");
    // console.log("Token - Login");
    // console.log(value);
    // if (LocalStorage.has("token") && LocalStorage.has("user")) {
    //   this.$router.push('/Dashboard')
    // }

    // console.log(LocalStorage.getItem("token"))
    // console.log(LocalStorage.getItem("user"))
  },
  created() {
    // this.$oneSignal.setup(process.env.ONESIGNAL_APP_ID)
  },
  computed: {},
  methods: {
    login() {
      this.$v.data.$touch();
      if (!this.$v.data.$error) {
        this.loading = true;
        this.$auth
          .login({
            usu_login: this.data.body.username,
            usu_password: this.data.body.password,
            strategy: "local",
            rememberMe: this.data.rememberMe,
          })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("messages.login"),
            });

            // try{

            //   if (LocalStorage.has("token") && LocalStorage.has("user")) {
            //     const user = LocalStorage.getItem("user")
            //     this.$oneSignal.optIn(user.usu_id)
            //   }
            // }catch(ex){
            //   console.log(ex)
            // }

            this.$router.push("/Dashboard");
          })
          .catch((error) => {
            if (error.response) {
              this.$q.notify({
                type: "negative",
                message: this.$t("errors.login"),
              });
              // console.log(error)
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    formatDateDDMMYYYY: function (date) {
      return moment(date).format("DD/MM/YYYY");
    },
    buscarDocumentos(){
      this.changeColumnTable()

      if(this.tipoBusq == "1"){

        if(this.tipoBusqAuspicio !="3" && this.tipoBusqAuspicio !="4"){
        // axiosApp.defaults.headers.common["Authorization"] = "Bearer " + token;
          axiosApp.post("/getlistauspiciosfiltro", {
            tipo_filtro: this.tipoBusqAuspicio,
            texto_busq: this.textBusqueda
          })
          .then((res) => {
            // this.auspiciador = {};
            // console.log(res.data)
            let success = res.data.success;

            if (success == true) {
              this.showTabla = true;
              this.listAuspicios = res.data.data;
              // console.log(res.data.data)
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
        }else{
          axiosApp.post("/getlistauspiciosparticipantefiltro", {
            tipo_filtro: this.tipoBusqAuspicio,
            texto_busq: this.textBusqueda
          })
          .then((res) => {
            // this.auspiciador = {};
            // console.log(res.data)
            let success = res.data.success;

            if (success == true) {
              // this.datosgenerales = res.data.data;
              this.showTabla = true;
              this.changeColumnTableParticipante()
              this.listAuspicios = res.data.data;
              // console.log(res.data.data)
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

      }
      if(this.tipoBusq == "2"){

        if(this.tipoBusqAuspiciador =="4"){ //RUC
          axiosApp.post("/getlistauspiciadoresfiltro", {
            tipo_filtro: 3,
            texto_busq: this.textBusqueda
          })
          .then((res) => {
            // this.auspiciador = {};
            // console.log(res.data)
            let success = res.data.success;

            if (success == true) {
              // this.datosgenerales = res.data.data;
              this.showTabla = true;
              this.listAuspicios = res.data.data;
              // console.log(res.data.data)
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
        if(this.tipoBusqAuspiciador =="5"){ //Institución
          axiosApp.post("/getlistauspiciadoresfiltro", {
            tipo_filtro: 2,
            texto_busq: this.textBusqueda
          })
          .then((res) => {
            // this.auspiciador = {};
            // console.log(res.data)
            let success = res.data.success;

            if (success == true) {
              // this.datosgenerales = res.data.data;
              // console.log(res.data.data)
              this.showTabla = true;
              this.listAuspicios = res.data.data;
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
      }
    },
    downloadFileAuspicio(row){
      // console.log(row)
      let token = LocalStorage.getItem("token");

      axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/getdownloadfile", { pathfile: row.ausp_resolucion_file  },
            {
              responseType: "blob", // important
            }).then((res) => {            
              // console.log(res);
              var mimeType = "";
              var blob = new Blob([res.data], {
                type: mimeType,
              });

              const extension = res.data.type.split('/')[1]; 
              var filename = row.ausp_resolucion + "." + extension;

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
    downloadFileAuspiciador(row){
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
    changeTipoBusq(){
      // console.log(this.tipoBusq)
      if(this.tipoBusq == "1"){
        this.showFiltroAuspicio = true
        this.showFiltroAuspiciador = false
        this.textBusqueda = ""
      }
      if(this.tipoBusq == "2"){
        this.showFiltroAuspicio = false
        this.showFiltroAuspiciador = true
        this.textBusqueda = ""
      }
    },
    changeColumnTableParticipante(){
      this.columnslistAuspicios = [
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
          name: "apd_resolucion",
          align: "left",
          label: "Resolución Institución",
          field: "apd_resolucion",
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
          label: "Resolución Auspicio",
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
          name: "ausp_estado_desc",
          align: "left",
          label: "Estado",
          field: "ausp_estado_desc",
          sortable: true,
        },
        {
          name: "ausp_tipo_organizacion_desc",
          align: "left",
          label: "Tipo",
          field: "ausp_tipo_organizacion_desc",
          sortable: true,
        },
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
          label: "Apellidos",
          field: "aupar_ap_paterno",
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
          name: "aupar_codigo_constancia",
          align: "left",
          label: "Código Diplomado",
          field: "aupar_codigo_constancia",
          sortable: true,
        },
      ]
    },
    changeColumnTable(){
      this.columnslistAuspicios = [
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
          name: "apd_resolucion",
          align: "left",
          label: "Resolución Institución",
          field: "apd_resolucion",
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
          label: "Resolución Auspicio",
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
          name: "ausp_estado_desc",
          align: "left",
          label: "Estado",
          field: "ausp_estado_desc",
          sortable: true,
        },
        {
          name: "ausp_tipo_organizacion_desc",
          align: "left",
          label: "Tipo",
          field: "ausp_tipo_organizacion_desc",
          sortable: true,
        },
      ]
    },
    beforeDestroy() {},
  },
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #0e5f8f 0%, #41cbcf 100%);
}
</style>
