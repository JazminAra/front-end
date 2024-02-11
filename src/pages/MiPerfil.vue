<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class=" text-black">
          <q-card-section class="text-h6 ">
            <div class="text-h6">Mi Perfil</div>
            <!-- <div class="text-subtitle2">Complete your profile</div> -->
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
                    <img src="profile_padre.svg" />
                  </q-avatar>
                </q-item-section>
                <!-- <q-item-section>
                  <q-btn label="Add Photo" class="text-capitalize" rounded color="info" style="max-width: 120px"></q-btn>
                </q-item-section> -->
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="user_details.persona.per_nro_doc_identidad"
                    label="D.N.I"
                    readonly
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="bodyInfo.email"
                    :value="user_details.persona.per_email_institucional"
                    label="Email"
                    :error="$v.bodyInfo.email.$error"
                    readonly
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="user_details.persona.per_nombres"
                    label="Nombres"
                    readonly
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    :value="user_details.persona.per_ap_paterno + ' ' + user_details.persona.per_ap_materno"
                    label="Apellidos"
                    readonly
                  />
                </q-item-section>
              </q-item>
              <!-- <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input autogrow dense v-model="user_details.address" label="Address"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="user_details.city" label="City"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="user_details.post_code" label="Postal Code"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input type="textarea" dense v-model="user_details.about" label="About"/>
                </q-item-section>
              </q-item> -->
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <!-- <q-btn
              class="text-capitalize bg-info text-white"
              @click="actualizarInfo" :loading="loading"
              >Actualizar Info
                  <span slot="loading">
                    <q-spinner-hourglass class="on-left" /> Actualizando...
                  </span>
              </q-btn -->
            >
          </q-card-actions>
        </q-card>
      </div>

      <!-- <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section class="text-center bg-transparent">
            <q-avatar size="100px" class="shadow-10">
              <img src="profile.svg">
            </q-avatar>
            <div class="text-subtitle2 q-mt-lg">by Pratik Patel</div>
            <div class="text-h6 q-mt-md">Pratik Patel</div>
          </q-card-section>
          <q-card-section>
            <div class="text-body2 text-justify">
              My name is Pratik Patel (also known as @pratik227). I noticed myself pulling into programming since 2013,
              and then determined myself to become a skilled and knowledgeable programmer. My passion for my programming
              increases as I started working for Incentius (where I am currently working in).
            </div>
          </q-card-section>
        </q-card>
      </div> -->

      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Cambiar Password</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <!-- <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Password Actual
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dense
                  outlined
                  round
                  v-model="password_dict.current_password"
                  label="Password Actual"
                />
              </q-item-section>
            </q-item> -->
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Nuevo Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dense
                  outlined
                  round
                  v-model="bodyPassword.new_password"
                  label="Nuevo Password"
                  :error="$v.bodyPassword.new_password.$error"     
                  :error-message="mensajeError('new_password')"
                  maxlength="15"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Confirmar Nuevo Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dense
                  outlined
                  round
                  v-model="bodyPassword.repeat_password"
                  label="Confirmar Nuevo Password"
                  :error="$v.bodyPassword.repeat_password.$error"
                  :error-message="mensajeError('repeat_password')"
                  maxlength="15"
                />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info text-white" @click="actualizarPassword"
              :loadingPassword="loadingPassword"
              >Cambiar Password
              <span slot="loadingPassword">
                    <q-spinner-hourglass class="on-left" /> Actualizando...
                  </span>
            </q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { email, required, numeric, minLength, maxLength, sameAs } from "vuelidate/lib/validators";

import { LocalStorage, SessionStorage } from "quasar";
import { axiosIntranet } from "../boot/axios";
import { Notify } from "quasar";

export default {
  name: "UserProfile",
  data() {
    return {
      user_details: {},
      password_dict: {},
      bodyInfo: {
        email: ""
      },
      bodyPassword: {
        new_password: "",
        repeat_password: ""
      },
      loading: false,
      loadingPassword: false,
    };
  },
  validations: {
    bodyInfo: {
      email: {
        email
      }
    },
    bodyPassword: {
      // old_password: {
      //   required,
      // },
      new_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(15),
      },
      repeat_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(15),
        sameAsPassword: sameAs('new_password'),
      },
    },
  },
  beforeCreate() {
    // if (LocalStorage.has("token") && LocalStorage.has("user")) {
    //   const user = LocalStorage.getItem("user");
    //   console.log(user);
    // }
  },
  created() {
    let user = LocalStorage.getItem("user");
    let token = LocalStorage.getItem("token");

    this.user_details = user;
    this.bodyInfo.email = user.persona.per_email_institucional;

    // console.log(user);
  },
  methods: {
    mensajeError (campo) {
      // if (campo === 'email') {
      //   if (!this.$v.email.email) return 'Debe ser un email'
      //   if (!this.$v.email.required) return 'Campo requerido'
      // }
      if (campo === 'new_password') {
        if (!this.$v.bodyPassword.new_password.minLength) return 'Tamaño minimo 6 caracteres'
        if (!this.$v.bodyPassword.new_password.required) return 'Campo requerido'
      }
      if (campo === 'repeat_password') {
        if (!this.$v.bodyPassword.repeat_password.minLength) return 'Tamaño minimo 6 caracteres'
        if (!this.$v.bodyPassword.repeat_password.required) return 'Campo requerido'
        if (!this.$v.bodyPassword.repeat_password.sameAsPassword) return 'Las contraseñas deben coincidir'
      }
    },
    actualizarInfo() {
      this.$v.bodyInfo.$touch()

      if (!this.$v.bodyInfo.$error) {
          this.loading = true;

          let token = LocalStorage.getItem("token");
          let user = LocalStorage.getItem("user");

          axiosIntranet.defaults.headers.common["Authorization"] =
                "Bearer " + token;

          axiosIntranet
                .patch("/usuarios/" + this.user_details.usu_id,
                  {
                    "strategy": "local",
                    "usu_login": this.user_details.usu_login,
                    // "apo_email": this.bodyInfo.email
                  })
                .then(res => {
                  // this.listAlumnos = res.data;  
                  // console.log(res.data);

                  user.apo_email = this.bodyInfo.email;
                  LocalStorage.set("user", user);

                  this.$q.notify({
                  type: 'positive',
                    message: 'Se actualizó correctamente.'
                  });

                  this.loading = false;
                }).catch(err => {
                  if (err.response) {
                    let code = err.response.data.code;
                    Notify.create({
                      message: "Error. Please contact support." + err.response,
                      color: "negative"
                    });
                  }
            }); ;
      }
      //this.$router.push("/Dashboard");
    },
    actualizarPassword() {
      this.$v.bodyPassword.$touch();
      if (!this.$v.bodyPassword.$error) {
          this.loadingPassword = true;

          let token = LocalStorage.getItem("token");
          // let user = LocalStorage.getItem("user");

          axiosIntranet.defaults.headers.common["Authorization"] =
                "Bearer " + token;

          axiosIntranet
                .patch("/usuarios/" + this.user_details.usu_id,
                  {
                    "strategy": "local",
                    "usu_id": this.user_details.usu_id,
                    "usu_password": this.bodyPassword.new_password
                  })
                .then(res => {
                  // this.listAlumnos = res.data;  
                  // console.log(res.data);

                  // user.apo_email = this.bodyInfo.email;
                  // LocalStorage.set("user", user);
                  this.bodyPassword.new_password = "";
                  this.bodyPassword.repeat_password = "";

                  this.$q.notify({
                  type: 'positive',
                    message: 'Se actualizó correctamente la contraseña.'
                  });

                  this.loadingPassword = false;
                  this.$v.bodyPassword.$reset();
                }).catch(err => {
                  if (err.response) {
                    let code = err.response.data.code;
                    Notify.create({
                      message: "Error. Please contact support." + err.response,
                      color: "negative"
                    });
                  }
            });
      }
    }
  }
};
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}
</style>
