<template>
  <q-page class="q-pa-sm">
    <!-- <div class="q-pa-md"> -->
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <!-- <card-item class="q-mt-lg" :name="profile_card_data.name" :des="profile_card_data.des" :avatar="profile_card_data.avatar"></card-item> -->
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
                    Eventos Académicos
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
              <q-item>
                <q-item-section>
                  <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="blue"
                    indicator-color="blue"
                    align="justify"
                    narrow-indicator
                  >
                    <q-tab
                      name="mails0"
                      icon="create"
                      :label="labelTab"
                    />
                    <!-- <q-tab name="alarms" icon="store_mall_directory" label="R.U.C." />
                    <q-tab name="movies" icon="local_hospital" label="ESSALUD" /> -->
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="mails0">
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-item-section>
                            <q-select outlined dense option-value="apd_id" color="teal"
                                    use-input         hide-selected         fill-input @filter="filterFn"
                                    :option-label="opt => Object(opt) === opt && 'apd_id' in opt ? opt.emp_razon_social + ' / ' + opt.emp_nombre_comercial : '- Null -'"
                                  v-model="auspiciadorid" :options="auspiciadores" label="Institución"
                                  :error="$v.auspicio.apd_id.$error"
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
                          <q-item-section>
                              <q-select outlined dense option-value="lm_id" option-label="lm_descripcion" v-model="modalidadid" :options="modalidades" label="Modalidad" color="blue"
                                  :error="$v.auspicio.modalidad_id.$error"
                                  :error-message="mensajeError('Auspicio')"/>
                          </q-item-section>
                        </q-item>
                      </div>
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspicio.ausp_resolucion"
                            label="Resolución:"
                            maxlength="30"      
                            color="teal"
                            bg-color="light-blue-1"
                            :error="$v.auspicio.ausp_resolucion.$error"
                            :error-message="mensajeError('Auspicio')"
                            @input="(val) => (auspicio.ausp_resolucion = auspicio.ausp_resolucion.toUpperCase())"
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspicio.ausp_resolucion_fecha"
                            label="Resolución Fecha"
                            maxlength="10"    
                            type="date"
                            color="teal"
                            bg-color="light-blue-1"
                            :error="$v.auspicio.ausp_resolucion_fecha.$error"
                            :error-message="mensajeError('Auspicio')"
                          >
                          <template v-slot:prepend>
                            <q-icon name="event" />
                          </template>
                          </q-input>
                        </q-item>
                      </div>
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspicio.ausp_fecha_inicio"
                            label="Fecha Inicio"
                            maxlength="10"    
                            type="date"
                            color="teal"
                            bg-color="light-blue-1"
                            :error="$v.auspicio.ausp_fecha_inicio.$error"
                            :error-message="mensajeError('Auspicio')"
                          >
                          <template v-slot:prepend>
                            <q-icon name="event" />
                          </template>
                          </q-input>
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspicio.ausp_fecha_fin"
                            label="Fecha Fin"
                            maxlength="10"    
                            type="date"
                            color="teal"
                            bg-color="light-blue-1"
                            :error="$v.auspicio.ausp_fecha_fin.$error"
                            :error-message="mensajeError('Auspicio')"
                          >
                          <template v-slot:prepend>
                            <q-icon name="event" />
                          </template>
                          </q-input>
                        </q-item>
                      </div>
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspicio.ausp_denominacion"
                            label="Denominación"
                            maxlength="250"
                            color="teal"
                            bg-color="light-blue-1"
                            :error="$v.auspicio.ausp_denominacion.$error"
                            :error-message="mensajeError('Auspicio')"
                            @input="(val) => (auspicio.ausp_denominacion = auspicio.ausp_denominacion.toUpperCase())"
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-file filled bottom-slots v-model="auspicio.ausp_resolucion_file" label="Resolución Archivo" v-if="!editar"
                            counter accept=".pdf"
                            :error="$v.auspicio.ausp_resolucion_file.$error"
                            :error-message="mensajeError('Auspicio')">
                            <template v-slot:prepend>
                              <q-icon name="cloud_upload" @click.stop />
                            </template>
                            <template v-slot:append>
                              <q-icon name="close" @click.stop="auspicio.ausp_resolucion_file = null" class="cursor-pointer" />
                            </template>
                            <template v-slot:hint>
                              Solo archivos .pdf
                            </template>
                          </q-file>
                          <q-file filled bottom-slots v-model="auspicio.ausp_resolucion_file" label="Resolución Archivo" v-if="editar"
                            counter accept=".pdf">
                            <template v-slot:prepend>
                              <q-icon name="cloud_upload" @click.stop />
                            </template>
                            <template v-slot:append>
                              <q-icon name="close" @click.stop="auspicio.ausp_resolucion_file = null" class="cursor-pointer" />
                            </template>
                            <template v-slot:hint>
                              Solo archivos .pdf
                            </template>
                          </q-file>
                          <q-btn dense v-if="editar"
                                  color="light-blue" icon="cloud_download"      
                                  class="q-px-sm"                            
                                  @click="downloadFile()">
                                  <q-tooltip class="bg-accent">Descargar</q-tooltip>
                            </q-btn>
                        </q-item>
                      </div>
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-item-section>
                            <q-select outlined dense option-value="lm_id" option-label="lm_descripcion" v-model="estadoid" :options="estados" label="Estado" color="blue"
                                  :error="$v.auspicio.ausp_estado.$error"
                                  :error-message="mensajeError('Auspicio')"/>
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-item-section>
                              <q-select outlined dense option-value="lm_id" option-label="lm_descripcion" v-model="tipoid" :options="tipos" label="Tipo" color="blue"
                                  :error="$v.auspicio.ausp_tipo_organizacion.$error"
                                  :error-message="mensajeError('Auspicio')"/>
                          </q-item-section>
                        </q-item>
                      </div>
                      <q-separator />
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-btn                              
                              color="green"
                              icon="note_add"
                              class="q-px-sm"
                              label="Nuevo"
                              @click="NuevoAuspicio"
                            >
                            </q-btn>
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-btn                              
                              color="blue"
                              icon="save"
                              class="q-px-sm"
                              label="Guardar"
                              @click="GuardarAuspicio"
                            >
                            </q-btn>
                        </q-item>
                      </div>
                      <!--<div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="alumno.ult_matricula"
                            label="Ult. Matricula"
                            maxlength="150"
                            readonly
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="alumno.idalumno"
                            label="Código Alumno"
                            maxlength="20"
                            readonly
                          />
                        </q-item>
                      </div> -->
                    </q-tab-panel>
                  </q-tab-panels>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

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

export default {
  name: "Crud_auspicio",
  data() {
    return {
      tab: "mails0",
      labelTab: "Crear Auspicio",
      mode: "list",
      user: {},
      seleccionar: "Seleccionar",
      empresa: {},
      // auspiciador: {
      //   empresa: {
      //     emp_id: 0,
      //     emp_ruc: "",
      //     emp_razon_social: "",
      //     emp_nombre_comercial: "",
      //     emp_sunat_estado: "",
      //     emp_sunat_condicion: "",
      //     emp_sunat_direccion: "",
      //     emp_sunat_finicio: "",
      //     emp_sunat_finscripcion: "",
      //     emp_ubigeo: "",
      //     emp_sunat_rep_legal_docident: "",
      //     emp_sunat_rep_legal_nombre: "",
      //     emp_sunat_rep_legal_cargo: "",
      //   },
      //   apd_id: 0,
      //   apd_resolucion: "",
      //   apd_resolucion_fecha: "",
      //   // apd_denominacion: "",
      //   apd_resolucion_file: null
      // },
      auspiciadores: [],
      optionsauspiciadores: [],
      auspiciadorid: null,
      modalidades: [],
      modalidadid: null,
      auspicio: {
        	ausp_id: 0,
          apd_id: 0,
          modalidad_id: 0,
          ausp_resolucion: "",
          ausp_resolucion_fecha: null,
          ausp_fecha_inicio: null,
          ausp_fecha_fin: null,
          ausp_estado: null,
          ausp_created: null,
          ausp_updated: null,
          ausp_denominacion: "",
          ausp_resolucion_file: null,
          ausp_tipo_organizacion: null
      },
      editar: false,
      nameFile: "",
      estados: [],
      estadoid: null,
      tipos: [],
      tipoid: null,
    };
  },
  validations() {
    if (!this.editar) {
      return {
          auspicio:{
            apd_id:{
              required,
            },
            modalidad_id:{
              required,
            },
            ausp_resolucion:{
              required,
            },
            ausp_resolucion_fecha:{
              required,
            },
            ausp_fecha_inicio:{
              required,
            },
            ausp_fecha_fin:{
              required,
            },
            ausp_denominacion:{
              required,
            },
            ausp_resolucion_file:{
              required,
            },
            ausp_estado:{
              required,
            },
            ausp_tipo_organizacion:{
              required,
            }
          },
      }
    }else{
      return {
          auspicio:{
            apd_id:{
              required,
            },
            modalidad_id:{
              required,
            },
            ausp_resolucion:{
              required,
            },
            ausp_resolucion_fecha:{
              required,
            },
            ausp_fecha_inicio:{
              required,
            },
            ausp_fecha_fin:{
              required,
            },
            ausp_denominacion:{
              required,
            },
            ausp_estado:{
              required,
            },
            ausp_tipo_organizacion:{
              required,
            }
          },
      }
    }
    // auspiciador:{
    //   empresa:{
    //     emp_ruc: {
    //       required,
    //       numeric,
    //     }
    //   },
    //   apd_resolucion:{
    //     required,
    //   },
    //   apd_resolucion_fecha:{
    //     required,
    //   },
    //   // apd_denominacion:{
    //   //   required,
    //   // },
    // },
  },
  beforeCreate() {
    if (LocalStorage.has("token") && LocalStorage.has("user")) {
      const user = LocalStorage.getItem("user");
      // console.log(user);
      this.user = user;
    }
  },
  async created() {
    const user = LocalStorage.getItem("user");
    let token = LocalStorage.getItem("token");

    this.ListarModalidades();
    this.ListarEstados();
    this.ListarTipos();
    await this.ListarAuspiciadores();

    if (this.$route.params.auspicioEdit !== undefined) {
      // console.log(this.$route.params.auspicioEdit)
      this.editar = true
      const auspicioEdit = this.$route.params.auspicioEdit;
      this.auspicio = {
        	ausp_id: auspicioEdit.ausp_id,
          apd_id: auspicioEdit.apd_id,
          modalidad_id: auspicioEdit.modalidad_id,
          ausp_resolucion: auspicioEdit.ausp_resolucion,
          ausp_resolucion_fecha: auspicioEdit.ausp_resolucion_fecha,
          ausp_fecha_inicio: auspicioEdit.ausp_fecha_inicio,
          ausp_fecha_fin: auspicioEdit.ausp_fecha_fin,
          ausp_estado: auspicioEdit.emp_estado,
          ausp_created: auspicioEdit.ausp_created,
          ausp_updated: auspicioEdit.ausp_updated,
          ausp_denominacion: auspicioEdit.ausp_denominacion,
          ausp_tipo_organizacion: auspicioEdit.ausp_tipo_organizacion,
          ausp_resolucion_file: null
      }
      this.modalidadid = { "lm_valor_principal": String(auspicioEdit.modalidad_id), "lm_descripcion": auspicioEdit.lm_descripcion }
      this.auspiciadorid = { "apd_id": auspicioEdit.apd_id, "emp_ruc": auspicioEdit.emp_ruc, "emp_razon_social": auspicioEdit.emp_razon_social }
      this.estadoid = { "lm_valor_principal": String(auspicioEdit.ausp_estado), "lm_descripcion": auspicioEdit.ausp_estado_desc }
      this.tipoid = { "lm_valor_principal": String(auspicioEdit.ausp_tipo_organizacion), "lm_descripcion": auspicioEdit.ausp_tipo_organizacion_desc }

      this.nameFile = auspicioEdit.ausp_resolucion_file
      this.labelTab= "Editar Auspicio"
    }
  },
  mounted() {
    //this.getDatosPersonaAlumno();
    // console.log("mounted=============================");
  },
  beforeUpdate() {
    // console.log("beforeUpdate=============================");
  },
  methods: {
    filterFn (val, update, abort) {
      // console.log(this.optionsAnio)
      update(() => {
        const needle = val.toLowerCase()
        // console.log(needle)
        this.auspiciadores = this.optionsauspiciadores.filter(v => (v.emp_razon_social + " / " + v.emp_nombre_comercial).toLowerCase().indexOf(needle) > -1)
      })
    },
    mensajeError(campo) {
      // if (campo === "RUC") {
      //   if (!this.$v.auspiciador.empresa.emp_ruc.required) return "Campo requerido";
      //   if (!this.$v.auspiciador.empresa.emp_ruc.numeric) return "Campo númerico";
      // }
      // if (campo === "Auspiciador") {
      //   if (!this.$v.auspiciador.apd_resolucion.required) return "Campo requerido";
      //   if (!this.$v.auspiciador.apd_resolucion_fecha.required) return "Campo requerido";
        // if (!this.$v.auspiciador.apd_denominacion.required) return "Campo requerido";
        // if (!this.$v.auspiciador.apd_resolucion.required) return "Campo requerido";
      // }
      if (campo === "Auspicio") {
        if (!this.$v.auspicio.ausp_resolucion.required) return "Campo requerido";
        if (!this.$v.auspicio.ausp_resolucion.required) return "Campo requerido";
        if (!this.$v.auspicio.ausp_resolucion_fecha.required) return "Campo requerido";
        if (!this.$v.auspicio.ausp_fecha_inicio.required) return "Campo requerido";
        if (!this.$v.auspicio.ausp_fecha_fin.required) return "Campo requerido";
        if (!this.$v.auspicio.ausp_denominacion.required) return "Campo requerido";
        if (!this.editar) { if (!this.$v.auspicio.ausp_resolucion_file.required) return "Campo requerido"; }
        if (!this.$v.auspicio.ausp_estado.required) return "Campo requerido";
        if (!this.$v.auspicio.ausp_tipo_organizacion.required) return "Campo requerido";
        // if (!this.$v.auspiciador.apd_resolucion.required) return "Campo requerido";
      }
    },
    async ListarAuspiciadores(){
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");
      // console.log(token)
        axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        await axiosApp
          .post("/getlistauspiciadoresactivos", { 
            // auspiciador: this.auspiciador 
          })
          .then((res) => {
            // this.auspiciador = {};
            let success = res.data.success;

            if (success == true) {
              const list = res.data.data.map(o => ({ apd_id: o.apd_id, emp_ruc: o.emp_ruc, emp_razon_social: o.emp_razon_social, emp_nombre_comercial: o.emp_nombre_comercial }));
              this.auspiciadores = list;
              this.optionsauspiciadores = list;
              // console.log(this.auspiciadores)
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
    ListarModalidades(){
      let token = LocalStorage.getItem("token");

        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/getlistamultiplecodunique", { 
            codigo_unique: "AUSP_MODALIDAD" 
          })
          .then((res) => {
            // this.auspiciador = {};
            let success = res.data.success;

            if (success == true) {
              const list = res.data.data.map(o => ({ lm_valor_principal: o.lm_valor_principal, lm_descripcion: o.lm_descripcion }));
              this.modalidades = list;
              // console.log(this.modalidades)
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
    ListarEstados(){
      let token = LocalStorage.getItem("token");

        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/getlistamultiplecodunique", { 
            codigo_unique: "AUSP_ESTADOS" 
          })
          .then((res) => {
            // this.auspiciador = {};
            let success = res.data.success;

            if (success == true) {
              const list = res.data.data.map(o => ({ lm_valor_principal: o.lm_valor_principal, lm_descripcion: o.lm_descripcion }));
              this.estados = list;
              // console.log(this.modalidades)
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
    ListarTipos(){
      let token = LocalStorage.getItem("token");

        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/getlistamultiplecodunique", { 
            codigo_unique: "AUSP_TIPO_ORGA" 
          })
          .then((res) => {
            // this.auspiciador = {};
            let success = res.data.success;

            if (success == true) {
              const list = res.data.data.map(o => ({ lm_valor_principal: o.lm_valor_principal, lm_descripcion: o.lm_descripcion }));
              this.tipos = list;
              // console.log(this.modalidades)
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
    NuevoAuspicio(){
      this.auspicio = {
          ausp_id: 0,
          apd_id: 0,
          modalidad_id: 0,
          ausp_resolucion: "",
          ausp_resolucion_fecha: null,
          ausp_fecha_inicio: null,
          ausp_fecha_fin: null,
          ausp_estado: null,
          ausp_created: null,
          ausp_updated: null,
          ausp_denominacion: "",
          ausp_resolucion_file: null,
          ausp_tipo_organizacion: null
      };
      this.$v.auspicio.$reset();
    },
    GuardarAuspicio(){
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      this.auspicio.apd_id = this.auspiciadorid == null ? null : this.auspiciadorid.apd_id;
      this.auspicio.modalidad_id = this.modalidadid == null ? null : this.modalidadid.lm_valor_principal;
      this.auspicio.ausp_estado = this.estadoid == null ? null : this.estadoid.lm_valor_principal;
      this.auspicio.ausp_tipo_organizacion = this.tipoid == null ? null : this.tipoid.lm_valor_principal;
      // console.log(this.auspicio)

      this.$v.auspicio.$touch();
      if (!this.$v.auspicio.$error) {

        let formData = new FormData();
        formData.append('archivo', this.auspicio.ausp_resolucion_file);
        formData.append('auspicio', JSON.stringify(this.auspicio));

        axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/mantenedorauspicio", 
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then((res) => {
            // this.auspiciador = {};
            let success = res.data.success;

            if (success == true) {
              console.log(res.data)
              // let data = res.data.result;
              Notify.create({
                message: res.data.message,
                color: "positive",
              });
              this.NuevoAuspicio();
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
    downloadFile(row){
      // console.log(row)
      let token = LocalStorage.getItem("token");

      axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/getdownloadfile", { pathfile: this.nameFile  },
            {
              responseType: "blob", // important
            }).then((res) => {            
              // console.log(res);
              var mimeType = "";
              var blob = new Blob([res.data], {
                type: mimeType,
              });

              const extension = res.data.type.split('/')[1]; 
              var filename = this.auspicio.ausp_resolucion + "." + extension;

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


    }
  },
};
</script>

