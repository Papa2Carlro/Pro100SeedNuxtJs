<template>
  <div>
    <Loader v-if="loader" color="#272831"/>

    <section v-else class="stores">
      <div class="stores__body">
        <SectionHeader :title="'stores_title' | localize(locale)">
          {{ 'stores_info' | localize(locale) }}

          <div v-if="!counterHidden" class="stores__counter">
            <span class="active">
              {{ visible.length }}
            </span>
            <span>
              / {{ stores.list.length }}
            </span>
          </div>
        </SectionHeader>

        <div class="stores__body-filter">
          <div v-for="filter in filters" :key="filter[0].label" class="stores__body-group">
            <div
              v-for="item in filter"
              :key="item.label"
              class="stores__body-btn"
              :class="{isActive: item.isActive}"
              @click="filterHandler(item.label.toLowerCase())"
            >
              {{ item.label.toLowerCase() | localize(locale) }}
            </div>
          </div>

          <div v-if="!counterHidden" class="stores__body-counter">
            <span class="active">
              {{ visible.length }}
            </span>
            <span>
              / {{ stores.list.length }}
            </span>
          </div>
        </div>

        <ul class="stores__list">
          <li v-for="(store, index) in visible" :key="store.id" class="stores__list-item">
            <div class="stores__list-num">
              {{ 10 > index + 1 ? `0${index + 1}` : index + 1 }}
            </div>

            <div class="stores__list-info">
              <div class="stores__list-title">
                {{ store.title }}
              </div>

              <div class="stores__list-address">
                {{ store.address }}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="contacts__bg">
        <img src="~/static/image/bg/bg-1.png" alt="">
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import SectionHeader from '@/components/ui/SectionHeader'

export default {
  name: 'Stores',
  components: {SectionHeader, Loader},
  data: () => ({
    loader: true,
    counterHidden: true,

    filters: [
      [{label: 'All', isActive: true}]
    ],

    stores: [],
    visible: []
  }),
  async created () {
    await this.getStores()
    this.visible = this.stores.list

    const filterList = this.stores.country.map((filter) => {
      return {label: filter, isActive: false}
    })

    this.filters.push(filterList)

    this.loader = false
  },
  methods: {
    async getStores () {
      await this.$store.dispatch('stores/getAllStores')
      this.stores = this.$store.getters['stores/getAllStores']
    },

    // Filter
    resetBtn () {
      this.filters.map((group) => {
        // eslint-disable-next-line no-return-assign
        group.map(item => item.isActive = false)
      })
    },
    setCounter (filter) {
      this.counterHidden = filter === 'all'
    },
    setActive (filter) {
      this.filters.map((group) => {
        group.map((item) => {
          if (item.label.toLowerCase() === filter) {
            item.isActive = true
          }
        })
      })
    },
    filterStores (filter) {
      if (filter === 'all') {
        this.visible = this.stores.list
      } else {
        this.visible = this.stores.list.filter(x => x.country.toLowerCase() === filter)
      }
    },

    filterHandler (filter) {
      this.resetBtn()
      this.setActive(filter)
      this.setCounter(filter)
      this.filterStores(filter)
    }
  }
}
</script>
