<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="143px" class="absolute-center shadow-10" color="white">
              <!-- <img src="profile_padre.svg" /> -->
              <lottie-player src="animation_llyjxjg0.json"  background="#FFFFFF"  speed="1"  style="width: 130px; height:130px;"  loop autoplay></lottie-player>
            </q-avatar>
          </q-card-section>
          <br/>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis text-teal">
                <q-icon name="dvr" /> Solvencia UNT
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-input
                filled
                v-model.trim="data.body.username"
                :label="this.$t('labels.user')"
                lazy-rules
                mask="########"
                clearable
                :error="this.$v.data.body.username.$error"
                required
                autofocus
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>

              <q-input
                :type="isPwd ? 'password' : 'text'"
                filled
                v-model="data.body.password"
                :label="this.$t('labels.password')"
                lazy-rules
                clearable
                :error="$v.data.body.password.$error"
                required
                @keyup.enter="login"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
              </q-input>

              <div class="row justify-center">
                <q-btn
                  icon-right="login"
                  :label="this.$t('buttons.login')"
                  :loading="loading"
                  @click="login"
                  type="button"
                  color="primary"
                >
                  <span slot="loading">
                    <q-spinner-hourglass class="on-left" /> Accediendo...
                  </span>
                </q-btn>
              </div>
              <q-card-actions align="right">
                <q-btn to="/recoverypassword" flat dense label="Recuperar contraseña?" class="text-capitalize" color="blue"></q-btn>
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

import Vue from "vue";
import Vuex from 'vuex'
// import LottiePlayer from 'lottie-player-vue';

export default {
  name: "Login",
  components: {
      // LottiePlayer
  },
  data() {
    return {
      data: {
        body: {
          username: "",
          password: "",
        },
        rememberMe: false,
      },
      loading: false,
      isPwd: true,
      capsToolTip: false,
    };
  },
  validations: {
    data: {
      body: {
        username: {
          required,
          numeric,
        },
        password: {
          required,
        },
      },
    },
  },
  beforeCreate() {
    let value = LocalStorage.getItem('token')

    if(this.$q.cookies.has('token')){
      LocalStorage.set("token", this.$q.cookies.get('token'));
      LocalStorage.set("user", this.$q.cookies.get('user'));
    }
    
    if (LocalStorage.has("token") && LocalStorage.has("user")) {
      this.$router.push('/Dashboard')
    }
  },
  created() {   
    // this.$oneSignal.setup(process.env.ONESIGNAL_APP_ID)
  },
  computed: {},
  methods: {
    login() {
      this.$v.data.$touch();
      if (!this.$v.data.$error) {
        this.loading = true;
        this.$auth.loginv2({
            username: this.data.body.username,
            password: this.data.body.password,
            rememberMe: this.data.rememberMe
          })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("messages.login"),
            });

            // try{              

            //   if (LocalStorage.has("token") && LocalStorage.has("user")) {
            //     const user = LocalStorage.getItem("user")
            //     this.$oneSignal.optIn(user.usu_id)              
            //   }
            // }catch(ex){
            //   console.log(ex)
            // }

            this.$router.push("/Dashboard");
          })
          .catch((error) => {
            if (error.response) {
              this.$q.notify({
                type: "negative",
                message: this.$t("errors.login"),
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
  },
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #0e5f8f 0%, #41cbcf 100%);
}
</style>
