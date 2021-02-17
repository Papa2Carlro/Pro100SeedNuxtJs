<template>
  <section class="home-first">
    <div class="home-first__info">
      <div class="home-first__info-title">
        {{ 'home_first_title' | localize(locale) }}
      </div>

      <div class="home-first__info-description">
        <p class="mb-3">
          {{ 'home_first_info1' | localize(locale) }}
        </p>
      </div>

      <nuxt-link to="/shop" class="home-first__info-link btn btn--green btn--lg1">
        {{ 'to_the_webshop' | localize(locale) }}
      </nuxt-link>
    </div>

    <img class="home-first__seed" src="~/static/image/home/seed.png" alt="">
    <img class="home-first__smoke" src="~/static/image/home/smoke.png" alt="">
    <img class="home-first__bg" src="~/static/image/home/bg.png" alt="">

    <FollowUsComponent/>
  </section>
</template>

<script>
import FollowUsComponent from '@/components/ui/FollowUs'

export default {
  name: 'HomeFirst',
  components: {
    FollowUsComponent
  }
}
</script>
