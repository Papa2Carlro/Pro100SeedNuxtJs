<template>
  <ul class="ref__m-aside">
    <li v-for="link in links" :key="link.url" class="ref__m-aside-item">
      <nuxt-link class="ref__m-aside-link" :to="`/information/${link.url}`" active-class="isActive">
        {{ link.label | localize(locale) }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MSidebar',
  props: [
    'links', 'className', 'link'
  ]
}
</script>
