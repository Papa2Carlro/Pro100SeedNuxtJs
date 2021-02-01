<template>
  <div class="ref__wrapper">
    <Loader v-if="loader" color="#272831"/>

    <div v-else class="ref__contact">
      <SectionHeader :title="'referral_contact_title' | localize(locale)">
        {{ 'referral_contact_text' | localize(locale) }}
      </SectionHeader>

      <form class="ref__contact-form" @submit.prevent="submitHandler">
        <div class="ref__contact-group">
          <label class="ref__contact-label" for="firstName">
            {{ 'referral_nickname' | localize(locale) }}
          </label>

          <input
            id="firstName"
            v-model="nickname"
            class="ref__contact-input"
            type="text"
            :class="{invalid: $v.nickname.$dirty && !$v.nickname.required}"
          >

          <div v-if="$v.nickname.$dirty && !$v.nickname.required" class="sign__body-error">
            {{ 'field_required_field' | localize(locale) }}
          </div>
        </div>

        <div class="ref__contact-group">
          <label class="ref__contact-label" for="email">
            {{ 'referral_email' | localize(locale) }}
          </label>

          <input id="email" v-model="email" readonly class="ref__contact-input" type="text">
        </div>

        <div class="ref__contact-group">
          <label class="ref__contact-label" for="city">
            {{ 'referral_city' | localize(locale) }}
          </label>

          <input
            id="city"
            v-model="city"
            class="ref__contact-input"
            type="text"
            :class="{invalid: $v.city.$dirty && !$v.city.required}"
          >

          <div v-if="$v.city.$dirty && !$v.city.required" class="sign__body-error">
            {{ 'field_required_field' | localize(locale) }}
          </div>
        </div>

        <div class="ref__contact-group">
          <label class="ref__contact-label" for="phone">
            {{ 'referral_phone' | localize(locale) }}
          </label>

          <input
            id="phone"
            v-model="phone"
            class="ref__contact-input"
            type="text"
            :class="{invalid: $v.phone.$dirty && !$v.phone.required}"
          >

          <div v-if="$v.phone.$dirty && !$v.phone.required" class="sign__body-error">
            {{ 'field_required_field' | localize(locale) }}
          </div>
        </div>

        <div class="ref__contact-group">
          <label class="ref__contact-label" for="password">
            {{ 'referral_password' | localize(locale) }}
          </label>

          <input
            id="password"
            v-model="password"
            class="ref__contact-input"
            type="password"
            :class="{invalid: errorPasswordRequired || errorPasswordMin || errorPasswordMsg}"
            @input="resetErrorHandler"
          >

          <div v-if="errorPasswordRequired" class="sign__body-error">
            {{ 'field_required_field' | localize(locale) }}
          </div>
          <div v-else-if="errorPasswordMin" class="sign__body-error">
            {{ 'field_min_length' | localize(locale) }} {{ $v.password.$params.minLength.min }}
          </div>
          <div v-else-if="errorPasswordMsg" class="sign__body-error">
            {{ passwordMsg }}
          </div>
        </div>

        <div class="ref__contact-change btn btn--default btn--default-green btn--fluid2" @click="changeHandler">
          {{ 'referral_contact_change' | localize(locale) }}
        </div>

        <button type="submit" class="ref__contact-save btn btn--green btn--fluid1">
          {{ 'referral_contact_save' | localize(locale) }}
        </button>
        <div/>

        <div class="ref__contact-logout btn--md2" @click="logoutHandler">
          {{ 'referral_contact_sign_out' | localize(locale) }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import SectionHeader from '@/components/ui/SectionHeader'

import {required} from 'vuelidate/lib/validators'

import Middleware from '~/middleware/referral'

export default {
  name: 'ReferralContact',
  components: {SectionHeader, Loader},
  layout: 'referral',
  middleware: [Middleware],
  data: () => ({
    loader: true,

    user: {},
    errorPasswordRequired: false,
    errorPasswordMin: false,
    errorPasswordMsg: false,
    passwordMsg: '',

    // Form Data
    nickname: '',
    city: '',
    email: '',
    phone: '',
    password: ''
  }),
  validations: {
    nickname: {required},
    city: {required},
    phone: {required}
  },
  async created () {
    const user = await this.$cookies.get('referral')

    if (!this.$store.getters['user/getUser'].nickname) {
      await this.$store.dispatch('user/getUser')
    }

    if (this.$store.getters['user/getUser'].email !== user.email) {
      await this.$store.dispatch('user/getUser')
    }

    this.user = await this.$store.getters['user/getUser']
    await this.setData()

    this.loader = false
  },
  methods: {
    setData () {
      this.nickname = this.user.nickname
      this.city = this.user.city
      this.email = this.user.email
      this.phone = this.user.phone
    },
    resetErrorHandler () {
      this.errorPasswordMsg = false
      this.errorPasswordMin = false
      this.errorPasswordRequired = false
    },
    submitHandler () {
      if (this.$v.$invalid || this.errorEmail) {
        this.$v.$touch()
        return
      }

      const formData = {
        nickname: this.nickname,
        city: this.city,
        phone: this.phone
      }

      this.$axios.$put(`/api/users/edit/${this.user._id}`, formData).catch(err => console.log(err))
    },
    changeHandler () {
      if (!this.password) {
        this.errorPasswordRequired = true
        return
      }

      if (this.password.length < 8) {
        this.errorPasswordMin = true
        return
      }

      this.$axios.$put(`/api/users/password/${this.user._id}`, {password: this.password})
        .then((res) => {
          if (!res.ok) {
            this.errorPasswordMsg = true
            this.passwordMsg = res.msg
          }
        }).catch(err => console.log(err))
    },
    logoutHandler () {
      this.$cookies.remove('referral')
      this.$router.push('/')
    }
  }
}
</script>
