<template>
  <div>
    <Loader v-if="loader" color="#1A1A1A"/>

    <form v-else class="checkout__wrapper" @submit.prevent="submitForm">
      <div class="checkout__body">
        <Header/>

        <div class="checkout__wrapper-body">
          <div class="checkout-filter">
            <div class="checkout-filter__header">
              <div class="checkout-title">
                Order type
              </div>

              <div class="checkout-filter__description">
                Already have a Referal Profile? <a href="/referral/link">Click here</a> to login and checkout faster
              </div>
            </div>

            <ul class="checkout-filter__body">
              <li
                v-for="filter in filters"
                :key="filter.id"
                class="checkout-filter__item"
                :class="{isActive: filter.isActive}"
                @click="filterHandler(filter.id)"
              >
                {{ filter.label }}
              </li>
            </ul>
          </div>

          <div v-if="activeFilter === 'full'" class="checkout-body">
            <div class="checkout-body__group">
              <div class="checkout-body__form">
                <div class="checkout-body__form-checkbox" :class="{invalid: errorSubsEmail}">
                  <input id="subscribe_email" v-model="subscribeEmail" type="checkbox" @input="errorSubsEmail = false">
                  <label for="subscribe_email">Subscribe to Newsletter in Email</label>
                </div>

                <div class="checkout-body__form-checkbox" :class="{invalid: errorSubsPhone}">
                  <input id="subscribe" v-model="subscribePhone" type="checkbox" @input="errorSubsPhone = false">
                  <label for="subscribe">Subscribe to Newsletter in Phone</label>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeFilter === 'fast'" class="checkout-body">
            <div class="checkout-body__group">
              <div class="checkout-title">
                Shipping address
              </div>

              <div class="checkout-body__form">
                <div class="checkout-body__form-group">
                  <input
                    v-model="firstName"
                    class="checkout-body__form-input"
                    type="text"
                    placeholder="FIRST NAME"
                    :class="{invalid: $v.firstName.$dirty && !$v.firstName.required}"
                  >

                  <div v-if="$v.firstName.$dirty && !$v.firstName.required" class="checkout-body__form-error">
                    Поле обезательно для заполнения
                  </div>
                </div>

                <div class="checkout-body__form-group">
                  <input
                    v-model="lastName"
                    class="checkout-body__form-input"
                    type="text"
                    placeholder="LAST NAME"
                    :class="{invalid: $v.lastName.$dirty && !$v.lastName.required}"
                  >

                  <div v-if="$v.lastName.$dirty && !$v.lastName.required" class="checkout-body__form-error">
                    Поле обезательно для заполнения
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Panel>
        <nuxt-link to="/shop" class="checkout__panel__general-link btn btn--white btn--fluid1">
          Return to shop
        </nuxt-link>

        <button type="submit" class="checkout__panel__general-link btn btn--green btn--fluid1">
          next step
        </button>
      </Panel>
    </form>
  </div>
</template>

<script>
import Header from '@/components/checkout/Header'
import Panel from '@/components/checkout/Panel'
import Loader from '@/components/ui/Loader'

import {required, minLength, email} from 'vuelidate/lib/validators'

export default {
  name: 'CheckoutInformation',
  components: {Header, Panel, Loader},
  layout: 'checkout',
  data: () => ({
    loader: false,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    email: '',
    phone: '',
    subscribeEmail: false,
    subscribePhone: false,

    // Error
    errorSubsEmail: false,
    errorSubsPhone: false,

    activeFilter: 'full',
    filters: [
      {
        label: 'Full ORDER',
        id: 'full',
        isActive: true
      },
      {
        label: 'FAST ORDER',
        id: 'fast',
        isActive: false
      }
    ]
  }),
  validations: {
    firstName: {required},
    lastName: {required},
    address: {required},
    apartment: {required},
    city: {required},
    state: {required},
    country: {required},
    zip: {required, minLength: minLength(5)},
    email: {required, email},
    phone: {required}
  },
  mounted () {
    this.loader = false
  },
  methods: {
    filterHandler (filter) {
      this.filters.map(item => item.isActive = item.id === filter)
      this.activeFilter = filter
    },
    async submitForm () {
      let formData

      if (!this.subscribeEmail) {
        this.errorSubsEmail = true
      }
      if (!this.subscribePhone) {
        this.errorSubsPhone = true
      }

      if (this.$v.$invalid || this.errorSubsEmail || this.errorSubsPhone) {
        this.$v.$touch()
        return
      }

      if (this.activeFilter === 'full') {
        formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          apartment: this.apartment,
          city: this.city,
          state: this.state,
          country: this.country,
          zip: this.zip,
          email: this.email,
          phone: this.phone
        }
      }

      await this.$store.commit('product/setCheckInfo', {info: formData, type: this.activeFilter})
      await this.$store.commit('setCheckoutProduct')
      await this.$router.push('/checkout/shipping')
    }
  }
}
</script>
