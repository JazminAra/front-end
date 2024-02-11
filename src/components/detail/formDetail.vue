<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="popup_register_loan" persistent>
            <q-card style="width: 1700px; max-width: 300vw">
                <q-toolbar>
                    <q-avatar>
                        <div>
                        <q-spinner-cube
                        color="blue"
                        size="2em"/>
                         <q-tooltip :offset="[0, 8]">Lista Detalle</q-tooltip>
                    </div>
                    </q-avatar>

                    <q-toolbar-title class="text-weight-light">
                    <span v-if="detalle.id_detalle_prestamo > 0" class="text-weight-bold">Editar Detalle</span>
                    <span v-else class="text-weight-bold">Añadir Detalle</span>
                    </q-toolbar-title>

                    <q-btn flat round dense icon="close"  @click="ClosePopupFormRegister_loan()" />
                </q-toolbar>
                <q-separator></q-separator>

                <q-card-section class="q-pt-none">

                    <q-list bordered class="rounded-borders two-columns">

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
                                <q-item-label class="q-mt-sm text-bold">Fecha Devolución:</q-item-label>
                            </q-item-section>

                            <q-item-section top>
                             <div class="row">
                                  <q-input dense outlined stack-label v-model="detalle.det_fecha_devolucion" type="date"  />
                             </div>
                            </q-item-section>
                        </q-item>
                
                <!-- <q-separator spaced /> -->
                <!-- SEGUNDA COLUMNA -->
                <q-item>
                            <q-item-section top class="col-4 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Codigo Bien:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-5 col-md-5">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="detalle.objects.bie_codigo" 
                                    label="Codigo Bien">
                                    <template v-slot:append>
                                        <q-icon name="user"/>
                                    </template>
                                </q-input>
                            </q-item-section>
                            <q-item-section top class="col-lg-2 col-md-2">
                          <q-btn color="blue" icon-right="person_search" @click="BuscarBienCod()">
                            <q-tooltip class="bg-accent">Buscar Bien</q-tooltip>
                          </q-btn>
                        </q-item-section>
                            
                        </q-item>
                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Lugar de Acceso:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-4 col-md-4">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="detalle.det_lugar_uso"
                                    label="Lugar de Acceso">
                                    <template v-slot:append>
                                        <q-icon name="description" />
                                    </template>
                                </q-input>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section top class="col-4 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Nombre Bien:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-5 col-md-5">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="detalle.objects.bie_nombre" 
                                    label="Nombre Bien">
                                    <template v-slot:append>
                                        <q-icon name="user"/>
                                    </template>
                                </q-input>
                            </q-item-section>
                            
                        </q-item>
                       
                <!-- Segunda columna -->
                             
                     <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Observación:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="detalle.det_observacion" 
                                    label="Observación">
                                    <template v-slot:append>
                                        <q-icon name="description" />
                                    </template>
                                </q-input>
                            </q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Tipo Bien:</q-item-label>
                            </q-item-section>

                          <q-select outlined dense option-value="id_tipo_bien" option-label="tbie_nombre" v-model="detalle.objects.id_tipo_bien " :options="listMenuTipoBienAccesos" 
                          @input="getListMenuTipoBienAccesos()" color="purple" label-color="purple">
                          <template v-slot:append>
                            <q-icon name="menu_open" />
                          </template>
                      </q-select>
                        </q-item><br>
                        <q-separator spaced />
                
                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Condición:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="detalle.det_condicion"
                                    label="Condición">
                                    <template v-slot:append>
                                        <q-icon name="description" />
                                    </template>
                                </q-input>
                            </q-item-section>
                        </q-item><br>


                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Estado:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-toggle v-model="detalle.det_estado" checked-icon="check" color="green" unchecked-icon="clear"/>
                            </q-item-section>
                        </q-item><br>
                        
                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                            </q-item-section>
                            <q-item-section top>
                                <q-btn v-if="detalle.id_detalle_prestamo > 0" color="blue" @click="saveDetalle()" label="Actualizar" icon="update"/>
                                <q-btn v-else color="blue" @click="saveDetalle()" label="Guardar" icon="save"/>

                            </q-item-section>
                        </q-item>


                    </q-list>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import { axiosIntranet } from "../../boot/axios";
import { LocalStorage }  from 'quasar'
import { Notify } from 'quasar';
import { required, maxLength, numeric, minLength, helpers  } from 'vuelidate/lib/validators'
import moment from "moment";

export default {
    name:'formDetail',  
    data(){
        return {
            listTenant:[],
            listMenuTipoBienAccesos: [],

        }
    },
    validations(){
        return {
            detalle :{
                // det_observacion:{
                //     required
                // }
            }
        }
    },
    props:{
        popup_register_loan :Boolean,
        detalle : Object
    },
    methods: {
        ClosePopupFormRegister_loan(){
            this.$emit('ClosePopupFormRegister_loan',false)
        },
        fieldErrorMessage(field){
            if(field == 'detalle'){
                // if (!this.$v.detealle.det_observacion.required) return "Campo requerido";
                // if(!this.supplier.pro_ruc.minLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.maxLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.numeric)   return "Campo RUC permite solo números"
            }            
        },
       
        async saveDetalle(){
            this.$v.$touch();
            // console.log(!this.$v.$error)
            // console.log(!this.$v.documentType.$error)
            //   console.log(data);
            const user = LocalStorage.getItem("user"); 
            if (!this.$v.$error){
                // this.documentType.tip_doc_id = this.documentType.tip_doc_id.tip_doc_id
              
                this.detalle.usu_id_created = user.usu_id
                this.detalle.usu_id_updated = user.usu_id
                console.log(this.detalle)
                // if(this.id_facultad == 0){
     
                // const result = this.documentType.doc_tip_id > 0 ? await UpdateAlmacen(this.documentType) : await SaveAlmacen(this.documentType)
                const result = this.detalle.id_detalle_prestamo > 0 ? await this.$store.dispatch("loan/updateLoanDetail", this.detalle) : await this.$store.dispatch('loan/saveLoanDetail', this.detalle)

                // console.log(result)
                Notify.create({
                    message: result.status ? "Guardado correctamente!" : "Error al registrar!",
                    color: 'positive',
                });
                this.$emit('ClosePopupFormRegister_loan',false)
                
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
        async getListMenuTipoBienAccesos(){
             console.log("hola2"); 
             const result = await this.$store.dispatch('loan/objectstypeFindAll');
        
        // // console.log(result.data)
        // this.listDocumentType = result.data
        this.listMenuTipoBienAccesos = result.data
        // this.detalle.objects.id_tipo_bien = result.data
          
            // axiosIntranet.get("/faculty/find-all")
            // .then((res) => {
            //      this.listMenuFacultadAccesos = res.data
            // })
            // .catch((err) => {
            //      console.error("Error fetching faculty data:", err);
            //     Notify.create({
            //          message: "Error. Please contact support.",
            //          color: "negative",
            //      });
            // });
         },
         async BuscarBienCod(){
                  
  
                  // this.$store.hotUpdate(this.$store.state);  //Vuex supports hot-reloading mutations
                  // const result = await this.$store.getters['document/documentTypeFindAll'];
                  const result = await this.$store.dispatch('loan/objectsFindAllBy', this.detalle.objects.bie_codigo);
                  
                  console.log(result); 
                  
                  // // console.log(result.data)
                  // this.listDocumentType = result.data
                  this.detalle.id_bien = result.data[0].id_bien;                  
                //   this.detalle.bie_codigo = result.data.bie_codigo;
                  this.detalle.objects.bie_nombre = result.data[0].bie_nombre;
                //   this.prestamos.id_deudor = result.data.id_deudor;
                  },
    },
    async created(){
         await this.getListMenuTipoBienAccesos()
    },
    // obtenerDataBien() {
    //   // Accede a la propiedad nodes para obtener la data en el campo "Bien"
    //   const dataBien = this.listMenuBienAccesos.map(node => node.label);
    //   console.log(dataBien);
    // },
}
</script>

<style>

</style>