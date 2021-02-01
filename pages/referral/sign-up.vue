<template>
  <div>
    <Loader v-if="loader" color="#272831"/>

    <section v-else class="sign-up">
      <form class="sign-up__body" @submit.prevent="submitHandler">
        <div class="sign-up__body-title">
          {{ 'referral_create_account' | localize(locale) }}
        </div>

        <div class="sign-up__body-form">
          <div class="sign-in__body-group">
            <input
              v-model="nickname"
              class="sign-up__body-input"
              type="text"
              :placeholder="'referral_nickname' | localize(locale)"
              :class="{invalid: $v.nickname.$dirty && !$v.nickname.required}"
            >

            <div v-if="$v.nickname.$dirty && !$v.nickname.required" class="sign__body-error">
              {{ 'field_required_field' | localize(locale) }}
            </div>
          </div>

          <div class="sign-in__body-group">
            <input
              v-model="email"
              class="sign-up__body-input"
              type="text"
              :placeholder="'referral_email' | localize(locale)"
              :class="{invalid: ($v.email.$dirty && !$v.email.required || $v.email.$dirty && !$v.email.email || errorEmail)}"
              @input="errorEmail = false"
            >

            <div v-if="$v.email.$dirty && !$v.email.required" class="sign__body-error">
              {{ 'field_required_field' | localize(locale) }}
            </div>
            <div v-else-if="$v.email.$dirty && !$v.email.email" class="sign__body-error">
              {{ 'field_email' | localize(locale) }}
            </div>
            <div v-else-if="errorEmail" class="sign__body-error">
              {{ 'field_email_already' | localize(locale) }}
            </div>
          </div>

          <div class="sign-in__body-group">
            <input
              v-model="city"
              class="sign-up__body-input"
              type="text"
              :placeholder="'referral_city' | localize(locale)"
              :class="{invalid: $v.city.$dirty && !$v.city.required}"
            >

            <div v-if="$v.city.$dirty && !$v.city.required" class="sign__body-error">
              {{ 'field_required_field' | localize(locale) }}
            </div>
          </div>

          <div class="sign-in__body-group">
            <input
              v-model="phone"
              class="sign-up__body-input"
              type="text"
              :placeholder="'referral_phone' | localize(locale)"
              :class="{invalid: $v.phone.$dirty && !$v.phone.required}"
            >

            <div v-if="$v.phone.$dirty && !$v.phone.required" class="sign__body-error">
              {{ 'field_required_field' | localize(locale) }}
            </div>
          </div>

          <div class="sign-in__body-group">
            <input
              v-model="password"
              class="sign-up__body-input"
              type="password"
              :placeholder="'referral_password' | localize(locale)"
              :class="{invalid: ($v.password.$dirty && !$v.password.required || $v.password.$dirty && !$v.password.minLength)}"
              @input="errorPassword = false"
            >

            <div v-if="$v.password.$dirty && !$v.password.required" class="sign__body-error">
              {{ 'field_required_field' | localize(locale) }}
            </div>
            <div v-else-if="$v.password.$dirty && !$v.password.minLength" class="sign__body-error">
              {{ 'field_min_length' | localize(locale) }} {{ $v.password.$params.minLength.min }}
            </div>
          </div>

          <div class="sign-in__body-group">
            <input
              v-model="confirm_password"
              class="sign-up__body-input"
              type="password"
              :placeholder="'referral_password_confirm' | localize(locale)"
              :class="{invalid: ($v.password.$dirty && !$v.password.required || $v.password.$dirty && !$v.password.minLength) || errorPassword}"
              @input="errorPassword = false"
            >

            <div v-if="$v.password.$dirty && !$v.password.required" class="sign__body-error">
              {{ 'field_required_field' | localize(locale) }}
            </div>
            <div v-else-if="$v.password.$dirty && !$v.password.minLength" class="sign__body-error">
              {{ 'field_min_length' | localize(locale) }} {{ $v.password.$params.minLength.min }}
            </div>
            <div v-else-if="errorPassword" class="sign__body-error">
              {{ 'field_password' | localize(locale) }}
            </div>
          </div>
        </div>

        <div class="sign-up__body-checkbox" :class="{invalid: errorAge}">
          <input id="age" v-model="age" type="checkbox" @input="errorAge = false">
          <label for="age">{{ 'referral_18' | localize(locale) }}</label>
        </div>

        <div class="sign-up__body-actions">
          <button type="submit" class="sign-up__body-btn btn btn--green">
            {{ 'referral_create_an_account' | localize(locale) }}
          </button>

          <a href="#" class="sign-up__body-social white">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.64863 18.1293L5.60438 22.0277L1.78764 22.1084C0.646992 19.9928 0 17.5722 0 14.9999C0 12.5126 0.604922 10.1669 1.67719 8.10156H1.67801L5.07598 8.72453L6.56449 12.1021C6.25295 13.0104 6.08314 13.9854 6.08314 14.9999C6.08326 16.101 6.28271 17.156 6.64863 18.1293Z"
                fill="#FBBB00"
              />
              <path
                d="M29.7363 12.1992C29.9085 13.1066 29.9984 14.0437 29.9984 15.0014C29.9984 16.0753 29.8855 17.1229 29.6704 18.1333C28.9402 21.5718 27.0322 24.5742 24.3891 26.6989L24.3882 26.6981L20.1083 26.4797L19.5026 22.6984C21.2564 21.6698 22.627 20.0602 23.349 18.1333H15.3281V12.1992H23.466H29.7363Z"
                fill="#518EF8"
              />
              <path
                d="M24.3912 26.6962L24.3921 26.697C21.8215 28.7632 18.5561 29.9995 15.0014 29.9995C9.28906 29.9995 4.3226 26.8066 1.78906 22.108L6.65006 18.1289C7.9168 21.5096 11.1781 23.9163 15.0014 23.9163C16.6448 23.9163 18.1844 23.472 19.5055 22.6965L24.3912 26.6962Z"
                fill="#28B446"
              />
              <path
                d="M24.577 3.45328L19.7176 7.43156C18.3503 6.57691 16.7341 6.0832 15.0025 6.0832C11.0926 6.0832 7.77033 8.60021 6.56705 12.1022L1.68051 8.10164H1.67969C4.17613 3.28846 9.20524 0 15.0025 0C18.6421 0 21.9791 1.29645 24.577 3.45328Z"
                fill="#F14336"
              />
            </svg>
          </a>
          <a href="#" class="sign-up__body-social blue">
            <svg width="14" height="30" viewBox="0 0 14 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.02603 5.81006V9.94044H0V14.9912H3.02603V30H9.2421V14.9915H13.4135C13.4135 14.9915 13.8042 12.5698 13.9935 9.92178H9.26577V6.46841C9.26577 5.9524 9.94344 5.25806 10.6135 5.25806H14.0002V1.64826e-08H9.39544C2.87237 -0.000333321 3.02603 5.05539 3.02603 5.81006Z"
                fill="white"
              />
            </svg>
          </a>
        </div>

        <div class="sign-up__body-terms">
          {{ 'referral_terms' | localize(locale) }}
          <nuxt-link to="/information/term-of-use">
            {{ 'referral_terms_link' | localize(locale) }}
          </nuxt-link>
        </div>

        <div class="sign-up__body-sign">
          {{ 'referral_already' | localize(locale) }}
          <nuxt-link to="/referral/sign-in">
            {{ 'referral_already_link' | localize(locale) }}
          </nuxt-link>
        </div>
      </form>

      <div class="sign-up__bg">
        <img src="~/static/image/bg/bg-1.png" alt="">
      </div>

      <FollowUs/>
    </section>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import FollowUs from '@/components/ui/FollowUs'
import {required, email, minLength} from 'vuelidate/lib/validators'

import Middleware from '~/middleware/auth'

export default {
  name: 'SignIn',
  components: {FollowUs, Loader},
  middleware: [Middleware],
  data: () => ({
    loader: true,
    errorPassword: false,
    errorAge: false,
    errorEmail: false,

    // Form Data
    nickname: 'Max',
    city: 'Odessa',
    email: 'priymak615@gmail.com',
    phone: '+380677126286',

    password: 'vfrcbc12',
    confirm_password: 'vfrcbc12',
    age: false
  }),
  validations: {
    nickname: {required},
    city: {required},
    phone: {required},
    email: {required, email},
    password: {required, minLength: minLength(8)},
    confirm_password: {required, minLength: minLength(8)}
  },
  mounted () {
    this.loader = false
  },
  methods: {
    submitHandler () {
      if (this.password !== this.confirm_password) {
        this.errorPassword = true
      }
      if (!this.age) {
        this.errorAge = true
      }

      if (this.$v.$invalid || this.errorEmail || this.errorAge || this.errorPassword) {
        this.$v.$touch()
        return
      }

      const formData = {
        nickname: this.nickname,
        city: this.city,
        email: this.email,
        phone: this.phone,
        password: this.password,
        refer: this.$route.query.ref
      }

      this.$axios.$post('/api/users/create', formData)
        .then((res) => {
          if (res.ok) {
            this.$router.push('/referral/link')
          } else if (res.msg.email) {
            this.errorEmail = true
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
