<template>
  <div>
    <Loader v-if="loader" color="#282932"/>

    <section v-else class="product__header">
      <div v-if="product.pictures.length > 0" ref="sliderBody" class="product__photo">
        <img
          :key="picture.image"
          :src="picture.image"
          :class="{hide: imageChange}"
          class="product__photo-image"
          loading="lazy"
          alt=""
        >

        <ul
          ref="slider"
          class="product__photo-thumbsSlider"
          :class="{isAnimate: isAnimate}"
          :style="`transform: translate(${sliderPosition}px, 0)`"
          @mousedown="sliderDown"
          @mouseup="sliderUp"
          @mousemove="sliderMove"
          @mouseout="sliderUp"
        >
          <li
            v-for="(thumb, index) in product.pictures"
            :key="thumb"
            class="product__photo-thumb"
            @click="changeImage(index)"
          >
            <img class="product__photo-thumbImage" :src="thumb" alt="">
          </li>
        </ul>
      </div>

      <div v-else class="product__photo isEmpty">
        <img src="~/static/image/not-found/product.jpg" class="product__photo-image" loading="lazy" alt="">
      </div>

      <div v-if="product.pictures.length > 1" class="product__control">
        <div class="product__control-action" :class="{isDefault: arrow.left}" @click="arrowHandler('left')">
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.93934 10.9393ZM3 10.5H2L2 13.5H3V10.5Z"
              fill="white"
            />
          </svg>
        </div>

        <div class="product__control-amount">
          <div class="active">
            {{ picture.id }}
          </div>
          <div class="separator">
            /
          </div>
          <div>{{ picture.length }}</div>
        </div>

        <div class="product__control-action" :class="{isDefault: arrow.right}" @click="arrowHandler('right')">
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.0607 10.9393C13.6464 11.5251 13.6464 12.4749 13.0607 13.0607L3.51472 22.6066C2.92893 23.1924 1.97919 23.1924 1.3934 22.6066C0.807611 22.0208 0.807611 21.0711 1.3934 20.4853L9.87868 12L1.3934 3.51472C0.807611 2.92893 0.807611 1.97919 1.3934 1.3934C1.97919 0.807611 2.92893 0.807611 3.51472 1.3934L13.0607 10.9393ZM11 10.5H12V13.5H11V10.5Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div class="product__info">
        <div class="product__main" :class="{'product__main--sell': product.newPrice.uah}">
          <div class="product__title">
            {{ product.name }}
          </div>
          <div class="product__price">
            <div v-if="product.newPrice.uah" class="product__nowPrice">
              <span v-if="currency === 'usd'">$</span>{{ product.newPrice[currency] }} <span v-if="currency === 'uah'">грн.</span>
            </div>

            <div v-else class="product__nowPrice">
              <span v-if="currency === 'usd'">$</span>{{ product.price[currency] }} <span
                v-if="currency === 'uah'"
              >грн.</span>
            </div>

            <div v-if="product.newPrice.uah" class="product__oldPrice">
              <span v-if="currency === 'usd'">$</span>{{ product.price[currency] }} <span
                v-if="currency === 'uah'"
              >грн.</span>
            </div>
          </div>
          <div class="product__params">
            <div class="title">
              {{ 'card_general' | localize(locale) }}:
            </div>

            <ul class="product__params-list">
              <li class="product__params-item">
                <div class="product__params-props">
                  <div class="product__params-icon">
                    <img src="~/static/image/params/manufacturer.svg" alt="">
                  </div>
                  <div class="product__params-label">
                    {{ 'card_general_manufacturer' | localize(locale) }}
                  </div>
                </div>
                <div class="product__params-value">
                  {{ product.general.manufacturer }}
                </div>
              </li>
              <li class="product__params-item">
                <div class="product__params-props">
                  <div class="product__params-icon">
                    <img src="~/static/image/params/variety.svg" alt="">
                  </div>
                  <div class="product__params-label">
                    {{ 'card_general_variety' | localize(locale) }}
                  </div>
                </div>
                <div class="product__params-value">
                  {{ product.general.variety }}
                </div>
              </li>
              <li class="product__params-item">
                <div class="product__params-props">
                  <div class="product__params-icon">
                    <img src="~/static/image/params/flowering.svg" alt="">
                  </div>
                  <div class="product__params-label">
                    {{ 'card_general_flowering' | localize(locale) }}
                  </div>
                </div>
                <div class="product__params-value">
                  {{ product.general.flowering.from }}-{{ product.general.flowering.to }} {{ 'weeks' | localize(locale) }}
                </div>
              </li>
              <li class="product__params-item">
                <div class="product__params-props">
                  <div class="product__params-icon">
                    <img src="~/static/image/params/thc.svg" alt="">
                  </div>
                  <div class="product__params-label">
                    {{ 'card_thc' | localize(locale) }}
                  </div>
                </div>
                <div class="product__params-value">
                  {{ product.general.thc.from }}<span v-if="product.general.thc.to">-{{ product.general.thc.to }}</span>%
                </div>
              </li>
              <li class="product__params-item">
                <div class="product__params-props">
                  <div class="product__params-icon">
                    <img src="~/static/image/params/yield.svg" alt="">
                  </div>
                  <div class="product__params-label">
                    {{ 'card_general_yield' | localize(locale) }}
                  </div>
                </div>
                <div class="product__params-value">
                  {{ product.general.productivity.from }}<span v-if="product.general.productivity.to">-{{ product.general.productivity.to }}</span> {{ 'card_gram_per_strain' | localize(locale) }}
                </div>
              </li>
              <li class="product__params-item">
                <div class="product__params-props">
                  <div class="product__params-icon">
                    <img src="~/static/image/params/genetics.svg" alt="">
                  </div>
                  <div class="product__params-label">
                    {{ 'card_general_genetics' | localize(locale) }}
                  </div>
                </div>
                <div class="product__params-value">
                  {{ product.general.genetics | flUp }}
                </div>
              </li>
              <li class="product__params-item">
                <div class="product__params-props">
                  <div class="product__params-icon">
                    <img src="~/static/image/params/harvest.svg" alt="">
                  </div>
                  <div class="product__params-label">
                    {{ 'card_general_harvest' | localize(locale) }}
                  </div>
                </div>
                <div class="product__params-value">
                  {{ product.general.harvest.from | dots }}-{{ product.general.harvest.to | dots }}
                  {{ 'months' | localize(locale) }}
                </div>
              </li>
              <li class="product__params-item">
                <div class="product__params-props">
                  <div class="product__params-icon">
                    <img src="~/static/image/params/plant.svg" alt="">
                  </div>
                  <div class="product__params-label">
                    {{ 'card_general_plant_height' | localize(locale) }}
                  </div>
                </div>
                <div class="product__params-value">
                  {{ 'up_to' | localize(locale) }} {{ product.general.height.sm }} см.
                </div>
              </li>
            </ul>
          </div>
          <div class="product__packs">
            <div class="title">
              {{ 'card_packs' | localize(locale) }}:
            </div>

            <ul class="product__packs-list">
              <li
                v-for="pack in packs"
                :key="pack.title"
                class="product__packs-item"
                :class="{isActive: pack.isActive}"
                @click="packHandler(pack.id)"
              >
                {{ pack.id }}
                {{ 'card_in_pack' | localize(locale) }}
                <span v-if="pack.bonus">
                  &nbsp;+{{ pack.bonus }} {{ 'card_bonus' | localize(locale) }}
                </span>&nbsp;- {{
                  currency === 'usd' ? (pack.id * (product.newPrice.uah ? product.newPrice[currency] : product.price[currency])).toFixed(2) :
                  (pack.id * (product.newPrice.uah ? product.newPrice[currency] : product.price[currency]))
                }}
                <span v-if="currency === 'usd'">$</span>
                <span v-else-if="currency === 'uah'" class="product__packs-uah">грн</span>
              </li>
            </ul>
          </div>
          <div class="product__amount">
            <div class="title">
              {{ 'card_amount' | localize(locale) }}:
            </div>

            <div class="product__amount-count">
              {{ count }}
            </div>

            <div class="product__amount-control">
              <div @click="countMinus">
                &#8211;
              </div>
              <div class="separator">
                /
              </div>
              <div @click="countPlus">
                +
              </div>
            </div>
          </div>
          <div class="product__subtotal">
            <div class="title">
              {{ 'card_subtotal' | localize(locale) }}:
            </div>

            <div class="product__subtotal-label">
              <span v-if="currency === 'usd'">$</span>{{ currency === 'usd' ? subTotal.toFixed(2) : subTotal }} <span v-if="currency === 'uah'">грн.</span>
            </div>
          </div>
          <div class="product__btn">
            <div class="product__button btn btn--green" @click="addCart(product._id, count)">
              {{ 'card_add_to_cart' | localize(locale) }}
            </div>

            <div class="product__action btn btn--default btn--square" @click="addFavorite(product._id)">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                :fill="favorite ? '#fff': 'none'"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0.01" width="24" height="24" fill="#fff"/>
                <path
                  opacity="0.8"
                  d="M11.3268 4.85112L11.9795 5.42072L12.6363 4.85584C14.7874 3.00587 17.9238 3.12468 19.908 5.19916C21.9004 7.28223 22.028 10.5993 20.2783 12.8387L12.6984 20.2409C12.3105 20.6197 11.6913 20.6204 11.3026 20.2424L3.7109 12.86C1.97472 10.5983 2.10707 7.28004 4.09739 5.19916C6.08439 3.12175 9.21735 3.01036 11.3268 4.85112Z"
                  stroke="white"
                  stroke-width="2"
                />
                <mask
                  id="mask0"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="1"
                  y="2"
                  width="22"
                  height="20"
                >
                  <path
                    d="M11.3268 4.85112L11.9795 5.42072L12.6363 4.85584C14.7874 3.00587 17.9238 3.12468 19.908 5.19916C21.9004 7.28223 22.028 10.5993 20.2783 12.8387L12.6984 20.2409C12.3105 20.6197 11.6913 20.6204 11.3026 20.2424L3.7109 12.86C1.97472 10.5983 2.10707 7.28004 4.09739 5.19916C6.08439 3.12175 9.21735 3.01036 11.3268 4.85112Z"
                    fill="white"
                    stroke="white"
                    stroke-width="2"
                  />
                </mask>
                <g mask="url(#mask0)"/>
              </svg>
            </div>

            <div class="product__action btn btn--default btn--square" @click="addComparison(product._id)">
              <img src="~/static/image/product/srav.svg" alt="">
              <div class="product__tooltip" :class="{isVisible: tooltip}">
                <div class="product__tooltip-title">
                  {{ 'card_product_added' | localize(locale) }}
                </div>
                <nuxt-link to="/shop/comparison" class="product__tooltip-link">
                  {{ 'card_on_page_comm' | localize(locale) }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import ProductActions from '@/mixins/product.mixin'

export default {
  name: 'Card',
  components: {Loader},
  mixins: [ProductActions],
  data: () => ({
    packs: [
      {id: 1, isActive: true},
      {id: 3, isActive: false},
      {id: 5, isActive: false},
      {id: 10, bonus: 2, isActive: false},
      {id: 50, bonus: 5, isActive: false},
      {id: 100, bonus: 10, isActive: false}
    ],

    imageChange: false,
    sliderStart: false,
    sliderPosition: 0,
    startSliderPosition: 0,
    isAnimate: false,
    startMove: 0,
    arrow: {left: true, right: false},
    tooltip: false,

    loader: true,
    product: {},
    count: 1,
    picture: {image: '', id: 1, length: 0}
  }),
  computed: {
    subTotal () {
      return this.count * (
        this.product.newPrice[this.currency]
          ? this.product.newPrice[this.currency]
          : this.product.price[this.currency]
      )
    }
  },
  watch: {
    count () { this.packs.map(pack => pack.isActive = pack.id === this.count) }
  },
  async created () {
    const products = await this.$store.getters['product/getProducts']
    const favorite = await this.$cookies.get('favorite') || []

    if (products.length === 0) { await this.getProducts() }
    await this.getProduct()

    favorite.map((product) => { if (product === this.product._id) { this.favorite = true } })
    this.loader = false
  },
  methods: {
    async getProducts () { await this.$store.dispatch('product/getProducts') },
    async getProduct () {
      await this.$store.commit('product/setProduct', this.$route.params.title)
      this.product = await this.$store.getters['product/getProduct']

      this.picture.image = this.product.pictures[0]
      this.picture.length = this.product.pictures.length
    },

    async addComparison (id) {
      this.tooltip = true
      const comparison = await this.$cookies.get('comparison') || []

      this.$cookies.remove('comparison')
      const [double] = comparison.filter(x => x === id)
      if (!double) { comparison.push(id) }

      this.$cookies.set('comparison', comparison)
      this.$store.commit('product/addComparison', id)

      setTimeout(() => this.tooltip = false, 5500)
    },
    countMinus () {
      if (this.count > 1) { this.count-- }
      this.subTotal = this.count * this.product.price[this.currency]
    },
    countPlus () {
      this.count++
      this.subTotal = this.count * this.product.price[this.currency]
    },
    packHandler (id) {
      this.packs.map(x => x.isActive = false)

      const [thisPack] = this.packs.filter(x => x.id === id)
      thisPack.isActive = true
      this.count = thisPack.id
    },
    changeImage (id) {
      if (this.picture.id !== id + 1) {
        this.picture.id = id + 1
        this.imageChange = true

        setTimeout(() => {
          this.imageChange = false
          this.picture.image = this.product.pictures[id]
        }, 150)

        if (id + 1 === 1) {
          this.arrow.left = true
          this.arrow.right = false
        } else if (id + 1 === this.picture.length) {
          this.arrow.left = false
          this.arrow.right = true
        } else {
          this.arrow.left = false
          this.arrow.right = false
        }
      }
    },

    // Arrow
    arrowHandler (duration) {
      if (duration === 'right') {
        if (this.picture.id !== this.picture.length) { this.changeImage((this.picture.id - 1) + 1) }
      } else if (duration === 'left') {
        if (this.picture.id !== 1) { this.changeImage((this.picture.id - 1) - 1) }
      }
    },

    // Slider
    sliderDown (event) {
      const {pageX} = event
      this.startSliderPosition = pageX
      this.startMove = this.sliderPosition

      this.sliderStart = true
    },
    sliderUp () {
      this.sliderStart = false
      const {offsetWidth} = this.$refs.slider
      const offsetWidthBody = this.$refs.sliderBody.offsetWidth

      const result = offsetWidth - offsetWidthBody

      if (this.sliderPosition > 0) {
        this.isAnimate = true
        this.sliderPosition = 0

        setTimeout(() => this.isAnimate = false, 300)
      } else if (this.sliderPosition < -result) {
        if (offsetWidthBody < offsetWidth) {
          this.isAnimate = true
          this.sliderPosition = -result
        } else {
          this.isAnimate = true
          this.sliderPosition = 0
        }

        setTimeout(() => this.isAnimate = false, 300)
      }
    },
    sliderMove (event) {
      if (!this.sliderStart) { return }

      const {pageX} = event
      const delta = -(this.startSliderPosition - pageX)

      this.sliderPosition = this.startMove + delta
    }
  }
}
</script>
