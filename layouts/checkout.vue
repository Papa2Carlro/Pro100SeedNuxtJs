<template>
  <section class="checkout">
    <Nuxt/>
  </section>
</template>

<script>
import Middleware from '@/middleware/shopping'

export default {
  name: 'Checkout',
  middleware: [Middleware],
  computed: {
    card () {
      const products = this.$store.getters['product/getCartProducts']

      // eslint-disable-next-line vue/no-async-in-computed-properties
      setTimeout(() => {
        if (products.length === 0) {
          this.$router.push('/')
        }
      }, 100)

      return products
    }
  }
}
</script>
