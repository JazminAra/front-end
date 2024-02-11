<template>
    <q-page class="q-pa-sm">
      <q-page class="q-pa-sm">
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="popup_register" persistent>
            <q-card :class="`ancho-personalizado-${tamanoTabla}`">
                <q-toolbar>
                    <q-avatar>
                        <div>
                        <q-spinner-cube
                        color="blue"
                        size="2em"/>
                         <q-tooltip :offset="[0, 8]">Lista Prestamos</q-tooltip>
                    </div>
                    </q-avatar>

                    <q-toolbar-title class="text-weight-light">
                    <span v-if="prestamos.id_prestamo > 0" class="text-weight-bold">Editar Prestamos {{prestamos.debtor.deu_nombres}}</span>
                    <span v-else class="text-weight-bold">Añadir Prestamos</span>
                    </q-toolbar-title>

                    <q-btn flat round dense icon="close"  @click="ClosePopupFormRegister()" />
                </q-toolbar>
                <q-separator></q-separator>

                <!-- <q-card-section class="q-pt-none"> -->

                    <q-list bordered class="rounded-borders" style="max-width: 550px">

                        <!-- <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Empresa:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-select outlined dense option-value="tip_doc_id" option-label="emp_razon_social" v-model="documentType.tip_doc_id" :options="listTenant" 
                                    label="" color="purple" label-color="purple" :error="$v.documentType.tip_doc_id.$error">
                                    <template v-slot:append>
                                        <q-icon name="apartment"/>
                                    </template>
                                </q-select>
                            </q-item-section>
                        </q-item>
                        <q-separator spaced /> -->
                        <q-item>
                          <q-item-section top class="col-2 gt-sm">
                            <q-item-label class="q-mt-sm text-bold">Busqueda:</q-item-label>
                          </q-item-section>

                    
                            <q-select outlined dense option-value="id" option-label="description" v-model="tipoBusqueda" :options="[{id:1,description:'dni'},{id:2,description:'cod'}]"  
                               color="purple" label-color="purple"   
 >
                            <template v-slot:append>
                                <q-icon name="menu_open" />
                            </template>
                            </q-select>
                          </q-item>

                      <q-separator spaced />
                        <q-item>
                            <q-item-section top class="col-4 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Buscar Deudor:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-5 col-md-5">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="filter" 
                                    label="Prestamos">
                                    <template v-slot:append>
                                        <q-icon name="user"/>
                                    </template>
                                </q-input>
                            </q-item-section>
                            <q-item-section :class="tamanoTabla ==='normal'? 'col-lg-1 col-md-1' :'col-lg-1 col-md-1'"><!--top class="col-lg-2 col-md-2">-->
                          <q-btn color="blue" icon-right="person_search" @click="BuscarPersonaCod()">
                            <q-tooltip class="bg-accent">Buscar Matricula</q-tooltip>
                          </q-btn>
                        </q-item-section>
                        <div style="width: 20px;"></div>
                          
                       <q-item-section :class="tamanoTabla ==='normal'? 'col-lg-1 col-md-1' :'col-lg-1 col-md-1'"><!--top class="col-lg-2 col-md-2">-->
                           <q-btn push size="sm" color="blue" class="text-capitalize text-white" icon-right=""
                             @click="showPopupRegisterDebtor()">
                            <q-icon name="add"/>
                            &nbsp; Agregar Deudor
                          </q-btn>
                        </q-item-section>
                   </q-item>
                
                <q-separator spaced />
                      <q-item>
                            <q-item-section top class="col-4 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Deudor:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-5 col-md-5">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="prestamos.debtor.deu_nombres" 
                                    label="Deudor">
                                    <template v-slot:append>
                                        <q-icon name="user"/>
                                    </template>
                                </q-input>
                            </q-item-section>
                            
                        </q-item>
                
                              
                <q-separator spaced />

  
                  <q-item>
                    <q-item-section :class="tamanoTabla ==='normal'? 'col-lg-4 col-md-4' :'col-lg-4 col-md-4'"> <!--top class="col-lg-2 col-md-2">-->
                       <q-item-label class="q-mt-sm text-bold">Fecha Tiempo Limite:</q-item-label>
                     </q-item-section>
                    <q-item-section top>
                    <div class="row">
                        <q-input dense outlined stack-label v-model="prestamos.pre_tiempo_limite" type="date" />
                    
                    </div>
                 </q-item-section>
                </q-item>
  
                  <q-separator spaced />
  
                  <q-item>
                    <q-item-section :class="tamanoTabla ==='normal'? 'col-lg-4 col-md-4' :'col-lg-4 col-md-4'"><!--top class="col-lg-2 col-md-2">-->
                       <q-item-label class="left text-bold">Fecha Pre Devolución:</q-item-label>
                     </q-item-section>
                    <q-item-section class="q-col">
                    <div class="row">
                        <q-input dense outlined stack-label v-model="prestamos.pre_fecha_devolucion" type="date"  />
                    </div>
                 </q-item-section>
                </q-item>  
                                  
  
                 <q-separator spaced />

                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Estado:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-toggle v-model="prestamos.pre_estado" checked-icon="check" color="green" unchecked-icon="clear"/>
                            </q-item-section>
                        </q-item>
                        <q-separator spaced />

                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                            </q-item-section>
                            <q-item-section top>
                                <q-btn v-if="prestamos.id_prestamo > 0" color="blue" @click="savePrestamos()" label="Actualizar" icon="update"/>
                                <q-btn v-else color="blue" @click="savePrestamos()" label="Guardar" icon="save"/>

                            </q-item-section>
                        </q-item>
                    </q-list>
                    <div class="q-pa-sm q-gutter-sm">
            <q-card>
              <q-separator />
              <!-- v-if="tablaDetalle" -->
              <q-card-section class="q-pa-none"  v-if="tablaDetalle"> 
                      <div class="row float-rigth"> 
<!-- boton registrar --> <q-btn push size="sm" color="blue" class="text-capitalize text-white" icon-right=""
                            @click="showPopupRegister()">
                            <q-icon name="add"/>
                            &nbsp; Agregar Bien
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
                      <q-table class="" :data="listDetalle"
                        title="Listado Detalle" :hide-header="mode === 'grid'"
                        :columns="columnslistDetalle" row-key="name"
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
                            <q-td key="bie_codigo" :props="props"  class="text-weight-bold text-blue">
                              {{ props.row.objects.bie_codigo }}
                            </q-td>  
                            <q-td key="bie_nombre" :props="props" >
                                {{ props.row.objects.bie_nombre }}
                             <!-- {{ props.row.persona.per_ap_paterno + ' ' + props.row.persona.per_ap_materno + ', ' + props.row.deu_nombres }} -->
                            </q-td> 
                            <q-td key="tbie_nombre" :props="props" >
                              {{ props.row.objects.tbie_nombre }}
                            </q-td> 
                            <q-td key="det_fecha_devolucion" :props="props" >
                              {{ props.row.det_fecha_devolucion }}
                            </q-td> 
                            <q-td key="det_lugar_uso" :props="props" >
                              {{ props.row.det_lugar_uso }}
                            </q-td> 
                            <q-td key="det_observacion" :props="props"  class="text-weight-bold text-blue">
                              {{ props.row.det_observacion }}
                            </q-td> 
                            <q-td key="det_condicion" :props="props">
                              {{ props.row.det_condicion }}
                            </q-td>                           
                            <q-td key="det_estado" :props="props" class="text-weight-bold text-blue">
                              {{ props.row.det_estado}}
                            </q-td>
                              <q-td key="det_estado" :props="props" :class="props.row.det_estado == true ? 'text-blue-10' : 'text-red-14'">
                                    <q-btn dense color="light-blue" icon="mode_edit" @click="showPopupEdit(props.row)">
                                      <q-tooltip class="bg-accent">Editar</q-tooltip>
                                    </q-btn>
  
                                    &nbsp;
  
                                    <q-toggle v-model="props.row.det_estado" checked-icon="check" color="green"
                                            unchecked-icon="clear" @input="changeStatus(props.row)"/>
  
                              </q-td>
                            </q-tr>
                          </template>
                        </q-table>
  
                     </q-card-section>
                    </q-card>
                  </div>
  
            </q-card>
        </q-dialog>
    </div>
    <formDetail
          
          :popup_register_loan='popup_register_loan'
          :detalle='detalle'
          @ClosePopupFormRegister_loan='ClosePopupFormRegister_loan'/>
  
    </q-page>
    <formDebtor
          
          :popup_register_debtor='popup_register_debtor'
          :deudor='deudor'
          @ClosePopupFormRegister_debtor='ClosePopupFormRegister_debtor'/>
  
    </q-page>
  
</template>

<script>

import { mapState, mapActions } from "vuex";
// import { axiosIntranet } from "../../boot/axios";
import { LocalStorage }  from 'quasar'
import { Notify } from 'quasar';
import { required, maxLength, numeric, minLength, helpers  } from 'vuelidate/lib/validators'
import formDetail from '../../components/detail/formDetail.vue';
import formDebtor from '../../components/debtor/formDebtor.vue';
import moment from "moment";

export default {
    name:'formLoancopy',  
    components: { formDetail, formDebtor},
    data(){
        return {
            listTenant:[],
            tamanoTabla: 'normal',
            listDetalle: [],
            filter: '',
            deudor: '',
            listTenant:[], 
            getListMenuAccesos:[],
            tipoBusqueda: null,
            tablaDetalle: false,
            columnslistDetalle: [
          {
            name: "bie_codigo",
            align: "left",
            label: "Codigo Bien",
            field: "bie_codigo",
            sortable: true,
          },
          {
            name: "bie_nombre",
            align: "left",
            label: "Nombre Bien",
            field: "bie_nombre",
            sortable: true,
          },{
            name: "tbie_nombre",
            align: "left",
            label: "Nombre Tipo Bien",
            field: "tbie_nombre",
            sortable: true,
          },{
            name: "det_fecha_devolucion",
            align: "left",
            label: "Fecha Devolucion",
            field: "det_fecha_devolucion",
            sortable: true,
          },{
            name: "det_lugar_uso",
            align: "left",
            label: "Lugar de Uso",
            field: "det_lugar_uso",
            sortable: true,
          },{
            name: "det_observacion",
            align: "left",
            label: "Observacion",
            field: "det_observacion",
            sortable: true,
          },{
            name: "det_condicion",
            align: "left",
            label: "Condicion",
            field: "det_condicion",
            sortable: true,
          },{
            name: "det_estado",
            align: "left",
            label: "Estado Detalle",
            field: "det_estado",
            sortable: true,
          }
        ],
        popup_register_loan: false,
        popup_register_debtor: false,
        detalle: {
            id_detalle_prestamo : 0,
            id_bien: 0,
            id_prestamo: 0,
            // bie_codigo: '',
            // bie_nombre: '',
            // tbie_nombre: '',
            det_fecha_registro: Date,
            det_fecha_devolucion: Date,
            det_lugar_uso: '',
            det_observacion: '',
            det_condicion: '',
            det_estado: true,
            // created_at: null,
            // updated_at: null
        } ,
        deudor: {
          id_deudor: 0,
          deu_cod_matricula: '',
          deu_nro_documento: '',
          deu_nombres: '',
          deu_apellido_paterno: '',
          deu_apellido_materno: '',
          deu_fecha_nacimiento: Date,
          deu_genero: '',
          deu_direccion: '',
          deu_telefono: '',
          deu_correo_electronico: '',
          id_tipo_deudor: 0,      
          deu_estado: true,
            // created_at: null,
            // updated_at: null
        }        

        }
    },
    validations(){
        return {
            prestamos :{
                // deu_cod_matricula:{
                //     required
                // }
            },
           
        }
    },
    props:{
        popup_register :Boolean,
        prestamos : Object
    },
    methods: {
        ClosePopupFormRegister(){
            this.$emit('ClosePopupFormRegister',false)
        },
        fieldErrorMessage(field){
            if(field == 'prestamos'){
                // if (!this.$v.prestamos.deu_cod_matricula.required) return "Campo requerido";
                // if(!this.supplier.pro_ruc.minLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.maxLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.numeric)   return "Campo RUC permite solo números"
            }            
        },
       
        async savePrestamos(){
            this.$v.$touch();
            
            const user = LocalStorage.getItem("user"); 
           
            if (!this.$v.$error){
                 const result = this.prestamos.id_prestamo> 0 ? await this.$store.dispatch("loan/updateLoan", this.prestamos) : await this.$store.dispatch('loan/saveLoan', this.prestamos)
                 if (result.status){
                  this.prestamos.id_prestamo = result.data.id_prestamo
                 }
                // console.log(result)
                Notify.create({
                    message: result.status ? "Guardado correctamente!" : "Error al registrar!",
                    color: 'positive',
                });
                this.tamanoTabla = 'expandido';
                this.tablaDetalle = true;
                
            }else{
                Notify.create({
                        message:'Verifique que todos los datos son ingresados correctamente',
                        type: 'negative',
                        multiLine :true,      
                        position : 'bottom',                        
                        actions: [
                                { label: 'Aceptar', color: 'yellow', handler: () => { } }
                        ]     
                });
                // this.loading= false
            } 
        },
       
        async BuscarPersonaCod(){
                  
        console.log(this.filter);
        console.log(this.tipoBusqueda);
        var parametros = {filtro : this.filter, busqueda : this.tipoBusqueda.id }
  
        // this.$store.hotUpdate(this.$store.state);  //Vuex supports hot-reloading mutations
        // const result = await this.$store.getters['document/documentTypeFindAll'];
        const result = await this.$store.dispatch('loan/debtorFindOne', parametros);
        
        console.log(result); 
        
        // // console.log(result.data)
        // this.listDocumentType = result.data
        var concatenar = result.data.deu_nombres + ' '+result.data.deu_apellido_paterno + ' '+ result.data.deu_apellido_materno;
        console.log(concatenar);
        this.prestamos.debtor.deu_nombres = concatenar;
        
        this.prestamos.id_deudor = result.data.id_deudor;
        console.log(this.prestamos.debtor);
        },
        //DETALLE
        ClosePopupFormRegister_loan(){
        this.popup_register_loan = false
        this.getListDetail();
      },
      showPopupRegister(){
          // this.documentType = {}
          this.resetObjectsValuesDebtor();
          this.popup_register_debtor = true;
          this.popup_register_loan = true;
      },
      showPopupEdit(row){
        
          this.popup_register_loan = true;
          this.detalle = Object.assign({}, row);
          
          // this.documentType.mt_id = { "mt_id" : row.mt_id, "emp_razon_social" : row.emp_razon_social};
      },
      async changeStatus(row){
        // console.log(row)
        const user  = LocalStorage.getItem("user")
        const detalle = Object.assign({}, row);
  
        this.$q.dialog({
          title: 'Confirmación',
          message: `Desea <b>${detalle.det_estado == true ? 'ACTIVAR' : 'DESACTIVAR' }</b> la facultad <b>${detalle.bie_nombre}</b>?`,
          html: true,
          ok: { push: true, color: 'blue' },
          cancel: { push: true, color: 'negative' },
          persistent: true
        }).onOk(async () => {
          
          const data = {
            id_detalle_prestamo: detalle.id_prestamos,
            id_bien: detalle.id_bien,
            id_prestamo: detalle.id_prestamo,
            // bie_codigo: detalle.bie_codigo,
            // bie_nombre: detalle.bie_nombre,
            // tbie_nombre:detalle.tbie_nombre,
            det_fecha_registro: detalle.det_fecha_registro,
            det_fecha_devolucion: detalle.det_fecha_devolucion,          
            det_lugar_uso: detalle.det_lugar_uso,
            det_observacion: detalle.det_observacion,
            det_condicion: detalle.det_condicion,        
            det_estado: detalle.det_estado,
          };
  
          // const result = await SaveEstadoAlmacen(param);
          const result = await this.$store.dispatch('loan/updateLoan', data)
          
          if (result.status) {
            Notify.create({
              message: "Se actualizó correctamente el estado!",
              color: "positive",
            });
            await this.getListDetail(); 
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
        this.detalle = {    
            id_detalle_prestamo : 0,
            id_bien: 0,
            id_prestamo: this.prestamos.id_prestamo,
            objects:{id_tipo_bien: 0 },
            objects:{bie_codigo: ''},
            objects:{bie_nombre: '' },
            // // bie_codigo: '',
            // // bie_nombre: '',
            // // tbie_nombre: '',
            det_fecha_registro: Date,
            det_fecha_devolucion: Date,
            det_lugar_uso: '',
            det_observacion: '',
            det_condicion: '',
            det_estado: true,
          // created_at: null,
          // updated_at: null
        }
        
      },
      downloadRpteXlsx(){
        this.$store.getters['loan/downloadRpteXLSX'](this.listDetalle); 
      },
      async getListDetail(){
        console.log(this.detalle); 
        const result = await this.$store.dispatch('loan/loandetailFindAll', this.prestamos.id_prestamo);
        
        console.log(result); 
        
        // // console.log(result.data)
        this.listDetalle = result.data
        // this.deudor = result.data.deu_nombres;
        // this.gender = result.data.deu_genero;
        // this.prestamos.id_deudor = result.data.id_deudor;
      },
      //DEUDOR
      ClosePopupFormRegister_debtor(){
        this.popup_register_debtor = false
        this.getListDebtor();
      },
      showPopupRegisterDebtor(){
          // this.documentType = {}
          this.resetObjectsValuesDebtor();
          this.popup_register_debtor = true;
      },
      showPopupEditDebtor(row){

          this.popup_register_debtor = true;
          this.deudor = Object.assign({}, row);
          
          // this.documentType.mt_id = { "mt_id" : row.mt_id, "emp_razon_social" : row.emp_razon_social};
      },
      async changeStatusDebtor(row){
        // console.log(row)
        const user  = LocalStorage.getItem("user")
        const deudor = Object.assign({}, row);
  
        this.$q.dialog({
          title: 'Confirmación',
          message: `Desea <b>${deudor.deu_estado == true ? 'ACTIVAR' : 'DESACTIVAR' }</b> el Deudor <b>${deudor.deu_nombres}</b>?`,
          html: true,
          ok: { push: true, color: 'blue' },
          cancel: { push: true, color: 'negative' },
          persistent: true
        }).onOk(async () => {
          
          const data = {
            id_deudor: deudor.id_deudor,
            deu_cod_matricula: deudor.deu_cod_matricula,
            deu_nro_documento: deudor.deu_nro_documento,
            deu_nombres: deudor.deu_nombres,
            deu_apellido_paterno: deudor.deu_apellido_paterno,
            deu_apellido_materno: deudor.deu_apellido_materno,
            deu_fecha_nacimiento: deudor.deu_fecha_nacimiento,
            deu_genero: deudor.deu_genero,
            deu_direccion: deudor.deu_direccion,
            deu_telefono: deudor.deu_telefono,
            deu_correo_electronico: deudor.deu_correo_electronico,
            id_tipo_deudor: deudor.id_tipo_deudor,
            deu_estado: deudor.deu_estado,
          };
  
          // const result = await SaveEstadoAlmacen(param);
          const result = await this.$store.dispatch('loan/updateDebtor', data)
          
          if (result.status) {
            Notify.create({
              message: "Se actualizó correctamente el estado!",
              color: "positive",
            });
            await this.getListDebtor(); 
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
      resetObjectsValuesDebtor(){
        this.deudor = {    
          id_deudor: 0,
          deu_cod_matricula: '',
          deu_nro_documento: '',
          deu_nombres: '',
          deu_apellido_paterno: '',
          deu_apellido_materno: '',
          deu_fecha_nacimiento: Date,
          deu_genero: '',
          deu_direccion: '',
          deu_telefono: '',
          deu_correo_electronico: '',
          id_tipo_deudor: 0,      
          deu_estado: true,
          // created_at: null,
          // updated_at: null
        }
        
      },
      downloadRpteXlsx(){
        this.$store.getters['loan/downloadRpteXLSX'](this.listDetalle); 
      },
      async getListDebtor(){
        console.log(this.detalle); 
        const result = await this.$store.dispatch('loan/debtorFindAll', this.deudor.id_deudor);
        
        console.log(result); 
        
        // // console.log(result.data)
        this.listDeudor = result.data
        // this.deudor = result.data.deu_nombres;
        // this.gender = result.data.deu_genero;
        // this.prestamos.id_deudor = result.data.id_deudor;
      }

    },
    async created(){
        // await this.ListTenant() 
        await this.getListDetail(); 
        await this.getListDebtor(); 
        await this.getListMenuAccesos();
        
    },
    
}
</script>

<style>
.ancho-personalizado-normal {
  width: 700px; /* Ancho normal */
  max-width: 100vw;
}

.ancho-personalizado-expandido {
  width: 10000px ; /* Ancho expandido */
  max-width: 100vw !important;
}

.two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px; /* Ajusta según sea necesario */
}
</style>