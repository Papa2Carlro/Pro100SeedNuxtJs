<template>
  <div class="comparison__wrapper">
    <Loader v-if="loader" color="#282932"/>

    <section class="comparison">
      <header class="comparison__header">
        <div class="comparison__header-title">
          {{ 'comparison_title' | localize(locale) }}
        </div>

        <div class="comparison__header-actions">
          <div class="comparison__header-btn btn btn--default btn--xl3" @click="$router.go(-1)">
            {{ 'comparison_back_to_product' | localize(locale) }}
          </div>
        </div>
      </header>
      <header class="comparison__mobile-header">
        <div class="comparison__mobile-header-back" @click="$router.go(-1)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.599998 12.6001V11.4001L24 11.4001V12.6001L0.599998 12.6001Z" fill="white"/>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.226406 11.997C0.225631 12.2539 0.32326 12.5111 0.519294 12.7071L6.60041 18.7883L7.44894 17.9397L1.50921 12L7.44894 6.06027L6.60041 5.21174L0.519294 11.2929C0.324786 11.4874 0.227157 11.7421 0.226406 11.997Z"
              fill="white"
            />
          </svg>
        </div>

        <div class="comparison__mobile-header-title">
          {{ 'comparison_title_mobile' | localize(locale) }}
        </div>
      </header>

      <div class="comparison__main">
        <div class="comparison__aside">
          <div class="comparison__aside-specifications">
            <span>{{ "comparison_specifications" | localize(locale) }}</span>
          </div>

          <div class="comparison__aside-option">
            <img class="comparison__aside-icon" src="~/static/image/params/manufacturer.svg" alt="">
            <span class="comparison__aside-label">
              {{ 'card_general_manufacturer' | localize(locale) }}
            </span>
          </div>
          <div class="comparison__aside-option">
            <img class="comparison__aside-icon" src="~/static/image/params/variety.svg" alt="">
            <span class="comparison__aside-label">
              {{ 'card_general_variety' | localize(locale) }}
            </span>
          </div>
          <div class="comparison__aside-option">
            <img class="comparison__aside-icon" src="~/static/image/params/flowering.svg" alt="">
            <span class="comparison__aside-label">
              {{ 'card_general_flowering' | localize(locale) }}
            </span>
          </div>
          <div class="comparison__aside-option">
            <img class="comparison__aside-icon" src="~/static/image/params/thc.svg" alt="">
            <span class="comparison__aside-label">
              {{ 'card_thc' | localize(locale) }}
            </span>
          </div>
          <div class="comparison__aside-option">
            <img class="comparison__aside-icon" src="~/static/image/params/yield.svg" alt="">
            <span class="comparison__aside-label">
              {{ 'card_general_yield' | localize(locale) }}
            </span>
          </div>
          <div class="comparison__aside-option">
            <img class="comparison__aside-icon" src="~/static/image/params/genetics.svg" alt="">
            <span class="comparison__aside-label">
              {{ 'card_general_genetics' | localize(locale) }}
            </span>
          </div>
          <div class="comparison__aside-option">
            <img class="comparison__aside-icon" src="~/static/image/params/harvest.svg" alt="">
            <span class="comparison__aside-label">
              {{ 'card_general_harvest' | localize(locale) }}
            </span>
          </div>
          <div class="comparison__aside-option">
            <img class="comparison__aside-icon" src="~/static/image/params/plant.svg" alt="">
            <span class="comparison__aside-label">
              {{ 'card_general_plant_height' | localize(locale) }}
            </span>
          </div>
        </div>

        <div v-if="products.length === 0" class="comparison__body">
          <div class="comparison__body-title">
            {{ 'empty' | localize(locale) }}
          </div>
        </div>

        <ul v-else class="comparison__body">
          <li v-for="item in products" :key="item._id" class="comparison__item">
            <div class="comparison__item-thumb">
              <header class="comparison__item-header">
                <div class="comparison__item-name">
                  {{ item.name }}
                </div>

                <div class="comparison__item-close" @click="removeProduct(item._id)">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.41579 0L0.00157928 1.41422L6.71838 8.13102L0 14.8494L1.41422 16.2636L8.1326 9.54523L14.8508 16.2635L16.265 14.8492L9.54681 8.13102L16.2635 1.41437L14.8492 0.000152588L8.1326 6.7168L1.41579 0Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </header>

              <nuxt-link :to="`/shop/${item.name.toLowerCase().split(' ').join('-')}`" class="comparison__item-image">
                <img v-if="item.pictures.length > 0" loading="lazy" :src="item.pictures[0]" :alt="item.name">
                <img v-else src="~/static/image/not-found/product.jpg" loading="lazy" alt="">
              </nuxt-link>
            </div>

            <div class="comparison__item-option">
              {{ item.general.manufacturer }}
            </div>
            <div class="comparison__item-option">
              {{ item.general.variety | localize(locale) }}
            </div>
            <div class="comparison__item-option">
              {{ item.general.flowering.from }}-{{ item.general.flowering.to }} {{ 'weeks' | localize(locale) }}
            </div>
            <div class="comparison__item-option">
              {{ item.general.thc }}%
            </div>
            <div class="comparison__item-option">
              {{ item.general.yield }} {{ 'card_gram_per_strain' | localize(locale) }}
            </div>
            <div class="comparison__item-option">
              {{ item.general.genetics | flUp }}
            </div>
            <div class="comparison__item-option">
              {{ item.general.harvest.from | dots }}-{{ item.general.harvest.to | dots }}
              {{ 'months' | localize(locale) }}
            </div>
            <div class="comparison__item-option">
              {{ 'up_to' | localize(locale) }} {{ item.general.height.sm }} см.
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import ProductAction from '@/mixins/product.mixin'

export default {
  name: 'ProductComparison',
  components: {
    Loader
  },
  mixins: [ProductAction],
  data: () => ({
    loader: true,
    products: []
  }),
  async created () {
    const products = await this.$store.getters['product/getProducts']

    if (products.length === 0) {
      await this.$store.dispatch('product/getProducts')
    }

    this.products = await this.$store.getters['product/getComparisons']

    if (this.products.length === 0) {
      const comparison = this.$cookies.get('comparison') || []

      if (comparison.length === 0) {
        this.loader = false
        return
      }

      comparison.forEach((id) => {
        try {
          this.$store.commit('product/addComparison', id)
        } catch (err) {
          this.$cookies.remove('comparison')
        }
      })
    }

    this.loader = false
  },
  methods: {
    async removeProduct (id) {
      const comparison = await this.$cookies.get('comparison').filter(x => x !== id)

      this.products = this.products.filter(x => x._id !== id)
      this.$store.commit('product/removeComparison', id)

      const result = comparison.filter(product => product.id !== id)

      this.$cookies.remove('comparison')
      this.$cookies.set('comparison', result)
    }
  }
}
</script>
