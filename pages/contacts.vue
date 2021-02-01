<template>
  <div>
    <Loader v-if="loader" color="#272831"/>

    <section v-else class="contacts">
      <div class="contacts__body">
        <SectionHeader title="CONTACT INFO">
          In order to discuss the general function of the logo, we must firstly identify and define the environment
          where this will have to fulfill its function.
          where this will have to fulfill its function.
        </SectionHeader>

        <ul class="contacts__body-list">
          <li class="contacts__body-item">
            <div class="contacts__body-title">
              MARKETING
            </div>

            <div class="contacts__body-text">
              Marketing manager Christian Nystrom
            </div>

            <div class="contacts__body-contact">
              <a :href="`tel:${info.marketing.phone}`">{{ info.marketing.phone }}</a>

              <a :href="`mailto:${info.marketing.mail}`">{{ info.marketing.mail }}</a>
            </div>
          </li>
          <li class="contacts__body-item">
            <div class="contacts__body-title">
              SALES & ORDERS
            </div>

            <div class="contacts__body-text">
              Marketing manager Christian Nystrom
            </div>

            <div class="contacts__body-contact">
              <a :href="`tel:${info.marketing.phone}`">{{ info.marketing.phone }}</a>

              <a :href="`mailto:${info.marketing.mail}`">{{ info.marketing.mail }}</a>
            </div>
          </li>
          <li class="contacts__body-item">
            <div class="contacts__body-title">
              TECHNICAL ISSUES
            </div>

            <div class="contacts__body-text">
              Marketing manager Christian Nystrom
            </div>

            <div class="contacts__body-contact">
              <a :href="`tel:${info.marketing.phone}`">{{ info.marketing.phone }}</a>

              <a :href="`mailto:${info.marketing.mail}`">{{ info.marketing.mail }}</a>
            </div>
          </li>

          <li class="contacts__body-item">
            <div class="contacts__body-title">
              ASK BREWHOUSE
            </div>

            <div class="contacts__body-text">
              Marketing manager Christian Nystrom
            </div>

            <div class="contacts__body-contact">
              <a :href="`tel:${info.marketing.phone}`">{{ info.marketing.phone }}</a>

              <a :href="`mailto:${info.marketing.mail}`">{{ info.marketing.mail }}</a>
            </div>
          </li>
          <li class="contacts__body-item">
            <div class="contacts__body-title">
              BREWMASTER
            </div>

            <div class="contacts__body-text">
              Marketing manager Christian Nystrom
            </div>

            <div class="contacts__body-contact">
              <a :href="`tel:${info.marketing.phone}`">{{ info.marketing.phone }}</a>

              <a :href="`mailto:${info.marketing.mail}`">{{ info.marketing.mail }}</a>
            </div>
          </li>
          <li class="contacts__body-item">
            <div class="contacts__body-title">
              OTHER QUESTIONS & SUPORT
            </div>

            <div class="contacts__body-text">
              Marketing manager Christian Nystrom
            </div>

            <div class="contacts__body-contact">
              <a :href="`tel:${info.marketing.phone}`">{{ info.marketing.phone }}</a>

              <a :href="`mailto:${info.marketing.mail}`">{{ info.marketing.mail }}</a>
            </div>
          </li>
        </ul>
      </div>

      <div class="contacts__bg">
        <img src="~/static/image/bg/bg-1.png" alt="">
      </div>
    </section>
  </div>
</template>
<script>
import Loader from '@/components/ui/Loader'
import SectionHeader from '@/components/ui/SectionHeader'

export default {
  name: 'Contacts',
  components: {SectionHeader, Loader},
  data: () => ({
    loader: true,

    info: {}
  }),
  async created () {
    await this.getData()
    this.loader = false
  },
  methods: {
    getData () {
      this.info = this.$store.getters['info/getInfo']
    }
  }
}
</script>
