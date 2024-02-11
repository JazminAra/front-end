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
                        <q-tooltip :offset="[0, 8]">Lista Reporte</q-tooltip>
                    </div>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-overline text-weight-medium" style="font-size: 20px">
                      Listado Reporte
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
<!-- boton registrar  <q-btn push size="sm" color="blue" class="text-capitalize text-white" icon-right=""-->
                            <!-- @click="showPopupRegister()"> -->
                            <!-- <q-icon name="add"/> -->
                            <!-- &nbsp; Nuevo -->
                          <!-- </q-btn> -->
  
                          <!-- &nbsp;&nbsp;&nbsp; -->
  <!-- boton reporte -->
                          <q-btn push size="sm" color="green" class="text-capitalize text-white" icon-right=""
                            @click="downloadRpteXlsx()">
                            <q-icon name="downloading"/>
                            &nbsp; Reporte
                          </q-btn>
                      </div>                        
   <!-- tabla -->
                      <q-table class="" :data="listReport"
                        title="Listado Reporte" :hide-header="mode === 'grid'"
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
                              <q-td key="cod_matricula_deudor" :props="props"  class="text-weight-bold text-blue">
                                {{ props.row.fac_nombre }} </q-td>
                               <q-td key="rna_fecha_generacion" :props="props">
                              {{ props.row.rna_fecha_generacion}}</q-td>
                              <q-td key="rna_tiempo_limite" :props="props">
                              {{ props.row.rna_tiempo_limite}}</q-td>
                              <q-td key="rna_estado" :props="props" :class="props.row.rna_estado == true ? 'text-blue-10' : 'text-red-14'">
                                    <!-- <q-btn dense color="light-blue" icon="mode_edit" @click="showPopupEdit(props.rna_estado)"> -->
                                      <!-- <q-tooltip class="bg-accent">Editar</q-tooltip> -->
                                    <!-- </q-btn> -->
  
                                    <!-- &nbsp; -->
  
                                    <q-toggle v-model="props.row.rna_estado" checked-icon="check" color="green"
                                            unchecked-icon="clear" @input="changeStatus(props.row)"/>
  
                              </q-td>
                            </q-tr>
                        </template>
                      </q-table>
  
              </q-card-section>
            </q-card>
          </div>
  
  
      <!-- <formReport
          :popup_register='popup_register'
          :reporte='reporte'
          @ClosePopupFormRegister='ClosePopupFormRegister'/> -->
  
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
//import { axiosIntranet } from "../../boot/axios";
import Constants from "../../utils/constants";

import { mapState, mapActions } from "vuex";
import { Notify } from "quasar";
import moment from "moment";
import XLSX from 'sheetjs-style';
// import formFaculty from '../../components/faculty/formFaculty.vue';
//   import { getFormatDateDDMMYYYY_HHMM } from '../../utils/helper';
  
  export default {
    name: "Report",
    // components: { formFaculty},
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
        listReport: [],
        columnslist: [
          {
            name: "cod_matricula_deudor",
            align: "left",
            label: "Número de matricúla",
            field: "cod_matricula_deudor",
            sortable: true,
          },{
            name: "rna_fecha_generacion",
            align: "left",
            label: "Fecha generación",
            field: "rna_fecha_generacion",
            sortable: true,
          },{
            name: "rna_tiempo_limite",
            align: "left",
            label: "Tiempo Limite",
            field: "rna_tiempo_limite",
            sortable: true,
            // style: 'width: 50px;'
          },{
            name: "rna_estado",
            align: "left",
            label: "Estado",
            field: "rna_estado",
            sortable: true,
            // style: 'width: 50px;'
          },
        ],
        popup_register: false,
        reporte: {
          cod_matricula_deudor: '',
          rna_fecha_generacion: Date,
          id_reporte_no_adeudo: 0,
          rna_estado: true,
        //  created_at: null,
        //  updated_at: null
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
  
      this.getListReport();
    },
    mounted() {
    },
    beforeUpdate() {
    },
    methods: {
    //   getFormatDateDDMMYYYY_HHMM,
      ClosePopupFormRegister(){
        this.popup_register = false
        this.getListReport();
      },
      showPopupRegister(){
          // this.documentType = {}
          this.resetObjectsValues();
          this.popup_register = true;
      },
      showPopupEdit(row){
          this.popup_register = true
          this.reporte = Object.assign({}, row);
          // this.documentType.mt_id = { "mt_id" : row.mt_id, "emp_razon_social" : row.emp_razon_social};
      },
      async changeStatus(row){
        // console.log(row)
        const user  = LocalStorage.getItem("user")
        const reporte = Object.assign({}, row);
  
        this.$q.dialog({
          title: 'Confirmación',
          message: `Desea <b>${reporte.rna_estado == true ? 'ACTIVAR' : 'DESACTIVAR' }</b> la facultad <b>${reporte.cod_matricula_deudor}</b>?`,
          html: true,
          ok: { push: true, color: 'blue' },
          cancel: { push: true, color: 'negative' },
          persistent: true
        }).onOk(async () => {
          
          const data = {
            id_reporte_no_adeudo: reporte.id_reporte_no_adeudo,          
            rna_fecha_generacion: reporte.rna_fecha_generacion,
            rna_tiempo_limite: reporte.rna_tiempo_limite,
            rna_estado : reporte.rna_estado,
          };
  
          // const result = await SaveEstadoAlmacen(param);
          const result = await this.$store.dispatch('report/softdeleteReport', data)
          
          if (result.status) {
            Notify.create({
              message: "Se actualizó correctamente el estado!",
              color: "positive",
            });
            await this.getListReport(); 
          } else {
            Notify.create({
              message: "Error al actualizar el estado!",
              color: "warning",
            });
          }
  
        }).onCancel(() => {
          row.rna_estado = !row.rna_estado
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
  
      },
      resetObjectsValues(){
        this.reporte = {           
          id_reporte_no_adeudo: 0,   
          cod_matricula_deudor: '',
          rna_fecha_generacion: Date,
          rna_tiempo_limite: Date,
          rna_estado: true,
          created_at: null,
          updated_at: null
        }
      },
      downloadRpteXlsx(){
        this.$store.getters['report/downloadRpteXLSX'](this.listReport); 
      },
      async getListReport(){
        const user  = LocalStorage.getItem("user")
        const param = {
          usu_id : user.usu_id
        }
  
        // this.$store.hotUpdate(this.$store.state);  //Vuex supports hot-reloading mutations
        // const result = await this.$store.getters['document/documentTypeFindAll'];
        const result = await this.$store.dispatch('report/reportFindAll');
        console.log(result);
        // // console.log(result.data)
        // this.listDocumentType = result.data
        this.listReport = result.data
      }
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
  