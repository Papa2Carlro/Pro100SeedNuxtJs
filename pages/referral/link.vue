<template>
  <div class="ref__wrapper">
    <Loader v-if="loader" color="#272831"/>

    <div v-else class="ref__link">
      <SectionHeader :title="'referral_link_title' | localize(locale)">
        {{ 'referral_link_text' | localize(locale) }}
      </SectionHeader>

      <div class="ref__link-body">
        <div class="ref__link-panel">
          <div class="ref__link-text">
            {{ 'referral_link_info' | localize(locale) }}
          </div>

          <div class="ref__link-title">
            {{ 'referral_link_your' | localize(locale) }}
          </div>

          <div class="ref__link-copy">
            <input ref="copy" v-model="referral" readonly type="text">

            <div class="ref__link-btn" @click="copyHandler">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.5 0C4.94772 0 4.5 0.447715 4.5 1C4.5 1.55228 4.94772 2 5.5 2H13C13.5523 2 14 2.44772 14 3V14C14 14.5523 14.4477 15 15 15C15.5523 15 16 14.5523 16 14V3C16 1.34315 14.6569 0 13 0H5.5ZM2 6H10V18H2L2 6ZM0 6C0 4.89543 0.895431 4 2 4H10C11.1046 4 12 4.89543 12 6V18C12 19.1046 11.1046 20 10 20H2C0.895431 20 0 19.1046 0 18V6Z"
                  fill="#17A24F"
                />
              </svg>
            </div>
          </div>

          <div class="ref__link-share">
            <div class="ref__link-label">
              {{ 'referral_link_share' | localize(locale) }}:
            </div>

            <div class="ref__link-list">
              <nuxt-link class="ref__link-link" to="#">
                <img src="~/static/image/referral/link/social/in.svg" alt="">
              </nuxt-link>

              <nuxt-link class="ref__link-link" to="#">
                <img src="~/static/image/referral/link/social/fb.svg" alt="">
              </nuxt-link>

              <nuxt-link class="ref__link-link" to="#">
                <img src="~/static/image/referral/link/social/tg.svg" alt="">
              </nuxt-link>

              <nuxt-link class="ref__link-link" to="#">
                <img src="~/static/image/referral/link/social/tw.svg" alt="">
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="ref__link-panel">
          <div class="ref__link-title">
            {{ 'referral_link_title_panel' | localize(locale) }}
          </div>

          <ul class="ref__link-instruction">
            <li class="ref__link-instructionItem">
              <img src="~/static/image/referral/link/inst/man.svg" alt="" class="ref__link-instructionIcon">

              <div class="ref__link-instructionText">
                {{ 'referral_link_sign_up' | localize(locale) }}
              </div>
            </li>

            <li class="ref__link-instructionItem">
              <img src="~/static/image/referral/link/inst/comm.svg" alt="" class="ref__link-instructionIcon">

              <div class="ref__link-instructionText">
                {{ 'referral_link_share_link' | localize(locale) }}
              </div>
            </li>

            <li class="ref__link-instructionItem">
              <img src="~/static/image/referral/link/inst/sale.svg" alt="" class="ref__link-instructionIcon">

              <div class="ref__link-instructionText">
                {{ 'referral_link_percent_1' | localize(locale) }} {{ percent }}% {{ 'referral_link_percent_2' | localize(locale) }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import SectionHeader from '@/components/ui/SectionHeader'
import localize from '~/filters/localize.filter'

export default {
  name: 'ReferralContact',
  components: {SectionHeader, Loader},
  layout: 'referral',
  data: () => ({
    loader: true,
    percent: undefined,

    referral: ''
  }),
  async created () {
    const user = await this.$cookies.get('referral')

    if (!this.$store.getters['user/getUser'].firstName) { await this.$store.dispatch('user/getUser') }
    if (this.$store.getters['user/getUser'].email !== user.email) { await this.$store.dispatch('user/getUser') }

    const referral = await this.$store.getters['user/getUser'].referralCode
    await this.getPercentHandler()

    this.loader = false
    this.referral = `${location.origin}/referral/sign-up?ref=${referral}`
  },
  methods: {
    copyHandler () {
      this.$refs.copy.select()

      const link = this.referral
      this.referral = localize('copy', this.locale)

      document.execCommand('copy')
      setTimeout(() => this.referral = link, 2000)
    },
    getPercentHandler () {
      this.percent = 10
    }
  }
}
</script>
