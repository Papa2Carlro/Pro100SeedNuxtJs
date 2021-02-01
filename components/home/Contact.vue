<template>
  <section class="home-contact grid grid--order">
    <div class="home-contact__info grid--left">
      <div class="home-contact__info-title">
        {{ 'home_contact_title' | localize(locale) }}
      </div>

      <ul class="home-contact__info-list">
        <li class="home-contact__info-item">
          <div class="home-contact__info-icon">
            <img src="~/static/image/home/contact/fb.svg" loading="lazy" alt="">
          </div>

          <div class="home-contact__info-description">
            <div class="home-contact__info-label">
              Facebook
            </div>

            <a :href="`http://${social.facebook}`" target="_blank" class="home-contact__info-link">
              {{ social.facebook }}
            </a>
          </div>
        </li>
        <li class="home-contact__info-item">
          <div class="home-contact__info-icon">
            <img src="~/static/image/home/contact/tw.svg" loading="lazy" alt="">
          </div>

          <div class="home-contact__info-description">
            <div class="home-contact__info-label">
              Twitter
            </div>

            <a :href="`http://${social.twitter}`" target="_blank" class="home-contact__info-link">
              {{ social.twitter }}
            </a>
          </div>
        </li>
        <li class="home-contact__info-item">
          <div class="home-contact__info-icon">
            <img src="~/static/image/home/contact/yt.svg" loading="lazy" alt="">
          </div>

          <div class="home-contact__info-description">
            <div class="home-contact__info-label">
              YouTube
            </div>

            <a :href="`http:${social.youTube}`" target="_blank" class="home-contact__info-link">
              {{ social.youTube }}
            </a>
          </div>
        </li>
        <li class="home-contact__info-item">
          <div class="home-contact__info-icon">
            <img src="~/static/image/home/contact/wa.svg" loading="lazy" alt="">
          </div>

          <div class="home-contact__info-description">
            <div class="home-contact__info-label">
              WhatsApp
            </div>

            <a href="#" target="_blank" class="home-contact__info-link">
              {{ social.whatsApp }}
            </a>
          </div>
        </li>
        <li class="home-contact__info-item">
          <div class="home-contact__info-icon">
            <img src="~/static/image/home/contact/in.svg" loading="lazy" alt="">
          </div>

          <div class="home-contact__info-description">
            <div class="home-contact__info-label">
              Instagram
            </div>

            <a href="#" target="_blank" class="home-contact__info-link">
              {{ social.instagram }}
            </a>
          </div>
        </li>
      </ul>
    </div>

    <div class="home-contact__map grid--right">
      <img src="~/static/image/history/map.png" loading="lazy" alt="">
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data: () => ({
    social: {}
  }),
  async created () {
    this.social = await this.$store.getters['info/getInfo'].social
  }
}
</script>
