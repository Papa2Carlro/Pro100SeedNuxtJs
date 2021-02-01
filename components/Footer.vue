<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__inner">
        <div v-for="list in lists" :key="list.title" class="footer__inner-group">
          <div class="footer__inner-title">
            {{ list.title | localize(locale) }}
          </div>

          <ul class="footer__inner-links">
            <li v-for="link in list.list" :key="link.title" class="footer__inner-link">
              <nuxt-link :to="link.url">
                <span v-if="link.noLocalize">{{ link.title }}</span>
                <span v-else>{{ link.title | localize(locale) }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="footer__inner-group">
          <div class="footer__inner-title">
            {{ 'footer_shops' | localize(locale) }}
          </div>

          <ul class="footer__inner-links">
            <li class="footer__inner-link">
              {{ 'footer_description' | localize(locale) }}
            </li>
          </ul>

          <nuxt-link to="/shop" class="footer__inner-btn btn btn--default btn--default-green btn--xl1">
            {{ 'footer_see_shops' | localize(locale) }}
          </nuxt-link>
        </div>
      </div>

      <div class="footer__copyright">
        <p class="footer__copyright-text">
          © 2018 ERORRS SEEDS
        </p>
        <div class="footer__copyright-link" >
          <nuxt-link to="/information/term-of-use">
            {{ 'footer_terms_of_use' | localize(locale) }}
          </nuxt-link>
          &nbsp;/&nbsp;
          <nuxt-link to="/information/private-police">
            {{ 'footer_private_police' | localize(locale) }}
          </nuxt-link>
        </div>
        <nuxt-link class="footer__copyright-link" to="/information/shipping">
          {{ 'footer_shipping_returns' | localize(locale) }}
        </nuxt-link>

        <ul class="footer__copyright-social">
          <li class="footer__copyright-icon">
            <nuxt-link to="#">
              <img src="~/static/image/social/vk.svg" alt="">
            </nuxt-link>
          </li>
          <li class="footer__copyright-icon">
            <nuxt-link to="#">
              <img src="~/static/image/social/fb.svg" alt="">
            </nuxt-link>
          </li>
          <li class="footer__copyright-icon">
            <nuxt-link to="#">
              <img src="~/static/image/social/twitter.svg" alt="">
            </nuxt-link>
          </li>
          <li class="footer__copyright-icon">
            <nuxt-link to="#">
              <img src="~/static/image/social/google.svg" alt="">
            </nuxt-link>
          </li>
          <li class="footer__copyright-icon">
            <nuxt-link to="#">
              <img src="~/static/image/social/instagram.svg" alt="">
            </nuxt-link>
          </li>
          <li class="footer__copyright-icon">
            <nuxt-link to="#">
              <img src="~/static/image/social/youtube.svg" alt="">
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      lists: [
        {
          title: 'footer_seeds',
          list: [
            {
              noLocalize: true,
              title: 'Fimished',
              url: '#'
            },
            {
              noLocalize: true,
              title: 'Fimished',
              url: '#'
            },
            {
              noLocalize: true,
              title: 'Fimished',
              url: '#'
            },
            {
              noLocalize: true,
              title: 'Fimished',
              url: '#'
            },
            {
              noLocalize: true,
              title: 'Fimished',
              url: '#'
            }
          ]
        },
        {
          title: 'footer_infos',
          list: [
            {
              noLocalize: true,
              title: 'Fimished',
              url: '#'
            },
            {
              noLocalize: true,
              title: 'Press',
              url: '#'
            },
            {
              noLocalize: true,
              title: 'FAQ',
              url: '/faq'
            },
            {
              noLocalize: true,
              title: 'Support',
              url: '#'
            },
            {
              noLocalize: true,
              title: 'Reviews',
              url: '#'
            }
          ]
        },
        {
          title: 'footer_es',
          list: [
            {
              title: 'header_about_us',
              url: '/about'
            },
            {
              noLocalize: true,
              title: 'Questions',
              url: '#'
            },
            {
              title: 'footer_payment_methods',
              url: '/information/payment'
            },
            {
              title: 'header_contacts',
              url: '/contacts'
            },
            {
              title: 'header_blog',
              url: '/blog'
            }
          ]
        }
      ]
    }
  }
}
</script>
