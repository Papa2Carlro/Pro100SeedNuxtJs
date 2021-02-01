<template>
  <section class="home-search">
    <div class="home-search__wrapper">
      <div class="home__container">
        <SectionHeader :title="'home_seed_search_seeds' | localize(locale)">
          {{ 'home_seed_info' | localize(locale) }}
        </SectionHeader>

        <div class="home-search__categories-title">
          {{ 'home_seed_title' | localize(locale) }}:
        </div>

        <div class="home-search__categories">
          <ul class="home-search__categories-list">
            <li
              v-for="category in categories"
              :key="category.id"
              class="home-search__categories-item"
              :class="{isActive: category.isActive}"
              @click="filterCategoryHandler(category.id)"
            >
              <span v-if="typeof category.key === 'object'">{{ category.key[locale] }}</span>
              <span v-else>{{ category.key | localize(locale) }}</span>
            </li>
          </ul>
        </div>

        <div class="home-search__main">
          <div class="home-search__main-filters">
            <div class="filter">
              <div class="filter__group">
                <div class="filter__group-title">
                  {{ 'home_seed_genetic' | localize(locale) }}
                </div>

                <ul class="filter__group-list">
                  <li v-for="filter in genetic" :key="filter.id" class="filter__item" @click="openModalHandler">
                    <div class="filter__item-info">
                      <div class="filter__item-title">
                        {{ filter.name.en.slice(0,3) }}
                      </div>

                      <div class="filter__item-text">
                        {{ filter.name[locale] }}
                      </div>
                    </div>

                    <svg
                      class="filter__bg"
                      viewBox="0 0 82 92"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M77.578 20.7578L45.3574 1.72126C42.5186 0.0440533 38.99 0.053445 36.1602 1.74574L4.38077 20.7506C1.66355 22.3755 0 25.3087 0 28.4747V64.4113C0 67.6357 1.72495 70.6138 4.52189 72.2182L36.3004 90.4468C39.0594 92.0294 42.4487 92.0382 45.2159 90.47L77.4373 72.21C80.2572 70.612 82 67.6211 82 64.38V28.5064C82 25.3233 80.3186 22.377 77.578 20.7578Z"
                      />
                    </svg>
                  </li>

                  <li class="filter__item">
                    <svg
                      class="filter__bg filter__bg--add"
                      width="82"
                      height="94"
                      viewBox="0 0 82 94"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      @click="openModalHandler"
                    >
                      <path
                        d="M44.8488 3.58222L77.0694 22.6188C79.5054 24.058 81 26.677 81 29.5064V65.38C81 68.261 79.4508 70.9195 76.9443 72.34L44.7228 90.6C42.2631 91.9939 39.2504 91.9861 36.798 90.5794L5.01946 72.3507C2.53329 70.9246 1 68.2775 1 65.4113V29.4747C1 26.6605 2.47871 24.0532 4.89402 22.6088L36.6734 3.60398C39.1888 2.09972 42.3254 2.09137 44.8488 3.58222Z"
                        stroke="#fff"
                        stroke-width="2"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M40 28C39.4477 28 39 28.4477 39 29V47H23C22.4477 47 22 47.4477 22 48C22 48.5523 22.4477 49 23 49H39V65C39 65.5523 39.4477 66 40 66C40.5523 66 41 65.5523 41 65V49H59C59.5523 49 60 48.5523 60 48C60 47.4477 59.5523 47 59 47H41V29C41 28.4477 40.5523 28 40 28Z"
                        fill="#fff"
                      />
                    </svg>
                  </li>
                </ul>
              </div>

              <div class="filter__group">
                <div class="filter__group-title">
                  {{ 'home_seed_taste' | localize(locale) }}
                </div>

                <ul class="filter__group-list">
                  <li v-for="filter in taste" :key="filter.id" class="filter__item filter__item--image" @click="openModalHandler">
                    <div class="filter__item-image" v-html="filter.svg"/>

                    <svg
                      class="filter__bg"
                      viewBox="0 0 82 92"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M77.578 20.7578L45.3574 1.72126C42.5186 0.0440533 38.99 0.053445 36.1602 1.74574L4.38077 20.7506C1.66355 22.3755 0 25.3087 0 28.4747V64.4113C0 67.6357 1.72495 70.6138 4.52189 72.2182L36.3004 90.4468C39.0594 92.0294 42.4487 92.0382 45.2159 90.47L77.4373 72.21C80.2572 70.612 82 67.6211 82 64.38V28.5064C82 25.3233 80.3186 22.377 77.578 20.7578Z"
                      />
                    </svg>
                  </li>

                  <li class="filter__item">
                    <svg
                      class="filter__bg filter__bg--add"
                      width="82"
                      height="94"
                      viewBox="0 0 82 94"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      @click="openModalHandler"
                    >
                      <path
                        d="M44.8488 3.58222L77.0694 22.6188C79.5054 24.058 81 26.677 81 29.5064V65.38C81 68.261 79.4508 70.9195 76.9443 72.34L44.7228 90.6C42.2631 91.9939 39.2504 91.9861 36.798 90.5794L5.01946 72.3507C2.53329 70.9246 1 68.2775 1 65.4113V29.4747C1 26.6605 2.47871 24.0532 4.89402 22.6088L36.6734 3.60398C39.1888 2.09972 42.3254 2.09137 44.8488 3.58222Z"
                        stroke="#fff"
                        stroke-width="2"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M40 28C39.4477 28 39 28.4477 39 29V47H23C22.4477 47 22 47.4477 22 48C22 48.5523 22.4477 49 23 49H39V65C39 65.5523 39.4477 66 40 66C40.5523 66 41 65.5523 41 65V49H59C59.5523 49 60 48.5523 60 48C60 47.4477 59.5523 47 59 47H41V29C41 28.4477 40.5523 28 40 28Z"
                        fill="#fff"
                      />
                    </svg>
                  </li>
                </ul>
              </div>

              <div class="filter__group">
                <div class="filter__group-title">
                  {{ 'home_seed_effect' | localize(locale) }}
                </div>

                <ul class="filter__group-list">
                  <li v-for="filter in effect" :key="filter.id" class="filter__item filter__item--image" @click="openModalHandler">
                    <div class="filter__item-image" v-html="filter.svg"/>

                    <svg
                      class="filter__bg"
                      viewBox="0 0 82 92"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M77.578 20.7578L45.3574 1.72126C42.5186 0.0440533 38.99 0.053445 36.1602 1.74574L4.38077 20.7506C1.66355 22.3755 0 25.3087 0 28.4747V64.4113C0 67.6357 1.72495 70.6138 4.52189 72.2182L36.3004 90.4468C39.0594 92.0294 42.4487 92.0382 45.2159 90.47L77.4373 72.21C80.2572 70.612 82 67.6211 82 64.38V28.5064C82 25.3233 80.3186 22.377 77.578 20.7578Z"
                      />
                    </svg>
                  </li>

                  <li class="filter__item">
                    <svg
                      class="filter__bg filter__bg--add"
                      width="82"
                      height="94"
                      viewBox="0 0 82 94"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      @click="openModalHandler"
                    >
                      <path
                        d="M44.8488 3.58222L77.0694 22.6188C79.5054 24.058 81 26.677 81 29.5064V65.38C81 68.261 79.4508 70.9195 76.9443 72.34L44.7228 90.6C42.2631 91.9939 39.2504 91.9861 36.798 90.5794L5.01946 72.3507C2.53329 70.9246 1 68.2775 1 65.4113V29.4747C1 26.6605 2.47871 24.0532 4.89402 22.6088L36.6734 3.60398C39.1888 2.09972 42.3254 2.09137 44.8488 3.58222Z"
                        stroke="#fff"
                        stroke-width="2"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M40 28C39.4477 28 39 28.4477 39 29V47H23C22.4477 47 22 47.4477 22 48C22 48.5523 22.4477 49 23 49H39V65C39 65.5523 39.4477 66 40 66C40.5523 66 41 65.5523 41 65V49H59C59.5523 49 60 48.5523 60 48C60 47.4477 59.5523 47 59 47H41V29C41 28.4477 40.5523 28 40 28Z"
                        fill="#fff"
                      />
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="home-search__main-search btn btn--green btn--lg4" @click="searchHandler">
            {{ 'search' | localize(locale) }}
          </div>
        </div>
      </div>
    </div>

    <Dialog
      :is-open="isOpen"
      @close="closeModal"

      @addGenetic="addGeneticHandler"
      @removeGenetic="removeGeneticHandler"

      @addTaste="addTasteHandler"
      @removeTaste="removeTasteHandler"

      @addEffect="addEffectHandler"
      @removeEffect="removeEffectHandler"

      @resetFilter="resetFilter"
    />
  </section>
</template>

<script>
import SectionHeader from '@/components/ui/SectionHeader'
import Dialog from '@/components/modals/Filters'

import Modal from '@/mixins/modal.mixin'

export default {
  name: 'SearchSeeds',
  components: {
    Dialog,
    SectionHeader
  },
  mixins: [Modal],
  data: () => ({
    categories: [
      {id: 1, isActive: false, key: 'home_seed_autofeminized', filter: 'fem', value: 'autofeminized'},
      {id: 2, isActive: false, key: 'home_seed_feminized', filter: 'fem', value: 'feminized'},
      {id: 3, isActive: false, key: 'home_seed_small', filter: 'height', value: 'small'},
      {id: 4, isActive: false, key: 'home_seed_medium', filter: 'height', value: 'medium'},
      {id: 5, isActive: false, key: 'home_seed_big', filter: 'height', value: 'big'},
      {id: 6, isActive: false, key: 'home_seed_strong', filter: 'power', value: 'strong'},
      {id: 7, isActive: false, key: 'home_seed_normal', filter: 'power', value: 'normal'},
      {id: 8, isActive: false, key: 'home_seed_light', filter: 'power', value: 'light'},
      {id: 9, isActive: false, key: 'home_seed_for-newbies', filter: 'power', value: 'for-newbies'},
      {id: 10, isActive: false, key: 'home_seed_indoor', filter: 'place', value: 'indoor'},
      {id: 11, isActive: false, key: 'home_seed_outdoor', filter: 'place', value: 'outdoor'},
      {id: 12, isActive: false, key: 'home_seed_exclusive', filter: 'exclusive', value: true}
    ],

    genetic: [],
    taste: [],
    effect: [],

    form: {
      categories: []
    },

    isOpen: false
  }),
  computed: {
    filtersList () {
      return this.filters.filter(x => x.type !== 'add')
    }
  },
  async created () {
    await this.$axios.$get('/api/filters/variety')
      .then((res) => {
        if (res.ok) {
          res.body.map(filter => this.categories.push({
            id: this.categories.length + 1,
            isActive: false,
            key: filter.name,
            filter: 'variety',
            value: filter.filterId}))
        }
      })
      .catch(err => console.log(err))
  },
  methods: {
    async searchHandler () {
      const filter = []

      await this.categories.map((item) => { if (item.isActive) { filter.push({type: item.filter, value: item.value}) } })
      await this.genetic.map(item => filter.push({type: 'genetics', value: item.filterId}))
      await this.taste.map(item => filter.push({type: 'taste', value: item.filterId}))
      await this.effect.map(item => filter.push({type: 'effect', value: item.filterId}))

      if (filter.length > 0) {
        await this.$store.commit('filters/setFilterBody', filter)
        await this.$store.commit('filters/setActiveFilter', [this.genetic, this.taste, this.effect])

        await this.$router.push('/search?filter=home')
      }
    },
    filterCategoryHandler (id) {
      this.categories.map((category) => {
        if (category.id === id) {
          if (category.isActive) {
            category.isActive = false

            this.form.categories = this.form.categories.filter(filter => filter !== category.filter)
          } else {
            category.isActive = true
            this.form.categories.push(category.filter)
          }
        }
      })
    }
  }
}
</script>
