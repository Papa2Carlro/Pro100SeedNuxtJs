export default {
  async created () {
    const products = await this.$store.getters['product/getProducts']

    if (products.length === 0) { await this.getProduct() }
    this.loader = false
  },
  methods: {
    async getProduct () {
      await this.$store.dispatch('product/getProducts')
    }
  }
}
