<template>
  <article class="faq__list-item" :class="{isOpen}">
    <div class="faq__list-header">
      <div class="faq__list-num">
        {{ index + 1 >= 10 ? index + 1 : `0${index + 1}` }}
      </div>

      <div class="faq__list-title">
        {{ title }}
      </div>
    </div>

    <div class="faq__list-open" @click="isOpen = !isOpen"/>

    <div :style="`--height: ${height}px`" class="faq__list-text">
      <div ref="text" v-html="body[locale]"/>
    </div>
  </article>
</template>

<script>
export default {
  name: 'FaqItem',
  props: [
    'title', 'text', 'index', 'body'
  ],
  data: () => ({
    isOpen: false,
    height: 0
  }),
  mounted () {
    this.height = this.$refs.text.offsetHeight
  }
}
</script>
