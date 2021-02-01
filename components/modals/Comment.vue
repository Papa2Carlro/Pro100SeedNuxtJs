<template>
  <ModalWrapper :is-open="isOpen" :class-name="className" @close="closeModalHandler">
    s
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '@/components/ui/Modal'

export default {
  name: 'MailerModal',
  components: {ModalWrapper},
  props: ['isOpen', 'className'],
  methods: {
    closeModalHandler () {
      this.$emit('close')
    },

    addComments () {
      this.$emit('add')
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
