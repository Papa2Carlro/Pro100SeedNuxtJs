import axios from 'axios'

export default function ({redirect, app}) {
  const data = app.$cookies.get('referral')

  if (!data) {
    return redirect('/referral/sign-in')
  }

  axios({
    url: '/api/users',
    method: 'POST',
    headers: {
      Authorization: data._token
    },
    data: {
      email: data.email
    }
  })
    .then((res) => {
      return true
    }).catch((err) => {
      app.$cookies.remove('referral')
      return redirect('/referral/sign-in')
    })
}
