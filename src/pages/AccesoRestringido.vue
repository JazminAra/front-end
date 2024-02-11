<template>
  <q-page class="q-pa-sm">
    <!-- <card-item class="q-mt-lg" :name="profile_card_data.name" :des="profile_card_data.des" :avatar="profile_card_data.avatar"></card-item> -->
    <q-card>
      <q-card-section class="text-h6 q-pa-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="cancel_presentation" size="44px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Acceso Denegado</div>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
    <br />
    <q-card>
      <q-card-section class="text-h6 q-pa-none"> 
          <div class="row bg-orange-5">
              <div class="col-3">
                <q-item>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  NO TIENE ACCESO A ESTA SECCIÓN...
                </q-item>
              </div>
              <div class="col-3">
                <q-item>
                </q-item>
              </div>
          </div>
      </q-card-section>
    </q-card>    

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
      user: {
        apoderadohijos: [
          {
            personasga: [{}]
          }
        ]
      },
      listAlumnos: [],
      seleccionar: "Seleccionar"
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
    // // console.log(token);
    // axiosIntranet.defaults.headers.common["Authorization"] =
    //         "Bearer " + token;
    // axiosIntranet
    //         .get("/getalumnosapoderado" + "?apo_id=" + user.apo_id)
    //         .then(res => {
    //           this.listAlumnos = res.data;
    //         }).catch(err => {
    //       if (err.response) {
    //         let code = err.response.data.code;
    //         Notify.create({
    //           message: "Error. Please contact support." + err.response,
    //           color: "negative"
    //         });
    //       }
    //     }); ;
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
  }
};
</script>
