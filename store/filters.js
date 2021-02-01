/* eslint-disable */
export const state = () => ({
  genetics: [],
  taste: [],
  effect: [],

  activeGenetics: [],
  activeTaste: [],
  activeEffect: [],

  filterBody: []
})

export const mutations = {
  setGenetics(state, filters) {
    state.genetics = filters
  },
  setTaste(state, filters) {
    state.taste = filters
  },
  setEffect(state, filters) {
    state.effect = filters
  },
  setFilterBody(state, body) {
    state.filterBody = body
  },
  setActiveFilter(state, [genetic, taste, effect]) {
    state.activeGenetics = genetic
    state.activeTaste = taste
    state.activeEffect = effect
  }
}

export const actions = {
  async gettersGenetics({commit}) {
    await this.$axios.$get('/api/filters/genetics')
      .then(res => {
        if (res.ok) {
          commit('setGenetics', res.body)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  async gettersTaste({commit}) {
    await this.$axios.$get('/api/filters/tastes')
      .then(res => {
        if (res.ok) {
          commit('setTaste', res.body)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  async gettersEffect({commit}) {
    await this.$axios.$get('/api/filters/effects')
      .then(res => {
        if (res.ok) {
          commit('setEffect', res.body)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const getters = {
  getGenetics(state) {
    return state.genetics
  },
  getFilterBody (state) {
    return state.filterBody
  },
  getOtherFilters(state) {
    return {
      taste: state.taste,
      effect: state.effect
    }
  },
  getActiveFilter(state) {
    return [
      state.activeGenetics,
      state.activeTaste,
      state.activeEffect
    ]
  }
}
