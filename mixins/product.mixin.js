export default {
  data: () => ({
    favorite: false
  }),
  methods: {
    async addCart (id, pack = 1) {
      await this.$store.commit('product/openPanel')
      document.body.classList.add('lock')

      await this.$store.commit('product/addProductInCard', {id, pack})

      const shopping = await this.$cookies.get('shopping') || []
      const product = shopping.filter(product => product.id === id)

      if (shopping.length > 0) { this.$cookies.remove('shopping') }

      if (product.length > 0) {
        shopping.map((product) => {
          if (product.id === id) { product.pack = pack === 1 ? product.pack + 1 : pack }
        })
      } else {
        shopping.push({id, pack})
      }

      this.$cookies.set('shopping', shopping, {path: '/', maxAge: 60 * 60 * 24 * 7})
    },
    async addFavorite (id) {
      const favorite = await this.$cookies.get('favorite') || []

      this.$cookies.remove('favorite')
      const [double] = favorite.filter(x => x === id)
      if (!double) { favorite.push(id) }

      this.$cookies.set('favorite', favorite)
      this.$store.commit('product/addFavorite', id)

      this.favorite = true
    }
  }
}
