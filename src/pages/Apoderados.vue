<template>
  <q-page class="q-pa-sm">
    <!-- <card-item class="q-mt-lg" :name="profile_card_data.name" :des="profile_card_data.des" :avatar="profile_card_data.avatar"></card-item> -->
    <q-card>
      <q-card-section class="text-h6 q-pa-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="group_add" size="44px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Agregar/Editar Usuarios</div>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
    <br />
    <div>
      <q-card>
        <q-card-section>
          <template>
            <div class="row q-col-gutter-sm q-py-sm">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-card class="text-grey-8">
                  <q-card-section class="q-pa-none">
                    <q-table
                      dense
                      class="no-shadow"
                      :data="listApoderados"
                      title="Usuarios"
                      :hide-header="mode === 'grid'"
                      :columns="columns"
                      row-key="name"
                      :filter="filter"
                      :pagination.sync="pagination"
                      :visible-columns="visibleColumns"
                    >
                      <template v-slot:top-right="props">
                        <q-input
                          borderless
                          dense
                          debounce="300"
                          v-model="filter"
                          placeholder="Buscar"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>

                        <q-btn
                          flat
                          round
                          dense
                          :icon="
                            props.inFullscreen
                              ? 'fullscreen_exit'
                              : 'fullscreen'
                          "
                          @click="props.toggleFullscreen"
                          v-if="mode === 'list'"
                          class="q-px-sm"
                        >
                          <q-tooltip
                            :disable="$q.platform.is.mobile"
                            v-close-popup
                            >{{
                              props.inFullscreen
                                ? "Exit Fullscreen"
                                : "Toggle Fullscreen"
                            }}
                          </q-tooltip>
                        </q-btn>

                        <!-- <q-select
                          v-model="visibleColumns"
                          multiple
                          outlined
                          dense
                          options-dense
                          :display-value="$q.lang.table.columns"
                          emit-value
                          map-options
                          :options="columns"
                          option-value="name"
                          options-cover
                          style="min-width: 150px"
                        /> -->
                        <q-btn
                          dense
                          color="blue-9"
                          @click="formRegistroUsuario"
                          icon="group_add"
                          class="q-px-sm"
                        >
                          Agregar Usuario
                        </q-btn>
                      </template>

                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td
                            key="apo_id"
                            :props="props"
                            class="text-weight-bold"
                          >
                            {{ props.row.apo_id }}
                          </q-td>
                          <q-td key="apo_nro_doc_identidad" :props="props">
                            {{ props.row.apo_nro_doc_identidad }}
                          </q-td>
                          <q-td key="apo_apellidos" :props="props">
                            {{ props.row.apo_apellidos }}
                          </q-td>
                          <q-td key="apo_nombres" :props="props">
                            {{ props.row.apo_nombres }}
                          </q-td>
                          <q-td key="rol.rol_descripcion" :props="props">
                            {{ props.row.rol.rol_descripcion }}
                          </q-td>
                          <q-td key="apoderadohijos.length" :props="props">
                            <q-btn flat rounded @click="listalumnos(props.row)">
                              <q-chip
                                class="text-white text-capitalize"
                                v-if="props.row.apoderadohijos.length >= 1"
                                :label="props.row.apoderadohijos.length"
                                color="info"
                              ></q-chip>
                              <q-chip
                                class="text-white text-capitalize"
                                v-if="props.row.apoderadohijos.length == 0"
                                :label="props.row.apoderadohijos.length"
                                color="warning"
                              ></q-chip>
                            </q-btn>
                            <!-- {{props.apoderadohijos.length}} -->
                          </q-td>
                          <q-td
                            key="apo_estado"
                            :props="props"
                            :class="
                              props.row.apo_estado == 1
                                ? 'text-blue-10'
                                : 'text-red-14'
                            "
                          >
                            <q-toggle
                              v-model="props.row.apo_estado"
                              :true-value="1"
                              :false-value="0"
                              checked-icon="check"
                              color="green"
                              unchecked-icon="clear"
                              @input="editEstadoApoderado(props.row)"
                            />
                          </q-td>
                        </q-tr>
                      </template>
                    </q-table>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </template>
        </q-card-section>
      </q-card>
      <br />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <!-- Dialog lista alumnos por apoderado -->
      <q-dialog v-model="toolbar" persistent>
        <q-card style="width: 700px; max-width: 80vw">
          <q-toolbar>
            <q-avatar>
              <img src="profile_padre.svg" />
            </q-avatar>

            <q-toolbar-title>
              <span class="text-weight-bold"></span>
              {{ apoderado.tipodocidentidad.tipdoc_descripcion }} -
              {{ apoderado.apo_nro_doc_identidad }} /
              {{ apoderado.apo_apellidos }}, {{ apoderado.apo_nombres }}
            </q-toolbar-title>

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-separator></q-separator>

          <q-card-section>
            <div class="q-pa-md">
              <q-table
                title="Alumnos"
                dense
                :data="apoderado.apoderadohijos"
                :columns="columnsAlumnosApo"
                :filter="filterApo"
                row-key="name"
              >
                <template v-slot:top-right="props">
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="filterApo"
                    placeholder="Buscar"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>

                  <q-btn
                    flat
                    round
                    dense
                    :icon="
                      props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'
                    "
                    @click="props.toggleFullscreen"
                    v-if="mode === 'list'"
                    class="q-px-sm"
                  >
                    <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                      >{{
                        props.inFullscreen
                          ? "Exit Fullscreen"
                          : "Toggle Fullscreen"
                      }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    dense
                    color="secondary"
                    @click="secondDialog = true"
                    icon="person_add_alt"
                    class="q-px-sm"
                  >
                    Agregar alumno
                  </q-btn>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td
                      key="aph_nro_matricula"
                      :props="props"
                      class="text-weight-bold"
                    >
                      {{ props.row.aph_nro_matricula }}
                    </q-td>
                    <q-td key="per_apellidos" :props="props">
                      {{ props.row.per_apellidos }}
                    </q-td>
                    <q-td key="per_nombres" :props="props">
                      {{ props.row.per_nombres }}
                    </q-td>
                    <q-td key="sed_nombre" :props="props">
                      {{ props.row.sed_nombre }}
                    </q-td>
                    <q-td key="dep_nombre" :props="props">
                      {{ props.row.dep_nombre }}
                    </q-td>
                    <q-td
                      key="aph_estado"
                      :props="props"
                      :class="
                        props.row.aph_estado == 1
                          ? 'text-blue-10'
                          : 'text-red-14'
                      "
                    >
                      <q-toggle
                        v-model="props.row.aph_estado"
                        :true-value="1"
                        :false-value="0"
                        checked-icon="check"
                        color="green"
                        unchecked-icon="clear"
                        @input="editEstadoAlumno(props.row)"
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Dialog busqueda alumno-->
      <q-dialog
        v-model="secondDialog"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card style="width: 550px; max-width: 80vw">
          <q-toolbar>
            <q-avatar>
              <img src="man.svg" />
            </q-avatar>

            <q-toolbar-title>
              <span class="text-weight-bold"></span>
              Agregar Alumno
            </q-toolbar-title>

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-3">
                <q-item>
                  <q-select
                    dense
                    outlined
                    v-model="selectTipoBusqAlu"
                    :options="options"
                    label="Tipo Búsqueda"
                  />
                  <!-- <q-input dense outlined class="full-width" v-model="selectTipoBusqAlu" label="Name on Card*"/> -->
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input
                    dense
                    outlined
                    class="full-width"
                    v-model="textTipoBusqAul"
                    label="Buscar"
                    @keyup.enter="buscarAlumnos"
                  />
                </q-item>
              </div>
              <div class="col-3">
                <q-item>
                  <q-btn
                    dense
                    color="purple"
                    icon="person_search"
                    class="q-px-sm"
                    @click="buscarAlumnos"
                  >
                  </q-btn>
                </q-item>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-md">
              <q-table
                title="Alumnos"
                dense
                :data="listBusqAlumnos"
                :columns="columnsAddAlumnos"
                :filter="filterBusqAlu"
                row-key="name"
              >
                <template v-slot:top-right="props">
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="filterBusqAlu"
                    placeholder="Buscar"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>

                  <q-btn
                    flat
                    round
                    dense
                    :icon="
                      props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'
                    "
                    @click="props.toggleFullscreen"
                    v-if="mode === 'list'"
                    class="q-px-sm"
                  >
                    <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                      >{{
                        props.inFullscreen
                          ? "Exit Fullscreen"
                          : "Toggle Fullscreen"
                      }}
                    </q-tooltip>
                  </q-btn>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td
                      key="aph_nro_matricula"
                      :props="props"
                      class="text-weight-bold"
                    >
                      {{ props.row.aph_nro_matricula }}
                    </q-td>
                    <q-td key="per_apellidos" :props="props">
                      {{ props.row.per_apellidos }}
                    </q-td>
                    <q-td key="per_nombres" :props="props">
                      {{ props.row.per_nombres }}
                    </q-td>
                    <q-td key="sed_nombre" :props="props">
                      {{ props.row.sed_nombre }}
                    </q-td>
                    <q-td key="dep_nombre" :props="props">
                      {{ props.row.dep_nombre }}
                    </q-td>
                    <q-td key="aph_estado" :props="props">
                      <q-btn
                        v-if="showColumnSaveAlumnoApo == false"
                        dense
                        color="primary"
                        icon="person_add_alt"
                        class="q-px-sm"
                        @click="addAlumnoApo(props.row)"
                      >
                      </q-btn>
                      <q-btn
                        v-if="showColumnSaveAlumnoApo"
                        dense
                        color="primary"
                        icon="how_to_reg"
                        class="q-px-sm"
                        @click="addSaveAlumnoApo(props.row)"
                      >
                      </q-btn>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Dialog registro usuario-->
      <q-dialog v-model="regusuario" persistent>
        <q-card style="width: 700px; max-width: 80vw">
          <q-toolbar>
            <q-avatar>
              <img src="profile_padre.svg" />
            </q-avatar>

            <q-toolbar-title>
              <span class="text-weight-bold"></span>
              Registrar Usuario
            </q-toolbar-title>

            <q-btn
              flat
              round
              dense
              icon="close"
              v-close-popup
              @click="limpiarDatosRegAlumnos"
            />
          </q-toolbar>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-2">
                <q-item>
                  <!-- <q-input dense outlined class="full-width" v-model="selectTipoBusqAlu" label="Name on Card*"/> -->
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="apoderado.apo_nro_doc_identidad"
                    label="D.N.I."
                    maxlength="8"
                    @keyup.enter="busquedaDNI"
                    :error="$v.apoderado.apo_nro_doc_identidad.$error"
                    :error-message="mensajeError('apo_nro_doc_identidad')"
                  />
                </q-item>
              </div>
              <div class="col-4">
                <q-item>
                  <q-btn
                    dense
                    color="purple"
                    icon="person_search"
                    class="q-px-sm"
                    @click="busquedaDNI"
                  >
                  </q-btn>
                </q-item>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <q-item>
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="apoderado.apo_apellidos"
                    label="Apellidos"
                    maxlength="100"
                    :error="$v.apoderado.apo_apellidos.$error"
                    :error-message="mensajeError('apo_apellidos')"
                    readonly
                  />
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="apoderado.apo_nombres"
                    label="Nombres"
                    maxlength="100"
                    :error="$v.apoderado.apo_nombres.$error"
                    :error-message="mensajeError('apo_nombres')"
                    readonly
                  />
                </q-item>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <q-item>
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="apoderado.apo_email"
                    label="Email"
                    maxlength="150"
                    :error="$v.apoderado.apo_email.$error"
                    :error-message="mensajeError('apo_email')"
                  />
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input
                    dense
                    outlined
                    stack-label
                    :type="isPwd ? 'password' : 'text'"
                    class="full-width"
                    v-model="apoderado.apo_password"
                    label="Password"
                    maxlength="50"
                    :error="$v.apoderado.apo_password.$error"
                    :error-message="mensajeError('apo_password')"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </q-item>
              </div>
              <div class="row">
                <div class="col-6">
                  <q-item>
                    <q-select
                      dense
                      outlined
                      v-model="apoderado.rol.rol_id"
                      :options="optionsRol"
                      stack-label
                      label="Tipo Rol"
                      style="min-width: 200px"
                      :error="$v.apoderado.rol.rol_id.$error"
                      :error-message="mensajeError('rol_id')"
                    />
                  </q-item>
                </div>
                <div class="col-6">
                  <q-item> </q-item>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="q-pa-md">
              <q-table
                title="Alumnos"
                dense
                :data="apoderado.apoderadohijos"
                :columns="columnsAlumnosApo"
                :filter="filterApo"
                row-key="name"
              >
                <template v-slot:top-right="props">
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="filterApo"
                    placeholder="Buscar"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>

                  <q-btn
                    flat
                    round
                    dense
                    :icon="
                      props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'
                    "
                    @click="props.toggleFullscreen"
                    v-if="mode === 'list'"
                    class="q-px-sm"
                  >
                    <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                      >{{
                        props.inFullscreen
                          ? "Exit Fullscreen"
                          : "Toggle Fullscreen"
                      }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    dense
                    color="secondary"
                    @click="showdialogSaveAlumnoApo"
                    icon="person_add_alt"
                    class="q-px-sm"
                  >
                    Agregar alumno
                  </q-btn>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td
                      key="aph_nro_matricula"
                      :props="props"
                      class="text-weight-bold"
                    >
                      {{ props.row.aph_nro_matricula }}
                    </q-td>
                    <q-td key="per_apellidos" :props="props">
                      {{ props.row.per_apellidos }}
                    </q-td>
                    <q-td key="per_nombres" :props="props">
                      {{ props.row.per_nombres }}
                    </q-td>
                    <q-td key="sed_nombre" :props="props">
                      {{ props.row.sed_nombre }}
                    </q-td>
                    <q-td key="dep_nombre" :props="props">
                      {{ props.row.dep_nombre }}
                    </q-td>
                    <q-td
                      key="aph_estado"
                      :props="props"
                      :class="
                        props.row.aph_estado == 1
                          ? 'text-blue-10'
                          : 'text-red-14'
                      "
                    >
                      <q-toggle
                        v-model="props.row.aph_estado"
                        :true-value="1"
                        :false-value="0"
                        checked-icon="check"
                        color="green"
                        unchecked-icon="clear"
                        @input="deteleAlumnoApoReg(props.row)"
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-3">
                <q-item> </q-item>
              </div>
              <div class="col-6">
                <q-item> </q-item>
              </div>
              <div class="col-3">
                <q-item>
                  <q-btn
                    dense
                    color="positive"
                    icon="save"
                    v-if="!showbtnRegistrarUsuario"
                    class="q-px-sm"
                    @click="registrarUsuario"
                  >
                    Registrar
                  </q-btn>
                </q-item>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <!-- <card-social icon_position="left" /> -->

    <!-- <card-charts /> -->

    <!-- <div class="row q-col-gutter-sm  q-py-sm">
      <tab-social />
      <card-with-image />
    </div> -->

    <!-- <div class="row q-col-gutter-sm  q-py-sm"> -->
    <!-- <todo-list /> -->

    <!-- <card-time-line /> -->
    <!-- </div> -->

    <!-- <table-visits /> -->
  </q-page>
</template>

<script>
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
import { Notify } from "quasar";
import axios from "axios";

export default {
  name: "PageIndex",
  // components: {
  //CardItem: () => import('components/cards/CardItem'),
  // CardSocial: () => import("components/cards/CardSocial"),
  //CardCharts: () =>  import('components/cards/CardCharts'),
  // TabSocial: () => import("components/tabs/TabSocial"),
  // CardWithImage: () => import("components/cards/CardWithImage"),
  //CardTimeLine: () =>  import('components/cards/CardTimeLine'),
  //TodoList: () =>  import('components/list/TodoList'),
  // TableVisits: () => import("components/tables/TableVisits")
  // },
  data() {
    return {
      loading: false,
      isPwd: true,
      mode: "list",
      user: {
        apoderadohijos: [
          {
            personasga: [{}],
          },
        ],
      },
      filter: "",
      filterApo: "",
      filterBusqAlu: "",
      pagination: {
        rowsPerPage: 10,
      },
      visibleColumns: [
        "apo_nro_doc_identidad",
        "apo_apellidos",
        "apo_nombres",
        "rol.rol_descripcion",
        "apoderadohijos.length",
        "apo_estado",
      ],
      columns: [
        {
          name: "apo_id",
          align: "left",
          label: "ID Apoderado",
          field: "apo_id",
          sortable: true,
        },
        {
          name: "apo_nro_doc_identidad",
          align: "left",
          label: "D.N.I",
          field: "apo_nro_doc_identidad",
          sortable: true,
        },
        {
          name: "apo_apellidos",
          align: "left",
          label: "Apellidos",
          field: "apo_apellidos",
          sortable: true,
        },
        {
          name: "apo_nombres",
          align: "left",
          label: "Nombres",
          field: "apo_nombres",
          sortable: true,
        },
        {
          name: "rol.rol_descripcion",
          align: "left",
          label: "Rol",
          field: "rol.rol_descripcion",
          sortable: true,
        },
        {
          name: "apoderadohijos.length",
          align: "left",
          label: "Hijos",
          field: "apoderadohijos.length",
          sortable: true,
        },
        {
          name: "apo_estado",
          align: "left",
          label: "Estado",
          field: "apo_estado",
          sortable: true,
        },
      ],
      listAlumnos: [],
      seleccionar: "Seleccionar",
      listApoderados: [],
      apoderado: {
        apo_id: null,
        apo_nombres: "",
        apo_apellidos: "",
        id_tipo_doc: 1,
        apo_nro_doc_identidad: "",
        apo_email: "",
        apo_password: "",
        rol_id: null,
        apo_estado: null,
        createdAt: null,
        updatedAt: null,
        apoderadohijos: [],
        rol: {
          rol_id: null,
          rol_descripcion: "",
          rol_estado: null,
        },
        tipodocidentidad: {
          tipdoc_id: null,
          tipdoc_descripcion: "",
        },
      },
      columnsAlumnosApo: [
        {
          name: "aph_nro_matricula",
          align: "left",
          label: "Nro Matrícula",
          field: "aph_nro_matricula",
          sortable: true,
        },
        {
          name: "per_apellidos",
          align: "left",
          label: "Apellidos",
          field: "per_apellidos",
          sortable: true,
        },
        {
          name: "per_nombres",
          align: "left",
          label: "Nombres",
          field: "per_nombres",
          sortable: true,
        },
        {
          name: "sed_nombre",
          align: "left",
          label: "Sede",
          field: "sed_nombre",
          sortable: true,
        },
        {
          name: "dep_nombre",
          align: "left",
          label: "Escuela",
          field: "dep_nombre",
          sortable: true,
        },
        {
          name: "aph_estado",
          align: "left",
          label: "Estado",
          field: "aph_estado",
          sortable: true,
        },
      ],
      alumno: {},
      toolbar: false,
      secondDialog: false,
      selectTipoBusqAlu: "D.N.I",
      textTipoBusqAul: "",
      columnsAddAlumnos: [
        {
          name: "aph_nro_matricula",
          align: "left",
          label: "Nro Matrícula",
          field: "aph_nro_matricula",
          sortable: true,
        },
        {
          name: "per_apellidos",
          align: "left",
          label: "Apellidos",
          field: "per_apellidos",
          sortable: true,
        },
        {
          name: "per_nombres",
          align: "left",
          label: "Nombres",
          field: "per_nombres",
          sortable: true,
        },
        {
          name: "sed_nombre",
          align: "left",
          label: "Sede",
          field: "sed_nombre",
          sortable: true,
        },
        {
          name: "dep_nombre",
          align: "left",
          label: "Escuela",
          field: "dep_nombre",
          sortable: true,
        },
        {
          name: "aph_estado",
          align: "left",
          label: "Estado",
          field: "aph_estado",
          sortable: true,
        },
      ],
      options: ["D.N.I", "Nro Matricula", "Apellidos"],
      listBusqAlumnos: [],
      regusuario: false,
      busqalumno: false,
      showbtnRegistrarUsuario: false,
      showColumnSaveAlumnoApo: false,
      optionsRol: [
        {
          label: "ADMIN",
          value: 1,
        },
        {
          label: "APODERADO",
          value: 2,
        },
      ],
    };
  },
  validations: {
    apoderado: {
      apo_nro_doc_identidad: {
        required,
      },
      apo_nombres: {
        required,
      },
      apo_apellidos: {
        required,
      },
      apo_email: {
        required,
        email,
      },
      apo_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(15),
      },
      rol: {
        rol_id: {
          required,
        },
      },
    },
  },
  beforeCreate() {
    if (LocalStorage.has("token") && LocalStorage.has("user")) {
      const user = LocalStorage.getItem("user");
      // console.log(user);
      this.user = user;
    }
  },
  created() {
    const user = LocalStorage.getItem("user");
    let token = LocalStorage.getItem("token");
    // console.log(token);

    this.cargarDataUsuarios();

    // console.log("created=============================");
    // console.log(this.listAlumnos);
  },
  mounted() {},
  beforeUpdate() {},
  computed: {},
  methods: {
    mensajeError(campo) {
      if (campo === "apo_nro_doc_identidad") {
        if (!this.$v.apoderado.apo_nro_doc_identidad.required)
          return "Campo requerido";
      }
      if (campo === "apo_nombres") {
        if (!this.$v.apoderado.apo_nombres.required) return "Campo requerido";
      }
      if (campo === "apo_apellidos") {
        if (!this.$v.apoderado.apo_apellidos.required) return "Campo requerido";
      }
      if (campo === "apo_email") {
        if (!this.$v.apoderado.apo_email.email) return "Debe ser un email";
        if (!this.$v.apoderado.apo_email.required) return "Campo requerido";
      }
      if (campo === "apo_password") {
        if (!this.$v.apoderado.apo_password.minLength)
          return "Tamaño minimo 6 caracteres";
        if (!this.$v.apoderado.apo_password.maxLength)
          return "Tamaño máximo 15 caracteres";
        if (!this.$v.apoderado.apo_password.required) return "Campo requerido";
      }
      if (campo === "rol_id") {
        if (!this.$v.apoderado.rol.rol_id.required) return "Campo requerido";
      }
    },
    visualizarAlumno(data) {
      //Passing parameters
      this.$router.push({
        name: "NotasAlumno",
        params: { alumno: data },
      });
    },
    cargarDataUsuarios() {
      let token = LocalStorage.getItem("token");

      axiosIntranet.defaults.headers.common["Authorization"] =
        "Bearer " + token;
      axiosIntranet
        .get("/users?$limit=9000")
        .then((res) => {
          this.listApoderados = res.data.data;

          // console.log(this.listApoderados);
        })
        .catch((err) => {
          if (err.response) {
            let code = err.response.data.code;
            Notify.create({
              message: "Error. Please contact support." + err.response,
              color: "negative",
            });
          }
        });
    },
    listalumnos(apoderado) {
      let token = LocalStorage.getItem("token");

      this.apoderado = apoderado;
      this.toolbar = true;

      axiosIntranet.defaults.headers.common["Authorization"] =
        "Bearer " + token;
      axiosIntranet
        .get("/getalumnosapoderado" + "?apo_id=" + this.apoderado.apo_id)
        .then((res) => {
          this.apoderado.apoderadohijos = res.data;
        })
        .catch((err) => {
          if (err.response) {
            let code = err.response.data.code;
            Notify.create({
              message: "Error. Please contact support." + err.response,
              color: "negative",
            });
          }
        });
    },
    editEstadoAlumno(alumno) {
      let token = LocalStorage.getItem("token");

      // console.log(alumno);

      axiosIntranet.defaults.headers.common["Authorization"] =
        "Bearer " + token;

      axiosIntranet
        .patch("/apoderadohijos/" + alumno.aph_id, {
          aph_estado: alumno.aph_estado,
        })
        .then((res) => {
          this.$q.notify({
            type: "positive",
            message: "Se actualizó correctamente el alumno.",
          });
        })
        .catch((err) => {
          if (err.response) {
            let code = err.response.data.code;
            Notify.create({
              message: "Error. Please contact support." + err.response,
              color: "negative",
            });
          }
        });
    },
    editEstadoApoderado(apoderado) {
      let token = LocalStorage.getItem("token");
      // console.log(apoderado);

      axiosIntranet.defaults.headers.common["Authorization"] =
        "Bearer " + token;

      axiosIntranet
        .patch("/users/" + apoderado.apo_id, {
          apo_estado: apoderado.apo_estado,
        })
        .then((res) => {
          // console.log(res);

          this.$q.notify({
            type: "positive",
            message: "Se actualizó correctamente el usuario.",
          });
        })
        .catch((err) => {
          if (err.response) {
            let code = err.response.data.code;
            Notify.create({
              message: "Error. Please contact support." + err.response,
              color: "negative",
            });
          }
        });
    },
    buscarAlumnos() {
      let token = LocalStorage.getItem("token");

      let _dni = "";
      let _nro_matricula = "";
      let _apellidos = "";

      //'D.N.I', 'Nro Matricula', 'Apellidos'
      if (this.selectTipoBusqAlu == "D.N.I") {
        _dni = this.textTipoBusqAul;
      }
      if (this.selectTipoBusqAlu == "Nro Matricula") {
        _nro_matricula = this.textTipoBusqAul;
      }
      if (this.selectTipoBusqAlu == "Apellidos") {
        _apellidos = this.textTipoBusqAul;
      }

      if (
        _dni.trim() == "" &&
        _nro_matricula.trim() == "" &&
        _apellidos.trim() == ""
      ) {
        Notify.create({
          message: "Ingrese datos para la búsqueda.",
          color: "info",
        });
        return;
      }

      axiosIntranet.defaults.headers.common["Authorization"] =
        "Bearer " + token;
      axiosIntranet
        .post("/getbuscaralumnos", {
          _dni_p: _dni,
          _nro_matricula_p: _nro_matricula,
          _apellidos_p: _apellidos,
        })
        .then((res) => {
          // this.apoderado.apoderadohijos = res.data;
          this.listBusqAlumnos = res.data;

          if (this.listBusqAlumnos.length == 0) {
            Notify.create({
              message: "No se encontraron datos.",
              color: "info",
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            let code = err.response.data.code;
            Notify.create({
              message: "Error. Please contact support." + err.response,
              color: "negative",
            });
          }
        });
    },
    addAlumnoApo(alumno) {
      let token = LocalStorage.getItem("token");
      // console.log(apoderado);

      axiosIntranet.defaults.headers.common["Authorization"] =
        "Bearer " + token;

      axiosIntranet
        .post("/savealumnoapoderado", {
          _apo_id_p: this.apoderado.apo_id,
          _aph_nro_matricula_p: alumno.aph_nro_matricula,
          _aph_sistema_alumno_p: alumno.aph_sistema_alumno,
          _aph_estado_p: 1,
        })
        .then((res) => {
          this.$q.notify({
            type: "positive",
            message: "Se agregó correctamente el alumno.",
          });

          // console.log(res);

          this.listalumnos(this.apoderado);
          this.secondDialog = false;
          this.listBusqAlumnos = [];
          this.textTipoBusqAul = "";
        })
        .catch((err) => {
          // console.log(err.response);
          if (err.response) {
            let code = err.response.data.code;
            Notify.create({
              message: "Error. Please contact support." + err.response,
              color: "negative",
            });
          }
        });
    },
    formRegistroUsuario() {
      let token = LocalStorage.getItem("token");

      this.limpiarObjApoderado();
      this.regusuario = true;

      // axiosIntranet.defaults.headers.common["Authorization"] =
      //   "Bearer " + token;
      // axiosIntranet
      //   .get("/getalumnosapoderado" + "?apo_id=" + 0)
      //   .then(res => {
      //     this.apoderado.apoderadohijos = res.data;
      //   })
      //   .catch(err => {
      //     if (err.response) {
      //       let code = err.response.data.code;
      //       Notify.create({
      //         message: "Error. Please contact support." + err.response,
      //         color: "negative"
      //       });
      //     }
      //   });
    },
    busquedaDNI() {
      axios({
        method: "get",
        // url:'https://dni.optimizeperu.com/api/persons/',
        baseURL:
          "https://dni.optimizeperu.com/api/persons/" +
          this.apoderado.apo_nro_doc_identidad +
          "?format=json",
      })
        .then((response) => {
          // window.location.reload();
          // console.log(response);
          this.apoderado.apo_apellidos =
            response.data.first_name + " " + response.data.last_name;
          this.apoderado.apo_nombres = response.data.name;
        })
        .catch((error) => {
          // console.log(error);
        });
    },
    registrarUsuario() {
      const found = this.listApoderados.find(
        (element) =>
          element.apo_nro_doc_identidad == this.apoderado.apo_nro_doc_identidad
      );

      // console.log(found);
      if (found == undefined) {
        this.$v.apoderado.$touch();
        if (!this.$v.apoderado.$error) {
          let token = LocalStorage.getItem("token");

          axiosIntranet.defaults.headers.common["Authorization"] =
            "Bearer " + token;
          axiosIntranet
            .post("/saveapoderado", {
              _apoderado: this.apoderado,
            })
            .then((res) => {
              // this.apoderado.apoderadohijos = res.data;
              // console.log(res.data);

              this.$q.notify({
                type: "positive",
                message: "Se agregó correctamente el usuario.",
              });

              this.regusuario = false;
              this.limpiarObjApoderado();
              this.limpiarDatosRegAlumnos();
              this.cargarDataUsuarios();
            })
            .catch((err) => {
              if (err.response) {
                let code = err.response.data.code;
                Notify.create({
                  message: "Error. Please contact support." + err.response,
                  color: "negative",
                });
              }
            });
        }
      }else{
        Notify.create({
          message: "Ya existe un usuario con el dni ingresado.",
          color: "warning",
        });
      }
    },
    addSaveAlumnoApo(alumno) {
      // console.log(alumno);
      const found = this.apoderado.apoderadohijos.find(
        (element) => element.aph_nro_matricula == alumno.aph_nro_matricula
      );

      // console.log(found);
      if (found == undefined) {
        this.apoderado.apoderadohijos.push(alumno);
        this.secondDialog = false;

        this.listBusqAlumnos = [];
        this.textTipoBusqAul = "";
      }
    },
    showdialogSaveAlumnoApo() {
      this.secondDialog = true;
      this.showColumnSaveAlumnoApo = true;
    },
    limpiarDatosRegAlumnos() {
      this.showColumnSaveAlumnoApo = false;
      this.listBusqAlumnos = [];
      this.textTipoBusqAul = "";
    },
    limpiarObjApoderado() {
      this.apoderado = {
        apo_id: null,
        apo_nombres: "",
        apo_apellidos: "",
        id_tipo_doc: 1,
        apo_nro_doc_identidad: "",
        apo_email: "",
        apo_password: "",
        rol_id: null,
        apo_estado: null,
        createdAt: null,
        updatedAt: null,
        apoderadohijos: [],
        rol: {
          rol_id: null,
          rol_descripcion: "",
          rol_estado: null,
        },
        tipodocidentidad: {
          tipdoc_id: null,
          tipdoc_descripcion: "",
        },
      };
    },
    deteleAlumnoApoReg(alumno) {
      const found = this.apoderado.apoderadohijos.filter(
        (element) => element.aph_nro_matricula != alumno.aph_nro_matricula
      );
      // console.log(found);
      // if(found !== undefined){
      //   this.apoderado.apoderadohijos(alumno);
      // }
      this.apoderado.apoderadohijos = found;
    },
  },
};
</script>
