<template>
  <div class="home" :class="{isIndex: loader}">
    <Loader v-if="loader" color="#282932"/>

    <main v-else class="home__main">
      <HomeFirst/>

      <TopProduct/>

      <SearchSeeds/>

      <HomeNews/>

      <Contact/>

      <BackCall/>

      <Subscribe/>
    </main>
  </div>
</template>
<script>
import HomeFirst from '@/components/home/HomeFirst'
import TopProduct from '@/components/home/TopProduct'
import SearchSeeds from '@/components/home/SearchSeeds'
import Subscribe from '@/components/Subscribe'
import HomeNews from '@/components/home/HomeNews'
import Contact from '@/components/home/Contact'
import Loader from '@/components/ui/Loader'

import getProduct from '@/mixins/get-product.mixin'
import BackCall from '@/components/ui/BackСall'

export default {
  name: 'MainPage',
  components: {
    BackCall,
    Loader,
    Contact,
    HomeNews,
    Subscribe,
    SearchSeeds,
    TopProduct,
    HomeFirst
  },
  mixins: [getProduct],
  data: () => ({
    loader: true
  }),
  watch: {
    '$route.query' () {
      this.subscribe()
    }
  },
  methods: {
    subscribe () {
      if (this.$route.query.type === 'subscribe') {
        const subscribe = document.body.querySelector('.subscribe')

        if (subscribe) {
          subscribe.scrollIntoView({behavior: 'smooth'})
        }
      }
    }
  }
}
</script>
