export default {
  data: () => ({
    shippingType: '',

    shippingList: []
  }),
  async created () {
    await this.$axios.$get('/api/shipping')
      .then((res) => {
        if (res.ok) { this.shippingList = res.body }
      })
      .catch(err => console.log(err))
  },
  watch: {
    shippingType () {
      if (this.shippingType) {
        const [shipping] = this.shippingList.filter(item => item.title === this.shippingType)
        this.shipping = shipping.price
      }
    }
  }
}
