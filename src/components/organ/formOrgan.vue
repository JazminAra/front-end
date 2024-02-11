<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="popup_register" persistent>
            <q-card style="width: 600px; max-width: 80vw">
                <q-toolbar>
                    <q-avatar>
                    <div>
                        <q-spinner-ball color="blue" size="1.5em"/>
                        <q-tooltip :offset="[0, 8]">Lista Oficina</q-tooltip>
                    </div>
                    </q-avatar>

                    <q-toolbar-title class="text-weight-light">
                    <span v-if="organo.id_organo > 0" class="text-weight-bold">Editar Oficina {{organo.org_nombre}}</span>
                    <span v-else class="text-weight-bold">Registrar Oficina</span>
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
                                <q-item-label class="q-mt-sm text-bold">Oficina:</q-item-label>
                            </q-item-section>

                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="organo.org_nombre" :error="$v.organo.org_nombre.$error" :error-message="fieldErrorMessage('organo')"
                                    label="Oficina">
                                    <template v-slot:append>
                                        <q-icon name="description" />
                                    </template>
                                </q-input>
                            </q-item-section>
                        </q-item>

                        <q-separator spaced />
                        <q-item>
                          <q-item-section top class="col-2 gt-sm">
                            <q-item-label class="q-mt-sm text-bold">Tipo  Oficina:</q-item-label>
                          </q-item-section>

                    
                            <q-select outlined dense option-value="id_tipo_oficina" option-label="tor_nombre" v-model="organo.id_tipo_organo" :options="listMenuTipoOficinaAccesos"  
                              @input="getListMenuTipoOficinaAccesos()" color="purple" label-color="purple"  :error="$v.organo.id_tipo_organo.$error" :error-message="fieldErrorMessage('organo')" 
 >
                            <template v-slot:append>
                                <q-icon name="menu_open" />
                            </template>
                            </q-select>
                          </q-item>
                            <q-separator spaced />
                           <q-item>
                             <q-item-section top class="col-2 gt-sm">
                               <q-item-label class="q-mt-sm text-bold">Sede:</q-item-label>
                             </q-item-section>

                    
                             <q-select outlined dense option-value="id_sede" option-label="sed_nombre" v-model="organo.id_sede" :options="listMenuSedeAccesos"  
                                @input="getListMenuSedeAccesos()" color="purple" label-color="purple">
                              <template v-slot:append>
                                 <q-icon name="menu_open" />
                              </template>
                             </q-select>
                         </q-item>
                        <q-separator spaced />
                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                               <q-item-label class="q-mt-sm text-bold">Facultad:</q-item-label>
                             </q-item-section>

                    
                               <q-select outlined dense option-value="id_facultad" option-label="fac_nombre" v-model="organo.id_facultad" :options="listMenuFacultadAccesos"  
                                 @input="getListMenuFacultadAccesos()" color="purple" label-color="purple">
                               <template v-slot:append>
                                  <q-icon name="menu_open" />
                               </template>
                               </q-select>
                          </q-item>
                                <q-separator spaced />
                             <q-item>
                          <q-item-section top class="col-2 gt-sm">
                            <q-item-label class="q-mt-sm text-bold">Escuela:</q-item-label>
                          </q-item-section>

                    
                            <q-select outlined dense option-value="id_escuela" option-label="esc_nombre" v-model="organo.id_escuela" :options="listMenuEscuelaAccesos"  
                              @input="getListMenuEscuelaAccesos()" color="purple" label-color="purple">
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
                                <q-toggle v-model="organo.org_estado" checked-icon="check" color="green" unchecked-icon="clear"/>
                            </q-item-section>
                        </q-item>
                        <q-separator spaced />

                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                            </q-item-section>
                            <q-item-section top>
                                <q-btn v-if="organo.id_organo > 0" color="blue" @click="saveOrgano()" label="Actualizar" icon="update"/>
                                <q-btn v-else color="blue" @click="saveOrgano()" label="Guardar" icon="save"/>

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
import { mapState, mapActions } from "vuex";
import Constants from "../../utils/constants";

export default {
    name:'formOrgan',  
    data(){
        return {
            listTenant:[],
            listMenuSedeAccesos: [],   
            listMenuFacultadAccesos: [],    
            listMenuTipoOficinaAccesos: [], 
            listMenuEscuelaAccesos: [], 
        }
    },
    validations(){
        return {
            organo :{
                org_nombre:{
                    required
                },
                id_tipo_organo:{
                  required
                }
                // id_sede: {
                //     required
                // },
            }
        }
    },
    props:{
        popup_register :Boolean,
        organo : Object
    },
    methods: {
        ClosePopupFormRegister(){
            this.$emit('ClosePopupFormRegister',false)
        },
        fieldErrorMessage(field){
            if(field == 'organo'){
                if (!this.$v.organo.org_nombre.required) return "Campo requerido";
                if (!this.$v.organo.id_tipo_organo.required) return "Campo requerido";
                // if (!this.$v.organo.id_sede.required) return "Campo requerido";
                // if(!this.supplier.pro_ruc.minLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.maxLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.numeric)   return "Campo RUC permite solo números"
            }            
        },

        async getListMenuSedeAccesos(){
            //  console.log("hola2"); 
             const result = await this.$store.dispatch('campus/campusFindAll');
        
        // // console.log(result.data)
        // this.listDocumentType = result.data
        this.listMenuSedeAccesos = result.data
          
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
         async getListMenuFacultadAccesos(){
            //  console.log("hola2"); 
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
         async getListMenuEscuelaAccesos(){
            try { //  console.log("hola2"); 
              const result = await this.$store.dispatch('school/schoolFindAll');
        
        // // console.log(result.data)
        // this.listDocumentType = result.data
              this.listMenuEscuelaAccesos = result.data
          
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
              this.listMenuEscueladAccesos = null;
            } catch (error) {
                console.error("Error fetching school data:", error);
                Notify.create({
                    message: "Error. Please contact support.",
                    color: "negative",
          });
    }
         },
         async getListMenuTipoOficinaAccesos(){
            //  console.log("hola2"); 
             const result = await this.$store.dispatch('organtype/organtypeFindAll');
        
        // // console.log(result.data)
        // this.listDocumentType = result.data
        this.listMenuTipoOficinaAccesos = result.data
          
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
       
        async saveOrgano(){
            this.$v.$touch();
            // console.log(!this.$v.$error)
            // console.log(!this.$v.documentType.$error)
            
            const user = LocalStorage.getItem("user"); 
            if (!this.$v.$error){
                // this.documentType.tip_doc_id = this.documentType.tip_doc_id.tip_doc_id
              
                this.organo.usu_id_created = user.usu_id
                this.organo.usu_id_updated = user.usu_id
                this.organo.id_facultad = this.organo.id_facultad.id_facultad;
                this.organo.id_sede = this.organo.id_sede.id_sede;
                this.organo.id_tipo_organo = this.organo.id_tipo_organo.id_tipo_organo;
                this.organo.id_escuela = this.organo.id_escuela.id_escuela;
                console.log(this.organo)
                // if(this.id_facultad == 0){
    
                    
                // const result = this.documentType.doc_tip_id > 0 ? await UpdateAlmacen(this.documentType) : await SaveAlmacen(this.documentType)
                const result = this.organo.id_organo > 0 ? await this.$store.dispatch("organ/updateOrgan", this.organo) : await this.$store.dispatch('organ/saveOrgan', this.organo)

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
        
       await this.getListMenuSedeAccesos();
       await this.getListMenuFacultadAccesos();
       await this.getListMenuTipoOficinaAccesos();
       await this.getListMenuEscuelaAccesos();
    }
}
</script>

<style>

</style>