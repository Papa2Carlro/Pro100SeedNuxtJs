<template>
  <aside class="aside" :class="className">
    <nav class="aside__navigation">
      <ul class="aside__list">
        <li v-for="menu in links" :key="menu.label" class="aside__list-item">
          <nuxt-link :to="`${link}/${menu.url || menu.label.toLowerCase().split(' ').join('-')}`" class="aside__list-link" active-class="isActive">
            <span class="active-marker" /><span v-if="nolocalize">{{ menu.label }}</span><span v-else>{{ menu.label | localize(locale) }}</span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: [
    'links', 'className', 'link', 'nolocalize'
  ]
}
</script>
