<template>
  <div class="m-sidebar">
    <ul class="m-sidebar__list">
      <li v-for="menu in menus" :key="menu.label" class="m-sidebar__item">
        <nuxt-link :to="menu.url" class="m-sidebar-link" :class="{isActive: menu.isActive}">
          {{ menu.label }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data: () => ({
    menus: [
      {
        label: 'Science and Medicine',
        url: '/',
        isActive: true
      },
      {
        label: 'Directory of varieties',
        url: '/'
      },
      {
        label: 'The use of cannabis',
        url: '/'
      },
      {
        label: 'Tips for growing',
        url: '/'
      },
      {
        label: 'Law and Policy',
        url: '/'
      },
      {
        label: 'Legalization',
        url: '/'
      },
      {
        label: 'Cooking',
        url: '/'
      },
      {
        label: 'Humor',
        url: '/'
      },
      {
        label: 'Crime',
        url: '/'
      },
      {
        label: 'Video',
        url: '/'
      },
      {
        label: 'NEWS',
        url: '/'
      }
    ]
  })
}
</script>
