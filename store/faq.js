/* eslint-disable */
export const state = () => ({
  faq: []
})

export const mutations = {
  setFaqs(state, faqs) {
    state.faq = faqs
  }
}

export const actions = {
 async getFaqsHandler({commit}) {
    await this.$axios.get('/api/faq')
      .then(res => {
        if (res.data.ok) {
          commit('setFaqs', res.data.body)
        } else {
          console.log(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const getters = {
  getFaqs(state) {
    return state.faq
  }
}
