/* eslint-disable */
import axios from "@/plugins/axios"

export const state = () => ({
  stores: {
    country: [],
    list: []
  }
})

export const mutations = {
  setStores(state, stores) {
    state.stores.list = stores
  },
  setCountry(state) {
    if (state.stores.country.length > 0) {
      return
    }

    const country = []

    state.stores.list.map(item => country.push(item.country))
    const filterCountry = [...new Set(country)]

    filterCountry.map(label => state.stores.country.push(label))
  }
}

export const actions = {
 async getAllStores({commit}) {
    await this.$axios.$get('/api/store')
      .then(res => {
        if (res.ok) {
          commit('setStores', res.body)
          commit('setCountry')
        } else {
          console.log(res)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const getters = {
  getAllStores(state) {
    return state.stores
  }
}
