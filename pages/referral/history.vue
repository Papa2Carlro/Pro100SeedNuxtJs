<template>
  <div class="ref__wrapper">
    <Loader v-if="loader" color="#272831" />

    <div v-else class="ref__history">
      <SectionHeader :title="'referral_payment_title' | localize(locale)">
        {{ 'referral_payment_text' | localize(locale) }}
      </SectionHeader>

      <ul v-if="history.length > 0" class="ref__history-body">
        <li v-for="item in history" :key="item.timeStamp" class="ref__history-item">
          <div class="ref__history-header">
            <time class="ref__history-data">
              {{ item.timeStamp | DateFilter(locale) }}
            </time>

            <div class="ref__history-counter">
              {{ item.products.length }} <span v-if="item.products.length === 1">{{ 'search_item' | localize(locale) }}</span>
              <span v-else-if="item.products.length > 1 && item.products.length < 4">{{ 'search_items' | localize(locale) }}</span>
              <span v-else>{{ 'search_itemss' | localize(locale) }}</span>
            </div>
          </div>

          <div class="ref__history-products">
            <ul class="ref__history-products-list">
              <li v-for="product in item.products" :key="product.id" class="ref__history-product">
                <div class="ref__history-info">
                  <img :src="product.thumb" class="ref__history-thumb" alt="">

                  <div class="ref__history-description">
                    <nuxt-link :to="`/shop/${product.name.toLowerCase().split(' ').join('-')}`" class="ref__history-name">
                      {{ product.name }}
                    </nuxt-link>

                    <div class="ref__history-pack">
                      {{ product.pack }} {{ 'shopping_pack' | localize(locale) }}
                    </div>
                  </div>
                </div>

                <div class="ref__history-price">
                  <span v-if="currency === 'usd'">$</span>{{ currency === 'usd' ? product.pack * product.price[currency].toFixed(2) : product.pack * product.price[currency] }} <span v-if="currency === 'uah'">грн.</span>
                </div>
              </li>
            </ul>

            <div class="ref__history-total">
              <div class="ref__history-total-label">
                {{ 'card_total' | localize(locale) }}:
              </div>

              <div class="ref__history-total-price">
                <span v-if="currency === 'usd'">$</span>{{ currency === 'usd' ? item.total[currency].toFixed(2) : item.total[currency] }} <span v-if="currency === 'uah'">грн.</span>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div v-else class="ref__history-body">
        <div class="ref__history-empty">
          {{ 'empty' | localize(locale) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import SectionHeader from '@/components/ui/SectionHeader'

import DateFilter from '@/filters/date.filter'

export default {
  name: 'ReferralContact',
  components: {SectionHeader, Loader},
  layout: 'referral',
  filters: {DateFilter},
  data: () => ({
    loader: true,

    history: []
  }),
  async created () {
    const user = await this.$cookies.get('referral')

    if (!this.$store.getters['user/getUser'].firstName) { await this.$store.dispatch('user/getUser') }
    if (this.$store.getters['user/getUser'].email !== user.email) { await this.$store.dispatch('user/getUser') }

    this.history = await this.$store.getters['user/getUser'].history
    this.loader = false
  }
}
</script>
