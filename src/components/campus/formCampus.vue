<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="popup_register" persistent>
            <q-card style="width: 600px; max-width: 80vw">
                <q-toolbar>
                    <q-avatar>
                        <q-icon color="blue" name="domain" size="34px" />
                    </q-avatar>
                    <q-toolbar-title class="text-weight-light">
                        <span v-if="sede.id_sede > 0" class="text-weight-bold">Editar Sede: {{ sede.sed_nombre }}</span>
                        <span v-else class="text-weight-bold">Registrar Sede</span>
                    </q-toolbar-title>
                    <q-btn flat round dense icon="close" @click="ClosePopupFormRegister()" />
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
                                <q-item-label class="q-mt-sm text-bold">Sede:</q-item-label>
                            </q-item-section>
                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="sede.sed_nombre" :error="$v.sede.sed_nombre.$error"
                                    :error-message="fieldErrorMessage('sede')" label="Sede">
                                    <template v-slot:append>
                                        <q-icon name="description" />
                                    </template>
                                </q-input>
                            </q-item-section>
                        </q-item>
                        <q-separator spaced />
                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Sede Ubigeo:</q-item-label>
                            </q-item-section>
                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="sede.sed_ubigeo" :error="$v.sede.sed_ubigeo.$error"
                                    :error-message="fieldErrorMessage('sede')" label="Sede Ubigeo">
                                    <!-- style="max-width: 150px;"  -->
                                    <template v-slot:append>
                                        <q-icon name="description" />
                                    </template>
                                </q-input>
                            </q-item-section>
                        </q-item>
                        <q-separator spaced />
                        <q-separator spaced />
                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Estado:</q-item-label>
                            </q-item-section>
                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-toggle v-model="sede.sed_estado" checked-icon="check" color="green"
                                    unchecked-icon="clear" />
                            </q-item-section>
                        </q-item>
                        <q-separator spaced />
                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                            </q-item-section>
                            <q-item-section top>
                                <q-btn v-if="sede.id_sede > 0" color="blue" @click="saveSede()" label="Actualizar"
                                    icon="update" />
                                <q-btn v-else color="blue" @click="saveSede()" label="Guardar" icon="save" />
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
import { LocalStorage } from 'quasar'
import { Notify } from 'quasar';
import { required, maxLength, numeric, minLength, helpers } from 'vuelidate/lib/validators'
import moment from "moment";
export default {
    name: 'formCampus',
    data() {
        return {
            listTenant: []
        }
    },
    validations() {
        return {
            sede: {
                sed_nombre: {
                    required
                },
                sed_ubigeo: {
                    required
                }
            }
        }
    },
    props: {
        popup_register: Boolean,
        sede: Object
    },
    methods: {
        ClosePopupFormRegister() {
            this.$emit('ClosePopupFormRegister', false)
        },
        fieldErrorMessage(field) {
            if (field == 'sede') {
                if (!this.$v.sede.sed_nombre.required) return "Campo requerido";
                if (!this.$v.sede.sed_ubigeo.required) return "Campo requerido";
                // if(!this.supplier.pro_ruc.minLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.maxLength) return "Campo RUC requiere 11 caracteres"
                // if(!this.supplier.pro_ruc.numeric)   return "Campo RUC permite solo números"
            }
        },
        async saveSede() {
            this.$v.$touch();
            const user = LocalStorage.getItem("user");
            if (!this.$v.$error) {
                this.sede.usu_id_created = user.usu_id
                this.sede.usu_id_updated = user.usu_id
                console.log(this.sede)
                const result = this.sede.id_sede > 0 ? await this.$store.dispatch("campus/updateCampus", this.sede) : await this.$store.dispatch('campus/saveCampus', this.sede)
                console.log('result:', result);
                Notify.create({

                    message: result.status ? "Guardado correctamente!" : "Error al registrar!",
                    color: 'positive',
                });
                this.$emit('ClosePopupFormRegister', false)
            } else {
                Notify.create({
                    message: 'Verifique que todos los datos son ingresados correctamente',
                    type: 'negative',
                    multiLine: true,
                    position: 'bottom',
                    actions: [
                        { label: 'Aceptar', color: 'yellow', handler: () => { } }
                    ]
                });
                // this.loading= false
            }
        }
    },
    async created() {
        // await this.ListTenant()
    }
}
</script>
<style></style>