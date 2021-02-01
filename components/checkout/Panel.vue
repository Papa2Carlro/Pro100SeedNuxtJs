<template>
  <article class="checkout-panel">
    <div class="checkout-panel__header">
      <div class="checkout-panel__header-count">
        <div class="checkout-panel__header-title">
          shopping cart:
        </div>
        <div class="checkout-panel__header-value">
          {{ card.length }} items
        </div>
      </div>
    </div>

    <ul :class="{isSale: couponSale > 0 || notFoundCoupon}" class="checkout-panel__body">
      <li v-for="product in card" :key="product.id" class="checkout-panel__product">
        <div class="checkout-panel__product-info">
          <nuxt-link :to="`/shop/${product.name.toLowerCase().split(' ').join('-')}`" class="checkout-panel__product-thumb">
            <img :src="product.thumb" :alt="product.name" @click="closePanelHandler">
          </nuxt-link>

          <div>
            <div class="checkout-panel__product-name">
              {{ product.name }}
            </div>

            <div class="checkout-panel__product-pack">
              <div class="checkout-panel__product__pack__label">
                {{ product.pack }} pack
              </div>

              <div class="checkout-panel__product__pack__control">
                <span @click="packMinusHandler(product.id)">&#8211;</span>
                /
                <span @click="packPlusHandler(product.id)">+</span>
              </div>
            </div>
          </div>
        </div>

        <div class="checkout-panel__product-action">
          <p class="checkout-panel__product-price">
            ${{ product.price }}
          </p>

          <p class="checkout-panel__product-remove" @click="removeProductHandler(product.id)">
            remove
          </p>
        </div>
      </li>
    </ul>

    <div class="checkout-panel__general">
      <div class="checkout-panel__info">
        <form class="checkout-panel__info-coupon" @submit.prevent="searchCoupon">
          <input
            v-model="coupon"
            placeholder="ENTER COUPON CODE"
            class="checkout-panel__info-input"
            type="text"
            :class="{invalid: notFoundCoupon}"
            @input="notFoundCoupon = false"
          >

          <button class="checkout-panel__info-submit btn btn--default btn--default-green btn--xl">
            apply
          </button>
        </form>

        <div v-if="notFoundCoupon" class="checkout-panel__info-helper">
          Такого купона не найденно
        </div>

        <ul class="checkout-panel__info-list">
          <li class="checkout-panel__info-item">
            <div class="checkout-panel__info-title">
              subtotal:
            </div>

            <div class="checkout-panel__info-value">
              ${{ total }}
            </div>
          </li>
          <li class="checkout-panel__info-item">
            <div class="checkout-panel__info-title">
              SHiPPING:
            </div>

            <div class="checkout-panel__info-value">
              {{ shipping === 0 ? '&#8211;' : `$${shipping}` }}
            </div>
          </li>
          <li v-if="couponSale !== 0" class="checkout-panel__info-item">
            <div class="checkout-panel__info-title">
              Coupon:
            </div>

            <div class="checkout-panel__info-value">
              {{ couponSale }}%
            </div>
          </li>
        </ul>
      </div>

      <div class="checkout-panel__total">
        <div class="checkout-panel__total-label">
          TOTAL:
        </div>

        <div class="checkout-panel__total-price">
          ${{ totalValue }}
        </div>
      </div>

      <div class="checkout-panel__general-actions">
        <slot/>
      </div>
    </div>
  </article>
</template>

<script>
import Shopping from '@/mixins/shopping/shopping.mixin'

export default {
  name: 'CheckoutPanel',
  mixins: [Shopping],
  data: () => ({
    coupon: '',
    notFoundCoupon: false,

    shipping: 0,
    couponSale: 0
  }),
  computed: {
    totalValue () {
      if (this.couponSale > 0) {
        return (this.total - ((this.total / 100) * this.couponSale) + this.shipping)
      }

      return this.total + this.shipping
    }
  },
  methods: {
    searchCoupon () {
      console.log(this.coupon)
      this.notFoundCoupon = true

      // this.couponSale = 10
    }
  }
}
</script>
