<template>
    <q-page class="q-pa-sm">
          <div class="q-pa-sm q-gutter-sm">
            <q-card>
              <q-card-section class="text-h6 q-pa-none">
                <q-item>
                  <q-item-section avatar class="">
                    <!-- <q-icon color="blue" name="warehouse" size="34px" /> -->
                    <div>
                        <q-spinner-cube
                        color="blue"
                        size="2em"/>
                         <q-tooltip :offset="[0, 8]">Lista Prestamos</q-tooltip>
                    </div>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-overline text-weight-medium" style="font-size: 20px">
                      Listado Prestamos
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
                            @click="showPopupRegister()" >
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
   <q-table class="" :data="listLoan"
  title="Listado Prestamos" :hide-header="mode === 'grid'"
  :columns="columnslist" row-key="name"
  :pagination.sync="pagination">
  <template v-slot:top-right="props">
    <!-- Primera caja de búsqueda -->
    <q-input borderless
      dense debounce="300" v-model="filterdni" placeholder="Buscar DNI">
      <template v-slot:append>
        <q-icon name="search" @click="getListLoan()"/>
      </template>
      <!-- <q-item-section top class="col-lg-1 col-md-1">
                        <q-btn color="blue" icon-right="person_search" @click="getListLoan()">
                          <q-tooltip class="bg-accent">Buscar DNI en Reniec</q-tooltip>
                        </q-btn>
       </q-item-section> -->
      
    </q-input>

    <div style="width: 10px;"></div>
    <!-- Segunda caja de búsqueda -->
    <q-input borderless
      dense debounce="300" v-model="filtercod" placeholder="Búscar Matricula">
      <template v-slot:append>
        <q-icon name="search"  @click="getListLoan()" />
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
                            <q-td key="deu_cod_matricula" :props="props"  class="text-weight-bold text-blue">
                              {{ props.row.debtor.deu_cod_matricula }}
                            </q-td>  
                            <q-td key="deu_nro_documento" :props="props"  class="text-weight-bold text-blue">
                              {{ props.row.debtor.deu_nro_documento }}
                            </q-td>
                            <q-td key="deu_nombres" :props="props" >
                                {{ props.row.debtor.deu_nombres }}
                             <!-- {{ props.row.persona.per_ap_paterno + ' ' + props.row.persona.per_ap_materno + ', ' + props.row.deu_nombres }} -->
                            </q-td> 
                            <q-td key="deu_genero" :props="props" >
                              {{ props.row.debtor.deu_genero }}
                            </q-td> 
                            <!-- <q-td key="esc_nombre" :props="props" >
                              {{ props.row.esc_nombre }}
                            </q-td> 
                            <q-td key="fac_nombre" :props="props" >
                              {{ props.row.fac_nombre }}
                            </q-td>  -->
                            <q-td key="tipo_deudor_nombre" :props="props"  class="text-weight-bold text-blue">
                              {{ props.row.debtor.tipo_deudor_nombre }}
                            </q-td> 
                            <q-td key="pre_tiempo_limite" :props="props">
                              {{ props.row.pre_tiempo_limite}}
                              <!-- {{ props.row.pre_tiempo_limite == null? '-' : props.row.pre_tiempo_limite }}  -->
                            </q-td>
                            <q-td key="pre_fecha_devolucion" :props="props">
                              {{ props.row.pre_fecha_devolucion}}
                              </q-td>
                                   <!-- {{ props.row.pre_fecha_devolucion == null? '-' : getFormatDateDDMMYYYY(props.row.pre_fecha_devolucion) }} -->
                       
                            <q-td key="pre_estado" :props="props" class="text-weight-bold text-blue">
                              {{ true }}
                            </q-td>
                              <q-td key="pre_estado" :props="props" :class="props.row.pre_estado == true ? 'text-blue-10' : 'text-red-14'">
                                    <q-btn dense color="light-blue" icon="mode_edit" @click="showPopupEdit(props.row)">
                                      <q-tooltip class="bg-accent">Editar</q-tooltip>
                                    </q-btn>
  
                                    &nbsp;
  
                                    <q-toggle v-model="props.row.pre_estado" checked-icon="check" color="green"
                                            unchecked-icon="clear" @input="changeStatus(props.row)"/>
  
                              </q-td>
                            </q-tr>
                        </template>
                      </q-table>
  
              </q-card-section>
            </q-card>
          </div>
  
  
      <formLoancopy v-if="popup_register"
          :popup_register='popup_register'
          :prestamos='prestamos'
          @ClosePopupFormRegister='ClosePopupFormRegister'/>
  
    </q-page>
  </template>
  
  <script>
  // import MainLayout from '@/layouts/MainLayoutApp.vue'
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
import Constants from "../utils/constants";

import { mapState, mapActions } from "vuex";
import { Notify } from "quasar";
import moment from "moment";
import XLSX from 'sheetjs-style';
// import formLoancopy from '../../../components/loancopy/formLoancopy.vue';}
import formLoancopy from '../components/loancopy/formLoancopy.vue';
// import { getFormatDateDDMMYYYY } from '../../utils/helper.js';
  
  export default {
    name: "Loan",
    components: { formLoancopy},
    data() {
      return {
        tab: "mails0",
        mode: "list",
        user: {},
        filterdni: '',
        filtercod: '',
        pagination: {
          rowsPerPage: 10,
          sortBy: 'created_at',
          descending: true
        },      
        listLoan: [],
        tablaDetalle: false,
        columnslist: [
        {
            name: "deu_cod_matricula",
            align: "left",
            label: "Codigo Matricula",
            field: "deu_cod_matricula",
            sortable: true,
          },{
            name: "deu_nro_documento",
            align: "left",
            label: "Numero de Documento",
            field: "deu_nro_documento",
            sortable: true,
          },{
            name: "deu_nombres",
            align: "left",
            label: "Nombres",
            field: "deu_nombres",
            sortable: true,
          },{
            name: "deu_genero",
            align: "left",
            label: "Genero",
            field: "deu_genero",
            sortable: true,
          },
          // {
          //   name: "esc_nombre",
          //   align: "left",
          //   label: "Escuela",
          //   field: "esc_nombre",
          //   sortable: true,
          // },{
          //   name: "fac_nombre",
          //   align: "left",
          //   label: "Facultad",
          //   field: "fac_nombre",
          //   sortable: true,
          // },
          {
            name: "pre_tiempo_limite",
            align: "left",
            label: "Tiempo Limite",
            field: "pre_tiempo_limite",
            sortable: true,
          },{
            name: "pre_fecha_devolucion",
            align: "left",
            label: "Tiempo Devolución",
            field: "pre_fecha_devolucion",
            sortable: true,
          },
          {
            name: "pre_estado",
            align: "left",
            label: "Estado",
            field: "pre_estado",
            sortable: true,
          }
        ],
        popup_register: false,
        prestamos: {
            id_prestamo: 0,
            id_deudor: 0,
            debtor:{
              id_deudor: 0,
              deu_nombres: 'hola',              

            },
            // deu_cod_matricula: '',
            // deu_nombres: '',
            // deu_genero: '',
            // id_tipo_deudor: 0,
            // tipo_deudor_nombre: 0,
            // esc_nombre: null,
            // fac_nombre: null,
            pre_tiempo_limite: Date,
            pre_fecha_devolucion: Date,
            pre_estado: true,
            // created_at: null,
            // updated_at: null
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
  
      this.getListLoan();
    },
    mounted() {
    },
    beforeUpdate() {
    },
    methods: {
      //  getFormatDateDDMMYYYY,
      ClosePopupFormRegister(){
        this.popup_register = false
        this.getListLoan();
      },
      showPopupRegister(){
          // this.documentType = {}
          this.resetObjectsValues();
          this.popup_register = true;

      },
      showPopupEdit(row){
          this.tablaDetalle = true;
          this.popup_register = true
          this.prestamos = Object.assign({}, row);
          this.prestamos.debtor.deu_nombres = this.prestamos.debtor.deu_nombres + ' '+this.prestamos.debtor.deu_apellido_paterno + ' '+ this.prestamos.debtor.deu_apellido_materno;
          // this.documentType.mt_id = { "mt_id" : row.mt_id, "emp_razon_social" : row.emp_razon_social};
      },
      async changeStatus(row){
        // console.log(row)
        const user  = LocalStorage.getItem("user")
        const prestamos = Object.assign({}, row);
  
        this.$q.dialog({
          title: 'Confirmación',
          message: `Desea <b>${prestamos.pre_estado == true ? 'ACTIVAR' : 'DESACTIVAR' }</b> el deudor <b>${prestamos.debtor.deu_nombres}</b>?`,
          html: true,
          ok: { push: true, color: 'blue' },
          cancel: { push: true, color: 'negative' },
          persistent: true
        }).onOk(async () => {
          
          const data = {
            id_prestamo: prestamos.id_prestamo,
            id_deudor: prestamos.id_deudor,
            // deu_cod_matricula: loan.deu_cod_matricula,
            // deu_nombres: loan.deu_nombres,
            // deu_genero:loan.deu_genero,
            // tipo_deudor_nombre: loan.tipo_deudor_nombre,          
            // esc_nombre: loan.esc_nombre,
            // fac_nombre: loan.fac_nombre,
            // sed_nombre: loan.sed_nombre,        
            pre_tiempo_limite: prestamos.pre_tiempo_limite,
            pre_fecha_devolucion: prestamos.pre_fecha_devolucion,
            pre_estado: prestamos.pre_estado,
          };
  
          // const result = await SaveEstadoAlmacen(param);
          const result = await this.$store.dispatch('loan/softdeleteLoan', data)
          
          if (result.status) {
            Notify.create({
              message: "Se actualizó correctamente el estado!",
              color: "positive",
            });
            await this.getListLoan(); 
          } else {
            Notify.create({
              message: "Error al actualizar el estado!",
              color: "warning",
            });
          }
  
        }).onCancel(() => {
          row.pre_estado = !row.pre_estado
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
  
      },
      resetObjectsValues(){
        this.prestamos = {    
            id_prestamo: 0,
            id_deudor: 0,
            debtor: {deu_nombres: ''},
            // id_tipo_deudor: 0,
            // deu_cod_matricula: '',
            // deu_nombres: '',
            // deu_genero: '',
            // tipo_deudor_nombre: '',         
            // esc_nombre: null,
            // fac_nombre: null,
            // sed_nombre: '',          
            pre_tiempo_limite: Date,
            pre_fecha_devolucion: Date,
            pre_estado: true  
          //created_at: null,
         // updated_at: null
        }
      },
      downloadRpteXlsx(){
        this.$store.getters['loan/downloadRpteXLSX'](this.listLoan); 
      },
      async getListLoan(){

        const param = {
        //   deu_cod_matricula: prestamos.deu_cod_matricula
            dni: this.filterdni,
            cod: this.filtercod,
        }
        
        // console.log('Hola');
        console.log('Obteniendo datos con parámetros:', param);
  
        // this.$store.hotUpdate(this.$store.state);  //Vuex supports hot-reloading mutations
        // const result = await this.$store.getters['document/documentTypeFindAll'];
        const result = await this.$store.dispatch('loan/loanFindAll', param);
        const newArray = result.data.map(item => {
          item.pre_estado = true;
          return item;
        });
        
        console.log(newArray); 
        
        // // console.log(result.data)
        // this.listDocumentType = result.data
        this.listLoan = newArray;
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
  