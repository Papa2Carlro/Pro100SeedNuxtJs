<template>
  <section v-if="!loader" class="story">
    <div class="story__main">
      <div class="story__description">
        <div class="story__info">
          <div class="story__subTitle">
            {{ 'card_story_of' | localize(locale) }} {{ product.name }}
          </div>
          <div class="story__editor" v-html="product.description.html[locale]"/>
        </div>

        <div v-if="product.description.image" class="story__image">
          <img :src="product.description.image" alt="">
        </div>
      </div>

      <div class="story__comments-wrapper">
        <div ref="comments" class="story__comments">
          <div class="story__comments-slider" :style="`transform: translate(${commentPosition}px, 0)`">
            <div v-for="comment in comments" :key="comment.id" class="story__comments-body">
              <ul class="story__comments-rate">
                <li v-for="star in comment.rate" :key="star" class="story__comments-item">
                  <img src="~/static/image/rate/star.svg" alt="">
                </li>

                <li v-for="star in 5 - comment.rate" :key="star" class="story__comments-item">
                  <img src="~/static/image/rate/empty-star.svg" alt="">
                </li>
              </ul>

              <div class="story__comments-text" v-html="comment.body"/>

              <div class="story__comments-avatar">
                <div class="story__comments-name">
                  {{ comment.author.name }}
                </div>
              </div>
            </div>
          </div>

          <div class="story__comments-control">
            <div class="story__comments-action" :class="{isDisabled: leftDisabled}" @click="leftArrow">
              <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.93934 10.9393ZM3 10.5H2L2 13.5H3V10.5Z"
                  fill="white"
                />
              </svg>
            </div>

            <div class="story__comments-action" :class="{isDisabled: rightDisabled}" @click="rightArrow">
              <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.0607 10.9393C13.6464 11.5251 13.6464 12.4749 13.0607 13.0607L3.51472 22.6066C2.92893 23.1924 1.97919 23.1924 1.3934 22.6066C0.807611 22.0208 0.807611 21.0711 1.3934 20.4853L9.87868 12L1.3934 3.51472C0.807611 2.92893 0.807611 1.97919 1.3934 1.3934C1.97919 0.807611 2.92893 0.807611 3.51472 1.3934L13.0607 10.9393ZM11 10.5H12V13.5H11V10.5Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>

        <div v-if="commentsVisible" class="story__comments-btn btn btn--default btn--fluid1" @click="openModalHandler">
          {{ 'comparison_leave_comment' | localize(locale) }}
        </div>
      </div>
    </div>

    <nuxt-link to="/shop" class="story__backHome btn btn--default btn--lg">
      {{ 'card_back_to_shop' | localize(locale) }}
    </nuxt-link>

    <Comment :is-open="isOpen" class-name="comment" @close="closeModal"/>
  </section>
</template>

<script>
import Comment from '@/components/modals/Comment'

export default {
  name: 'Story',
  components: {Comment},
  data: () => ({
    commentWidth: 0,
    commentPosition: 0,
    commentsCount: 1,

    isOpen: false,
    loader: true,

    product: {},
    comments: [],
    commentsVisible: false,

    user: {},

    leftDisabled: true,
    rightDisabled: false
  }),
  async created () {
    const user = await this.$cookies.get('referral')
    const products = await this.$store.getters['product/getProducts']
    this.comments = await this.$store.getters['comment/getComments']

    if (products.length === 0) { await this.getProducts() }

    if (user) {
      if (this.$store.getters['user/getUser'].email !== user.email) { await this.$store.dispatch('user/getUser') }

      this.user = await this.$store.getters['user/getUser']
      if (this.user.email) { this.commentsVisible = true }
    }

    await this.getProduct()
    this.loader = false
  },
  mounted () {
    setInterval(this.slider, 1000)
  },
  beforeDestroy () {
    clearInterval(this.slider)
  },
  methods: {
    openModalHandler () {
      this.isOpen = true
      document.body.classList.add('lock-modal')
    },
    closeModal () {
      this.isOpen = false
      document.body.classList.remove('lock-modal')
    },

    slider () {
      if (this.$refs.comments) {
        if (this.commentsCount > 1) { this.commentPosition = -((this.commentsCount - 1) * this.commentWidth) }
        this.commentWidth = this.$refs.comments.offsetWidth
      }
    },
    async getProducts () {
      await this.$store.dispatch('product/getProducts')
    },
    async getProduct () {
      try {
        await this.$store.commit('product/setProduct', this.$route.params.title)
        this.product = await this.$store.getters['product/getProduct']
        // this.comments = this.product.comments
      } catch (err) {
        console.log(err)
      }
    },
    arrowDisabled () {
      if (this.commentsCount === 1) {
        this.leftDisabled = true
        this.rightDisabled = false
      } else if (this.commentsCount === this.comments.length) {
        this.leftDisabled = false
        this.rightDisabled = true
      } else {
        this.leftDisabled = false
        this.rightDisabled = false
      }
    },
    leftArrow () {
      if (this.commentsCount === 1) { return }

      this.commentsCount--
      this.commentPosition = this.commentPosition + this.commentWidth
      this.arrowDisabled()
    },
    rightArrow () {
      if (this.commentsCount === this.comments.length) { return }

      this.commentsCount++
      this.commentPosition = this.commentPosition - this.commentWidth
      this.arrowDisabled()
    }
  }
}
</script>
