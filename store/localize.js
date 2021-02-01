/* eslint-disable */
export const state = () => ({
  locale: '',
  currency: ''
})

export const mutations = {
  setLocale(state, obj) {
    state.locale = obj.locale
    state.currency = obj.currency
  }
}

export const getters = {
  getLocale(state) {
    return state.locale
  },
  getCurrency(state) {
    return state.currency
  },
}
