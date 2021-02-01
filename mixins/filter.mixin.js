import localize from '@/filters/localize.filter'

export default {
  data: () => ({
    filters: [
      {
        title: 'filter_tgc',
        value: '',
        isFocus: false,
        isOpen: false,
        body: [
          {
            isActive: true,
            label: 'filter_unknown',
            value: ''
          },
          {
            isActive: false,
            label: 'filter_thc_low',
            value: 'pro10'
          },
          {
            isActive: false,
            label: 'filter_thc_average',
            value: 'pro15'
          },
          {
            isActive: false,
            label: 'filter_thc_high',
            value: 'pro20'
          },
          {
            isActive: false,
            label: 'filter_thc_high_very',
            value: 'pro25'
          }
        ]
      },
      {
        title: 'filter_yield',
        value: '',
        isFocus: false,
        isOpen: false,
        body: [
          {
            isActive: true,
            label: 'filter_unknown',
            value: ''
          },
          {
            isActive: false,
            label: 'filter_low',
            value: 'low'
          },
          {
            isActive: false,
            label: 'filter_average',
            value: 'average'
          },
          {
            isActive: false,
            label: 'filter_high',
            value: 'high'
          }
        ]
      },
      {
        title: 'filter_plant_height',
        value: '',
        isFocus: false,
        isOpen: false,
        body: [
          {
            isActive: true,
            label: 'filter_unknown',
            value: ''
          },
          {
            isActive: false,
            label: 'filter_low',
            value: 'small'
          },
          {
            isActive: false,
            label: 'filter_average',
            value: 'medium'
          },
          {
            isActive: false,
            label: 'filter_high',
            value: 'big'
          }
        ]
      },
      {
        title: 'filter_bloom',
        value: '',
        isFocus: false,
        isOpen: false,
        body: [
          {
            isActive: true,
            label: 'filter_unknown',
            value: ''
          },
          {
            isActive: false,
            label: 'filter_auto_flowering',
            value: 'auto flowering'
          },
          {
            isActive: false,
            label: 'filter_photo_flowering',
            value: 'photo flowering'
          }
        ]
      },
      {
        title: 'filter_genetics',
        value: '',
        isFocus: false,
        isOpen: false,
        body: [
          {
            isActive: true,
            label: 'filter_unknown',
            value: ''
          }
        ]
      }
    ],

    thc: '',
    productivity: '',
    height: '',
    bloom: '',
    genetic: '',

    openPanel: false
  }),
  async created () {
    await this.$store.dispatch('filters/gettersGenetics')
    const genetics = await this.$store.getters['filters/getGenetics']

    this.filters.map((filter) => {
      if (filter.title === 'filter_genetics') {
        genetics.map((item) => {
          filter.body.push({
            isActive: false,
            label: item.name,
            value: item.filterId
          })
        })
      }
    })
  },
  mounted () {
    this.$nextTick(function () {
      this.resizeHandler()
    })
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  watch: {
    thc () {
      switch (this.thc) {
        case 'pro10':
          this.productFilterByThc = this.products.filter((product) => {
            if (product.general.thc.to) {
              return product.general.thc.from < 10 || product.general.thc.to < 10
            } else {
              return product.general.thc.from < 10
            }
          })
          this.filterResultHandler()
          break
        case 'pro15':
          this.productFilterByThc = this.products.filter((product) => {
            if (product.general.thc.to) {
              return (product.general.thc.from > 10 || product.general.thc.to > 10) && (product.general.thc.from <= 15 || product.general.thc.to <= 15)
            } else {
              return product.general.thc.from > 10 && product.general.thc.from <= 15
            }
          })
          this.filterResultHandler()
          break
        case 'pro20':
          this.productFilterByThc = this.products.filter((product) => {
            if (product.general.thc.to) {
              return (product.general.thc.from > 15 || product.general.thc.to > 15) && (product.general.thc.from <= 20 || product.general.thc.to <= 20)
            } else {
              return product.general.thc.from > 15 && product.general.thc.from <= 20
            }
          })
          this.filterResultHandler()
          break
        case 'pro25':
          this.productFilterByThc = this.products.filter((product) => {
            if (product.general.thc.to) {
              return product.general.thc.from > 20 || product.general.thc.to > 20
            } else {
              return product.general.thc.from > 20
            }
          })
          this.filterResultHandler()
          break

        default:
          this.productFilterByThc = this.products
          this.filterResultHandler()
      }
    },
    productivity () {
      if (this.productivity) {
        this.productFilterByProductivity = this.products.filter(product => product.general.harvest.filter === this.productivity)
        this.filterResultHandler()
      } else {
        this.productFilterByProductivity = this.products
        this.filterResultHandler()
      }
    },
    height () {
      if (this.height) {
        this.productFilterByHeight = this.products.filter(product => product.general.height.filter === this.height)
        this.filterResultHandler()
      } else {
        this.productFilterByHeight = this.products
        this.filterResultHandler()
      }
    },
    bloom () {
      if (this.bloom) {
        this.productFilterByBloom = this.products.filter(product => product.general.bloom === this.bloom)
        this.filterResultHandler()
      } else {
        this.productFilterByBloom = this.products
        this.filterResultHandler()
      }
    },
    genetic () {
      if (this.genetic) {
        this.productFilterByGenetic = this.products.filter(product => product.general.genetics === this.genetic)
        this.filterResultHandler()
      } else {
        this.productFilterByGenetic = this.products
        this.filterResultHandler()
      }
    }
  },
  methods: {
    openFilter (event) {
      const target = event.target.closest('.pd-filter__list-item')

      if (target) {
        this.filters.map((filter) => {
          if (filter.title === target.dataset.title) {
            if (filter.isOpen) {
              if (!filter.value) {
                filter.isFocus = false
              }

              filter.isOpen = false
            } else {
              filter.isFocus = true
              filter.isOpen = true
            }
          } else {
            if (!filter.value) {
              filter.isFocus = false
            }

            filter.isOpen = false
          }
        })
      } else {
        this.filters.map((filter) => {
          if (!filter.value) {
            filter.isFocus = false
          }

          filter.isOpen = false
        })
      }
    },
    changeHandler (title, label, value) {
      switch (title) {
        case 'filter_tgc':
          this.thc = value
          break
        case 'filter_yield':
          this.productivity = value
          break
        case 'filter_plant_height':
          this.height = value
          break
        case 'filter_bloom':
          this.bloom = value
          break
        case 'filter_genetics':
          this.genetic = value
          break
      }

      this.filters.map((filter) => {
        if (filter.title === title) {
          filter.value = label !== 'filter_unknown' ? typeof label === 'object' ? label[this.locale] : localize(label, this.locale) : ''

          filter.body.map(item => item.isActive = item.label === label)
        }
      })
    },
    cleanFilter () {
      this.thc = ''
      this.productivity = ''
      this.height = ''
      this.bloom = ''
      this.genetic = ''

      this.filters.map((filter) => {
        filter.value = ''

        filter.body.map(item => item.isActive = false)
      })

      this.setPagination(this.products)
    },
    closePanelHandler () {
      const body = document.body
      this.openPanel = false

      if (body.classList.contains('lock-panel')) {
        body.classList.remove('lock-panel')
      }
    },
    openPanelHandler () {
      this.openPanel = true
      document.body.classList.add('lock-panel')
    },
    resizeHandler () {
      if (document.body.offsetWidth > 992) {
        this.closePanelHandler()
      }
    },
    filterResultHandler () {
      const filters = [
        ...this.productFilterByThc,
        ...this.productFilterByProductivity,
        ...this.productFilterByHeight,
        ...this.productFilterByBloom,
        ...this.productFilterByGenetic
      ]
      const result = []

      for (let product of filters) {
        const items = filters.filter(products => products._id === product._id)

        if (items.length === 5) {
          result.push(product)
        }
      }

      result.length = result.length / 5
      this.productFilter = result
      this.setPagination(result)
    }
  }
}
