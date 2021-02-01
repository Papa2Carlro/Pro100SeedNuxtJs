<template>
  <ModalWrapper :is-open="isOpen" @close="closeModalHandler">
    <div class="dialog__header">
      <div class="dialog__header-title">
        {{ 'home_seed_search_seeds' | localize(locale) }}
      </div>

      <div class="dialog__header-close" @click="closeModalHandler">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M21.3338 4.36311L20.061 3.09032L12 11.1513L3.93898 3.09032L2.66619 4.36311L10.7272 12.4241L3.09045 20.0609L4.36325 21.3337L12 13.6969L19.6368 21.3337L20.9095 20.0609L13.2728 12.4241L21.3338 4.36311Z" fill="white"/>
        </svg>
      </div>
    </div>

    <div class="dialog__filters">
      <div class="dialog__group">
        <div class="dialog__group-title">
          {{ 'home_seed_filter_genetic' | localize(locale) }}
        </div>

        <ul class="dialog__group-body">
          <li
            v-for="filter in genetics"
            :key="filter._id"
            class="dialog__group-item"
            :class="{isActive: filter.isActive}"
            @click="geneticsHandler(filter)"
          >
            <div class="dialog__group-icon">
              <svg width="52" height="60" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.0526 14.8728L27.9136 2.23462C26.6429 1.47496 25.0566 1.4792 23.7901 2.24566L2.92908 14.8697C1.7316 15.5943 1 16.8922 1 18.2918V42.2735C1 43.6993 1.75889 45.0172 2.99197 45.733L23.8526 57.8415C25.0878 58.5584 26.6115 58.5624 27.8505 57.852L48.9899 45.7295C50.2332 45.0165 51 43.6928 51 42.2595V18.306C51 16.8987 50.2605 15.5949 49.0526 14.8728Z" stroke-width="2"/>
              </svg>

              <div class="dialog__group-abviotour">
                {{ filter.name.en.slice(0,3) }}
              </div>
            </div>

            <div class="dialog__group-name">
              {{ filter.name[locale] }}
            </div>
          </li>
        </ul>
      </div>

      <div class="dialog__group">
        <div class="dialog__group-title">
          {{ 'home_seed_filter_taste' | localize(locale) }}
        </div>

        <ul class="dialog__group-body">
          <li
            v-for="filter in taste"
            :key="filter._id"
            class="dialog__group-item"
            :class="{isActive: filter.isActive}"
            @click="tasteHandler(filter)"
          >
            <div class="dialog__group-bg dialog__group-bg--circle" v-html="filter.svg"/>

            <div class="dialog__group-name">
              {{ filter.name[locale] }}
            </div>
          </li>
        </ul>
      </div>

      <div class="dialog__group">
        <div class="dialog__group-title">
          {{ 'home_seed_filter_effect' | localize(locale) }}
        </div>

        <ul class="dialog__group-body">
          <li
            v-for="filter in effect"
            :key="filter._id"
            class="dialog__group-item"
            :class="{isActive: filter.isActive}"
            @click="effectHandler(filter)"
          >
            <div class="dialog__group-bg dialog__group-bg--square" v-html="filter.svg"/>

            <div class="dialog__group-name">
              {{ filter.name[locale] }}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="dialog__footer">
      <div class="dialog__footer-reset" @click="resetFilterHandler">
        {{ 'home_seed_filter_reset' | localize(locale) }}
      </div>

      <div class="dialog__footer-btn btn btn--default btn--lg4" @click="closeModalHandler">
        {{ 'cancel' | localize(locale) }}
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '@/components/ui/Modal'

export default {
  name: 'Dialog',
  components: {ModalWrapper},
  props: ['isOpen', 'isDefault'],
  data: () => ({
    genetics: [],
    taste: [],
    effect: []
  }),
  async created () {
    await this.$store.dispatch('filters/gettersGenetics')
    await this.$store.dispatch('filters/gettersTaste')
    await this.$store.dispatch('filters/gettersEffect')

    const genetics = await this.$store.getters['filters/getGenetics']
    const {taste, effect} = await this.$store.getters['filters/getOtherFilters']

    if (this.isDefault) {
      const [activeGenetic, activeTaste, activeEffect] = this.$store.getters['filters/getActiveFilter']

      genetics.map((filter) => {
        const [active] = activeGenetic.filter(item => item.filterId === filter.filterId)
        this.genetics.push({...filter, isActive: !!active})
      })
      taste.map((filter) => {
        const [active] = activeTaste.filter(item => item.filterId === filter.filterId)
        this.taste.push({...filter, isActive: !!active})
      })
      effect.map((filter) => {
        const [active] = activeEffect.filter(item => item.filterId === filter.filterId)
        this.effect.push({...filter, isActive: !!active})
      })
    } else {
      genetics.map(filter => this.genetics.push({...filter, isActive: false}))
      taste.map(filter => this.taste.push({...filter, isActive: false}))
      effect.map(filter => this.effect.push({...filter, isActive: false}))
    }
  },
  methods: {
    closeModalHandler () {
      this.$emit('close')
    },

    geneticsHandler (item) {
      this.genetics.map((filter) => {
        if (filter._id === item._id) {
          if (filter.isActive) {
            this.$emit('removeGenetic', item._id)
            filter.isActive = false
          } else {
            this.$emit('addGenetic', item)
            filter.isActive = true
          }
        }
      })
    },
    tasteHandler (item) {
      this.taste.map((filter) => {
        if (filter._id === item._id) {
          if (filter.isActive) {
            this.$emit('removeTaste', item._id)
            filter.isActive = false
          } else {
            this.$emit('addTaste', item)
            filter.isActive = true
          }
        }
      })
    },
    effectHandler (item) {
      this.$emit('effect', item)

      this.effect.map((filter) => {
        if (filter._id === item._id) {
          if (filter.isActive) {
            this.$emit('removeEffect', item._id)
            filter.isActive = false
          } else {
            this.$emit('addEffect', item)
            filter.isActive = true
          }
        }
      })
    },

    resetFilterHandler () {
      this.genetics.map(filter => filter.isActive = false)
      this.taste.map(filter => filter.isActive = false)
      this.effect.map(filter => filter.isActive = false)

      this.$emit('resetFilter')
    }
  }
}
</script>
