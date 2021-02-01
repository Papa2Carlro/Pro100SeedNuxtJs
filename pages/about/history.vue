<template>
  <section class="history">
    <div class="history__body" :style="{transform: `translate(${bodyPosition}vw, 0)`, height: height}">
      <HistoryBlock />

      <Pain />

      <Chiropractor />
    </div>

    <ul class="history__line">
      <li v-for="item in allPage" :key="item.id" class="history__line-item" :class="{isActive: item.isActive}">
        <div class="history__line-circle" @click="lineHandler(item.id)">
          <div class="history__line-year">
            {{ item.year }}
          </div>
        </div>
      </li>
    </ul>

    <div class="history__control">
      <div class="history__chevrons">
        <div class="history__chevrons-item" :class="{isDefault: leftButton}" @click="leftHandler">
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.93934 10.9393ZM3 10.5H2L2 13.5H3V10.5Z"
              fill="white"
            />
          </svg>
        </div>

        <div class="history__chevrons-item" :class="{isDefault: rightButton}" @click="rightHandler">
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.0607 10.9393C13.6464 11.5251 13.6464 12.4749 13.0607 13.0607L3.51472 22.6066C2.92893 23.1924 1.97919 23.1924 1.3934 22.6066C0.807611 22.0208 0.807611 21.0711 1.3934 20.4853L9.87868 12L1.3934 3.51472C0.807611 2.92893 0.807611 1.97919 1.3934 1.3934C1.97919 0.807611 2.92893 0.807611 3.51472 1.3934L13.0607 10.9393ZM11 10.5H12V13.5H11V10.5Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div class="history__count">
        <span class="history__count-now">{{ page }}</span>
        <span class="history__count-all">/ {{ allPage.length }}</span>
      </div>
    </div>

    <BackBtn url="/about" label="history_back" class-name="history__back" />
  </section>
</template>

<script>
import BackBtn from '@/components/ui/BackBtn'
import HistoryBlock from '@/components/history/History'
import Pain from '@/components/history/Pain'
import Chiropractor from '@/components/history/Chiropractor'

export default {
  name: 'History',
  components: {
    BackBtn, HistoryBlock, Pain, Chiropractor
  },
  data: () => ({
    interval: undefined,
    leftButton: true,
    rightButton: false,
    bodyPosition: 0,
    page: 1,
    height: '100%',
    allPage: [
      {
        year: '2011',
        id: '1',
        isActive: true
      },
      {
        year: '2013',
        id: '2',
        isActive: false
      },
      {
        year: '2014',
        id: '3',
        isActive: false
      }
    ]
  }),
  mounted () {
    this.interval = setInterval(() => {
      this.heightHandler(this.page)
    }, 1000)
  },
  beforeDestroy () {
    this.interval = null
  },
  methods: {
    initCounter (val) {
      this.rightButton = false
      this.leftButton = false

      if (val === '+') {
        if (this.page < this.allPage.length) {
          this.page++
          this.rightButton = false
        }

        if (+this.page === this.allPage.length) {
          this.rightButton = true
        }
      } else if (val === '-') {
        if (this.page > 1) {
          this.page--
          this.leftButton = false
        }
        if (this.page === 1) {
          this.leftButton = true
        }
      }
    },
    changeSlide (val) {
      if (val === '+') {
        if (!this.rightButton) {
          this.bodyPosition = this.bodyPosition - 100
        }
      } else if (val === '-') {
        if (!this.leftButton) {
          this.bodyPosition = this.bodyPosition + 100
        }
      }
    },
    changeSlideLine (page) {
      this.bodyPosition = +page === 1 ? 0 : `-${page - 1}00`
    },
    changeCircle (id) {
      // eslint-disable-next-line no-return-assign
      this.allPage.map(x => x.isActive = false)

      const thisCircle = this.allPage.filter(x => +x.id === +id)
      thisCircle[0].isActive = true
    },
    changeCounter (id) {
      if (+id === 1) {
        this.leftButton = true
        this.rightButton = false
      } else if (+id === this.allPage.length) {
        this.leftButton = false
        this.rightButton = true
      } else {
        this.leftButton = false
        this.rightButton = false
      }

      this.page = id
    },
    heightHandler (id) {
      const width = document.body.offsetWidth

      const heightChiropractor = document.body.querySelector('.chiropractor__info').offsetHeight
      const heightPain = document.body.querySelector('.pain__info').offsetHeight
      const heightOurHistory = document.body.querySelector('.our-history__info').offsetHeight

      const height = [heightOurHistory, heightPain, heightChiropractor]

      if (width <= 992) {
        if (this.height !== height[id - 1]) {
          this.height = `${height[id - 1]}px`
        }
      } else {
        this.height = '100%'
      }
    },

    // Click Handler
    lineHandler (id) {
      this.changeCircle(id)
      this.changeCounter(id)
      this.changeSlideLine(id)
    },
    leftHandler () {
      this.changeSlide('-')
      this.initCounter('-')
      this.changeCircle(this.page)
      this.heightHandler(this.page)
    },
    rightHandler () {
      this.changeSlide('+')
      this.initCounter('+')
      this.changeCircle(this.page)
      this.heightHandler(this.page)
    }
  }
}
</script>
