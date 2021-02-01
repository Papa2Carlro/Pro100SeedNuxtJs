import axios from 'axios'

export default {
  data: () => ({
    bonus: {usd: 0, uah: 0},
    refer: '',
    emailAcc: '',

    error: false,
    errorMsg: ''
  }),
  async created () {
    const data = await this.$cookies.get('referral')

    if (data) {
      this.filtersCard.push({localize: true, label: 'referral_bonus_payment', id: 'bonus', isActive: false})
      this.emailAcc = data.email

      await axios({
        url: '/api/users',
        method: 'POST',
        headers: {Authorization: data._token},
        data: {email: data.email}
      })
        .then((res) => {
          if (res.data.ok) {
            this.bonus.usd = res.data.body.bonus
            this.refer = res.data.body.refer
          }
        }).catch(err => console.log(err))

      await axios({url: 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11', method: 'GET'})
        .then((res) => {
          res.data.map((item) => {
            if (item.ccy === 'USD' && item.base_ccy === 'UAH') {
              this.bonus.uah = this.bonus.usd * item.buy
            }
          })
        })
    }
  },
  methods: {
    errorHandler (msg) {
      this.error = true
      this.errorMsg = msg

      setTimeout(() => this.error = false, 10000)
    }
  }
}
