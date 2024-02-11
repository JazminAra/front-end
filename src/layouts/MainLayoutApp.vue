<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <!-- <div>
          <img class="q-pt-xs" src="text-toolbar-title_v2.png" />
        </div> -->
        <div style="font-family: 'Hind', sans-serif;" class="text-h5">
            Solvencia
        </div>
        <!-- <q-toolbar-title>
          <img class="q-pt-xs" src="text-toolbar-title.png" />
        </q-toolbar-title> -->
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm"
            title="Pantalla Completa"
          >
          </q-btn>
          <!-- <q-btn            round
            dense            flat
            color="white"            icon="fas fa-link"
            type="a"            href="https://unitru.edu.pe/"
            target="_blank"
            title="Página UNT"
          >
          </q-btn> -->
          <!--<q-btn round dense flat icon="fas fa-heart" style="color:#9d4182 !important;" type="a" href="https://github.com/sponsors/pratik227" target="_blank">
          </q-btn>-->
          <!-- <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn> -->
          <q-btn round flat to="/Perfil">
            <q-avatar size="26px">
              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
              <img src="profile_padre.svg" />
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
    >
      <q-list>
        <q-item to="" active-class="q-item-no-link-highlighting">
          <q-img src="unt.png" style="width: 100%" native-context-menu>
            <div class="absolute-bottom text-subtitle2 text-center">
              Universidad Nacional de Trujillo
            </div>
          </q-img>
        </q-item>

        <q-separator></q-separator>

        <div v-for="menu in listMenu" v-bind:key="menu.roa_id">
          <q-item :to="menu.ppg_route_path_pdr" active-class="q-item-no-link-highlighting" v-if="menu.submenu.length == 1">
            <q-item-section avatar>
              <q-icon :name="menu.ppg_icon_pdr" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ menu.ppg_route_descripcion_pdr }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item :icon="menu.ppg_icon_pdr" :label="menu.ppg_route_descripcion_pdr" v-if="menu.submenu.length > 1">
            <div v-for="submenu in menu.submenu" v-bind:key="submenu.ppg_id">
              <q-list class="q-pl-lg" v-if="submenu.ppg_level == 2">
                <q-item :to="submenu.ppg_route_path" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon :name="submenu.ppg_icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{submenu.ppg_route_descripcion}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-expansion-item>
        </div>

        

        <q-item @click.native="logout" active-class="q-item-no-link-highlighting" style="cursor: pointer">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Salir</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator></q-separator>

        <!--         
        <q-item to="/Dashboard2" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>CRM Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item icon="pages" label="Pages">
          <q-list class="q-pl-lg">
            <q-item to="/Login-1" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="email" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Login-1</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Lock" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Lock-2" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen - 2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Pricing" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Pricing</q-item-label>
              </q-item-section>
            </q-item>
            <q-item-label header class="text-weight-bolder text-white"
              >Generic</q-item-label
            >
            <q-item to="/Profile" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>User Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              to="/Maintenance"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Maintenance</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item icon="map" label="Maps">
          <q-list class="q-pl-lg">
            <q-item to="/Map" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="map" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Map</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/MapMarker" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="location_on" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Map Marker</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/StreetView" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="streetview" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Street View</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-item to="/Mail" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="email" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mail</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/TreeTable" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>TreeTable</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Charts" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="insert_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Charts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Cards" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="card_giftcard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cards</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Tables" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="table_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tables</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Contact" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Contact</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Checkout" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="check_circle_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Checkout</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Calendar" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Calendar</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Taskboard" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="done" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Taskboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Pagination" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pagination</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Ecommerce" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Product Catalogues</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item icon="menu_open" label="Menu Levels">
          <q-item class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Level 1</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item :header-inset-level="0.85" label="Level 2">
            <q-item
              class="q-ml-xl"
              style="margin-left: 55px  !important;"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section>
                <q-item-label>Level 2.1</q-item-label>
              </q-item-section>
            </q-item>
            <q-expansion-item :header-inset-level="1" label="Level 2.2">
              <q-item
                style="margin-left: 65px  !important;"
                active-class="q-item-no-link-highlighting"
              >
                <q-item-section>
                  <q-item-label>Level 2.2.1</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                style="margin-left: 65px  !important;"
                active-class="q-item-no-link-highlighting"
              >
                <q-item-section>
                  <q-item-label>Level 2.2.2</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-expansion-item>
        </q-expansion-item> -->
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>


    <!-- <q-footer elevated class="bg-white text-grey-8">  
        <q-tabs align="center" no-caps active-color="indigo" indicator-color="indigo" class="text-grey">
          <div v-for="menu in listMenu" v-bind:key="menu.roa_id">
            <q-route-tab :to="menu.route_path" :icon="menu.roa_menu_icon" :title="menu.route_descripcion">
            </q-route-tab>
          </div>          
        </q-tabs>      
    </q-footer> -->
    
  </q-layout>
</template>

<script>
import { LocalStorage, SessionStorage } from "quasar";
import EssentialLink from "components/EssentialLink";
import Messages from "./Messages";
import { Notify } from "quasar";
import { axiosIntranet } from "../boot/axios";
// import { axiosApp } from "../boot/axiosapp";

export default {
  name: "MainLayout",

  components: {
    Messages,
    EssentialLink,
  },

  data() {
    return {
      leftDrawerOpen: false,
      listRolAccesos: [],
      RouteNamePage: "",
    };
  },
  beforeCreate() {
    // if (LocalStorage.has("token") && LocalStorage.has("user")) {

    // }else{
    //     this.$router.push("/");
    // }
  },
  created() {

    // console.log(LocalStorage.getItem("token"))
    // console.log(LocalStorage.getItem("user"))

    // console.log("created MainLayoutApp");
    this.RouteNamePage = this.$route.name;
    // console.log(this.RouteNamePage)

    //Verficar token inicio session
    if (LocalStorage.has("token") && LocalStorage.has("user")) {
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
      axiosIntranet.get("/usuarios/" + user.usu_id)
        .then((res) => {

          axiosIntranet.defaults.headers.common["Authorization"] = "Bearer " + token;
          axiosIntranet
            .post("/getlistpaginasusuarioapp",
              {
                usuario_id: user.usu_id,
                app_codigo: process.env.CODE_APP
              }).then((res) => {              
                this.listRolAccesos = res.data.data.menu;

                // console.log(this.listRolAccesos);

                let found = this.listRolAccesos.find(
                  (element) => element.ppg_route_name_pdr == this.RouteNamePage
                );

                // console.log(found)
                const routername = this.RouteNamePage;
                // console.log("getlistpaginasusuarioapp - 1")
                // console.log(routername)

                // let existe = false;
                if (found == undefined) {
                  for (const item of this.listRolAccesos) {
                      // console.log("Item")
                      // console.log(item.submenu)
                      for(const subitem of item.submenu){
                        // console.log("SubItem")
                        // console.log(subitem)
                        if(subitem.ppg_route_name == routername) found = subitem
                      }
                  }
                }

                // console.log("- Menú encontrado:")
                // console.log(found)
                
                if (found == undefined) {
                  this.$router.push("/AccesoRestringido");
                }
            })
            .catch((err) => {
              if (err.response) {
                let code = err.response.data.code;
                Notify.create({
                  message: "Error. " + err.response,
                  color: "negative",
                });
              }
            });
            
        }).catch((err) => {
          let code = err.response.data.code;
          let message = err.response.data.message;

          if (err.response) {
            Notify.create({
              message: "Error. " + code + " - " + message,
              color: "negative",
            });
          }
          // this.$router.push("/");
        });
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    logout() {
      this.$auth
        .logout()
        .then(() => {
          this.$q.cookies.remove('token')
          this.$q.cookies.remove('user')
          this.$router.push("/");
        }).catch((error) => {
          if (error.response) {
            console.log(error);
          }
        });
    },
  },
  computed: {
    listMenu() {
      return this.listRolAccesos.filter(
        (item) => item.ppg_estado_pdr == 1
      );
    },
  },
};
</script>
