<template>
  <div>
    <Loader v-if="loader" color="#282932"/>

    <section class="faq">
      <div class="faq__main">
        <SectionHeader :title="'faqs_title' | localize(locale)">
          {{ 'faqs_text' | localize(locale) }} <a :href="info.faq">{{ info.faq }}</a>
        </SectionHeader>

        <ul class="faq__list">
          <FaqItem v-for="(item, index) in faqs" :key="item.title[locale]" :title="item.title[locale]" :body="item.text" :index="index"/>
        </ul>
      </div>

      <FollowUs/>

      <div class="faq__bg">
        <img src="~/static/image/bg/bg-1.png" alt="">
      </div>
    </section>
  </div>
</template>
<script>
import SectionHeader from '@/components/ui/SectionHeader'
import Loader from '~/components/ui/Loader'
import FollowUs from '~/components/ui/FollowUs'
import FaqItem from '~/components/faq/Item'

export default {
  name: 'Faq',
  components: {SectionHeader, FaqItem, FollowUs, Loader},
  data: () => ({
    loader: true,
    info: {},

    faqs: []
  }),
  async created () {
    this.info = await this.$store.getters['info/getInfo']

    await this.$store.dispatch('faq/getFaqsHandler')
    this.faqs = this.$store.getters['faq/getFaqs']

    this.loader = false
  }
}
</script>
