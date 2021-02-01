export default {
  data: () => ({
    product: [],
    filterProducts: [],

    fem: [],
    searchList: [],
    height: [],
    power: [],
    variety: [],
    place: [],
    exclusive: [],
    geneticsList: [],
    tasteList: [],
    effectList: [],

    geneticsFilter: [],
    tasteFilter: [],
    effectFilter: []
  }),
  watch: {
    geneticsFilter () {
      this.geneticsList = []
      this.geneticsFilter.map(item => this.searchProduct(item))
    },
    tasteFilter () {
      this.tasteList = []
      this.tasteFilter.map(item => this.searchProduct(item))
    },
    effectFilter () {
      this.effectList = []
      this.effectFilter.map(item => this.searchProduct(item))
    }
  },
  mounted () {
    this.product = this.$store.getters['product/getProducts']
  },
  methods: {
    async  filterProduct () {
      const filter = await this.$store.getters['filters/getFilterBody']

      await filter.map(item => this.searchProduct(item))
      this.showResultHandler()
    },

    searchProduct (item) {
      switch (item.type) {
        case 'search':
          this.searchList = this.product.filter(product => product.name.toLowerCase().includes(item.value.toLowerCase()))
          this.showResultHandler()
          break
        case 'fem':
          this.product.map((product) => { if (product.general.fem === item.value) { this.fem.push(product) } })
          break
        case 'height':
          this.product.map((product) => { if (product.general.height.filter === item.value) { this.height.push(product) } })
          break
        case 'power':
          this.product.map((product) => { if (product.general.power === item.value) { this.power.push(product) } })
          break
        case 'variety':
          this.product.map((product) => { if (product.general.variety === item.value) { this.variety.push(product) } })
          break
        case 'place':
          this.product.map((product) => { if (product.general.place === item.value) { this.place.push(product) } })
          break
        case 'exclusive':
          this.product.map((product) => { if (product.general.exclusive) { this.exclusive.push(product) } })
          break
        case 'genetics':
          this.product.map((products) => {
            if (products.general.genetics === item.value) {
              const [product] = this.geneticsList.filter(item => item.name === products.name)
              if (!product) { this.geneticsList.push(products) }
              this.showResultHandler()
            }
          })
          break
        case 'taste':
          this.product.map((products) => {
            products.general.taste.map((tastes) => {
              if (tastes === item.value) {
                const [product] = this.tasteList.filter(item => item.name === products.name)
                if (!product) { this.tasteList.push(products) }
                this.showResultHandler()
              }
            })
          })
          break
        case 'effect':
          this.product.map((products) => {
            if (products.general.effect === item.value) {
              products.general.effect.map((tastes) => {
                if (tastes === item.value) {
                  const [product] = this.effectList.filter(item => item.name === products.name)
                  if (!product) { this.effectList.push(products) }
                  this.showResultHandler()
                }
              })
            }
          })
          break
      }
    },

    deleteFilter (item) {
      switch (item.type) {
        case 'genetics':
          this.result = this.result.filter(product => product.general.genetics !== item.value)
          this.addFilterProduct()
          break
        case 'taste':
          this.result = this.result.filter(product => product.general.taste !== item.value)
          this.addFilterProduct()
          break
        case 'effect':
          this.result = this.result.filter(product => product.general.effect !== item.value)
          this.addFilterProduct()
          break
      }
    },

    addFilterProduct () {
      this.geneticsFilter.map(item => this.searchProduct(item))
      this.tasteFilter.map(item => this.searchProduct(item))
      this.effectFilter.map(item => this.searchProduct(item))
    },

    showResultHandler () {
      this.result = []
      const filters = [
        ...this.fem,
        ...this.height,
        ...this.power,
        ...this.variety,
        ...this.exclusive,
        ...this.geneticsList,
        ...this.tasteList,
        ...this.effectList,
        ...this.searchList,
        ...this.place
      ]
      const result = []

      for (let product of filters) {
        const [items] = result.filter(products => products._id === product._id)

        if (!items) {
          result.push(product)
        }
      }

      this.result = this.filterProducts = result
    }
  }
}
