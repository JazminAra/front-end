<template>
  <q-page class="q-pa-sm">
    <!-- <div class="q-pa-md"> -->
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <!-- <card-item class="q-mt-lg" :name="profile_card_data.name" :des="profile_card_data.des" :avatar="profile_card_data.avatar"></card-item> -->
        <div class="q-pa q-gutter">
          <q-card>
            <q-card-section class="text-h6 q-pa-none">
              <q-item>
                <q-item-section avatar class="">
                  <q-icon color="blue" name="texture" size="34px" />
                </q-item-section>
                <q-item-section>
                  <div
                    class="text-overline text-weight-medium"
                    style="font-size: 20px"
                  >
                    Datos Generales
                  </div>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <br />
            <q-card-section class="q-pa-none">
              <div class="row q-col-gutter-sm">
                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-item
                    :style="`background-color: #5064b5`"
                    class="q-pa-none q-ml-xs"
                  >
                    <q-item-section
                      v-if="icon_position === 'left'"
                      side
                      :style="`background-color: #3e51b5`"
                      class="q-pa-lg q-mr-none text-white"
                    >
                      <q-icon
                        name="home_work"
                        color="white"
                        size="24px"
                      ></q-icon>
                    </q-item-section>
                    <q-item-section class="q-pa-md q-ml-none text-white">
                      <q-item-label
                        class="text-white text-h6 text-weight-bolder"
                        v-if="datosgenerales[0] !== undefined"
                      >
                        {{datosgenerales[0].total_auspiciadores}}
                      </q-item-label>
                      <q-item-label>Total de Instituciones</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-item class="q-pa-none q-ml-xs bg-blue-grey-4">
                    <q-item-section
                      v-if="icon_position === 'left'"
                      side
                      class="q-pa-lg q-mr-none text-white bg-blue-grey"
                    >
                      <q-icon name="school" color="white" size="24px"></q-icon>
                    </q-item-section>
                    <q-item-section class="q-pa-md q-ml-none text-white">
                      <q-item-label
                        class="text-white text-h6 text-weight-bolder"
                        v-if="datosgenerales[0] !== undefined"
                      >
                        {{datosgenerales[0].total_auspicios}}
                      </q-item-label>
                      <q-item-label>Total de Eventos Académicos</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-item class="q-pa-none q-ml-xs bg-yellow-8">
                    <q-item-section
                      v-if="icon_position === 'left'"
                      side
                      class="q-pa-lg q-mr-none text-white bg-yellow-9"
                    >
                      <q-icon
                        name="people_alt"
                        color="white"
                        size="24px"
                      ></q-icon>
                    </q-item-section>
                    <q-item-section class="q-pa-md q-ml-none text-white">
                      <q-item-label
                        class="text-white text-h6 text-weight-bolder"
                        v-if="datosgenerales[0] !== undefined"
                      >
                        {{datosgenerales[0].total_participantes}}
                      </q-item-label>
                      <q-item-label>Total participantes</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </div>

              <br/>
              <q-separator />
              <br/>

              <div class="row q-col-gutter-sm">
                <div class="col-md-4 col-sm-12 col-xs-12">
                  <IEcharts
                    style="height: 250px"
                    :option="getTipoAuspiciadorOptions"
                    :resizable="true"
                  />
                </div>
                
                <div class="col-md-4 col-sm-12 col-xs-12">
                  <IEcharts
                    style="height: 250px"
                    :option="getEstadoAuspiciosOptions"
                    :resizable="true"
                  />
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <IEcharts
                    style="height: 250px"
                    :option="getModalidadAuspiciosOptions"
                    :resizable="true"
                  />
                </div>
              </div>
              
            </q-card-section>
            <br />
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
import { LocalStorage, SessionStorage } from "quasar";
import { axiosIntranet } from "../boot/axios";
import sgaService from "../services/sga";
import { mapState, mapActions } from "vuex";
import { Notify } from "quasar";
import { axiosApp } from "../boot/axiosapp";
import IEcharts from "vue-echarts-v3/src/full.js";

export default {
  name: "Dashboard",
  components: {
    IEcharts,
  //CardItem: () => import('components/cards/CardItem'),
  // CardSocial: () => import("components/cards/CardSocial"),
  //CardCharts: () =>  import('components/cards/CardCharts'),
  // TabSocial: () => import("components/tabs/TabSocial"),
  // CardWithImage: () => import("components/cards/CardWithImage"),
  //CardTimeLine: () =>  import('components/cards/CardTimeLine'),
  //TodoList: () =>  import('components/list/TodoList'),
  // TableVisits: () => import("components/tables/TableVisits")
  },
  props: {
    icon_position: {
      required: false,
      default: "left",
    },
  },
  data() {
    return {
      mode: "list",
      user: {},
      datosgenerales: [],
      estadoauspicios: [],
      modalidadauspicios: [],
      tipoauspiciador: [],
      getTipoAuspiciadorOptions: {},
      getEstadoAuspiciosOptions: {},
      getModalidadAuspiciosOptions: {}
    };
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

    // console.log(token)
    axiosApp.defaults.headers.common["Authorization"] = "Bearer " + token;
    axiosApp.post("/getdatosgenerales", {
        // auspiciador: this.auspiciador
      })
      .then((res) => {
        // this.auspiciador = {};
        // console.log(res.data)
        let success = res.data.success;

        if (success == true) {
          this.datosgenerales = res.data.data;
          // console.log(this.datosgenerales)
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

      this.gettipoauspiciador()
      this.getestadoauspicios()
      this.getModalidadAuspicios()

    // console.log("created=============================");
  },
  mounted() {
    //this.getDatosPersonaAlumno();
    // console.log("mounted=============================");
  },
  beforeUpdate() {
    // console.log("beforeUpdate=============================");
  },
  methods: {
    gettipoauspiciador(){
      let token = LocalStorage.getItem("token");
      axiosApp.defaults.headers.common["Authorization"] = "Bearer " + token;
      axiosApp.post("/getcharttipoauspiciador", {
          // auspiciador: this.auspiciador
        })
        .then((res) => {
          // this.auspiciador = {};
          // console.log(res.data)
          let success = res.data.success;

          if (success == true) {

            this.tipoauspiciador = res.data.data;
            // console.log(this.tipoauspiciador)
            const list = res.data.data.map(o => ({ value: o.total_auspiciadores, name: o.empresa }));
            this.setTipoAuspiciadorOptions(list)

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
    setTipoAuspiciadorOptions(_data){
      this.getTipoAuspiciadorOptions = {
          title: {
              text: 'Auspiciadores por Tipo',
              left: 'center'
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
              top: '30%',
              orient: 'vertical',
              left: 'left',
          },
          toolbox: {
              feature: {
                dataView: {
                  readOnly: false,
                  title: "Listado",
                },
                restore: {
                  title: "Reiniciar",
                },
                saveAsImage: { title: "Descargar", show: true },
              },
          },
          series: [
              {
                  name: 'Auspiciador',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                      borderRadius: 10,
                      borderColor: '#fff',
                      borderWidth: 2
                  },
                  color: ["#9a60b4", "#fc8452", "#fac858", "#F44336", "#8E24AA"],
                  label: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '12',
                          fontWeight: 'bold'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: _data
              }
          ]
      };
    },
    getestadoauspicios(){
      let token = LocalStorage.getItem("token");
      axiosApp.defaults.headers.common["Authorization"] = "Bearer " + token;
      axiosApp.post("/getchartestadoauspicios", {
          // auspiciador: this.auspiciador
        })
        .then((res) => {
          // this.auspiciador = {};
          // console.log(res.data)
          let success = res.data.success;

          if (success == true) {

            // this.tipoauspiciador = res.data.data;
            // console.log(res.data.data)
            const list = res.data.data.map(o => ({ value: o.total_auspicios, name: o.estado_auspicio }));
            this.setEstadoAuspiciosOptions(list)

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
    setEstadoAuspiciosOptions(_data){
      this.getEstadoAuspiciosOptions = {
          title: {
              text: 'Eventos por Estado',
              left: 'center'
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
              top: '30%',
              orient: 'vertical',
              left: 'left',
          },
          toolbox: {
              feature: {
                dataView: {
                  readOnly: false,
                  title: "Listado",
                },
                restore: {
                  title: "Reiniciar",
                },
                saveAsImage: { title: "Descargar", show: true },
              },
          },
          series: [
              {
                  name: 'Estado',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                      borderRadius: 10,
                      borderColor: '#fff',
                      borderWidth: 2
                  },
                  color: ["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],
                  label: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '12',
                          fontWeight: 'bold'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: _data
              }
          ]
      };
    },
    getModalidadAuspicios(){
      let token = LocalStorage.getItem("token");
      axiosApp.defaults.headers.common["Authorization"] = "Bearer " + token;
      axiosApp.post("/getchartmodalidadauspicios", {
          // auspiciador: this.auspiciador
        })
        .then((res) => {
          // this.auspiciador = {};
          // console.log(res.data)
          let success = res.data.success;

          if (success == true) {

            // this.tipoauspiciador = res.data.data;
            // console.log(res.data.data)
            const list = res.data.data.map(o => ({ value: o.total_auspicios, name: o.modalidad_auspicio }));
            this.setModalidadAuspiciosOptions(list)

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
    setModalidadAuspiciosOptions(_data){
      this.getModalidadAuspiciosOptions = {
          title: {
              text: 'Modalidad Eventos',
              left: 'center'
          },
          tooltip: {
              trigger: 'item'
          },
          // legend: {
          //     top: '30%',
          //     orient: 'vertical',
          //     left: 'left',
          // },
          legend: {
              bottom: 0,
              left: 'center',
          },
          toolbox: {
              feature: {
                dataView: {
                  readOnly: false,
                  title: "Listado",
                },
                restore: {
                  title: "Reiniciar",
                },
                saveAsImage: { title: "Descargar", show: true },
              },
          },
          series: [
              {
                  name: 'Modalidad',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                      borderRadius: 10,
                      borderColor: '#fff',
                      borderWidth: 2
                  },
                  color: ["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],
                  label: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '12',
                          fontWeight: 'bold'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: _data
              }
          ]
      };
    }
    // visualizarAlumno(data) {
    //   //Passing parameters
    //   this.$router.push({
    //     name: "NotasAlumno",
    //     params: { alumno: data },
    //   });
    // },
  },
};
</script>
