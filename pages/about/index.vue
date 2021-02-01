<template>
  <div class="about">
    <History />

    <Store />

    <Subscribe />
  </div>
</template>

<script>
import Subscribe from '@/components/Subscribe'
import History from '@/components/about/History'
import Store from '@/components/about/Store'

export default {
  components: {
    Subscribe,
    Store,
    History
  }
}
</script>
