<template>
  <section id="subscribe" class="subscribe">
    <form class="subscribe__form" @submit.prevent="subscribeMailer">
      <div class="subscribe__form-title">
        {{ 'subscribe_title' | localize(locale) }}
      </div>
      <div class="subscribe__form-group">
        <div
          class="subscribe__form-input input"
          :class="{invalid: ($v.mail.$dirty && !$v.mail.required || $v.mail.$dirty && !$v.mail.email)}"
        >
          <label for="mail" class="subscribe__form-label input__label" :class="{isFocus: isFocus}">
            {{ 'subscribe_placeholder' | localize(locale) }}
          </label>

          <input
            id="mail"
            v-model="mail"
            type="text"
            class="subscribe__form-body input__body"
            @focus="isFocus = true"
            @input="alreadyMail = false"
            @blur="blurHandler"
          >

          <div v-if="$v.mail.$dirty && !$v.mail.required" class="subscribe__form-error">
            {{ 'field_required_field' | localize(locale) }}
          </div>
          <div v-else-if="$v.mail.$dirty && !$v.mail.email" class="subscribe__form-error">
            {{ 'field_email' | localize(locale) }}
          </div>

          <div v-if="alreadyMail" class="subscribe__form-error">
            {{ 'field_already_exists' | localize(locale) }}
          </div>
        </div>

        <button type="submit" class="subscribe__form-submit btn btn--green btn--lg1">
          {{ 'subscribe_action' | localize(locale) }}
        </button>
      </div>
    </form>
    <div class="subscribe__seed">
      <img src="~/static/image/product/bitmap.png" alt="">
    </div>

    <MailerModal :is-open="isOpen" :email="mail" class-name="mailer" @close="closeModal"/>
  </section>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'
import MailerModal from '@/components/modals/Mailer'

export default {
  name: 'Subscribe',
  components: {MailerModal},
  data: () => ({
    isFocus: false,
    mail: 'priymak615@gmail.com',
    alreadyMail: false,

    isOpen: false
  }),
  validations: {
    mail: {required, email}
  },
  created () {
    this.isFocus = !!this.mail
  },
  methods: {
    openModalHandler () {
      this.isOpen = true
      document.body.classList.add('lock-modal')
    },

    closeModal () {
      this.isOpen = false
      document.body.classList.remove('lock-modal')
    },

    blurHandler () {
      if (this.mail) { return }

      this.isFocus = false
    },
    async subscribeMailer () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      await this.$axios.$post('api/mailer/add', {email: this.mail})
        .then((res) => {
          if (res.ok) {
            this.openModalHandler()
          } else if (res.msg === 'Email уже добавлен!') {
            this.alreadyMail = true
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
