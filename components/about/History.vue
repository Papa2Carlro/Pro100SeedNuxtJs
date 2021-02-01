<template>
  <section class="about__header grid">
    <div class="about__header-text grid--left">
      <div class="about__header-subTitle">
        {{ 'about_history_subtitle' | localize(locale) }}
      </div>

      <div class="about__header-label">
        {{ 'about_history_title' | localize(locale) }}
      </div>

      <div class="about__header-description">
        {{ 'about_history_text' | localize(locale) }}
      </div>

      <nuxt-link to="/about/history" class="about__header-btn btn btn--green btn--lg1">
        {{ 'reed_more' | localize(locale) }}
      </nuxt-link>

      <div class="about__header-title">
        History
      </div>
    </div>

    <div class="about__header-image grid--right">
      <img src="~/static/image/history/man.png" loading="lazy" alt="">
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutHistory'
}
</script>
