import axios from 'axios'

/* eslint-disable */
export const state = () => ({
  user: {}
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  async getUser({commit}) {
    const queryData = await this.$cookies.get('referral')

    await axios({
      url: '/api/users',
      method: 'POST',
      headers: {
        Authorization: queryData._token
      },
      data: {
        email: queryData.email
      }
    })
      .then((res) => {
        if (res.data.ok) {
          commit('setUser', res.data.body)
        } else {
          console.log(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const getters = {
  getUser(state) {
    return state.user
  }
}
