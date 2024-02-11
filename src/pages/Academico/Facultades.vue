<template>
  <q-page class="q-pa-sm">
    <div class="q-pa-sm q-gutter-sm">
      <q-card>
        <q-card-section class="text-h6 q-pa-none">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="blue" name="home_work" size="34px" />
            </q-item-section>
            <q-item-section>
              <div class="text-overline text-weight-medium" style="font-size: 20px">
                Listado Facultades
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
              <q-icon name="add" />
              &nbsp; Nuevo
            </q-btn>
            &nbsp;&nbsp;&nbsp;
            <!-- boton reporte -->
            <q-btn push size="sm" color="green" class="text-capitalize text-white" icon-right=""
              @click="downloadRpteXlsx()">
              <q-icon name="downloading" />
              &nbsp; Reporte
            </q-btn>
          </div>
          <!-- tabla -->
          <q-table class="" :data="listFaculty" title="Listado Facultad" :hide-header="mode === 'grid'"
            :columns="columnslist" row-key="name" :filter="filterlist" :pagination.sync="pagination">
            <template v-slot:top-right="props">
              <q-input borderless dense debounce="300" v-model="filterlist" placeholder="Buscar">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen" v-if="mode === 'list'" class="q-px-sm">
                <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{ props.inFullscreen ? "Exit Fullscreen" :
                  "Toggle Fullscreen" }}
                </q-tooltip>
              </q-btn>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="fac_nombre" :props="props" class="text-weight-bold text-blue">
                  {{ props.row.fac_nombre }}
                </q-td>
                <q-td key="fac_estado" :props="props"
                  :class="props.row.fac_estado == true ? 'text-blue-10' : 'text-red-14'">
                  <q-btn dense color="light-blue" icon="mode_edit" @click="showPopupEdit(props.row)">
                    <q-tooltip class="bg-accent">Editar</q-tooltip>
                  </q-btn>
                  &nbsp;
                  <q-toggle v-model="props.row.fac_estado" checked-icon="check" color="green" unchecked-icon="clear"
                    @input="changeStatus(props.row)" />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
    <formFaculty :popup_register='popup_register' :facultad='facultad' @ClosePopupFormRegister='ClosePopupFormRegister' />
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
import formFaculty from '../../components/faculty/formFaculty.vue';
//   import { getFormatDateDDMMYYYY_HHMM } from '../../utils/helper';
export default {
  name: "Facultades",
  components: { formFaculty },
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
      listFaculty: [],
      columnslist: [
        {
          name: "fac_nombre",
          align: "left",
          label: "Facultad",
          field: "fac_nombre",
          sortable: true,
        },
        {
          name: "fac_estado",
          align: "left",
          label: "Estado",
          field: "fac_estado",
          sortable: true,
          // style: 'width: 50px;'
        },
      ],
      popup_register: false,
      facultad: {
        fac_nombre: '',
        id_facultad: 0,
        fac_estado: true,
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
    this.getListFaculty();
  },
  mounted() {
  },
  beforeUpdate() {
  },
  methods: {
    //   getFormatDateDDMMYYYY_HHMM,
    ClosePopupFormRegister() {
      this.popup_register = false
      this.getListFaculty();
    },
    showPopupRegister() {
      // this.documentType = {}
      this.resetObjectsValues();
      this.popup_register = true;
    },
    showPopupEdit(row) {
      this.popup_register = true
      this.facultad = Object.assign({}, row);
      // this.documentType.mt_id = { "mt_id" : row.mt_id, "emp_razon_social" : row.emp_razon_social};
    },
    async changeStatus(row) {
      // console.log(row)
      const user = LocalStorage.getItem("user")
      const facultad = Object.assign({}, row);
      this.$q.dialog({
        title: 'Confirmación',
        message: `Desea <b>${facultad.fac_estado == true ? 'ACTIVAR' : 'DESACTIVAR'}</b> la facultad <b>${facultad.fac_nombre}</b>?`,
        html: true,
        ok: { push: true, color: 'blue' },
        cancel: { push: true, color: 'negative' },
        persistent: true
      }).onOk(async () => {
        const data = {
          id_facultad: facultad.id_facultad,
          fac_nombre: facultad.fac_nombre,
          fac_estado: facultad.fac_estado,
        };
        // const result = await SaveEstadoAlmacen(param);
        const result = await this.$store.dispatch('faculty/softdeleteFaculty', data)
        if (result.status) {
          Notify.create({
            message: "Se actualizó correctamente el estado!",
            color: "positive",
          });
          await this.getListFaculty();
        } else {
          Notify.create({
            message: "Error al actualizar el estado!",
            color: "warning",
          });
        }
      }).onCancel(() => {
        row.fac_estado = !row.fac_estado
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    resetObjectsValues() {
      this.facultad = {
        id_facultad: 0,
        fac_nombre: '',
        fac_estado: true,
        created_at: null,
        updated_at: null
      }
    },
    downloadRpteXlsx() {
      this.$store.getters['faculty/downloadRpteXLSX'](this.listFaculty);
    },
    async getListFaculty() {
      const user = LocalStorage.getItem("user")
      const param = {
        usu_id: user.usu_id
      }
      // this.$store.hotUpdate(this.$store.state);  //Vuex supports hot-reloading mutations
      // const result = await this.$store.getters['document/documentTypeFindAll'];
      const result = await this.$store.dispatch('faculty/facultyFindAll');
      const newArray = result.data.map(item => {
        item.fac_estado = true;
        return item;
      });
      console.log(newArray);
      // // console.log(result.data)
      // this.listDocumentType = result.data
      this.listFaculty = newArray;
      console.log(result);
      // // console.log(result.data)
      // this.listDocumentType = result.data
      // this.listFaculty = result.data
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