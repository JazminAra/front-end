<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile_padre.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis text-teal">
                <q-icon name="apps" /> Eventos Académicos UNT
                <q-item class="text-weight-thin">Recuperar contraseña</q-item>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-input
                filled
                v-model.trim="data.body.emailuser"
                :label="this.$t('labels.email')"
                lazy-rules
                clearable
                :error="this.$v.data.body.emailuser.$error"
                required
                autofocus
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <template>
                <vue-recaptcha
                  ref="recaptcha"
                  @verify="onVerify"
                  @expired="onExpired"
                  :sitekey="sitekey" v-if="!$q.platform.is.mobile">
                </vue-recaptcha>
              </template>

              <!-- <q-input
                :type="isPwd ? 'password' : 'text'"
                filled
                v-model="data.body.password"
                :label="this.$t('labels.password')"
                lazy-rules
                clearable :error="$v.data.body.password.$error" required
                @keyup.enter="login"
              >
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd =!isPwd" />
                </template>
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
              </q-input> -->

              <div class="row justify-center">
                <q-btn
                  icon-right="vpn_key"
                  :label="this.$t('buttons.recovery')"
                  :loading="loading"
                  @click="login"
                  type="button"
                  color="primary"
                >
                  <span slot="loading">
                    <q-spinner-hourglass class="on-left" /> Procesando...
                  </span>
                </q-btn>
              </div>
              <q-card-actions align="right">
                <q-btn
                  to="/"
                  flat
                  dense
                  label="Iniciar Sesión?"
                  class="text-capitalize"
                  color="blue"
                ></q-btn>
              </q-card-actions>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { email, required, numeric } from "vuelidate/lib/validators";

import { LocalStorage, SessionStorage } from "quasar";

import Tawk from "vue-tawk";
import Vue from "vue";
import VueRecaptcha from 'vue-recaptcha';

// Vue.use(Tawk, {
//   tawkSrc: "https://embed.tawk.to/604119c31c1c2a130d650057/1evv4p9bf",
// });

export default {
  name: "Login",
  data() {
    return {
      data: {
        body: {
          emailuser: "",
          // password: ''
        },
        rememberMe: false,
      },
      loading: false,
      isPwd: true,
      capsToolTip: false,
      sitekey: "6Lf7SIMaAAAAAK6t_5T5f79OisnZdZEFNi3dBcWH",
      robot: false,
      // visibleRecaptcha: true
    };
  },
  components: { VueRecaptcha },
  validations: {
    data: {
      body: {
        emailuser: {
          required,
          email,
        },
        // password: {
        //   required
        // }
      },
    },
  },
  beforeCreate() {
    // let value = LocalStorage.getItem('token')
    // console.log("Token - Login");
    // console.log(value);
    // if (LocalStorage.has("token") && LocalStorage.has("user")) {
    //   this.$router.push('/Dashboard')
    // }
    if (window.cordova && cordova.platformId !== "browser") {
      this.robot = true
      // this.visibleRecaptcha = false
    }
    if(this.$q.platform.is.mobile){
      this.robot = true
    }
  },
  created() {
    //if (this.$auth.check()) {
    //  this.$router.push('/Dashboard')
    //}
  },
  computed: {},
  methods: {
    login() {
      this.$v.data.$touch();
      if (!this.$v.data.$error && this.robot) {
        this.loading = true;

        this.$auth
          .recoverypassword({
            _email: this.data.body.emailuser,
            _codeapp: process.env.CODE_APP,
          })
          .then((res) => {
            // console.log(res);
            if (res.status !== 400) {
              this.$q.notify({
                type: "positive",
                message: res.message,
              });
            }else{
              this.$q.notify({
                type: "warning",
                message: res.data.message,
              });
            }

            // this.data.body.emailuser = ""
            // this.$router.push('/Dashboard')
          })
          .catch((error) => {
            // console.log(error)
            if (error.response) {
              this.$q.notify({
                type: "negative",
                message: error,
              });
              // console.log(error)
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    beforeDestroy() {},
    onSubmit: function () {
      this.$refs.invisibleRecaptcha.execute()
    },
    onVerify: function (response) {
      // console.log('Verify: ' + response)
      if (response) this.robot = true;
    },
    onExpired: function () {
      console.log('Expired')
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset() // Direct call reset method
    },
  },
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #234bcf 0%, #e5b2ca 100%);
}
</style>
