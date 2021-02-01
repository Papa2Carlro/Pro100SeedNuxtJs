<template>
  <section class="about__stores grid grid--order">
    <div class="about__stores-info grid--left">
      <div class="about__stores-title">
        {{ 'about_store_title' | localize(locale) }}
      </div>

      <form class="about__stores-form" @submit.prevent="submitHandler">
        <div class="about__stores-input input">
          <label for="country" class="about__stores-label input__label" :class="{isFocus: isFocus}">
            {{ 'about_store_enter_country' | localize(locale) }}
          </label>
          <input
            id="country"
            v-model="country"
            type="text"
            class="about__stores-body input__body"
            @focus="isFocus = true"
            @blur="blurHandler"
          >
        </div>

        <button type="submit" class="about__stores-submit btn btn--default btn--default-green btn--xl">
          {{ 'search' | localize(locale) }}
        </button>
      </form>

      <ul class="about__stores-address">
        <li v-if="visible.length === 0" class="about__stores-not_found">
          {{ 'about_store_not_found' | localize(locale) }}
        </li>

        <li v-for="(item, index) in visible" v-else :key="item.id" class="about__stores-item">
          <div class="about__stores-num">
            0{{ index + 1 }}
          </div>

          <div class="about__stores-addressName">
            <div class="about__stores-addressTitle">
              {{ item.title }}
            </div>

            <div class="about__stores-addressAddress">
              {{ item.address }}
            </div>
          </div>
        </li>
      </ul>

      <nuxt-link class="about__stores-button btn btn--green btn--lg3" to="/stores">
        {{ 'about_store_more' | localize(locale) }}
      </nuxt-link>
    </div>

    <div class="about__stores-map grid--right">
      <div ref="map"/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Store',
  data: () => ({
    country: '',
    isFocus: false,
    stores: [],

    visible: []
  }),
  async created () {
    await this.$store.dispatch('stores/getAllStores')
    this.stores = await this.$store.getters['stores/getAllStores'].list

    this.visible = this.stores.slice(0, 4)
  },
  methods: {
    blurHandler () {
      if (this.country) {
        return
      }

      this.isFocus = false
    },
    submitHandler () {
      this.visible = this.stores.filter(store => store.country.toLowerCase().includes(this.country.toLowerCase()))
    }
  }
}
</script>
