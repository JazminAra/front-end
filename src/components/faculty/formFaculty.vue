<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="popup_register" persistent>
            <q-card style="width: 600px; max-width: 80vw">
                <q-toolbar>
                    <q-avatar>
                        <q-icon color="blue" name="home_work" size="34px" />
                    </q-avatar>
                    <q-toolbar-title class="text-weight-light">
                        <span v-if="facultad.id_facultad > 0" class="text-weight-bold">Editar Facultad: {{
                            facultad.fac_nombre }}</span>
                        <span v-else class="text-weight-bold">Registrar Facultad</span>
                    </q-toolbar-title>
                    <q-btn flat round dense icon="close" @click="ClosePopupFormRegister()" />
                </q-toolbar>
                <q-separator></q-separator>
                <q-card-section class="q-pt-none">
                    <q-list bordered class="rounded-borders" style="max-width: 550px">
                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm text-bold">Facultad:</q-item-label>
                            </q-item-section>
                            <q-item-section top class="col-lg-10 col-md-10">
                                <q-input dense outlined stack-label class="full-width" type="text" label-color="blue"
                                    v-model="facultad.fac_nombre" :error="$v.facultad.fac_nombre.$error"
                                    :error-message="fieldErrorMessage('facultad')" label="Facultad">
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
                                <q-toggle v-model="facultad.fac_estado" checked-icon="check" color="green"
                                    unchecked-icon="clear" />
                            </q-item-section>
                        </q-item>
                        <q-separator spaced />
                        <q-item>
                            <q-item-section top class="col-2 gt-sm">
                            </q-item-section>
                            <q-item-section top>
                                <q-btn v-if="facultad.id_facultad > 0" color="blue" @click="saveFacultad()"
                                    label="Actualizar" icon="update" />
                                <q-btn v-else color="blue" @click="saveFacultad()" label="Guardar" icon="save" />
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
    name: 'formFaculty',
    data() {
        return {
            listTenant: []
        }
    },
    validations() {
        return {
            facultad: {
                fac_nombre: {
                    required
                }
            }
        }
    },
    props: {
        popup_register: Boolean,
        facultad: Object
    },
    methods: {
        ClosePopupFormRegister() {
            this.$emit('ClosePopupFormRegister', false)
        },
        fieldErrorMessage(field) {
            if (field == 'facultad') {
                if (!this.$v.facultad.fac_nombre.required) return "Campo requerido";
            }
        },
        async saveFacultad() {
            this.$v.$touch();
            // console.log(!this.$v.$error)
            // console.log(!this.$v.documentType.$error)
            const user = LocalStorage.getItem("user");
            if (!this.$v.$error) {
                // this.documentType.tip_doc_id = this.documentType.tip_doc_id.tip_doc_id
                this.facultad.usu_id_created = user.usu_id
                this.facultad.usu_id_updated = user.usu_id
                console.log(this.escuela)
                // if(this.id_facultad == 0){
                const regex = /^[a-zA-Z\s]+$/;
                if (this.facultad.fac_nombre.trim() === "" || !regex.test(this.facultad.fac_nombre.trim())) {
                    Notify.create({
                        message: "Ingrese Sede válida",
                        color: "warning",
                    });
                    return;
                }
                // const result = this.documentType.doc_tip_id > 0 ? await UpdateAlmacen(this.documentType) : await SaveAlmacen(this.documentType)
                const result = this.facultad.id_facultad > 0 ? await this.$store.dispatch("faculty/updateFaculty", this.facultad) : await this.$store.dispatch('faculty/saveFaculty', this.facultad)
                // console.log(result)
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