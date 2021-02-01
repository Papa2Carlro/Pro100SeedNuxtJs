<template>
  <header class="header" :class="{isOpen}">
    <nav class="header__navigation">
      <div class="header__open" @click="menuHandler">
        <svg
          class="header__open-close"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.51465 23.071L23.071 7.5147L24.4852 8.92891L8.92886 24.4853L7.51465 23.071Z" fill="white"/>
          <rect
            x="23.0703"
            y="24.4853"
            width="22"
            height="2"
            transform="rotate(-135 23.0703 24.4853)"
            fill="white"
          />
        </svg>

        <svg
          class="header__open-open"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect opacity="0.01" width="24" height="24" fill="#D8D8D8"/>
          <rect x="3" y="5" width="18" height="2" fill="white"/>
          <rect x="3" y="11" width="12" height="2" fill="white"/>
          <rect x="3" y="17" width="16" height="2" fill="white"/>
        </svg>
      </div>

      <nuxt-link active-class="isActive" exact class="header__logo" to="/">
        <svg
          width="40"
          height="29"
          viewBox="0 0 40 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.846317"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2011 4.15234H0.283203V2.17432C0.283203 1.53369 0.369954 1.11996 0.543457 0.933105C0.730307 0.759602 1.14404 0.672852 1.78467 0.672852H13.8564C14.5104 0.672852 14.9242 0.759602 15.0977 0.933105C15.2845 1.11996 15.3779 1.53369 15.3779 2.17432V3.05518C15.3779 3.56407 15.319 3.92979 15.2011 4.15234ZM14.2536 11.1523H0.283203V26.498C0.283203 27.152 0.369954 27.5658 0.543457 27.7393C0.71696 27.9128 1.13069 27.9995 1.78467 27.9995H13.8564C14.5104 27.9995 14.9242 27.9128 15.0977 27.7393C15.2845 27.5658 15.3779 27.152 15.3779 26.498V25.6172C15.3779 24.9632 15.2845 24.5495 15.0977 24.376C14.9242 24.2025 14.5104 24.1157 13.8564 24.1157H5.40723C4.85494 24.1157 4.40723 23.668 4.40723 23.1157V15.9868C4.40723 15.4345 4.85494 14.9868 5.40723 14.9868H13.5361C14.1901 14.9868 14.6038 14.9001 14.7773 14.7266C14.9508 14.5397 15.0376 14.126 15.0376 13.4854V12.6045C15.0376 11.9505 14.9508 11.5368 14.7773 11.3633C14.6794 11.2653 14.5048 11.195 14.2536 11.1523ZM37.3488 5.51758L36.568 5.97803C36.0875 6.27165 35.7606 6.41846 35.5871 6.41846C35.2667 6.41846 34.9665 6.20492 34.6862 5.77783C33.9388 4.61669 32.791 4.03613 31.2428 4.03613C30.0416 4.03613 29.0674 4.37646 28.32 5.05713C27.5993 5.7111 27.2389 6.5052 27.2389 7.43945C27.2389 8.34701 27.6727 9.10107 28.5402 9.70166C28.9406 9.99528 29.3243 10.2255 29.6913 10.3923C30.0583 10.5592 31.1427 11.0096 32.9445 11.7437C35.2267 12.6779 36.855 13.7856 37.8292 15.0669C38.8436 16.4015 39.3507 17.9764 39.3507 19.7915C39.3507 22.4207 38.4232 24.5895 36.568 26.2979C34.9664 27.7793 32.9645 28.52 30.5622 28.52C28.1865 28.52 26.1912 27.7593 24.5763 26.2378C23.8956 25.5838 23.2917 24.743 22.7645 23.7153C22.2374 22.6877 21.9738 21.8335 21.9738 21.1528C21.9738 20.8459 22.0572 20.629 22.224 20.5022C22.3909 20.3754 22.7345 20.252 23.255 20.1318L24.4762 19.8716C24.89 19.7782 25.1636 19.7314 25.297 19.7314C25.7908 19.7314 26.0845 20.0851 26.1779 20.7925C26.338 21.8869 26.7985 22.7811 27.5592 23.4751C28.4267 24.2492 29.4811 24.6362 30.7223 24.6362C32.1103 24.6362 33.2314 24.1424 34.0856 23.1548C34.833 22.3006 35.2067 21.273 35.2067 20.0718C35.2067 18.5236 34.5727 17.3291 33.3048 16.4883C32.8511 16.1813 32.4306 15.9377 32.0436 15.7576C31.6566 15.5774 30.5288 15.0936 28.6603 14.3062C24.9233 12.7313 23.0548 10.4224 23.0548 7.37939C23.0548 4.937 24.0958 3.02849 26.1779 1.65381C27.6994 0.652827 29.3943 0.152344 31.2628 0.152344C34.159 0.152344 36.4012 1.32014 37.9894 3.65576C38.2029 3.97608 38.3097 4.23633 38.3097 4.43652C38.3097 4.66341 38.253 4.83691 38.1395 4.95703C38.0261 5.07715 37.7625 5.264 37.3488 5.51758Z"
            fill="white"
          />
        </svg>
      </nuxt-link>

      <ul v-for="group in links" class="header__list header--m-none">
        <li v-for="list in group" :key="list.url" class="header__list-item">
          <nuxt-link active-class="isActive" class="header__list-link" :to="list.url">
            {{ list.key[locale] }}
          </nuxt-link>
        </li>
      </ul>

      <ul class="header__list">
        <li class="header__list-item header--close-none">
          <div v-click-outside="closeLanguage" class="header__language">
            <div class="header__language-label" @click="languageIsOpen = true">
              {{ language }}
            </div>

            <ul class="header__language-list" :class="{isOpen: languageIsOpen}">
              <li
                v-for="item in languageList"
                :key="item.id"
                class="header__language-item"
                @click="changeLanguageHandler(item.id)"
              >
                {{ item.label }}
              </li>
            </ul>
          </div>
        </li>

        <li class="header__list-item header--close-none">
          <nuxt-link active-class="isActive" to="/search" class="header__list-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.687 15.9171C15.3399 17.2073 13.5125 18 11.5 18C7.35786 18 4 14.6421 4 10.5C4 6.35786 7.35786 3 11.5 3C15.6421 3 19 6.35786 19 10.5C19 12.5124 18.2074 14.3397 16.9174 15.6867C16.8738 15.718 16.8321 15.7533 16.7929 15.7925C16.7537 15.8318 16.7184 15.8735 16.687 15.9171ZM17.4735 17.8874C15.8416 19.2086 13.7632 20 11.5 20C6.25329 20 2 15.7467 2 10.5C2 5.25329 6.25329 1 11.5 1C16.7467 1 21 5.25329 21 10.5C21 12.7631 20.2087 14.8413 18.8877 16.4731L22.7071 20.2929C23.0976 20.6835 23.0976 21.3166 22.7071 21.7071C22.3165 22.0976 21.6834 22.0976 21.2929 21.7071L17.4735 17.8874Z"
                fill="white"
                fill-opacity="0.8"
              />
            </svg>
          </nuxt-link>
        </li>

        <li class="header__list-item header--close-none">
          <nuxt-link active-class="isActive" to="/shop/wishlist" class="header__list-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.01" width="24" height="24" fill="#D8D8D8"/>
              <path
                opacity="0.8"
                d="M11.3268 4.85112L11.9795 5.42072L12.6363 4.85584C14.7874 3.00587 17.9238 3.12468 19.908 5.19916C21.9004 7.28223 22.028 10.5993 20.2783 12.8387L12.6984 20.2409C12.3105 20.6197 11.6913 20.6204 11.3026 20.2424L3.7109 12.86C1.97472 10.5983 2.10707 7.28004 4.09739 5.19916C6.08439 3.12175 9.21735 3.01036 11.3268 4.85112Z"
                stroke="white"
                stroke-width="2"
              />
              <mask
                id="mask0"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x="1"
                y="2"
                width="22"
                height="20"
              >
                <path
                  d="M11.3268 4.85112L11.9795 5.42072L12.6363 4.85584C14.7874 3.00587 17.9238 3.12468 19.908 5.19916C21.9004 7.28223 22.028 10.5993 20.2783 12.8387L12.6984 20.2409C12.3105 20.6197 11.6913 20.6204 11.3026 20.2424L3.7109 12.86C1.97472 10.5983 2.10707 7.28004 4.09739 5.19916C6.08439 3.12175 9.21735 3.01036 11.3268 4.85112Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                />
              </mask>
              <g mask="url(#mask0)"/>
            </svg>
          </nuxt-link>
        </li>

        <li class="header__list-item header--close-none">
          <nuxt-link active-class="isActive" to="/referral/link" class="header__list-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.21106 21.8724C4.21106 23.3759 2 23.3759 2 21.8724C2 17.4503 4.74171 13.7357 8.54472 12.1437C7.12965 10.994 6.24523 9.22513 6.24523 7.2794C6.24523 3.83015 8.98693 1 12.5246 1C15.9739 1 18.7156 3.83015 18.7156 7.2794C18.7156 9.22513 17.8312 10.994 16.4161 12.1437C20.2191 13.7357 22.9608 17.4503 22.9608 21.8724C22.9608 23.3759 20.7498 23.3759 20.7498 21.8724C20.7498 17.3618 17.0352 13.6472 12.5246 13.6472C7.92563 13.6472 4.21106 17.3618 4.21106 21.8724ZM12.5246 3.21106C10.2251 3.21106 8.45628 5.06834 8.45628 7.2794C8.45628 9.49045 10.2251 11.2593 12.5246 11.2593C14.7357 11.2593 16.5045 9.49045 16.5045 7.2794C16.5045 5.06834 14.7357 3.21106 12.5246 3.21106Z"
                fill="white"
                fill-opacity="0.8"
              />
            </svg>
          </nuxt-link>
        </li>

        <li class="header__list-item" @click="shoppingCardOpenCardHandler">
          <div class="header__list-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                opacity="0.8"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.99996 7V6C9.99996 4.89543 10.8954 4 12 4C13.1045 4 14 4.89543 14 6V7H9.99996ZM7.99996 7V6C7.99996 3.79086 9.79082 2 12 2C14.2091 2 16 3.79086 16 6V7H18.3308C18.849 7 19.2813 7.39576 19.3269 7.91187L20.373 19.7356C20.5282 21.49 19.1459 23 17.3847 23H6.61449C4.85328 23 3.47095 21.49 3.62616 19.7356L4.67224 7.91187C4.7179 7.39576 5.15022 7 5.66835 7H7.99996ZM16 9H14H9.99996H7.99996H6.58378L5.61838 19.9119C5.56664 20.4967 6.02742 21 6.61449 21H17.3847C17.9718 21 18.4325 20.4967 18.3808 19.9119L17.4154 9H16Z"
                fill="white"
              />
            </svg>
          </div>
        </li>
      </ul>
    </nav>

    <nav class="m-menu" :class="{isOpen}">
      <ul class="m-menu__list">
        <li class="m-menu__list-item" @click="menuHandler">
          <nuxt-link active-class="isActive" class="m-menu__link" exact to="/">
            Home
          </nuxt-link>
        </li>

        <li v-for="list in lists" :key="list.url" class="m-menu__list-item" @click="menuHandler">
          <nuxt-link active-class="isActive" class="m-menu__link" :to="list.url">
            {{ list.key[locale] }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  name: 'Header',
  directives: {
    clickOutside: vClickOutside.directive
  },
  data: () => ({
    isOpen: false,
    links: [
      [
        {
          key: {
            ru: 'Магазин',
            en: 'Shop'
          },
          url: '/shop'
        },
        {
          key: {
            ru: 'Про нас',
            en: 'About Us'
          },
          url: '/about'
        },
        {
          key: {
            ru: 'Блог',
            en: 'Blog'
          },
          url: '/blog'
        }
      ],
      [
        {
          key: {
            ru: 'Товары по скидке',
            en: 'Sale'
          },
          url: '/shop/sale'
        },
        {
          key: {
            ru: 'FAQ',
            en: 'FAQ'
          },
          url: '/faq'
        },
        {
          key: {
            ru: 'Реферал',
            en: 'Referral'
          },
          url: '/referral'
        },
        {
          key: {
            ru: 'Контакты',
            en: 'Contacts'
          },
          url: '/contacts'
        }
      ]
    ],

    language: '',
    languageIsOpen: false,
    languageList: [
      {
        id: 'ru_uah',
        locale: 'ru',
        currency: 'uah',
        label: 'Ru / UAH'
      },
      {
        id: 'en_usd',
        locale: 'en',
        currency: 'usd',
        label: 'En / USD'
      }
    ]
  }),
  computed: {
    lists () {
      return this.links.flat()
    }
  },
  created () {
    const locale = this.$cookies.get('locale')

    if (locale) {
      this.language = locale.label
      this.$store.commit('localize/setLocale', locale)
    } else {
      const data = {
        id: 'en_usd',
        locale: 'en',
        currency: 'usd',
        label: 'En / USD'
      }

      this.language = data.label
      this.$cookies.set('locale', data)
      this.$store.commit('localize/setLocale', data)
    }
  },
  methods: {
    closeLanguage () {
      this.languageIsOpen = false
    },
    changeLanguageHandler (id) {
      const [language] = this.languageList.filter(item => item.id === id)
      this.language = language.label

      this.$cookies.remove('locale')
      this.$cookies.set('locale', language)
      this.$store.commit('localize/setLocale', language)
      this.closeLanguage()
    },
    menuHandler () {
      const body = document.body

      if (body.classList.contains('lock')) {
        body.classList.remove('lock')
      } else {
        body.classList.add('lock')
      }

      this.isOpen = !this.isOpen
    },
    async shoppingCardOpenCardHandler () {
      await this.$store.commit('product/openPanel')
      document.body.classList.add('lock')
    }
  }
}
</script>
