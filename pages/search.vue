<template>
  <div>
    <Loader v-if="loader" color="#282932" />

    <section v-else class="search">
      <div class="search__body" :class="{'search__body--result': result.length > 0}">
        <form class="search__body-input" @submit.prevent="searchHandler">
          <input ref="search" v-model="search" :placeholder="'search_placeholder' | localize(locale)" type="text" class="search__body-search">

          <button type="submit" class="search__body-submit">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39 19V21H0V19L39 19Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M39.6068 20.7071C39.9974 20.3166 39.9974 19.6834 39.6068 19.2929L38.8997 18.5858L29.0002 8.68629L27.586 10.1005L37.4855 20L27.586 29.8995L29.0002 31.3137L38.8997 21.4142L39.6068 20.7071Z" fill="white"/>
            </svg>
          </button>
        </form>

        <div class="search__body-result">
          <div class="search__filter">
            <div class="search__filter-counter">
              {{ 'search_on_request' | localize(locale) }} {{ result.length }}
              <span v-if="result.length === 1">{{ 'search_item' | localize(locale) }}</span>
              <span v-else>{{ 'search_items' | localize(locale) }}</span>
            </div>

            <div class="search__filter-body">
              <div class="search__filter-title">
                {{ 'search_show_only' | localize(locale) }}:
              </div>

              <div class="search__filters">
                <div class="search__filters-title">
                  {{ 'search_genetics' | localize(locale) }}:
                </div>

                <ul class="search__filters-list">
                  <li
                    v-for="filter in genetic.slice(0, 3)"
                    :key="filter._id"
                    class="search__filters-item isGenetic"
                    :class="{isActive: filter.isActive}"
                    @click="openModalHandler"
                  >
                    <div class="search__filters-text">
                      {{ filter.name.en.slice(0, 3) }}
                    </div>

                    <svg
                      class="search__filters-bg isSvg"
                      width="40"
                      height="47"
                      viewBox="0 0 52 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M49.0526 14.8728L27.9136 2.23462C26.6429 1.47496 25.0566 1.4792 23.7901 2.24566L2.92908 14.8697C1.7316 15.5943 1 16.8922 1 18.2918V42.2735C1 43.6993 1.75889 45.0172 2.99197 45.733L23.8526 57.8415C25.0878 58.5584 26.6115 58.5624 27.8505 57.852L48.9899 45.7295C50.2332 45.0165 51 43.6928 51 42.2595V18.306C51 16.8987 50.2605 15.5949 49.0526 14.8728Z" stroke-width="3"/>
                    </svg>
                  </li>

                  <li class="search__filters-item isDefault isGenetic" @click="openModalHandler">
                    <div class="search__filters-text">
                      + {{ geneticCol }}
                    </div>

                    <svg
                      class="search__filters-bg isSvg"
                      width="40"
                      height="47"
                      viewBox="0 0 52 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M49.0526 14.8728L27.9136 2.23462C26.6429 1.47496 25.0566 1.4792 23.7901 2.24566L2.92908 14.8697C1.7316 15.5943 1 16.8922 1 18.2918V42.2735C1 43.6993 1.75889 45.0172 2.99197 45.733L23.8526 57.8415C25.0878 58.5584 26.6115 58.5624 27.8505 57.852L48.9899 45.7295C50.2332 45.0165 51 43.6928 51 42.2595V18.306C51 16.8987 50.2605 15.5949 49.0526 14.8728Z" stroke-width="3"/>
                    </svg>
                  </li>
                </ul>
              </div>

              <div class="search__filters">
                <div class="search__filters-title">
                  {{ 'search_taste' | localize(locale) }}:
                </div>

                <ul class="search__filters-list">
                  <li
                    v-for="filter in taste.slice(0, 3)"
                    :key="filter._id"
                    class="search__filters-item"
                    :class="{isActive: filter.isActive}"
                    @click="openModalHandler"
                  >
                    <div class="search__filters-svg" v-html="filter.svg"/>

                    <div class="search__filters-bg isCircle"/>
                  </li>

                  <li class="search__filters-item isDefault" @click="openModalHandler">
                    <div class="search__filters-text">
                      + {{ tasteCol }}
                    </div>

                    <div class="search__filters-bg isCircle"/>
                  </li>
                </ul>
              </div>

              <div class="search__filters">
                <div class="search__filters-title">
                  {{ 'search_effect' | localize(locale) }}:
                </div>

                <ul class="search__filters-list">
                  <li
                    v-for="filter in effect.slice(0, 3)"
                    :key="filter._id"
                    class="search__filters-item"
                    :class="{isActive: filter.isActive}"
                    @click="openModalHandler"
                  >
                    <div class="search__filters-svg" v-html="filter.svg"/>

                    <div class="search__filters-bg isSquare"/>
                  </li>

                  <li class="search__filters-item isDefault" @click="openModalHandler">
                    <div class="search__filters-text">
                      + {{ effectCol }}
                    </div>

                    <div class="search__filters-bg isSquare"/>
                  </li>
                </ul>
              </div>
            </div>

            <div class="search__filter-btn btn btn--default" @click="openModalHandler">
              {{ 'search_change_filters' | localize(locale) }}
            </div>
          </div>

          <ul class="search__result">
            <Cart
              v-for="product in result"
              :id="product.id"
              :key="product.id"
              :name="product.name"
              :action="true"
              :pictures="product.pictures"
              :thc="product.general.thc"
              :productivity="product.general.productivity"
              :new-price="product.newPrice"
              :price="product.price"
            />
          </ul>
        </div>
      </div>

      <div class="search__bg">
        <img src="~/static/image/bg/bg-2.png" alt="">
      </div>
    </section>

    <Dialog
      :is-open="isOpen"
      :is-default="isDefault"
      @close="closeModal"

      @addGenetic="addGeneticHandler"
      @removeGenetic="removeGeneticHandler"

      @addTaste="addTasteHandler"
      @removeTaste="removeTasteHandler"

      @addEffect="addEffectHandler"
      @removeEffect="removeEffectHandler"

      @resetFilter="resetFilter"
    />
  </div>
</template>

<script>
import Cart from '@/components/product/Cart'
import Dialog from '@/components/modals/Filters'
import Mixins from '@/mixins/search.mixin'
import Loader from '~/components/ui/Loader'

export default {
  name: 'Search',
  components: {Dialog, Cart, Loader},
  mixins: [Mixins],
  data: () => ({
    loader: true,

    // filters
    genetic: [],
    geneticCol: undefined,

    taste: [],
    tasteCol: undefined,

    effect: [],
    effectCol: undefined,

    isOpen: false,

    search: '',
    result: []
  }),
  computed: {
    isDefault () {
      return this.$route.query.filter === 'home'
    }
  },
  async created () {
    const products = await this.$store.getters['product/getProducts']

    await this.$store.dispatch('filters/gettersGenetics')
    await this.$store.dispatch('filters/gettersTaste')
    await this.$store.dispatch('filters/gettersEffect')

    const genetic = this.$store.getters['filters/getGenetics']
    const {taste, effect} = this.$store.getters['filters/getOtherFilters']

    const [activeGenetic, activeTaste, activeEffect] = this.$store.getters['filters/getActiveFilter']

    genetic.map((item) => {
      const [active] = activeGenetic.filter(filter => item.filterId === filter.filterId)
      this.genetic.push({...item, isActive: !!active})
    })
    activeGenetic.map(item => this.geneticsFilter.push({type: 'genetics', value: item.filterId}))

    taste.map((item) => {
      const [active] = activeTaste.filter(filter => item.filterId === filter.filterId)
      this.taste.push({...item, isActive: !!active})
    })
    activeTaste.map(item => this.tasteFilter.push({type: 'taste', value: item.filterId}))

    effect.map((item) => {
      const [active] = activeEffect.filter(filter => item.filterId === filter.filterId)
      this.effect.push({...item, isActive: !!active})
    })
    activeEffect.map(item => this.tasteFilter.push({type: 'effect', value: item.filterId}))

    this.geneticCol = genetic.length - 3
    this.tasteCol = taste.length - 3
    this.effectCol = effect.length - 3

    if (products.length === 0) { await this.getProduct() }

    if (this.$route.query.filter === 'home') {
      await this.filterProduct()
    }

    this.loader = false
  },
  beforeDestroy () {
    this.$store.commit('filters/setActiveFilter', [[], [], []])
  },
  methods: {
    addGeneticHandler (item) {
      this.genetic.map((filter) => {
        if (item.filterId === filter.filterId) { filter.isActive = true }
      })

      this.geneticsFilter.push({type: 'genetics', value: item.filterId})
    },
    removeGeneticHandler (id) {
      this.genetic.map((filter) => {
        if (id === filter._id) {
          this.geneticsFilter = this.geneticsFilter.filter(item => item.value !== filter.filterId)
          this.deleteFilter({type: 'genetics', value: filter.filterId})
          filter.isActive = false
        }
      })
    },

    addTasteHandler (item) {
      this.taste.map((filter) => {
        if (item.filterId === filter.filterId) { filter.isActive = true }
      })

      this.tasteFilter.push({type: 'taste', value: item.filterId})
    },
    removeTasteHandler (id) {
      this.taste.map((filter) => {
        if (id === filter._id) {
          this.tasteFilter = this.tasteFilter.filter(item => item.value !== filter.filterId)
          this.deleteFilter({type: 'taste', value: filter.filterId})
          filter.isActive = false
        }
      })
    },

    addEffectHandler (item) {
      this.effect.map((filter) => {
        if (item.filterId === filter.filterId) { filter.isActive = true }
      })

      this.effectFilter.push({type: 'effect', value: item.filterId})
    },
    removeEffectHandler (id) {
      this.effect.map((filter) => {
        if (id === filter._id) {
          this.effectFilter = this.effectFilter.filter(item => item.value !== filter.filterId)
          this.deleteFilter({type: 'effect', value: filter.filterId})
          filter.isActive = false
        }
      })
    },

    openModalHandler () {
      this.isOpen = true
      document.body.classList.add('lock-modal')
    },
    closeModal () {
      this.isOpen = false
      document.body.classList.remove('lock-modal')
    },
    resetFilter () {
      this.genetic.map(item => item.isActive = false)
      this.taste.map(item => item.isActive = false)
      this.effect.map(item => item.isActive = false)

      this.result = []
      this.fem = []
      this.searchList = []
      this.height = []
      this.power = []
      this.variety = []
      this.place = []
      this.exclusive = []
      this.geneticsList = []
      this.tasteList = []
      this.effectList = []
      this.geneticsFilter = []
      this.tasteFilter = []
      this.effectFilter = []
    },

    async getProduct () {
      await this.$store.dispatch('product/getProducts')
    },

    searchHandler () {
      if (this.filterProducts.length > 0) {
        this.result = this.filterProducts.filter(product => product.name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        this.result = this.product.filter(product => product.name.toLowerCase().includes(this.search.toLowerCase()))
      }

      this.$refs.search.blur()
    }
  }
}
</script>
