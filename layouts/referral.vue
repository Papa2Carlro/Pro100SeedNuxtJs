<template>
  <div>
    <Header />

    <main class="ref">
      <Sidebar class-name="ref__aside" link="/referral" :links="menu" />

      <MSidebar class-name="ref__aside" link="/referral" :links="menu" />

      <Nuxt />

      <div class="ref__bg">
        <img src="~/static/image/bg/bg-4.png" alt="">
        <div class="ref__bg-gradient"/>
      </div>
    </main>

    <Footer />

    <ShoppingCard/>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import ShoppingCard from '@/components/ShoppingCard/ShoppingCard'
import Middleware from '~/middleware/referral'
import MSidebar from '~/components/MSidebar'

export default {
  name: 'ReferralLayout',
  components: {MSidebar, ShoppingCard, Sidebar, Footer, Header},
  middleware: [Middleware],
  data: () => ({
    menu: [
      {
        label: 'referral_contact_detail',
        url: 'contact'
      },
      {
        label: 'referral_referral_link',
        url: 'link'
      },
      {
        label: 'referral_bonus',
        url: 'bonus'
      },
      {
        label: 'referral_history',
        url: 'history'
      }
    ]
  })
}
</script>
