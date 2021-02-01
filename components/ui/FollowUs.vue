<template>
  <nuxt-link :to="`/${path}`" class="follow">
    {{ 'follow_us' | localize(locale) }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'FollowUs',
  computed: {
    path () {
      return this.$route.name === 'index' ? '?type=subscribe' : '#subscribe'
    }
  }
}
</script>
