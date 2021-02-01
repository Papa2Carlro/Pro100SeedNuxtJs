<template>
  <div @click="openFilter">
    <Loader v-if="loader" color="#282932"/>

    <section v-else class="shop">
      <div class="shop__container">
        <div class="pd-filter">
          <div class="pd-filter__wrapper" :class="{isOpen: openPanel}">
            <div class="pd-filter__wrapper-header">
              <div class="pd-filter__wrapper-title">
                {{ 'filter_title' | localize(locale) }}
              </div>

              <div class="pd-filter__wrapper-close" @click="closePanelHandler">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    opacity="0.8"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.3338 4.36311L20.061 3.09032L12 11.1513L3.93898 3.09032L2.66619 4.36311L10.7272 12.4241L3.09045 20.0609L4.36325 21.3337L12 13.6969L19.6368 21.3337L20.9095 20.0609L13.2728 12.4241L21.3338 4.36311Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <ul class="pd-filter__list">
              <li v-for="filter in filters" class="pd-filter__list-item" :data-title="filter.title">
                <div class="pd-filter__list-placeholder" :class="{isFocus: filter.isFocus}">
                  {{ filter.title | localize(locale) }}:
                </div>

                <div class="pd-filter__list-arrow" :class="{isOpen: filter.isOpen}"/>

                <ul class="pd-filter__drop" :class="{isActive: filter.isOpen}">
                  <li
                    v-for="item in filter.body"
                    :key="item.label"
                    class="pd-filter__drop-item"
                    :class="{isActive: item.isActive}"
                    @click="changeHandler(filter.title, item.label, item.value)"
                  >
                    <span v-if="typeof item.label === 'object'">
                      {{ item.label[locale] }}
                    </span>
                    <span v-else>
                      {{ item.label | localize(locale) }}
                    </span>
                  </li>
                </ul>

                <input v-model="filter.value" readonly type="text">
              </li>
            </ul>

            <div v-if="thc || productivity || height || bloom || genetic" class="pd-filter__clean" @click="cleanFilter">
              {{ 'filter_clean' | localize(locale) }}
            </div>

            <div
              v-if="(thc || productivity || height || bloom || genetic) && productFilter.length !== 0"
              class="pd-filter__count"
            >
              <span class="active">{{ productFilter.length }}</span>
              <span>/ {{ products.length }}</span>
            </div>
          </div>

          <div class="pd-filter__info">
            <img src="~/static/image/shop/filter.svg" class="pd-filter__info-filter" alt="" @click="openPanelHandler">

            <div
              v-if="thc || productivity || height || bloom || genetic"
              class="pd-filter__info-close"
              @click="cleanFilter"
            >
              Clean filter
            </div>

            <div
              v-if="(thc || productivity || height || bloom || genetic) && productFilter.length !== 0"
              class="pd-filter__info-count"
            >
              <span class="active">{{ productFilter.length }}</span>
              <span>&nbsp;/ {{ products.length }}</span>
            </div>
          </div>
        </div>

        <div v-if="productFilter.length === 0" class="shop__empty">
          <div class="shop__empty-title">
            Продуктов по таким хариктеристикам не найденно
          </div>
        </div>

        <div v-else class="shop__body">
          <ul v-for="group in visible" class="shop__list">
            <Cart
              v-for="product in group"
              :id="product._id"
              :key="product._id"
              :action="true"
              :name="product.name"
              :pictures="product.pictures"
              :thc="product.general.thc"
              :productivity="product.general.productivity"
              :new-price="product.newPrice"
              :price="product.price"
            />
          </ul>
        </div>
        <FollowUs/>
      </div>

      <div class="shop__bg"/>
    </section>
  </div>
</template>

<script>
import FollowUs from '@/components/ui/FollowUs'
import Loader from '@/components/ui/Loader'
import Cart from '@/components/product/Cart'

import Filter from '@/mixins/filter.mixin'

import _ from 'lodash'

export default {
  components: {
    Cart,
    Loader,
    FollowUs
  },
  mixins: [Filter],
  data: () => ({
    loader: true,

    page: 0,

    bodyHeight: 0,

    products: [],

    productFilter: [],
    productFilterByThc: [],
    productFilterByProductivity: [],
    productFilterByHeight: [],
    productFilterByBloom: [],
    productFilterByGenetic: [],

    pagination: [],
    visible: []
  }),
  async created () {
    const products = await this.$store.getters['product/getProducts']

    if (products.length === 0) {
      await this.$store.dispatch('product/getProducts')
    }

    this.products = await this.$store.getters['product/getSellProducts']

    this.productFilter = this.productFilterByThc = this.productFilterByProductivity = this.productFilterByHeight = this.productFilterByBloom = this.productFilterByGenetic = this.products
    this.setPagination(this.products)

    this.loader = false
  },
  mounted () {
    window.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    setPagination (arr) {
      this.page = 0
      this.visible = []

      this.pagination = _.chunk(arr, 6)
      this.visible.push(this.pagination[this.page])
    },
    scrollHandler () {
      if (this.page + 1 === this.pagination.length) {
        return
      }

      const {outerHeight, scrollY} = window
      const {offsetHeight} = document.body

      if (scrollY + outerHeight >= offsetHeight) {
        this.visible.push(this.pagination[++this.page])
      }
    }
  }
}
</script>
