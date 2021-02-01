<template>
  <section class="dialog" :class="{isOpen}" @click.self="closeModalHandler">
    <div class="dialog__content" :class="`dialog__content--${className}`">
      <slot/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ModalWrapper',
  props: ['isOpen', 'className'],
  methods: {
    closeModalHandler () {
      this.$emit('close')
    }
  }
}
</script>
