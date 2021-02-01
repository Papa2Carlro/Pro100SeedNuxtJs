<template>
  <div>
    <Loader v-if="loader" color="#282932"/>

    <div v-else id="product">
      <Product />

      <Story/>

      <BestProposition :products="products"/>

      <Subscribe/>
    </div>
  </div>
</template>

<script>
import Product from '@/components/product/Product'
import Story from '@/components/product/Story'
import BestProposition from '@/components/product/Best'
import Subscribe from '@/components/Subscribe'

import Loader from '~/components/ui/Loader'

export default {
  name: 'ProductBody',
  components: {
    Loader,
    // eslint-disable-next-line vue/no-unused-components
    Subscribe,
    BestProposition,
    Product,
    Story
  },
  async asyncData ({$http, params, error}) {
    try {
      const res = await $http.$get('/api/products/visible')

      if (res.ok) {
        const product = await res.body.filter((product) => {
          const productUrl = product.name.toLowerCase().split(' ').join('-')

          return params.title === productUrl
        })

        if (product.length === 0) { throw 'Not Found' }
      }
    } catch (err) {
      error({
        statusCode: 404,
        message: err
      })
    }
  },
  data: () => ({
    loader: false,
    products: [],
    product: {}
  }),
  async created () {
    const products = await this.$store.getters['product/getProducts']

    if (products.length === 0) {
      await this.getProducts()
    }

    this.products = await this.$store.getters['product/getTopProduct']
  },
  methods: {
    async getProducts () {
      await this.$store.dispatch('product/getProducts')
    }
  }
}
</script>
