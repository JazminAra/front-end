<template>
  <q-page class="q-pa-sm">
    <!-- <div class="q-pa-md"> -->
    <!-- <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">         -->
    <div class="q-pa-sm q-gutter-sm">
      <q-card>
        <q-card-section class="text-h6 q-pa-none">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="blue" name="gradient" size="34px" />
            </q-item-section>
            <q-item-section>
              <div
                class="text-overline text-weight-medium"
                style="font-size: 20px"
              >
                Sistema de Gestión académica - SGA
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator />
      </q-card>
    </div>
    <div class="q-pa-sm q-gutter-sm">
      <q-card>
        <q-card-section class="q-pa-none">
          <q-tabs v-model="tab" dense class="text-grey" active-color="blue" indicator-color="blue" align="justify" narrow-indicator>
            <q-tab name="mails0" icon="person_search" label="Consulta por Código Alumno"/>
            <q-tab name="alarms" icon="fact_check" label="Búsqueda Convalidaciones"/>
            <q-tab name="movies" icon="date_range" label="Actualizar Fecha Silabos" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="mails0">
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-8 col-xs-8">
                  <q-item-section>
                    <q-input
                      dense
                      outlined
                      stack-label
                      class="full-width"
                      v-model="alumno.codigo"
                      label="Código Alumno"
                      maxlength="16"
                      @keyup.enter="busquedaAlumnoSGA"
                      :error="$v.alumno.codigo.$error"
                      :error-message="mensajeError('codigo')"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-1 col-md-1 col-sm-1 col-xs-1 self-center">
                  <q-item-section>
                    <q-btn
                      dense
                      color="purple"
                      icon="person_search"
                      class="q-px-sm"
                      @click="busquedaAlumnoSGA"
                    >
                    </q-btn>
                  </q-item-section>
                </q-item>
              </div>
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_apellidos"
                    label="Apellidos"
                    maxlength="100"
                    readonly
                  />
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_nombres"
                    label="Nombres"
                    maxlength="100"
                    readonly
                  />
                </q-item>
              </div>
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_sexo"
                    label="Sexo"
                    maxlength="100"
                    readonly
                  />
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_fnaci"
                    label="Fecha Nacimiento"
                    maxlength="100"
                    readonly
                  />
                </q-item>
              </div>
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_dni"
                    label="D.N.I"
                    maxlength="100"
                    readonly
                  />
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_mail"
                    label="Email"
                    maxlength="150"
                    readonly
                  />
                </q-item>
              </div>
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_direccion"
                    label="Direccion"
                    maxlength="100"
                    readonly
                  />
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_telefono"
                    label="Teléfono"
                    maxlength="100"
                    readonly
                  />
                </q-item>
              </div>
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_celular"
                    label="Celular"
                    maxlength="100"
                    readonly
                  />
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.sed_nombre"
                    label="Sede"
                    maxlength="100"
                    readonly
                  />
                </q-item>
              </div>
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.escuela"
                    label="Escuela"
                    maxlength="150"
                    readonly
                  />
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.facultad"
                    label="Facultad"
                    maxlength="100"
                    readonly
                  />
                </q-item>
              </div>
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.ult_matricula"
                    label="Ult. Matricula"
                    maxlength="150"
                    readonly
                  />
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_login"
                    label="Código Alumno"
                    maxlength="20"
                    readonly
                  />
                </q-item>
              </div>
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    outlined
                    stack-label
                    class="full-width"
                    v-model="alumno.per_email_institucional"
                    label="Email Institucional"
                    maxlength="150"
                    readonly
                  />
                </q-item>
              </div>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-8 col-xs-8">
                  <q-item-section>
                    <q-input
                      dense
                      outlined
                      stack-label
                      class="full-width"
                      v-model="codigoAlumnoConva"
                      label="Código Alumno"
                      maxlength="20"
                      @keyup.enter="busquedaConvalidacionesAlumnoSGA"
                      :error="$v.codigoAlumnoConva.$error"
                      :error-message="mensajeError('codigoalumnoconva')"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                  <q-item-section>
                    <q-btn
                      dense
                      color="purple"
                      icon="person_search"
                      class="q-px-sm"
                      @click="busquedaConvalidacionesAlumnoSGA"
                    >
                    </q-btn>
                  </q-item-section>
                </q-item>
              </div>
              <q-table
                      class="no-shadow"
                      :data="convalidaciones"
                      title="Convalidaciones Cursos"
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
                            props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'
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

                        <q-select
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
                        />
                        <!-- <q-btn
                                                color="primary"
                                                icon-right="archive"
                                                label="Export to csv"
                                                no-caps
                                                @click="exportTable"
                                              /> -->
                      </template>
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td
                            key="sed_nombre"
                            :props="props"
                            class="text-weight-bold"
                          >
                            {{ props.row.sed_nombre }}
                          </q-td>
                          <q-td key="per_login" :props="props">
                            {{ props.row.per_login }}
                          </q-td>
                          <q-td key="per_apellidos" :props="props">
                            {{ props.row.per_apellidos }}
                          </q-td>
                          <q-td key="per_nombres" :props="props">
                            {{ props.row.per_nombres }}
                          </q-td>
                          <q-td key="dep_nombre" :props="props">
                            {{ props.row.dep_nombre }}
                          </q-td>
                          <q-td key="cur_nombre" :props="props">
                            {{ props.row.cur_nombre }}
                          </q-td>
                          <q-td key="mat_ciclor" :props="props">
                            {{ props.row.mat_ciclor }}
                          </q-td>
                          <q-td key="ani_anio" :props="props">
                            {{ props.row.ani_anio }}
                          </q-td>
                          <q-td key="tan_semestre" :props="props">
                            {{ props.row.tan_semestre }}
                          </q-td>
                          <q-td key="lcv_fecha" :props="props">
                            {{ props.row.lcv_fecha }}
                          </q-td>
                          <q-td key="tdo_nombre" :props="props">
                            {{ props.row.tdo_nombre }}
                          </q-td>
                          <q-td key="dto_numero" :props="props">
                            {{ props.row.dto_numero }}
                            <q-popup-edit v-model="props.row.dto_numero" title="Modificar Nro. Doc." buttons 
                              label-set="Guardar"
                              label-cancel="Cancelar"                              
                              @save="(v, iv) => { guardarConva(v, iv, props.row) }" @cancel="canceled">
                              <q-input type="text" v-model="props.row.dto_numero" dense autofocus />
                            </q-popup-edit>
                          </q-td>
                          <!-- <q-td key="dto_estado" :props="props">
                            {{ props.row.dto_estado }}
                          </q-td> -->
                          <q-td key="dto_estado" :props="props" :class="
                              props.row.dto_estado == true
                                ? 'text-blue-10'
                                : 'text-red-14'
                            "
                          >
                            <q-toggle
                              v-model="props.row.dto_estado"
                              :true-value="1"
                              :false-value="0"
                              checked-icon="check"
                              color="green"
                              unchecked-icon="clear"
                              @input="saved(props.row)"
                            />
                          </q-td>
                        </q-tr>
                      </template>
                    </q-table>
            </q-tab-panel>
            
            <q-tab-panel name="movies">
              <div class="row">
                <q-item class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                  <q-item-section>
                      <q-select outlined dense option-value="ani_id" color="teal"
                              use-input         hide-selected         fill-input @filter="filterFn"
                              :option-label="opt => Object(opt) === opt && 'ani_anio' in opt ? opt.ani_anio + ' - ' + opt.tan_semestre : '- Null -'"
                             v-model="modelAnio" :options="anios" label="Año/Semestre">
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                  <q-item-section>
                      <q-select outlined dense option-value="sed_id" option-label="sed_nombre" v-model="modelSede" :options="sedes" label="Sedes" color="blue"/>
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                  <q-item-section>
                    <q-btn
                      dense
                      color="purple"
                      icon="text_snippet"
                      class="q-px-sm"
                      @click="BusquedaSilaboFechaLimite"
                    >
                    </q-btn>
                  </q-item-section>
                </q-item>
              </div>

              <q-table class="no-shadow" :data="silabosfechalimite"
                      title="Silabos Fecha Limite" :hide-header="mode === 'grid'"
                      :columns="columnsSilabo" row-key="name"
                      :filter="filterSilabo" :pagination.sync="pagination">
                      <template v-slot:top-right="props">
                        <q-input borderless
                          dense debounce="300" v-model="filterSilabo" placeholder="Buscar">
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>

                        <q-btn flat round dense
                          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                          @click="props.toggleFullscreen" v-if="mode === 'list'" class="q-px-sm">
                          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
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
                      </template>
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td key="sed_nombre" :props="props">
                            {{ props.row.sed_nombre }}
                          </q-td>
                          <q-td key="tipo_accion_silabo" :props="props" class="text-weight-bold text-blue">
                            {{ props.row.tipo_accion_silabo }}
                          </q-td>
                          <q-td key="fec_lim_descripcion" :props="props">
                            {{ props.row.fec_lim_descripcion }}
                          </q-td>
                          <q-td key="ani_anio" :props="props">
                            {{ props.row.ani_anio }}
                          </q-td>
                          <q-td key="fec_lim_inicio" :props="props" class="text-weight-bold text-teal">
                            {{ props.row.fec_lim_inicio }}
                            <q-popup-edit v-model="props.row.fec_lim_inicio" title="Modificar Fecha Inicio" buttons 
                              label-set="Guardar"
                              label-cancel="Cancelar"                              
                              @save="(v, iv) => { guardarSilaboFechaInicio(v, iv, props.row) }" @cancel="canceled">
                              <q-input type="date" v-model="props.row.fec_lim_inicio" dense autofocus />
                            </q-popup-edit>
                          </q-td>
                          <q-td key="fec_lim_termino" :props="props" class="text-weight-bold text-teal">
                            {{ props.row.fec_lim_termino }}
                            <q-popup-edit v-model="props.row.fec_lim_termino" title="Modificar Fecha Termino" buttons 
                              label-set="Guardar"
                              label-cancel="Cancelar"                           
                              @save="(v, iv) => { guardarSilaboFechaTermino(v, iv, props.row) }" @cancel="canceled">
                              <q-input type="date" v-model="props.row.fec_lim_termino" dense autofocus />
                            </q-popup-edit>
                          </q-td>
                          <!-- <q-td key="dto_numero" :props="props">
                            {{ props.row.dto_numero }}
                            <q-popup-edit v-model="props.row.dto_numero" title="Modificar Nro. Doc." buttons 
                              label-set="Guardar"
                              label-cancel="Cancelar"                              
                              @save="(v, iv) => { guardarConva(v, iv, props.row) }" @cancel="canceled">
                              <q-input type="text" v-model="props.row.dto_numero" dense autofocus />
                            </q-popup-edit>
                          </q-td> -->
                        </q-tr>
                      </template>
                    </q-table>

            </q-tab-panel>
          </q-tab-panels>          
        </q-card-section>
      </q-card>
    </div>
    <!-- </div>
    </div> -->

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
    <!-- </div> -->
  </q-page>
</template>

<script>
import Vue from "vue";
import Vuex from 'vuex'

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
import sgaService from "../services/sga";
import { mapState, mapActions } from "vuex";
import { Notify } from "quasar";

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
      tab: "mails0",
      mode: "list",
      user: {},
      alumno: {
        codigo: "",
        per_id: 0,
        per_login: "",
        per_password: "",
        per_nombres: "",
        per_apellidos: "",
        per_sexo: "",
        per_fnaci: "",
        per_direccion: "",
        per_cod_pais: "",
        per_dni: "",
        per_telefono: "",
        per_celular: "",
        per_mail: "",
        per_estado: 0,
        pfl_id: 0,
        sed_id: 0,
        sed_nombre: "",
        dep_id_escuela: 0,
        escuela: "",
        dep_escuela: 0,
        dep_id_facultad: 0,
        facultad: "",
        ult_matricula: "",
      },
      codigoAlumnoConva: "",
      convalidaciones: [],
      filter: "",
      pagination: {
        rowsPerPage: 10,
      },
      visibleColumns: [
        "sed_nombre",
        "per_login",
        "per_apellidos",
        "per_nombres",
        "dep_nombre",
        "cur_nombre",
        "mat_ciclor",
        "ani_anio",
        "tan_semestre",
        "lcv_fecha",
        "tdo_nombre",
        "dto_numero",
        "dto_estado",
      ],
      columns: [
        {
          name: "sed_nombre",
          align: "left",
          label: "Sede",
          field: "sed_nombre",
          sortable: true,
        },
        {
          name: "per_login",
          align: "left",
          label: "Codigo Alumno",
          field: "per_login",
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
          name: "dep_nombre",
          align: "left",
          label: "Escuela",
          field: "dep_nombre",
          sortable: true,
        },
        {
          name: "cur_nombre",
          align: "left",
          label: "Curso",
          field: "cur_nombre",
          sortable: true,
        },
        {
          name: "mat_ciclor",
          align: "left",
          label: "Ciclo",
          field: "mat_ciclor",
          sortable: true,
        },
        {
          name: "ani_anio",
          align: "left",
          label: "Año",
          field: "ani_anio",
          sortable: true,
        },
        {
          name: "tan_semestre",
          align: "left",
          label: "Semestre",
          field: "tan_semestre",
          sortable: true,
        },
        {
          name: "lcv_fecha",
          align: "left",
          label: "Fecha Conva.",
          field: "lcv_fecha",
          sortable: true,
        },
        {
          name: "tdo_nombre",
          align: "left",
          label: "Tipo Documento",
          field: "tdo_nombre",
          sortable: true,
        },
        {
          name: "dto_numero",
          align: "left",
          label: "Nro. Doc.",
          field: "dto_numero",
          sortable: true,
        },
        {
          name: "dto_estado",
          align: "left",
          label: "Estado",
          field: "dto_estado",
          sortable: true,
        },
      ],
      modelAnio: null,
      anios: [],
      optionsAnio: [],
      modelSede: null,
      sedes: [],
      silabosfechalimite: [],
      filterSilabo: "",
      columnsSilabo: [
        {
          name: "sed_nombre",
          align: "left",
          label: "Sede",
          field: "sed_nombre",
          sortable: true,
        },
        {
          name: "tipo_accion_silabo",
          align: "left",
          label: "Tipo Acción",
          field: "tipo_accion_silabo",
          sortable: true,
        },
        {
          name: "fec_lim_descripcion",
          align: "left",
          label: "Descripción",
          field: "fec_lim_descripcion",
          sortable: true,
        },
        {
          name: "ani_anio",
          align: "left",
          label: "Año",
          field: "ani_anio",
          sortable: true,
        },
        {
          name: "fec_lim_inicio",
          align: "left",
          label: "Fecha Inicio",
          field: "fec_lim_inicio",
          sortable: true,
        },
        {
          name: "fec_lim_termino",
          align: "left",
          label: "Fecha Termino",
          field: "fec_lim_termino",
          sortable: true,
        }
      ],
      listAlumnos: [],
      seleccionar: "Seleccionar",
      persona: {
        DNI: "",
        NombreCompleto: "",
        Nombre: "",
        Paterno: "",
        Materno: "",
        FechaNacimiento: "",
        Sexo: "",
        Direccion: "",
        Departamento: "",
        Provincia: "",
        Distrito: "",
        DigitoVerificacion: 0,
      },
      personaAll: {},
      busquedaDNI_Platinium: {},
      empresa: {},
      personaEssalud: {
        datos_personales: {
          nombres: "",
          dni: "",
          tipo_de_asegurado: "",
          autogenerado: "",
          tipo_de_seguro: "",
          fecha_nacimiento: "",
        },
        acreditacion: {
          centro_asistencial: "",
          direccion: "",
          afiliado: "",
          vigencia: {
            desde: "",
            hasta: "",
          },
        },
      },
    };
  },
  validations: {
    alumno: {
      codigo: {
        required,
        numeric,
      },
    },
    codigoAlumnoConva: {
      required,
      numeric,
    },
    persona: {
      DNI: {
        required,
        numeric,
      },
    },
    empresa: {
      RUC: {
        required,
        numeric,
      },
    },
    personaEssalud: {
      datos_personales: {
        dni: {
          required,
          numeric,
        },
      },
    },
    personaAll: {
      dni: {
        required,
        numeric,
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
    // const user = LocalStorage.getItem("user");
    // let token = LocalStorage.getItem("token");
    this.getSemestresAniosSedes()
  },
  mounted() {
    //this.getDatosPersonaAlumno();
    // console.log("mounted=============================");
    // console.log(this.listAlumnos);
  },
  beforeUpdate() {
    // console.log("beforeUpdate=============================");
    //  console.log(this.listAlumnos);
  },
  methods: {
    mensajeError(campo) {
      if (campo === "codigo") {
        if (!this.$v.alumno.codigo.required) return "Campo requerido";
        if (!this.$v.alumno.codigo.numeric) return "Campo númerico";
      }
      if (campo === "codigoalumnoconva") {
        if (!this.$v.codigoAlumnoConva.required) return "Campo requerido";
        if (!this.$v.codigoAlumnoConva.numeric) return "Campo númerico";
      }
      if (campo === "DNI") {
        if (!this.$v.persona.DNI.required) return "Campo requerido";
        if (!this.$v.persona.DNI.numeric) return "Campo númerico";
      }
      if (campo === "RUC") {
        if (!this.$v.empresa.RUC.required) return "Campo requerido";
        if (!this.$v.empresa.RUC.numeric) return "Campo númerico";
      }
      if (campo === "Essaluddni") {
        if (!this.$v.personaEssalud.datos_personales.dni.required)
          return "Campo requerido";
        if (!this.$v.personaEssalud.datos_personales.dni.numeric)
          return "Campo númerico";
      }
      if (campo === "DNIALL") {
        if (!this.$v.personaAll.dni.required) return "Campo requerido";
        if (!this.$v.personaAll.dni.numeric) return "Campo númerico";
      }
    },
    busquedaAlumnoSGA() {
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      this.$v.alumno.$touch();
      if (!this.$v.alumno.$error) {
        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/getdatosalumnosga", { codalumno: this.alumno.codigo })
          .then((res) => {
            this.alumno = {};
            let success = res.data.success;

            if (success == true) {
              this.alumno = res.data.data;
              this.alumno.codigo = this.alumno.per_login;
            } else {
              Notify.create({
                message: res.data.data.message,
                color: "warning",
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
      }
    },
    busquedaConvalidacionesAlumnoSGA() {
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      this.$v.codigoAlumnoConva.$touch();
      if (!this.$v.codigoAlumnoConva.$error) {
        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/getdatoscovalidacionalumnosga", {
            codalumno: this.codigoAlumnoConva,
          })
          .then((res) => {
            this.convalidaciones = {};
            this.filter = "";
            let success = res.data.success;

            if (success == true) {
              this.convalidaciones = res.data.data;
              // console.log(this.convalidaciones);
              // this.alumno.codigo = this.alumno.per_login;
            } else {
              Notify.create({
                message: res.data.data.message,
                color: "warning",
              });
            }
          })
          .catch((err) => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Error. Please contact support." + err.responses,
                color: "negative",
              });
            }
          });
      }
    },
    // saved (val, initialValue,) {
    //   console.log(val)
    //   console.log(`original value = ${initialValue}, new value = ${val}`)
    // },
    guardarConva(value, initialValue, row){
        // console.log(v)
        // console.log(iv)
        // console.log(row)
        const user = LocalStorage.getItem("user");
        let token = LocalStorage.getItem("token");

        let dataAudit = {
            object: {
                dto_id: row.dto_id,
                dto_numero_old: initialValue,
                dto_numero_new: value
            },            
            codeapp: process.env.CODE_APP      
        }

        let audit = this.$store.getters['auth/audit'](dataAudit)
        // console.log(audit)
        // return;

        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/upddatoscovalidacionalumnosga", {
            convalidacion: row,
            auditoria: audit
          })
          .then((res) => {
            // this.convalidaciones = {};
            let success = res.data.success;
            // console.log(res)

            if (success == true) {
              // this.convalidaciones = res.data.data;
              // console.log(this.convalidaciones);
              // this.alumno.codigo = this.alumno.per_login;
              Notify.create({
                message: res.data.data.message,
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
    saved (row) {
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      let dataAudit = {
            object: {
                dto_id: row.dto_id,
                dto_estado_old: row.dto_estado,
                dto_estado_new: row.dto_estado
            },            
            codeapp: process.env.CODE_APP      
      }

      let audit = this.$store.getters['auth/audit'](dataAudit)

      axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/upddatoscovalidacionalumnosga", {
            convalidacion: row,
            auditoria: audit
          })
          .then((res) => {
            // this.convalidaciones = {};
            let success = res.data.success;
            // console.log(res)

            if (success == true) {
              // this.convalidaciones = res.data.data;
              // console.log(this.convalidaciones);
              // this.alumno.codigo = this.alumno.per_login;
              Notify.create({
                message: res.data.data.message,
                color: "info",
              });
            }
          })
          .catch((err) => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Error. Please contact support." + err.responses,
                color: "negative",
              });
            }
          });

      // console.log(`original value = ${initialValue}, new value = ${val}`)
    },
    canceled (val, initialValue) {
      console.log(`retain original value = ${initialValue}, canceled value = ${val}`)  
    },
    getSemestresAniosSedes(){
      const user = LocalStorage.getItem("user");
      let token = LocalStorage.getItem("token");

      // this.$v.codigoAlumnoConva.$touch();
      // if (!this.$v.codigoAlumnoConva.$error) {
        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet.post("/getaniossemestressedessga").then((res) => {
            // this.convalidaciones = {};
            // this.filter = "";
            let success = res.data.success;

            if (success == true) {
              this.anios = res.data.data.anios;
              this.sedes = res.data.data.sedes;

              this.optionsAnio = res.data.data.anios; //

            } else {
              Notify.create({
                message: res.data.data.message,
                color: "warning",
              });
            }
          })
          .catch((err) => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Error. Please contact support." + err.responses,
                color: "negative",
              });
            }
          });
      // }
    },
    filterFn (val, update, abort) {
      // console.log(this.optionsAnio)
      update(() => {
        const needle = val.toLowerCase()
        // console.log(needle)
        this.anios = this.optionsAnio.filter(v => (v.ani_anio + " " + v.tan_semestre).toLowerCase().indexOf(needle) > -1)
      })
    },
    BusquedaSilaboFechaLimite(){
        const user = LocalStorage.getItem("user");
        let token = LocalStorage.getItem("token");

        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/getsilabofechalimite", { 
            ani_id: this.modelAnio.ani_id,
            sed_id: this.modelSede.sed_id
          }).then((res) => {
            // console.log(res)
            this.silabosfechalimite = [];
            let success = res.data.success;

            if (success == true) {
              this.silabosfechalimite = res.data.data;
              // console.log(this.silabosfechalimite)
              // this.alumno.codigo = this.alumno.per_login;
            } else {
              Notify.create({
                message: res.data.data.message,
                color: "warning",
              });
            }
          })
          .catch((err) => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Error. Please contact support." + err.responses,
                color: "negative",
              });
            }
          });
    },
    guardarSilaboFechaInicio(value, initialValue, row){
        // console.log(v)
        // console.log(iv)
        // console.log(row)
        const user = LocalStorage.getItem("user");
        let token = LocalStorage.getItem("token");

        let dataAudit = {
            object: {
                fec_lim_id: row.fec_lim_id,
                fec_lim_inicio_old: initialValue,
                fec_lim_inicio_new: value
            },            
            codeapp: process.env.CODE_APP      
        }

        let audit = this.$store.getters['auth/audit'](dataAudit)

        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/updatesilabofechainicio", {
            silabofechas: row,
            auditoria: audit
          })
          .then((res) => {
            let success = res.data.success;

            if (success == true) {
              Notify.create({
                message: res.data.data.message,
                color: "info",
              });
            }
          })
          .catch((err) => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Error. Please contact support." + err.responses,
                color: "negative",
              });
            }
          });
    },
    guardarSilaboFechaTermino(value, initialValue, row){
        // console.log(v)
        // console.log(iv)
        console.log(row)
        const user = LocalStorage.getItem("user");
        let token = LocalStorage.getItem("token");

        let dataAudit = {
            object: {
                fec_lim_id: row.fec_lim_id,
                fec_lim_termino_old: initialValue,
                fec_lim_termino_new: value
            },            
            codeapp: process.env.CODE_APP      
        }

        let audit = this.$store.getters['auth/audit'](dataAudit)

        axiosIntranet.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        axiosIntranet
          .post("/updatesilabofechalimite", {
            silabofechas: row,
            auditoria: audit
          })
          .then((res) => {
            let success = res.data.success;

            if (success == true) {
              Notify.create({
                message: res.data.data.message,
                color: "info",
              });
            }
          })
          .catch((err) => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Error. Please contact support." + err.responses,
                color: "negative",
              });
            }
          });
    },
    // editEstadoConva(row) {
    //   let token = LocalStorage.getItem("token");
    //   console.log(row);

    //   // axiosIntranet.defaults.headers.common["Authorization"] =
    //   //   "Bearer " + token;

    //   // axiosIntranet
    //   //   .patch("/users/" + row.apo_id, {
    //   //     apo_estado: row.apo_estado,
    //   //   })
    //   //   .then((res) => {
    //   //     // console.log(res);

    //   //     this.$q.notify({
    //   //       type: "positive",
    //   //       message: "Se actualizó correctamente el usuario.",
    //   //     });
    //   //   })
    //   //   .catch((err) => {
    //   //     if (err.response) {
    //   //       let code = err.response.data.code;
    //   //       Notify.create({
    //   //         message: "Error. Please contact support." + err.response,
    //   //         color: "negative",
    //   //       });
    //   //     }
    //   //   });
    // },
    busquedaDNI() {},
    busquedaRUC() {},
    busquedaESSALUD() {},
  },
};
</script>
