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
                    Institución
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
                        <q-item class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
                            <div class="q-gutter-sm">
                              <q-checkbox v-model="auspiciador.apd_asociacion_estudiantil" color="orange" label="Asociación Estudiantil" @input="changeCheckbox" :disable="disablecheckbox"/>
                            </div>
                        </q-item>
                      </div>
                      <div class="row">
                        <q-item class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
                          <q-item-section>
                            <q-input
                              dense
                              outlined
                              stack-label
                              class="full-width"
                              v-model="auspiciador.empresa.emp_ruc"
                              label="Ruc"
                              maxlength="11"
                              @keyup.enter="busquedaRUC"
                              :error="$v.auspiciador.empresa.emp_ruc.$error"
                              :error-message="mensajeError('RUC')"
                              :readonly="!camporeadonlyBusq"
                            />
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-1 col-md-1 col-sm-1 col-xs-1 self-center">
                          <q-item-section>
                            <q-btn
                              dense
                              color="purple"
                              icon="manage_search"
                              class="q-px-sm"
                              @click="busquedaRUC"
                            >
                            </q-btn>
                            <br/>
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
                            v-model="auspiciador.empresa.emp_razon_social"
                            label="Razón Social"
                            maxlength="150"                            
                            :readonly="camporeadonly"
                            :error="$v.auspiciador.empresa.emp_razon_social.$error"
                              :error-message="mensajeError('Auspiciador')"
                            @input="(val) => (auspiciador.empresa.emp_razon_social = auspiciador.empresa.emp_razon_social.toUpperCase())"
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspiciador.empresa.emp_nombre_comercial"
                            label="Nombre Comercial"
                            maxlength="250"
                            @input="(val) => (auspiciador.empresa.emp_nombre_comercial = auspiciador.empresa.emp_nombre_comercial.toUpperCase())"
                          />
                        </q-item>
                      </div>
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspiciador.empresa.emp_sunat_direccion"
                            label="Dirección"
                            maxlength="150"
                            :readonly="camporeadonly"
                            @input="(val) => (auspiciador.empresa.emp_sunat_direccion = auspiciador.empresa.emp_sunat_direccion.toUpperCase())"
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspiciador.empresa.emp_sunat_rep_legal_docident"
                            label="Representante Legal NroDocumento"
                            maxlength="150"
                            :readonly="camporeadonly"
                          />
                        </q-item>
                      </div>
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspiciador.empresa.emp_sunat_rep_legal_nombre"
                            label="Representante Legal"
                            maxlength="200"
                            :readonly="camporeadonly"
                            :error="$v.auspiciador.empresa.emp_sunat_rep_legal_nombre.$error"
                              :error-message="mensajeError('Auspiciador')"
                              @input="(val) => (auspiciador.empresa.emp_sunat_rep_legal_nombre = auspiciador.empresa.emp_sunat_rep_legal_nombre.toUpperCase())"
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspiciador.empresa.emp_sunat_rep_legal_cargo"
                            label="Cargo"
                            maxlength="150"
                            :readonly="camporeadonly"
                            @input="(val) => (auspiciador.empresa.emp_sunat_rep_legal_cargo = auspiciador.empresa.emp_sunat_rep_legal_cargo.toUpperCase())"
                          />
                        </q-item>
                      </div>
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspiciador.apd_resolucion"
                            label="Resolución:"
                            maxlength="30"      
                            color="teal"
                            bg-color="light-blue-1"
                            :error="$v.auspiciador.apd_resolucion.$error"
                            :error-message="mensajeError('Auspiciador')"
                            @input="(val) => (auspiciador.apd_resolucion = auspiciador.apd_resolucion.toUpperCase())"
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspiciador.apd_resolucion_fecha"
                            label="Resolución Fecha"
                            maxlength="10"    
                            type="date"
                            color="teal"
                            bg-color="light-blue-1"
                            :error="$v.auspiciador.apd_resolucion_fecha.$error"
                            :error-message="mensajeError('Auspiciador')"
                          >
                          <template v-slot:prepend>
                            <q-icon name="event" />
                          </template>
                          </q-input>
                        </q-item>
                      </div>
                      <div class="row" v-if="campo_resolucion_asociacion">
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="auspiciador.apd_resolucion_asociacion"
                            label="Resolución de Asociación:"
                            label-color="orange"
                            maxlength="50"      
                            color="teal"
                            @input="(val) => (auspiciador.apd_resolucion_asociacion = auspiciador.apd_resolucion_asociacion.toUpperCase())"
                          />
                        </q-item>
                      </div>
                      <div class="row">                        
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-file filled bottom-slots v-model="auspiciador.apd_resolucion_file" label="Resolución Archivo" v-if="!editar"
                            counter  accept=".pdf"
                            :error="$v.auspiciador.apd_resolucion_file.$error"
                            :error-message="mensajeError('Auspiciador')">
                            <template v-slot:prepend>
                              <q-icon name="cloud_upload" @click.stop />
                            </template>
                            <template v-slot:append>
                              <q-icon name="close" @click.stop="auspiciador.apd_resolucion_file = null" class="cursor-pointer" />
                            </template>
                            <template v-slot:hint>
                              Solo archivos .pdf
                            </template>
                          </q-file>

                          <q-file filled bottom-slots v-model="auspiciador.apd_resolucion_file" label="Resolución Archivo" v-if="editar"
                            counter  accept=".pdf">
                            <template v-slot:prepend>
                              <q-icon name="cloud_upload" @click.stop />
                            </template>
                            <template v-slot:append>
                              <q-icon name="close" @click.stop="auspiciador.apd_resolucion_file = null" class="cursor-pointer" />
                            </template>
                            <template v-slot:hint>
                              Solo archivos .pdf
                            </template>
                          </q-file>
                        </q-item>
                        <q-item class="col-lg-1 col-md-1 col-sm-1 col-xs-1 self-center">
                          <q-btn dense v-if="editar"
                                  color="light-blue" icon="cloud_download"      
                                  class="q-px-sm"                            
                                  @click="downloadFile()">
                                  <q-tooltip class="bg-accent">Descargar</q-tooltip>
                            </q-btn>
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
                              @click="NuevoAuspiciador"
                            >
                            </q-btn>
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-btn                              
                              color="blue"
                              icon="save"
                              class="q-px-sm"
                              label="Guardar"
                              @click="GuardarAuspiciador"
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
import EssentialLinkVue from 'src/components/EssentialLink.vue';

export default {
  name: "Crud_auspiciador",
  data() {
    return {
      tab: "mails0",
      labelTab: "Crear Institución",
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
        apd_resolucion_file: null,
        apd_asociacion_estudiantil: false,
        apd_resolucion_asociacion: ""
      },
      editar: false,
      nameFile: "",
      camporeadonly: true,
      camporeadonlyBusq: true,
      disablecheckbox: false,
      campo_resolucion_asociacion: false
    };
  },
  validations() {
    if (!this.editar) {
      return {
        auspiciador: {
          empresa:{
            emp_ruc: {
              required
            },
            emp_razon_social:{
            required,
            },
            emp_sunat_rep_legal_nombre:{
              required,
            },
          },          
          apd_resolucion:{
            required,
          },
          apd_resolucion_fecha:{
            required,
          },
          apd_resolucion_file:{
            required,
          },
        }
      }
    }else{
      return {
        auspiciador: {
          empresa:{
            emp_ruc: {
              required,
            },
            emp_razon_social:{
            required,
            },
            emp_sunat_rep_legal_nombre:{
              required,
            },
          },
          apd_resolucion:{
            required,
          },
          apd_resolucion_fecha:{
            required,
          },
          // apd_resolucion_file:{
          //   required,
          // },
        }
      }
    }
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

    if (this.$route.params.auspiciadorEdit !== undefined) {
      this.editar = true
      
      const auspiciadorEdit = this.$route.params.auspiciadorEdit;
      // this.auspiciador = this.$route.params.auspiciadorEdit;
      this.auspiciador = {
        empresa: {
          emp_id: auspiciadorEdit.emp_id,
          emp_ruc: auspiciadorEdit.emp_ruc,
          emp_razon_social: auspiciadorEdit.emp_razon_social,
          emp_nombre_comercial: auspiciadorEdit.emp_nombre_comercial,
          emp_sunat_estado: auspiciadorEdit.emp_sunat_estado,
          emp_sunat_condicion: auspiciadorEdit.emp_sunat_condicion,
          emp_sunat_direccion: auspiciadorEdit.emp_sunat_direccion,
          emp_sunat_finicio: auspiciadorEdit.emp_sunat_finicio,
          emp_sunat_finscripcion: auspiciadorEdit.emp_sunat_finscripcion,
          emp_ubigeo: auspiciadorEdit.emp_ubigeo,
          emp_sunat_rep_legal_docident: auspiciadorEdit.emp_sunat_rep_legal_docident,
          emp_sunat_rep_legal_nombre: auspiciadorEdit.emp_sunat_rep_legal_nombre,
          emp_sunat_rep_legal_cargo: auspiciadorEdit.emp_sunat_rep_legal_cargo,
        },
        apd_id: auspiciadorEdit.apd_id,
        apd_resolucion: auspiciadorEdit.apd_resolucion,
        apd_resolucion_fecha: auspiciadorEdit.apd_resolucion_fecha,
        apd_resolucion_file: null,
        apd_asociacion_estudiantil: auspiciadorEdit.apd_asociacion_estudiantil,
        apd_resolucion_asociacion: auspiciadorEdit.apd_resolucion_asociacion
      }
      this.nameFile = auspiciadorEdit.apd_resolucion_file

      this.labelTab= "Editar Institución"

      if(auspiciadorEdit.apd_asociacion_estudiantil){ 
        this.camporeadonly = false
        this.camporeadonlyBusq = false
        this.campo_resolucion_asociacion = true     
      }
      this.disablecheckbox = true
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
    mensajeError(campo) {
      if (campo === "RUC") {
        if (!this.$v.auspiciador.empresa.emp_ruc.required) return "Campo requerido";
        // if (!this.$v.auspiciador.empresa.emp_ruc.numeric) return "Campo númerico";
      }
      if (campo === "Auspiciador") {
        if (!this.$v.auspiciador.apd_resolucion.required) return "Campo requerido";
        if (!this.$v.auspiciador.apd_resolucion_fecha.required) return "Campo requerido";
        if (!this.editar) { if (!this.$v.auspiciador.apd_resolucion_file.required) return "Campo requerido"; }
        if (!this.$v.auspiciador.empresa.emp_razon_social.required) return "Campo requerido";
        if (!this.$v.auspiciador.empresa.emp_sunat_rep_legal_nombre.required) return "Campo requerido";
        // if (!this.$v.auspiciador.apd_resolucion.required) return "Campo requerido";
      }
    },
    busquedaRUC() {
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      this.$v.auspiciador.empresa.emp_ruc.$touch();
      if (!this.$v.auspiciador.empresa.emp_ruc.$error) {

        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/getsunatruc", { ruc: this.auspiciador.empresa.emp_ruc })
          .then((res) => {
            // this.auspiciador = {};
            let success = res.data.success;
            console.log(res.data)

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

              console.log(data.RepresentanteLegal.length)
              if(data.RepresentanteLegal.length == 0){
                this.camporeadonly = false
                this.camporeadonlyBusq = true
              }
            } else {
              Notify.create({
                message: 'No se encontraron datos para el ruc ingresado',
                color: "warning",
              });
              this.camporeadonly = false
              this.camporeadonlyBusq = true
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
            this.camporeadonly = false
            this.camporeadonlyBusq = true
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
        apd_resolucion_file: null,
        apd_asociacion_estudiantil: false
      };
      this.$v.auspiciador.$reset();
    },
    GuardarAuspiciador(){
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      // console.log(this.auspiciador)

      this.$v.auspiciador.$touch();
      if (!this.$v.auspiciador.$error) {

        let formData = new FormData();
        formData.append('archivo', this.auspiciador.apd_resolucion_file);
        formData.append('auspiciador', JSON.stringify(this.auspiciador));

        axiosApp.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosApp
          .post("/mantenedorauspiciador", 
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
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
              var filename = this.auspiciador.apd_resolucion + "." + extension;

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
    randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    },
    changeCheckbox(){
        if(this.auspiciador.apd_asociacion_estudiantil){
          this.auspiciador.empresa.emp_ruc = "AUSP"+this.randomString(7, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
          this.campo_resolucion_asociacion = true;
        }else{
          this.auspiciador.empresa.emp_ruc = ""
          this.campo_resolucion_asociacion = false;
          this.auspiciador.apd_resolucion_asociacion = "";
        }

        this.camporeadonly = !this.camporeadonly;
        this.camporeadonlyBusq = !this.camporeadonlyBusq;
        
    }
  },
};
</script>

