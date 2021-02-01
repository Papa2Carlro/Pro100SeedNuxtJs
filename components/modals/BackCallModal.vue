<template>
  <ModalWrapper :is-open="isOpen" :class-name="className" @close="closeModalHandler">
    sd
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '@/components/ui/Modal'

export default {
  name: 'BackCallModal',
  components: {ModalWrapper},
  props: ['isOpen', 'className'],
  methods: {
    closeModalHandler () {
      this.$emit('close')
    }
  }
}
</script>
