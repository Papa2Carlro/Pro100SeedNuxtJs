<template>
  <div class="information__body-wrapper">
    <Loader v-if="loader" color="#272831"/>

    <div v-else class="information__info">
      <SectionHeader :title="'information_general_title' | localize(locale)">
        {{ 'information_general_description' | localize(locale) }}
      </SectionHeader>

      <div class="information__info-title">
        {{ 'information_shipping_returns' | localize(locale) }}
      </div>

      <div class="editor" v-html="editor[locale]"/>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import SectionHeader from '@/components/ui/SectionHeader'

export default {
  components: {SectionHeader, Loader},
  layout: 'information',
  data: () => ({
    editor: {},
    loader: true
  }),
  async created () {
    await this.$axios.$get('api/pages/shipping')
      .then((res) => {
        if (res.ok) {
          this.editor = res.body[0].html
        }
      })
      .catch((err) => {
        console.log(err)
      })

    this.loader = false
  }
}
</script>
