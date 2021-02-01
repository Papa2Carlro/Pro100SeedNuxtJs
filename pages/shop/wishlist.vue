<template>
  <div>
    <Loader v-if="loader" color="#272831"/>

    <section v-else class="wishlist">
      <div class="wishlist__body">
        <SectionHeader :title="'wishlist_title' | localize(locale)">
          {{ 'wishlist_info' | localize(locale) }}
        </SectionHeader>

        <ul v-if="products.length > 0" class="wishlist__body-list">
          <Cart
            v-for="product in products"
            :id="product._id"
            :key="product._id"
            :action="false"
            :name="product.name"
            :pictures="product.pictures"
            :thc="product.general.thc"
            :productivity="product.general.productivity"
            :new-price="product.newPrice"
            :price="product.price"
            @remove="removeFavorite"
          />
        </ul>

        <div v-else class="wishlist__empty">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQuSURBVHgB7Vm/VxNBEJ74rFInrbSmVVsohVZasIQ/gBItgRYpiaXQQiuWYElsYwst1mlxvtw3Zj1jkt2dO/N89723b5fLsbffzuz8WpEGDRr8S7QkE4+PjwfarUg1GLZarSPJwBPJR1XkgJ5k4qk4QXf6rThCNeOTOMBDgksNNwl67bg3PCQ4lOpwJ8sCSNBDil7zGP77M5hNUHe7rW1TnKFzrooDsgjqIuADD7W94aMHyYfNsavzH2vrSgaSIxmS29fWlsIYnKkv/C4O0Lnh4He0gdxI25HOnWRwkghyV0Guo+1GP97n8/Z40lZrJA7Q+Xa1g6pivvc6b7SGpKooVBLkBgG5de2OtZ3q+Jk4gHMPpNCSHUlANEFKD7uK3TzjMxiZbS4EftFFgkSf8/X0O88lEikSfM0ekf4PnkUzMn1E/3guTqC6X/PPlxKJFIKWPdywN3IXupgbqQbf2EdnFzkE70sfnUtOpb0P0y/xMAsa7TJSCE6zlKN5aknHjc3oxDrx4FttiYRHNvFOCos6D5ulcVXq/BuyQzVIbp6Dp8SwCQ9snRSLmIK6gm2zfpfarjh2j1+noXKCjG6MIHykqWbPIp8qUYcEzcoOqc4wGJYkR/u1WNRB0M7aIHhmY5eQbhbqIGh+M8wGyj60MtRJ8D54ZllB5Wcwyw8iMpFCCjhXd2xfSmnNH4EBY1gMu6X5MNcLztnl/2ZVt3MdfTvoe2wbulBYystF8zdmKDsyXWUXCSL+ilwVPWcP6SCtQdQPUnDsB8wRxyGcjn8tNBg/8B3cb5gmfJZJigRcSgayJKgSGuoCYRFh7lehSlw8Mow1KXJEA86ixavdoLd3QAxSH/FCB1pxnZuheBgZ7DakBse9TV/3UZgMBwhDs3KwjXrOOcmB8ArnzJIe4BGLQpVOpFCpdS4QzxGS9YNX14LIJTxrSJKvWH5EDWZdJoWm7MTZ5W4CFS9dHCwdrCpIQmVPoV60llh4m7+h0GVnsM93QHhLCsm5kRuvTSJhZfVp12U8fyBpZwyLvOXfIB3mdQjXkIXALZivhFqeTCsRzvruLLjdLvHjILQXlPtAeCN4JXTs5lYMIPzBq+RocI1koJosSaSU3UH20Ktkb/C8H0R+ZwUoqNiAPUI0/FZeOIwQXACkCjWFCkOVUbLvqCSzLSjgQpDO2sid0SpCPbFokDPjYSo6trj8/ULbV7gJzgMrvKnjES1xFrwkGJ6zbXMVAcbGQ4qIBUAdx4wRzqvQ2obAxiwNQVjKMEAGYHCgokOThJEIjBHUFlKEhM11jGQSsmXDyw+eSwIYhlVaXXN1EwvA4/4wCrUSVIntSc1o7uinYBxp1FHyMwTX2NFRTgpBixN3c+/PFwE3cot/3kokUoLtckBdF2CgorOM1Dt6y9pfSfWVMSto9T0vVhs0aFAPfgL7e7J5RH6q9wAAAABJRU5ErkJggg=="
            alt=""
            class="wishlist__empty-icon"
          >

          <div class="wishlist__empty-text">
            {{ 'wishlist_empty' | localize(locale) }}
          </div>

          <nuxt-link to="/shop" class="wishlist__empty-link btn btn--green btn--lg1">
            {{ 'to_the_webshop' | localize(locale) }}
          </nuxt-link>
        </div>
      </div>

      <div class="wishlist__bg">
        <img src="~/static/image/bg/bg-1.png" alt="">
      </div>

      <FollowUs />
    </section>
  </div>
</template>

<script>
import SectionHeader from '@/components/ui/SectionHeader'
import Cart from '@/components/product/Cart'
import Loader from '@/components/ui/Loader'
import FollowUs from '@/components/ui/FollowUs'

export default {
  name: 'WishList',
  components: {FollowUs, Loader, Cart, SectionHeader},
  data: () => ({
    loader: true,

    products: []
  }),
  async created () {
    const products = await this.$store.getters['product/getProducts']

    if (products.length === 0) {
      await this.$store.dispatch('product/getProducts')
    }

    this.products = await this.$store.getters['product/getFavorite']
    const favorite = await this.$cookies.get('favorite') || []

    if (favorite.length === 0) {
      this.loader = false
      return
    }

    favorite.forEach((id) => {
      try {
        this.$store.commit('product/addFavorite', id)
      } catch (err) {
        this.$cookies.remove('favorite')
      }
    })

    this.loader = false
  },
  methods: {
    async removeFavorite ({id}) {
      const favorite = await this.$cookies.get('favorite').filter(x => x !== id)

      this.products = this.products.filter(x => x._id !== id)
      this.$store.commit('product/removeFavorite', id)

      const result = favorite.filter(product => product.id !== id)

      this.$cookies.remove('favorite')
      this.$cookies.set('favorite', result)
    }
  }
}
</script>
