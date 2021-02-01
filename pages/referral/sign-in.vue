<template>
  <div>
    <Loader v-if="loader" color="#272831" />

    <section v-else class="sign">
      <form class="sign__body" @submit.prevent="submitHandler">
        <div class="sign__body-title">
          {{ 'referral_sign_in_title' | localize(locale) }}
        </div>

        <div class="sign__body-group">
          <input
            v-model.trim="login"
            class="sign__body-input"
            type="text"
            :placeholder="'referral_email' | localize(locale)"
            :class="{invalid: ($v.login.$dirty && !$v.login.required || $v.login.$dirty && !$v.login.email || errorEmail)}"
            @input="errorEmail = false"
          >

          <div v-if="$v.login.$dirty && !$v.login.required" class="sign__body-error">
            {{ 'field_required_field' | localize(locale) }}
          </div>
          <div v-else-if="$v.login.$dirty && !$v.login.email" class="sign__body-error">
            {{ 'field_email' | localize(locale) }}
          </div>
          <div v-else-if="errorEmail" class="sign__body-error">
            {{ 'field_email_not' | localize(locale) }}
          </div>
        </div>

        <div class="sign__body-group">
          <input
            v-model="password"
            class="sign__body-input"
            type="password"
            :placeholder="'referral_password' | localize(locale)"
            :class="{invalid: ($v.password.$dirty && !$v.password.required || $v.password.$dirty && !$v.password.minLength || errorPassword)}"
            @input="errorPassword = false"
          >

          <div v-if="$v.password.$dirty && !$v.password.required" class="sign__body-error">
            {{ 'field_required_field' | localize(locale) }}
          </div>
          <div v-if="$v.password.$dirty && !$v.password.minLength" class="sign__body-error">
            {{ 'field_min_length' | localize(locale) }} {{ $v.password.$params.minLength.min }}
          </div>
          <div v-if="errorPassword" class="sign__body-error">
            {{ 'field_password_wrong' | localize(locale) }}
          </div>
        </div>

        <nuxt-link class="sign__body-forgot" to="/referral/reset">
          {{ 'field_forgot' | localize(locale) }}
        </nuxt-link>

        <div v-if="statusError" class="sign__body-error pb-4">
          {{ statusError }}
        </div>

        <button type="submit" class="sign__body-btn btn btn--green btn--fluid1">
          {{ 'referral_sign_in_title' | localize(locale) }}
        </button>

        <div class="sign__body-social">
          <nuxt-link to="#" class="sign__body-link">
            <img src="~/static/image/referral/social/google.svg" alt="">
          </nuxt-link>

          <nuxt-link to="#" class="sign__body-link">
            <img src="~/static/image/referral/social/fb.svg" alt="">
          </nuxt-link>
        </div>

        <div v-if="statusError" class="sign__body-btn mt-2 btn btn--default btn--fluid1" @click="confirmEmailHandler">
          {{ 'referral_resend' | localize(locale) }}
        </div>

        <div class="sign__body-helper">
          {{ 'referral_dont_have' | localize(locale) }}

          <nuxt-link to="/referral/sign-up">
            {{ 'referral_sign_up' | localize(locale) }}
          </nuxt-link>
        </div>
      </form>

      <div class="sign__bg">
        <img src="~/static/image/bg/bg-1.png" alt="">
      </div>

      <FollowUs />
    </section>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import FollowUs from '@/components/ui/FollowUs'

import {required, minLength, email} from 'vuelidate/lib/validators'

import Middleware from '~/middleware/auth'

export default {
  name: 'SignIn',
  middleware: [Middleware],
  components: {FollowUs, Loader},
  data: () => ({
    loader: true,
    errorEmail: false,
    errorPassword: false,

    statusError: '',

    login: 'priymak615@gmail.com',
    password: 'vfrcbc12'
  }),
  mounted () {
    this.loader = false
  },
  validations: {
    login: {required, email},
    password: {required, minLength: minLength(8)}
  },
  methods: {
    confirmEmailHandler () {
      this.$axios.$put('api/users/confirm', {email: this.login})
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.login,
        password: this.password
      }

      if (this.$route.query.hash) {
        formData.hash = this.$route.query.hash
      }

      this.$axios.$post('/api/users/login', formData)
        .then((res) => {
          if (res.ok) {
            const cookieData = {
              email: this.login,
              _token: res.token
            }

            this.$cookies.remove('referral')
            this.$cookies.set('referral', cookieData, {
              path: '/',
              maxAge: 60 * 60 * 24 * 7
            })
            this.$router.push('/referral/link')
          } else if (res.msg.email) {
            this.errorEmail = true
          } else if (res.msg.password) {
            this.errorPassword = true
          } else if (res.msg.status) {
            this.statusError = res.msg.status
          } else {
            this.statusError = res.msg
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
