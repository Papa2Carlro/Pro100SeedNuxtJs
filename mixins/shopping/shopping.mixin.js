export default {
  computed: {
    isClose () {
      return this.$store.getters['product/getPanelState']
    },
    card () {
      return this.$store.getters['product/getCartProducts']
    },
    total () {
      return this.card.reduce((acc, product) => acc + (product.pack * product.price[this.currency]), 0)
    }
  },
  async created () {
    const products = await this.$store.getters['product/getProducts']

    if (products.length === 0) {
      await this.$store.dispatch('product/getProducts')

      const shopping = await this.$cookies.get('shopping') || []

      shopping.map((product) => {
        const obj = {id: product.id, pack: product.pack}

        try {
          this.$store.commit('product/addProductInCard', obj)
        } catch (err) {
          this.$cookies.remove('shopping')
        }
      })
    }
  },
  methods: {
    resetPanelHandler () {
      this.openPanel = false
      this.finallyPanel = false
      this.panelType = ''

      this.notFoundCoupon = false
      this.notFoundCouponDbl = false

      this.panelTitle = ''

      this.shipping = 0
      this.couponSale = 0
      this.bodyPosition = 0

      this.shippingType = ''
      this.activeFilterCard = 'debit_card'
      this.shipping = {usd: 0, uah: 0}

      this.filtersCard.map(item => item.isActive = item.id === 'debit_card')

      this.header.map((item) => {
        item.isActive = item.id === 1
        item.isPassed = false
      })
    },
    closePanelHandler () {
      this.isAnimate = true

      setTimeout(() => {
        document.body.classList.remove('lock')
        this.$store.commit('product/closePanel')

        this.resetPanelHandler()

        this.isAnimate = false
      }, 300)
    },
    async removeProductHandler (id) {
      const shoppingCookie = await this.$cookies.get('shopping')

      this.$store.commit('product/removeFromCard', id)

      const result = shoppingCookie.filter(product => product.id !== id)
      this.$cookies.remove('shopping')
      this.$cookies.set('shopping', result)
    },
    async packMinusHandler (id) {
      const shoppingCookie = await this.$cookies.get('shopping')

      this.$store.commit('product/packMinusFromCard', id)

      shoppingCookie.map((product) => {
        if (product.id === id) {
          if (product.pack !== 1) { product.pack-- }
        }
      })

      this.$cookies.remove('shopping')
      this.$cookies.set('shopping', shoppingCookie)
    },
    async packPlusHandler (id) {
      const shoppingCookie = await this.$cookies.get('shopping')

      this.$store.commit('product/packPlusFromCard', id)

      shoppingCookie.map((product) => {
        if (product.id === id) { product.pack++ }
      })

      this.$cookies.remove('shopping')
      this.$cookies.set('shopping', shoppingCookie)
    }
  }
}
