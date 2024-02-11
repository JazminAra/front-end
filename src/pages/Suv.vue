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
                  <q-icon color="blue" name="gradient" size="34px" />
                </q-item-section>
                <q-item-section>
                  <div
                    class="text-overline text-weight-medium"
                    style="font-size: 20px"
                  >
                    Sistema Universitario Virtual
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
                    v-model="tab" dense class="text-grey" active-color="blue" indicator-color="blue" align="justify" narrow-indicator >
                    <q-tab name="mails0" icon="person_search" label="Consulta por Código Alumno"/>
                    <!-- <q-tab name="alarms" icon="store_mall_directory" label="R.U.C." />
                    <q-tab name="movies" icon="local_hospital" label="ESSALUD" /> -->
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="mails0">
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-8 col-xs-8">
                          <q-item-section>
                            <q-input
                              dense
                              outlined
                              stack-label
                              class="full-width"
                              v-model="alumno.codigo"
                              label="Código Alumno"
                              maxlength="16"
                              @keyup.enter="busquedaAlumnoSUV"
                              :error="$v.alumno.codigo.$error"
                              :error-message="mensajeError('codigo')"
                            />
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-1 col-md-1 col-sm-1 col-xs-1 self-center">
                          <q-item-section>
                            <q-btn
                              dense
                              color="purple"
                              icon="person_search"
                              class="q-px-sm"
                              @click="busquedaAlumnoSUV"
                            >
                            </q-btn>
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
                            v-model="alumno.per_apepaterno"
                            label="Apellido Paterno"
                            maxlength="100"
                            readonly
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="alumno.per_apematerno"
                            label="Apellido Materno"
                            maxlength="100"
                            readonly
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
                            v-model="alumno.per_nombres"
                            label="Nombres"
                            maxlength="100"
                            readonly
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="alumno.per_dni"
                            label="D.N.I"
                            maxlength="100"
                            readonly
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
                            v-model="alumno.per_fechanacimiento"
                            label="Fecha Nacimiento"
                            maxlength="100"
                            readonly
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="alumno.per_email"
                            label="per_email"
                            maxlength="150"
                            readonly
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
                            v-model="alumno.per_direccionlocal"
                            label="Direccion"
                            maxlength="100"
                            readonly
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="alumno.per_telefono"
                            label="Teléfono"
                            maxlength="100"
                            readonly
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
                            v-model="alumno.per_celular"
                            label="Celular"
                            maxlength="100"
                            readonly
                          />
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-input
                            dense
                            outlined
                            stack-label
                            class="full-width"
                            v-model="alumno.sed_descripcion"
                            label="Sede"
                            maxlength="100"
                            readonly
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
                            v-model="alumno.escuela"
                            label="Escuela"
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
                            v-model="alumno.alu_estado_descrip"
                            label="Tipo Alumno"
                            maxlength="100"
                            readonly
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
                      </div>
                    </q-tab-panel>
                    
                    <q-tab-panel name="alarms">
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-8 col-xs-8">
                          <q-item-section>
                            <q-input
                              dense
                              outlined
                              stack-label
                              class="full-width"
                              v-model="empresa.RUC"
                              label="R.U.C."
                              maxlength="11"
                              @keyup.enter="busquedaRUC"
                              :error="$v.empresa.RUC.$error"
                              :error-message="mensajeError('RUC')"
                            />
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                          <q-item-section>
                            <q-btn
                              dense
                              color="purple"
                              icon="person_search"
                              class="q-px-sm"
                              @click="busquedaRUC"
                            >
                            </q-btn>
                          </q-item-section>
                        </q-item>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="movies">
                      <div class="row">
                        <q-item class="col-lg-6 col-md-6 col-sm-8 col-xs-8">
                          <q-item-section>
                            <q-input
                              dense
                              outlined
                              stack-label
                              class="full-width"
                              v-model="personaEssalud.datos_personales.dni"
                              label="D.N.I."
                              maxlength="8"
                              @keyup.enter="busquedaESSALUD"
                              :error="
                                $v.personaEssalud.datos_personales.dni.$error
                              "
                              :error-message="mensajeError('Essaluddni')"
                            />
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-1 col-xs-1">
                          <q-item-section>
                            <q-btn
                              dense
                              color="purple"
                              icon="person_search"
                              class="q-px-sm"
                              @click="busquedaESSALUD"
                            >
                            </q-btn>
                          </q-item-section>
                        </q-item>
                      </div>
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
import {  email,  required,  numeric,  minLength,  maxLength,  sameAs,} from "vuelidate/lib/validators";
import { LocalStorage, SessionStorage } from "quasar";
import { axiosIntranet } from "../boot/axios";
import sgaService from "../services/sga";
import { mapState, mapActions } from "vuex";
import { Notify } from "quasar";

export default {
  name: "PageIndex",
  // components: {
  //CardItem: () => import('components/cards/CardItem'),
  // CardSocial: () => import("components/cards/CardSocial"),
  //CardCharts: () =>  import('components/cards/CardCharts'),
  // TabSocial: () => import("components/tabs/TabSocial"),
  // CardWithImage: () => import("components/cards/CardWithImage"),
  //CardTimeLine: () =>  import('components/cards/CardTimeLine'),
  //TodoList: () =>  import('components/list/TodoList'),
  // TableVisits: () => import("components/tables/TableVisits")
  // },
  data() {
    return {
      tab: "mails0",
      mode: "list",
      user: {},
      alumno: {
          codigo: "",
          idpersona: "",
          per_nombres: "",
          per_apepaterno: "",
          per_apematerno: "",
          per_dni: "",
          per_fechanacimiento: "",
          per_estadocivil: 0,
          per_sexo: "",
          per_telefono: "",
          per_celular: "",
          per_email: "",
          per_direccionlocal: "",
          per_estado: true,
          idalumno: "",
          alu_anioegreso: null,
          alu_ponderado: "",
          alu_curricula: "",
          escuela: "",
          alu_estado: "",
          alu_estado_descrip: "",
          alu_ciclo: 0,
          idperiodo: "",
          idsede: "",
          sed_descripcion: "",
          idubigeo: "",
          coddistrito: "",
          distrito: "",
          provincia: "",
          departamento: "",
          ult_matricula: ""
      },
      listAlumnos: [],
      seleccionar: "Seleccionar",
      persona: {
        DNI: "",
        NombreCompleto: "",
        Nombre: "",
        Paterno: "",
        Materno: "",
        FechaNacimiento: "",
        Sexo: "",
        Direccion: "",
        Departamento: "",
        Provincia: "",
        Distrito: "",
        DigitoVerificacion: 0,
      },
      personaAll: {},
      busquedaDNI_Platinium: {},
      empresa: {},
      personaEssalud:{
        datos_personales: {
            nombres: "",
            dni: "",
            tipo_de_asegurado: "",
            autogenerado: "",
            tipo_de_seguro: "",
            fecha_nacimiento: ""
        },
        acreditacion: {
            centro_asistencial: "",
            direccion: "",
            afiliado: "",
            vigencia: {
                desde: "",
                hasta: ""
            }
        }
      },
    };
  },  
  validations: {
    alumno: {
      codigo: {
        required,
        numeric,
      },
    },
    persona: {
      DNI: {
        required,
        numeric,
      },
    },
    empresa: {
        RUC: {
        required,
        numeric,
      },
    },
    personaEssalud: {
        datos_personales: {
          dni: {
            required,
            numeric,
          }
      },
    },
    personaAll: {
      dni: {
        required,
        numeric,
      },
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

    // axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
    // axiosIntranet
    //   .get("/getalumnosapoderado" + "?apo_id=" + user.usu_id)
    //   .then((res) => {
    //     this.listAlumnos = res.data;
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       let code = err.response.data.code;
    //       Notify.create({
    //         message: "Error. Please contact support." + err.response,
    //         color: "negative",
    //       });
    //     }
    //   });

    // console.log("created=============================");
    // console.log(this.listAlumnos);
  },
  mounted() {
    //this.getDatosPersonaAlumno();
    // console.log("mounted=============================");
    // console.log(this.listAlumnos);
  },
  beforeUpdate() {
    // console.log("beforeUpdate=============================");
    //  console.log(this.listAlumnos);
  },
  methods: {
    mensajeError(campo) {
      if (campo === "codigo") {
        if (!this.$v.alumno.codigo.required) return "Campo requerido";
        if (!this.$v.alumno.codigo.numeric) return "Campo númerico";
      }
      if (campo === "DNI") {
        if (!this.$v.persona.DNI.required) return "Campo requerido";
        if (!this.$v.persona.DNI.numeric) return "Campo númerico";
      }
      if (campo === "RUC") {
        if (!this.$v.empresa.RUC.required) return "Campo requerido";
        if (!this.$v.empresa.RUC.numeric) return "Campo númerico";
      }
      if (campo === "Essaluddni") {
        if (!this.$v.personaEssalud.datos_personales.dni.required) return "Campo requerido";
        if (!this.$v.personaEssalud.datos_personales.dni.numeric) return "Campo númerico";
      }
      if (campo === "DNIALL") {
        if (!this.$v.personaAll.dni.required) return "Campo requerido";
        if (!this.$v.personaAll.dni.numeric) return "Campo númerico";
      }
    },
    busquedaAlumnoSUV(){
      
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      this.$v.alumno.$touch();
      if (!this.$v.alumno.$error) {
        axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
        axiosIntranet
          .post("/getdatosalumnosuv", { "codalumno": this.alumno.codigo })
          .then((res) => {
            this.alumno = {};
            let success = res.data.success;

            if(success == true){
                this.alumno = res.data.data;
                this.alumno.codigo = this.alumno.idalumno;
            }else{
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
    busquedaDNI() {

    },
    busquedaRUC(){

    },
    busquedaESSALUD(){

    }
  },
};
</script>
