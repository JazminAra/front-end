<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="popup_register" persistent>
            <q-card style="width: 600px; max-width: 80vw">
                <q-toolbar>
                    <q-avatar>
                    <div>
                        <q-spinner-ball color="blue" size="1.5em"/>
                        <q-tooltip :offset="[0, 8]">Lista Escuela</q-tooltip>
                    </div>
                    </q-avatar>

                    <q-toolbar-title class="text-weight-light">
                    <span v-if="escuela.id_escuela > 0" class="text-weight-bold">Editar Escuela {{escuela.esc_nombre}}</span>
                    <span v-else class="text-weight-bold">Registrar Escuela</span>
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
                                <q-item-label class="q-mt-sm text-bold">Escuela:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="escuela.esc_nombre" :error="$v.escuela.esc_nombre.$error" :error-message="fieldErrorMessage('escuela')"
                                    label="Escuela">
                                    <template v-slot:append>
                                        <q-icon name="description" />
                                    </template>
                                </q-input>
                            </q-item-section>
                        </q-item>
                      
                        <q-separator spaced />
                        <q-item>
                          <q-item-section top class="col-2 gt-sm">
                            <q-item-label class="q-mt-sm text-bold">Facultad:</q-item-label>
                          </q-item-section>

                    
                            <q-select outlined dense option-value="id_facultad" option-label="fac_nombre" v-model="escuela.id_facultad" :options="listMenuFacultadAccesos"  
                              @input="getListMenuFacultadAccesos()" color="purple" label-color="purple">
                            <template v-slot:append>
                                <q-icon name="menu_open" />
                            </template>
                            </q-select>
                     </q-item>
                     <q-separator spaced />

                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Estado:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-toggle v-model="escuela.esc_estado" checked-icon="check" color="green" unchecked-icon="clear"/>
                            </q-item-section>
                        </q-item>
                        <q-separator spaced />

                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                            </q-item-section>
                            <q-item-section top>
                                <q-btn v-if="escuela.id_escuela > 0" color="blue" @click="saveSchool()" label="Actualizar" icon="update"/>
                                <q-btn v-else color="blue" @click="saveSchool()" label="Guardar" icon="save"/>

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
import { Notify } from 'quasar';
import { required, maxLength, numeric, minLength, helpers  } from 'vuelidate/lib/validators'
import moment from "moment";
import { LocalStorage } from "quasar";
import { mapState, mapActions } from "vuex";

export default {
    name:'formSchool',  
    data(){
        return {
            listTenant:[],         
            listMenuFacultadAccesos: []
        }
    },
    validations(){
        return {
            escuela :{
                // tip_doc_id: {
                //     required
                // },
                esc_nombre:{
                    required
                },
                id_facultad:{
                    required
                }
            }
        }
    },
    props:{
        popup_register :Boolean,
        escuela : Object
    },
    methods: {
        ClosePopupFormRegister(){
            this.$emit('ClosePopupFormRegister',false)
        },
        fieldErrorMessage(field){
            if(field == 'escuela'){
                if (!this.$v.escuela.esc_nombre.required) return "Campo requerido";
                if (!this.$v.escuela.id_facultad.required) return "Campo requerido";
                // if(!this.supplier.pro_ruc.minLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.maxLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.numeric)   return "Campo RUC permite solo números"
            }            
        },
        async getListMenuFacultadAccesos(){
             console.log("hola2"); 
             const result = await this.$store.dispatch('faculty/facultyFindAll');
        
        // // console.log(result.data)
        // this.listDocumentType = result.data
        this.listMenuFacultadAccesos = result.data
          
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
        async saveSchool(){
            this.$v.$touch();
            // console.log(!this.$v.$error)
            // console.log(!this.$v.documentType.$error)
            
            const user = LocalStorage.getItem("user"); 
            if (!this.$v.$error){
                // this.documentType.tip_doc_id = this.documentType.tip_doc_id.tip_doc_id
              
                this.escuela.usu_id_created = user.usu_id
                this.escuela.usu_id_updated = user.usu_id
                this.escuela.id_facultad = this.escuela.id_facultad.id_facultad;
                console.log(this.escuela)
                console.log("hola1");
                // const result = this.documentType.doc_tip_id > 0 ? await UpdateAlmacen(this.documentType) : await SaveAlmacen(this.documentType)
                const result = this.escuela.id_escuela > 0 ? await this.$store.dispatch("school/updateSchool", this.escuela) : await this.$store.dispatch('school/saveSchool', this.escuela)

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
        await this.getListMenuFacultadAccesos();
    }
}
</script>

<style>

</style>