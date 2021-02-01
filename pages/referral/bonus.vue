<template>
  <div class="ref__wrapper">
    <Loader v-if="loader" color="#272831"/>

    <div v-else class="ref__bonus">
      <SectionHeader :title="'referral_bonus_title' | localize(locale)">
        {{ 'referral_bonus_text' | localize(locale) }}
      </SectionHeader>

      <div class="ref__bonus-body">
        <div class="ref__bonus-header">
          <div class="ref__bonus-title">
            {{ 'referral_bonus_your' | localize(locale) }}:
          </div>

          <div class="ref__bonus-price">
            ${{ bonus.toFixed(2) }}
          </div>
        </div>

        <div class="ref__bonus-description">
          {{ 'referral_bonus_info' | localize(locale) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import SectionHeader from '@/components/ui/SectionHeader'

export default {
  name: 'ReferralContact',
  components: {SectionHeader, Loader},
  layout: 'referral',
  data: () => ({
    loader: true,

    bonus: 0
  }),
  async created () {
    const user = await this.$cookies.get('referral')

    if (!this.$store.getters['user/getUser'].firstName) { await this.$store.dispatch('user/getUser') }
    if (this.$store.getters['user/getUser'].email !== user.email) { await this.$store.dispatch('user/getUser') }

    this.bonus = await this.$store.getters['user/getUser'].bonus
    this.loader = false
  }
}
</script>
