/* eslint-disable */
export const state = () => ({
  products: [],
  topProduct: [],
  product: {},
  comparison: [],
  favorite: [],

  // Shopping Card
  isClose: true,
  card: [],

  // Checkout
  checkInfo: {},

  // Search
  search: [],
})

export const mutations = {
  setAllProduct(state, body) {
    state.products = body
  },
  setTopProduct(state) {
    function compare(a, b) {
      if (a.popularity > b.popularity) return -1;
      if (b.popularity > a.popularity) return 1;

      return 0;
    }

    state.topProduct = state.products.sort(compare).slice(0, 6)
  },
  setProduct(state, title) {
    const [product] = state.products.filter(x => x.name.toLowerCase() === title.split('-').join(' '))

    state.product = product
  },
  addComparison(state, id) {
    const [product] = state.products.filter(x => x._id === id)
    const [comparison] = state.comparison.filter(x => x._id === id)

    if (!comparison) {
      state.comparison.push(product)
    }
  },
  addFavorite(state, id) {
    const [product] = state.products.filter(x => x._id === id)
    const [favorite] = state.favorite.filter(x => x._id === id)

    if (!favorite) {
      state.favorite.push(product)
    }
  },
  removeComparison(state, id) {
    state.comparison = state.comparison.filter(x => x._id !== id)
  },
  removeFavorite(state, id) {
    state.favorite = state.favorite.filter(x => x._id !== id)
  },

  clearCard (state) {
    state.card = []
  },

  // Shopping Card
  openPanel(state) {
    state.isClose = false
  },
  closePanel(state) {
    state.isClose = true
  },
  addProductInCard(state, {id, pack}) {
    const [product] = state.products.filter(product => product._id === id)
    const shopping = state.card.filter(product => product.id === id)

    if (shopping.length > 0) {
      state.card.map(product => {
        if (product.id === id) {
          product.pack = pack === 1 ? product.pack + 1 : pack
        }
      })
      return
    }

    const obj = {
      id,
      pack,
      price: product.newPrice.uah ? product.newPrice : product.price,
      name: product.name,
      thumb: product.pictures[0]
    }

    state.card.unshift(obj)
  },
  removeFromCard(state, id) {
    state.card = state.card.filter(product => product.id !== id)
  },
  packMinusFromCard(state, id) {
    state.card.map(product => {
      if (product.id === id) {
        if (product.pack !== 1) { product.pack-- }
      }
    })
  },
  packPlusFromCard(state, id) {
    state.card.map(product => {
      if (product.id === id) { product.pack++ }
    })
  },

  // Checkout
  setCheckInfo(state, {info, type}) {
    state.checkInfo = {info, type}
  },
  setCheckoutProduct(state) {
    state.checkInfo.push(state.card)
  },

  // Search
  setSearchResult(state, title) {
    state.search = state.products.filter(product => product.name.toLowerCase().includes(title.toLowerCase()))
  },
}

export const actions = {
  async getProducts({commit}) {
    await this.$axios.get('/api/products/visible')
      .then(res => {
        if (res.data.ok) {

          commit('setAllProduct', res.data.body)
          commit('setTopProduct')
        } else {
          console.log(res.data.msg)
        }
      })
      .catch(err => console.log(err))
  }
}

export const getters = {
  getProducts(state) {
    return state.products
  },
  getSellProducts(state) {
    return state.products.filter(product => product.newPrice.uah)
  },
  getProduct(state) {
    return state.product
  },
  getTopProduct(state) {
    return state.topProduct
  },
  getComparisons(state) {
    return state.comparison
  },
  getFavorite(state) {
    return state.favorite
  },

  // Search
  getSearchResult(state) {
    return state.search
  },

  // Shopping Card
  getPanelState(state) {
    return state.isClose
  },
  getCartProducts(state) {
    return state.card
  },

  // Checkout
  getCheckout(state) {
    return state.checkInfo
  }
}
