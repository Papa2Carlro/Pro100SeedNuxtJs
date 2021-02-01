<template>
  <section class="back-call" :class="{isOpen}">
    <div class="back-call-btn" @click="openModalHandler">
      <img src="~/static/image/phone-contact.svg">
    </div>

    <BackCallModal :is-open="isOpen" class-name="back-call" @close="closeModal"/>
  </section>
</template>

<script>
import localize from '@/filters/localize.filter'
import BackCallModal from '@/components/modals/BackCallModal'

export default {
  name: 'BackCall',
  components: {BackCallModal},
  filters: {localize},
  data: () => ({
    phone: '',
    isOpen: false
  }),
  methods: {
    openModalHandler () {
      this.isOpen = true
      document.body.classList.add('lock-modal')
    },

    closeModal () {
      this.isOpen = false
      document.body.classList.remove('lock-modal')
    }
  }
}
</script>
