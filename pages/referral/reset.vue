<template>
  <div>
    <Loader v-if="loader" color="#272831"/>

    <section class="reset">
      <form class="reset__body" @submit.prevent="submitHandler">
        <div class="reset__body-title">
          {{ 'referral_reset_title' | localize(locale) }}
        </div>

        <div class="reset__body-group">
          <input
            v-model.trim="email"
            class="sign__body-input"
            type="text"
            :placeholder="'referral_email' | localize(locale)"
            :class="{invalid: ($v.email.$dirty && !$v.email.required || $v.email.$dirty && !$v.email.email || errorEmail)}"
            @input="errorEmail = ''"
          >

          <div v-if="$v.email.$dirty && !$v.email.required" class="sign__body-error">
            {{ 'field_required_field' | localize(locale) }}
          </div>
          <div v-else-if="$v.email.$dirty && !$v.email.email" class="sign__body-error">
            {{ 'field_email' | localize(locale) }}
          </div>
          <div v-else-if="errorEmail" class="sign__body-error">
            {{ errorEmail }}
          </div>
        </div>

        <button type="submit" class="reset__body-btn btn btn--green btn--fluid1">
          {{ 'referral_reset' | localize(locale) }}
        </button>

        <div class="reset__body-helper">
          {{ 'referral_return' | localize(locale) }}

          <nuxt-link to="/referral/sign-up">
            {{ 'referral_sign_up' | localize(locale) }}
          </nuxt-link>
        </div>
      </form>

      <div class="reset__bg">
        <img src="~/static/image/bg/bg-1.png" alt="">
      </div>

      <FollowUs/>
    </section>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import FollowUs from '@/components/ui/FollowUs'

import {required, email} from 'vuelidate/lib/validators'
import Middleware from '~/middleware/auth'

export default {
  name: 'ResetPassword',
  components: {FollowUs, Loader},
  middleware: [Middleware],
  data: () => ({
    loader: true,

    email: 'priymak615@gmail.com',

    errorEmail: ''
  }),
  validations: {
    email: {required, email}
  },
  mounted () {
    this.loader = false
  },
  methods: {
    submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.$axios.$put('/api/users/password', {email: this.email})
        .then((res) => {
          if (res.ok) {
            this.$router.push('/referral/sign-in')
          } else {
            this.errorEmail = res.msg
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
