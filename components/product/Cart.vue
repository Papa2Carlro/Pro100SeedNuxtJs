<template>
  <li class="cart" :class="{'cart--sell': newPrice.uah}">
    <nuxt-link :to="`/shop/${name.toLowerCase().split(' ').join('-')}`" class="cart__thumb">
      <img v-if="pictures.length > 0" :src="pictures[0]" loading="lazy" :alt="name">

      <img v-else src="~/static/image/not-found/product.jpg" loading="lazy" alt="">
    </nuxt-link>
    <div class="cart__info">
      <nuxt-link :to="`/shop/${name.toLowerCase().split(' ').join('-')}`" class="cart__title">
        {{ name }}
      </nuxt-link>

      <div class="cart__moreInfo">
        <ul class="cart__params">
          <li>{{ 'card_thc' | localize(locale) }}: {{ thc.from }}<span v-if="thc.to">-{{ thc.to }}</span>%</li>
          <li>{{ 'card_productivity' | localize(locale) }}: {{ productivity.from }}-{{ productivity.to }} {{ 'card_mg2' | localize(locale) }}</li>
        </ul>

        <div class="cart__price">
          <div v-if="newPrice.uah" class="cart__price-old">
            <span v-if="currency === 'usd'">$</span>{{ price[currency] }}<span v-if="currency === 'uah'" class="cart__price-uah">грн</span>
          </div>

          <div v-if="newPrice.uah" class="cart__price-now">
            <span v-if="currency === 'usd'">$</span>{{ newPrice[currency] }}<span v-if="currency === 'uah'" class="cart__price-uah">грн</span>
          </div>

          <div v-else class="cart__price-now">
            <span v-if="currency === 'usd'">$</span>{{ price[currency] }}<span v-if="currency === 'uah'" class="cart__price-uah">грн</span>
          </div>
        </div>
      </div>

      <div class="cart__actions" >
        <input
          v-model="count"
          v-click-outside="resetActive"
          type="number"
          :readonly="!countActive"
          class="cart__actions-col"
          :class="{isActive: countActive}"
          @keydown.enter="addCart(id, count)"
          @click="countActive = true"
        >

        <div class="cart__actions-addCart btn btn--green btn--fluid" @click="addCart(id, count)">
          {{ 'card_add_to_cart' | localize(locale) }}
        </div>
        <div
          v-if="action"
          class="cart__actions-favorite cart__actions-favorite--add btn btn--default btn--default-green"
          :class="{favorite}"
          @click="addFavorite(id)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.01" width="24" height="24" fill="#17A24F" />
            <path opacity="0.8" d="M11.3268 4.85112L11.9795 5.42072L12.6363 4.85584C14.7874 3.00587 17.9238 3.12468 19.908 5.19916C21.9004 7.28223 22.028 10.5993 20.2783 12.8387L12.6984 20.2409C12.3105 20.6197 11.6913 20.6204 11.3026 20.2424L3.7109 12.86C1.97472 10.5983 2.10707 7.28004 4.09739 5.19916C6.08439 3.12175 9.21735 3.01036 11.3268 4.85112Z" stroke="#17A24F" stroke-width="2" />
            <mask
              id="mask0"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="1"
              y="2"
              width="22"
              height="20"
            >
              <path d="M11.3268 4.85112L11.9795 5.42072L12.6363 4.85584C14.7874 3.00587 17.9238 3.12468 19.908 5.19916C21.9004 7.28223 22.028 10.5993 20.2783 12.8387L12.6984 20.2409C12.3105 20.6197 11.6913 20.6204 11.3026 20.2424L3.7109 12.86C1.97472 10.5983 2.10707 7.28004 4.09739 5.19916C6.08439 3.12175 9.21735 3.01036 11.3268 4.85112Z" fill="#17A24F" stroke="#17A24F" stroke-width="2" />
            </mask>
            <g mask="url(#mask0)" />
          </svg>
        </div>

        <div v-else class="cart__actions-favorite cart__actions-favorite--close btn btn--default btn--default-green" @click="removeFavorite(id)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.318188 14.1453C-0.106063 14.5696 -0.106063 15.2574 0.318188 15.6816C0.742438 16.1059 1.43028 16.1059 1.85453 15.6816L7.99977 9.53641L14.1458 15.6824C14.5701 16.1067 15.2579 16.1067 15.6822 15.6824C16.1064 15.2582 16.1064 14.5704 15.6822 14.1461L9.53612 8.00006L15.6816 1.85453C16.1059 1.43028 16.1059 0.742438 15.6816 0.318188C15.2574 -0.106062 14.5696 -0.106063 14.1453 0.318187L7.99977 6.46372L1.85505 0.318991C1.4308 -0.10526 0.742954 -0.10526 0.318703 0.318991C-0.105547 0.743241 -0.105548 1.43109 0.318703 1.85534L6.46343 8.00006L0.318188 14.1453Z" fill="#42B16F"/>
          </svg>
        </div>
      </div>

      <div class="cart__remove" @click="removeFavorite(id)">
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.7071 0.292894C1.31659 -0.0976315 0.683407 -0.0976315 0.292889 0.292894C-0.0976295 0.683418 -0.0976295 1.31658 0.292889 1.70711L11.6067 13.0209L0.293041 24.3346C-0.097477 24.7251 -0.097477 25.3582 0.293041 25.7488C0.683559 26.1393 1.31672 26.1393 1.70726 25.7488L13.0209 14.4351L24.3345 25.7487C24.725 26.1393 25.3582 26.1393 25.7487 25.7487C26.1393 25.3582 26.1393 24.725 25.7487 24.3345L14.4351 13.0209L25.7489 1.70713C26.1394 1.31661 26.1394 0.683445 25.7489 0.292921C25.3584 -0.0976028 24.7252 -0.0976028 24.3347 0.292921L13.0209 11.6067L1.7071 0.292894Z" fill="white"/>
        </svg>
      </div>
    </div>
  </li>
</template>

<script>
import ProductActions from '@/mixins/product.mixin'
import vClickOutside from 'v-click-outside'

export default {
  name: 'ProductCart',
  directives: {
    clickOutside: vClickOutside.directive
  },
  mixins: [ProductActions],
  props: [
    'name', 'pictures', 'thc', 'productivity', 'newPrice', 'price', 'id', 'action'
  ],
  data: () => ({
    count: 1,
    countActive: false
  }),
  watch: {
    count () {
      if (!this.count) {
        this.count = 1
      }
    }
  },
  async created () {
    const favorite = await this.$cookies.get('favorite') || []

    favorite.map((product) => {
      if (product === this.id) {
        this.favorite = true
      }
    })
  },
  methods: {
    removeFavorite (id) {
      this.$emit('remove', {id})
    },
    resetActive () {
      this.countActive = false
    }
  }
}
</script>
