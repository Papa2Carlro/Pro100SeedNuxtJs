<template>
  <div class="index">
    <Header />

    <Nuxt />

    <ShoppingCard/>

    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer'
import ShoppingCard from '~/components/ShoppingCard/ShoppingCard'

export default {
  components: {ShoppingCard, Footer}
}
</script>
