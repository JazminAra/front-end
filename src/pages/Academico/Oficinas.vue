<template>
    <q-page class="q-pa-sm">
          <div class="q-pa-sm q-gutter-sm">
            <q-card>
              <q-card-section class="text-h6 q-pa-none">
                <q-item>
                  <q-item-section avatar class="">
                    <!-- <q-icon color="blue" name="warehouse" size="34px" /> -->
                    <div>
                        <q-spinner-ball color="blue" size="1.5em"/>
                        <q-tooltip :offset="[0, 8]">Lista Oficina</q-tooltip>
                    </div>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-overline text-weight-medium" style="font-size: 20px">
                      Listado Oficina
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
                      <div class="row float-rigth"> 
<!-- boton registrar --> <q-btn push size="sm" color="blue" class="text-capitalize text-white" icon-right=""
                            @click="showPopupRegister()">
                            <q-icon name="add"/>
                            &nbsp; Nuevo
                          </q-btn>
  
                          &nbsp;&nbsp;&nbsp;
  <!-- boton reporte -->
                          <q-btn push size="sm" color="green" class="text-capitalize text-white" icon-right=""
                            @click="downloadRpteXlsx()">
                            <q-icon name="downloading"/>
                            &nbsp; Reporte
                          </q-btn>
                      </div>                        
   <!-- tabla -->
                      <q-table class="" :data="listOrgan"
                        title="Listado Oficinas " :hide-header="mode === 'grid'"
                        :columns="columnslist" row-key="name"
                        :filter="filterlist" :pagination.sync="pagination">
                        <template v-slot:top-right="props">
                          <q-input borderless
                            dense debounce="300" v-model="filterlist" placeholder="Buscar">
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
  
                          <!-- <q-btn
                            @click="downloadRpteXlsx()"
                            push
                            size="sm"
                            color="green-5"
                            class="text-capitalize text-white"
                            icon-right=""
                          >
                            <q-icon name="downloading" color="blue-grey"/>
                            &nbsp; Reporte
                          </q-btn> -->
                        </template>
                        <template v-slot:body="props">
                          <q-tr :props="props">
                              <q-td key="org_nombre" :props="props"  class="text-weight-bold text-blue">
                                {{ props.row.org_nombre }}
                              </q-td> 
                              <q-td key="tor_nombre" :props="props" >
                                {{ props.row.organType.tor_nombre }}
                              </q-td> 
                              <q-td key="sed_nombre" :props="props" >
                               <!-- {{ props.row.campus.sed_nombre }} -->
                               <template v-if="props.row.campus && props.row.campus.sed_nombre !== null">{{ props.row.campus.sed_nombre }}
                                </template>
                                <template v-else>  -
                                </template>
                              </q-td> 
                              <q-td key="fac_nombre" :props="props" >
                                <!-- {{ props.row.faculty.fac_nombre }} -->
                                <template v-if="props.row.faculty && props.row.faculty.fac_nombre !== null">{{ props.row.faculty.fac_nombre }}
                                </template>
                                <template v-else>  -
                                </template>
                              </q-td> 
                              <q-td key="esc_nombre" :props="props" >
                                <!-- {{ props.row.school.esc_nombre }} -->
                                <template v-if="props.row.school && props.row.school.esc_nombre !== null">{{ props.row.school.esc_nombre}}
                                </template>
                                <template v-else>  -
                                </template>
                              </q-td> 
                              <q-td key="org_estado" :props="props" :class="props.row.org_estado == true ? 'text-blue-10' : 'text-red-14'">
                                    <q-btn dense color="light-blue" icon="mode_edit" @click="showPopupEdit(props.row)">
                                      <q-tooltip class="bg-accent">Editar</q-tooltip>
                                    </q-btn>
  
                                    &nbsp;
  
                                    <q-toggle v-model="props.row.org_estado" checked-icon="check" color="green"
                                            unchecked-icon="clear" @input="changeStatus(props.row)"/>
  
                              </q-td>
                            </q-tr>
                        </template>
                      </q-table>
  
              </q-card-section>
            </q-card>
          </div>
  
  
      <formOrgan
          :popup_register='popup_register'
          :organo='organo'
          @ClosePopupFormRegister='ClosePopupFormRegister'/>
  
    </q-page>
  </template>
  
  <script>
  // import UserLayout from 'src/layouts/UserLayout.vue'
import {
  email,
  required,
  numeric,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import { LocalStorage, SessionStorage } from "quasar";
import { axiosIntranet } from "../../boot/axios";
import Constants from "../../utils/constants";

import { mapState, mapActions } from "vuex";
import { Notify } from "quasar";
import moment from "moment";
import XLSX from 'sheetjs-style';
import formOrgan from '../../components/organ/formOrgan.vue';
//   import { getFormatDateDDMMYYYY_HHMM } from '../../utils/helper';
  
  export default {
    name: "Academico",
    components: { formOrgan},
    data() {
      return {
        tab: "mails0",
        mode: "list",
        user: {},
        filterlist: "",
        pagination: {
          rowsPerPage: 10,
          sortBy: 'created_at',
          descending: true
        },      
        listOrgan: [],        
        listMenuSedeAccesos: [],   
        listMenuFacultadAccesos: [],    
        listMenuTipoOficinaAccesos: [], 
        listMenuEscuelaAccesos: [], 
        columnslist: [
        {
            name: "org_nombre",
            align: "left",
            label: "Oficina",
            field: "org_nombre",
            sortable: true,
          },{
            name: "tor_nombre",
            align: "left",
            label: "Tipo Oficina",
            field: "tor_nombre",
            sortable: true,
          },{
            name: "sed_nombre",
            align: "left",
            label: "Sede",
            field: "sed_nombre",
            sortable: true,
          },{
            name: "fac_nombre",
            align: "left",
            label: "Facultad",
            field: "fac_nombre",
            sortable: true,
          },{
            name: "esc_nombre",
            align: "left",
            label: "Escuela",
            field: "esc_nombre",
            sortable: true,
          },
          {
            name: "org_estado",
            align: "left",
            label: "Estado",
            field: "org_estado",
            sortable: true,
            // style: 'width: 50px;'
          },
        ],
        popup_register: false,
        organo: {
          id_organo: 0,
          org_nombre: 0,
          id_sede: 0,
          id_escuela: null,
          id_facultad: null,
          id_tipo_organo: 0,
          org_estado: true,
          created_at: null,
          updated_at: null
        }
      };
    },
    validations: {
    },
    beforeCreate() {
      if (LocalStorage.has("token") && LocalStorage.has("user")) {
        const user = LocalStorage.getItem("user");
        this.user = user;
      }
    },
    created() {
      //Verificar Rol del usuario: Admin o Moderador
      // const user = LocalStorage.getItem("user");
      // this.user = user;
      // let found = this.user.aplicacionesusuariosroles.find(
      //   (element) => element.apr_id == 5 || element.apr_id == 6
      // );
  
      // if (found !== undefined) {
      //   this.userControlEliminar = true;
      // }
  
      this.getListOrgan();
    },
    mounted() {
    },
    beforeUpdate() {
    },
    methods: {
    //   getFormatDateDDMMYYYY_HHMM,
      ClosePopupFormRegister(){
        this.popup_register = false
        console.log('hola');
        this.getListOrgan();
      },
      showPopupRegister(){
          // this.documentType = {}
          this.resetObjectsValues();
          this.popup_register = true;
          console.log('hola1');
      },
      showPopupEdit(row){
          console.log('hola4');
          this.popup_register = true
          this.organo = Object.assign({}, row);
          console.log('hola3');
          // this.documentType.mt_id = { "mt_id" : row.mt_id, "emp_razon_social" : row.emp_razon_social};
      },
      async changeStatus(row){
        // console.log(row)
        const user  = LocalStorage.getItem("user")
        const organo = Object.assign({}, row);
  
        this.$q.dialog({
          title: 'Confirmación',
          message: `Desea <b>${organo.org_estado == true ? 'ACTIVAR' : 'DESACTIVAR' }</b> la oficina <b>${organo.org_nombre}</b>?`,
          html: true,
          ok: { push: true, color: 'blue' },
          cancel: { push: true, color: 'negative' },
          persistent: true
        }).onOk(async () => {

          
          
          const data = {
            id_organo: organo.id_organo,          
            org_nombre: organo.org_nombre,
            org_estado : organo.org_estado,
            id_sede : organo.id_sede.id_sede,
            id_tipo_organo : organo.id_tipo_organo.id_tipo_organo,
            id_facultad : organo.id_facultad.id_facultad,
            id_escuela : organo.id_escuela.id_escuela,
          };
  
          // const result = await SaveEstadoAlmacen(param);
          const result = await this.$store.dispatch('organ/softdeleteOrgan', data)
          
          if (result.status) {
            Notify.create({
              message: "Se actualizó correctamente el estado!",
              color: "positive",
            });
            await this.getListOrgan();
          } else {
            Notify.create({
              message: "Error al actualizar el estado!",
              color: "warning",
            });
          }
  
        }).onCancel(() => {
          row.org_estado = !row.org_estado
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
  
      },
      resetObjectsValues(){
        this.organo = { 
          id_organo: 0,
          org_nombre:'',
          id_sede: 0,
          id_escuela: null,
          id_facultad: null,
          id_tipo_organo: 0,
          org_estado: true,
          created_at: null,
          updated_at: null
        }
      },
      downloadRpteXlsx(){
        this.$store.getters['organ/downloadRpteXLSX'](this.listOrgan); 
      },
      async getListOrgan(){
        const user  = LocalStorage.getItem("user")
        const param = {
          usu_id : user.usu_id
        }
        
        // this.$store.hotUpdate(this.$store.state);  //Vuex supports hot-reloading mutations
        // const result = await this.$store.getters['document/documentTypeFindAll'];
        const result = await this.$store.dispatch('organ/organFindAll');
        const newArray = result.data.map(item => {
          item.org_estado = true;
          return item;
        });
        
        console.log(newArray); 
        
        console.log(result);
        // // console.log(result.data)
        // this.listDocumentType = result.data
        this.listOrgan = newArray;
      },
    },
  
  };
  </script>
  
  <style>
  .my-table-details {
    font-size: 0.95em;
    font-style: italic;
    width: 200px;
    white-space: normal;
    color: #555;
    margin-top: 2px;
  }
  
  .my-table-details-2 {
    width: 80px;
    white-space: normal;
    color: #555;
    margin-top: 2px;
  }
  
  .my-table-primary {
    width: 200px;
    white-space: normal;
    margin-top: 2px;
  }
  </style>
  
  <style lang="sass">
  .image-gallery
    &__image
      border-radius: 3%/5%
      width: 150px !important
      height: 200px !important
      cursor: pointer
  
      &-full
        width: 800px
        max-width: 70vw !important
        z-index: 2002
        pointer-events: none
  
        &--active
          pointer-events: all
    &__blinder
      opacity: 0
      z-index: 2000
      pointer-events: none
      transition: opacity 0.3s ease-in-out
  
      &--active
        opacity: 0.6
        pointer-events: all
  
        + div > .image-gallery__image
          z-index: 2001
  </style>
  