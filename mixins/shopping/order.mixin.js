import localize from '@/filters/localize.filter'

export default {
  methods: {
    subTotal (val) {
      return parseFloat(this.card.reduce((acc, product) => acc + (product.pack * product.price[val]), 0))
    },
    valTotal (val) {
      const total = this.subTotal(val)

      return this.couponSale > 0
        ? (total - ((total / 100) * this.couponSale) + this.shipping[val]).toFixed(2)
        : (total + this.shipping.usd).toFixed(2)
    },
    async sendFormHandler () {
      if (this.activeFilterCard === 'bonus') {
        if (this.totalValue > this.bonus[this.currency]) {
          this.errorHandler(localize('referral_not_money', this.locale))
          return
        }
      }

      const formData = {
        price: {
          currency: this.currency,
          payment: this.activeFilterCard === 'bonus' ? 'referral_bonus' : 'paid',
          coupon: this.couponSale > 0 ? {body: this.coupon, sale: this.couponSale} : {body: false},
          subtotal: this.currency === 'uah'
            ? {uah: this.total, usd: this.subTotal('usd')}
            : {usd: this.total, uah: this.subTotal('uah')},
          shipping: this.shipping[this.currency],
          total: this.currency === 'uah'
            ? {uah: this.totalValue, usd: parseFloat(this.valTotal('usd'))}
            : {usd: this.totalValue, uah: parseFloat(this.valTotal('uah'))}
        },
        shipping: this.shippingType,
        actions: {
          dontCall: this.notPhone,
          newsletters: this.newsletters
        },
        info: {
          refer: this.refer,
          firstName: this.firstName,
          lastName: this.lastName,
          country: this.country,
          city: this.city,
          stateProvince: this.stateProvince,
          address: this.address,
          apartment: this.apartment,
          zipCode: this.zipCode,
          email: this.email,
          phone: this.phone
        },
        isLogin: this.emailAcc ? this.emailAcc : false,
        body: this.card
      }

      await this.$store.commit('product/clearCard')
      this.$cookies.remove('shopping')

      await this.$axios.$post('/api/payment/create', formData)
        .then((res) => {
          if (res.ok) {
            this.openPanel = false
            this.panelTitle = ''
            this.panelType = ''

            setTimeout(() => this.finallyPanel = true, 300)
          }
        })
        .catch(err => console.log(err))
    }
  }
}
