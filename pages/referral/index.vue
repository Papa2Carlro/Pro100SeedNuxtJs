<template>
  <div>
    <Loader v-if="loader" color="#272831"/>

    <main v-else class="referral">
      <div class="referral__body">
        <div class="referral__body-title">
          {{ 'referral_title' | localize(locale) }}
        </div>

        <div class="referral__body-text">
          {{ 'referral_info' | localize(locale) }}
        </div>

        <div v-if="!auth">
          <nuxt-link to="/referral/sign-in" class="referral__body-btn btn btn--green btn--fluid1">
            {{ 'referral_sign_in' | localize(locale) }}
          </nuxt-link>

          <div class="referral__body-or">
            {{ 'referral_or' | localize(locale) }}
          </div>

          <nuxt-link to="/referral/sign-up" class="referral__body-btn btn btn--default btn--fluid1">
            {{ 'referral_register' | localize(locale) }}
          </nuxt-link>
        </div>

        <div v-else>
          <nuxt-link to="/referral/link" class="referral__body-btn btn btn--default btn--fluid1">
            {{ 'referral_to_account' | localize(locale) }}
          </nuxt-link>
        </div>
      </div>

      <div class="referral__bg">
        <img src="~/static/image/bg/bg-1.png" alt="">
      </div>

      <FollowUs/>
    </main>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import FollowUs from '@/components/ui/FollowUs'

export default {
  name: 'Referral',
  components: {FollowUs, Loader},
  data: () => ({
    loader: true,

    auth: false
  }),
  async mounted () {
    this.auth = await this.$cookies.get('referral')
    this.loader = false
  }
}
</script>
