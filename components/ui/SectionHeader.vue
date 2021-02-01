<template>
  <div class="home__header">
    <div class="home__header-title" v-html="title"/>

    <div class="home__header-description">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: ['title']
}
</script>
