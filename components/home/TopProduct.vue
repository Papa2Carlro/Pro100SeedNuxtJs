<template>
  <section class="home-top">
    <div class="home__container">
      <SectionHeader :title="'home_top_title' | localize(locale)">
        {{ 'home_top_info' | localize(locale) }}
      </SectionHeader>

      <ul
        ref="slider"
        class="home-top__catalog"
        :class="{isAnimate: isAnimate, isGrab: sliderStart}"
        :style="`transform: translate(${sliderPosition}px, 0px);`"

        @mousedown="sliderDown"
        @mouseup="sliderUp"
        @mousemove="sliderMove"
        @mouseout="sliderUp"

        @touchstart="sliderDown"
        @touchmove="sliderMobileMove"
        @touchend="sliderUp"
        @touchcancel="sliderUp"
      >
        <Cart
          v-for="product in products"
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
  </section>
</template>

<script>
import Cart from '@/components/product/Cart'
import SectionHeader from '@/components/ui/SectionHeader'

export default {
  name: 'TopProduct',
  components: {
    SectionHeader,
    Cart
  },
  data: () => ({
    products: [],

    // Slider
    sliderPosition: 0,
    sliderWidth: 0,
    sliderStart: false,
    startSliderPosition: 0,
    isAnimate: false,
    startMove: 0,

    bodyWidth: 0
  }),
  async mounted () {
    this.products = await this.$store.getters['product/getTopProduct']

    this.bodyWidth = document.body.offsetWidth
    this.sliderWidth = this.$refs.slider.offsetWidth

    this.$nextTick(function () {
      this.sliderResize()
    })
    window.addEventListener('resize', this.sliderResize)

    this.sliderPositionHandler()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.sliderResize)
  },
  methods: {
    sliderResize () {
      this.bodyWidth = document.body.offsetWidth

      this.sliderPositionHandler()
    },
    sliderPositionHandler () {
      if (this.bodyWidth > 1030) {
        this.sliderPosition = 0
      } else if (this.bodyWidth > 768) {
        this.sliderPosition = -((this.sliderWidth - this.bodyWidth) / 2)
      } else {
        this.sliderPosition = 10
      }
    },

    // Slider
    sliderDown (event) {
      if (this.bodyWidth < 1030) {
        const pageX = event.pageX || event.targetTouches[0].pageX

        this.startSliderPosition = pageX
        this.startMove = this.sliderPosition

        this.sliderStart = true
      }
    },
    sliderUp () {
      if (this.bodyWidth < 1030) {
        this.sliderStart = false
        const result = this.sliderWidth - this.bodyWidth

        if (this.sliderWidth > this.bodyWidth) {
          if (this.bodyWidth > 768) {
            if (this.sliderPosition > 0) {
              this.isAnimate = true
              this.sliderPosition = 25

              setTimeout(() => {
                this.isAnimate = false
              }, 300)
            } else if (this.sliderPosition < -result) {
              this.isAnimate = true
              this.sliderPosition = -result - 25

              setTimeout(() => {
                this.isAnimate = false
              }, 300)
            }
          } else if (this.bodyWidth < 768) {
            if (this.sliderPosition > 0) {
              this.isAnimate = true
              this.sliderPosition = 10

              setTimeout(() => {
                this.isAnimate = false
              }, 300)
            } else if (this.sliderPosition < -result) {
              this.isAnimate = true
              this.sliderPosition = -result - 10

              setTimeout(() => {
                this.isAnimate = false
              }, 300)
            }
          }
        } else {
          this.isAnimate = true
          this.sliderPosition = -((this.sliderWidth - this.bodyWidth) / 2)

          setTimeout(() => {
            this.isAnimate = false
          }, 300)
        }
      }
    },
    sliderMove (event) {
      if (this.bodyWidth < 1030) {
        if (!this.sliderStart) {
          return
        }

        const {pageX} = event
        const delta = -(this.startSliderPosition - pageX)

        this.sliderPosition = this.startMove + delta
      }
    },

    // Mobile
    sliderMobileMove (event) {
      if (this.bodyWidth < 1030) {
        if (!this.sliderStart) {
          return
        }

        const pageX = event.changedTouches[0].pageX
        const delta = -(this.startSliderPosition - pageX)

        this.sliderPosition = this.startMove + delta
      }
    }
  }
}
</script>
