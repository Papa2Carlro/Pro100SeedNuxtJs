<template>
  <ModalWrapper :is-open="isOpen" :class-name="className" @close="closeModalHandler">
    <div class="dialog__header-mailer">
      <div class="dialog__header-title">
        {{ 'subscribe_modal_title' | localize(locale) }}
      </div>

      <div class="dialog__header-close" @click="closeModalHandler">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M21.3338 4.36311L20.061 3.09032L12 11.1513L3.93898 3.09032L2.66619 4.36311L10.7272 12.4241L3.09045 20.0609L4.36325 21.3337L12 13.6969L19.6368 21.3337L20.9095 20.0609L13.2728 12.4241L21.3338 4.36311Z" fill="white"/>
        </svg>
      </div>
    </div>

    <div class="dialog__body">
      <p>{{ 'subscribe_modal_succ' | localize(locale) }}</p>
      <p>{{ 'subscribe_modal_unsubscribe_text' | localize(locale) }}</p>
    </div>

    <div class="dialog__footer">
      <div class="dialog__footer-button btn btn--green btn--lg1" @click="unsubscribe">
        {{ 'subscribe_modal_unsubscribe' | localize(locale) }}
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '@/components/ui/Modal'

export default {
  name: 'MailerModal',
  components: {ModalWrapper},
  props: ['isOpen', 'className', 'email'],
  methods: {
    closeModalHandler () {
      this.$emit('close')
    },

    async unsubscribe () {
      await this.$axios.$delete(`/api/mailer/${this.email}`)
        .then((res) => {
          if (res.ok) { this.closeModalHandler() }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
