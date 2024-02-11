<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="popup_register_debtor" persistent>
            <q-card style="width: 600px; max-width: 80vw">
                <q-toolbar>
                    <q-avatar>
                    <div>
                        <q-spinner-ball color="blue" size="1.5em"/>
                        <q-tooltip :offset="[0, 8]">Lista Deudor</q-tooltip>
                    </div>
                    </q-avatar>

                    <q-toolbar-title class="text-weight-light">
                    <span v-if="deudor.id_deduor > 0" class="text-weight-bold">Editar Deudor {{deudor.deu_nombres}}</span>
                    <span v-else class="text-weight-bold">Registrar Deudor</span>
                    </q-toolbar-title>

                    <q-btn flat round dense icon="close"  @click="ClosePopupFormRegister()" />
                </q-toolbar>
                <q-separator></q-separator>

                <q-card-section class="q-pt-none">

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
                                <q-item-label class="q-mt-sm text-bold">Deudor:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="deudor.deu_nombres" 
                                    label="Dedudor">
                                    <template v-slot:append>
                                        <q-icon name="description" />
                                    </template>
                                </q-input>
                            </q-item-section>
                        </q-item>
                
                <q-separator spaced />

                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Estado:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-toggle v-model="deudor.deu_estado" checked-icon="check" color="green" unchecked-icon="clear"/>
                            </q-item-section>
                        </q-item>
                        <q-separator spaced />

                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                            </q-item-section>
                            <q-item-section top>
                                <q-btn v-if="deudor.id_deudor > 0" color="blue" @click="saveDeudor()" label="Actualizar" icon="update"/>
                                <q-btn v-else color="blue" @click="saveDeudor()" label="Guardar" icon="save"/>

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
    name:'formDebtor',  
    data(){
        return {
            listTenant:[]
        }
    },
    validations(){
        return {
            deudor :{
                // fac_nombre:{
                //     required
                // }
            }
        }
    },
    props:{
        popup_register_debtor :Boolean,
        deudor : Object
    },
    methods: {
        ClosePopupFormRegister(){
            this.$emit('ClosePopupFormRegister',false)
        },
        fieldErrorMessage(field){
            if(field == 'deudor'){
                // if (!this.$v.deudor.deu_nombres.required) return "Campo requerido";
                // if(!this.supplier.pro_ruc.minLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.maxLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.numeric)   return "Campo RUC permite solo números"
            }            
        },
       
        async saveDeudor(){
            this.$v.$touch();
            // console.log(!this.$v.$error)
            // console.log(!this.$v.documentType.$error)
            
            const user = LocalStorage.getItem("user"); 
            if (!this.$v.$error){
                // this.documentType.tip_doc_id = this.documentType.tip_doc_id.tip_doc_id
              
                this.deudor.usu_id_created = user.usu_id
                this.deudor.usu_id_updated = user.usu_id
                console.log(this.deudor)
                // if(this.id_facultad == 0){
      const regex = /^[a-zA-Z\s]+$/;
  
      if (this.deudor.deu_nombres.trim() === "" || !regex.test(this.deudor.deu_nombres.trim())) {
        Notify.create({
          message: "Ingrese Deudor válido",
          color: "warning",
        });
        return;
      }
    
                // const result = this.documentType.doc_tip_id > 0 ? await UpdateAlmacen(this.documentType) : await SaveAlmacen(this.documentType)
                const result = this.deudor.id_deudor > 0 ? await this.$store.dispatch("loan/updateDebtor", this.deudor) : await this.$store.dispatch('faculty/saveDebtor', this.deudor)

                // console.log(result)
                Notify.create({
                    message: result.status ? "Guardado correctamente!" : "Error al registrar!",
                    color: 'positive',
                });
                this.$emit('ClosePopupFormRegister',false)
                
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
        }
    },
    async created(){
        // await this.ListTenant()
    }
}
</script>

<style>

</style>