<template>
  <q-page class="q-pa-sm">
    <!-- <card-item class="q-mt-lg" :name="profile_card_data.name" :des="profile_card_data.des" :avatar="profile_card_data.avatar"></card-item> -->
    <q-card>
      <q-card-section class="text-h6 q-pa-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="contact_mail" size="34px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Contacto</div>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
    <br />
    <q-card>
      <q-card-section>
        <template>
          <!-- <div class="q-pa-md"> -->
          <q-table
            title="Contacto Escuelas Académicas"
            dense
            class="no-shadow"
            :data="listEscuelasContacto"
            :columns="[
              {
                name: 'escuela_nombre',
                label: 'Escuela Académica',
                field: 'escuela_nombre',
                align: 'left',
                sortable: true,
              },
              {
                name: 'escuela_email',
                label: 'Email',
                field: 'escuela_email',
                align: 'left',
                sortable: true,
              },
            ]"
            row-key="name"
            :filter="filter"
            :pagination.sync="pagination"
          >
            <template v-slot:top-right="props">
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Buscar"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>

              <q-btn
                flat
                round
                dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                v-if="mode === 'list'"
                class="q-px-sm"
              >
                <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                  >{{
                    props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
                  }}
                </q-tooltip>
              </q-btn>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="escuela_nombre" :props="props">
                  {{ props.row.escuela_nombre }}
                </q-td>
                <q-td key="escuela_email" :props="props">
                  {{ props.row.escuela_email }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <!-- </div> -->
        </template>
      </q-card-section>
    </q-card>

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
  </q-page>
</template>

<script>
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
      mode: "list",
      filter: "",
      pagination: {
        rowsPerPage: 15,
      },
      user: {
        apoderadohijos: [
          {
            personasga: [{}],
          },
        ],
      },
      // listAlumnos: [],
      seleccionar: "Seleccionar",
      listEscuelasContacto: [],
    };
  },
  beforeCreate() {
    if (LocalStorage.has("token") && LocalStorage.has("user")) {
      const user = LocalStorage.getItem("user");
      // console.log(user);
      this.user = user;
      // this.listHijos = user.apoderadohijos;

      // let token = LocalStorage.getItem("token");
      // console.log(token);

      // axiosIntranet.defaults.headers.common["Authorization"] =
      //         "Bearer " + token;
      // return axiosIntranet
      //         .get("/apoderadohijos" + "?apo_id=" + this.user.apo_id)
      //         .then(res => {
      //           this.listHijos = res.data.data;
      //         });

      // console.log("beforeCreate=============================");
      // console.log(this.listAlumnos);
    }
  },
  created() {
    const user = LocalStorage.getItem("user");
    let token = LocalStorage.getItem("token");

    // console.log(token);

    axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
    axiosIntranet
      .get("/escuelacontacto?$limit=80")
      .then((res) => {
        this.listEscuelasContacto = res.data.data;
        // console.log(this.listEscuelasContacto);
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
    // visualizarAlumno(data){
    //     //Passing parameters
    //   this.$router.push({
    //     name: 'NotasAlumno',
    //     params: { alumno: data}
    //   });
    // }
  },
};
</script>
