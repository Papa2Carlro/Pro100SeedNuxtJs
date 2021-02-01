<template>
  <div class="information__wrapper">
    <Header/>

    <div class="information">
      <MSidebar class-name="information__sidebar" link="/information" :links="links"/>

      <div class="information__body">
        <Sidebar class-name="information__sidebar" link="/information" :links="links"/>

        <Nuxt/>
      </div>

      <div class="information__bg">
        <img src="~/static/image/bg/bg-5.png" alt="">
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MSidebar from '@/components/MSidebar'

export default {
  name: 'Information',
  components: {MSidebar, Footer, Header, Sidebar},
  data: () => ({
    links: [
      {
        label: 'information_payment_methods',
        url: 'payment'
      },
      {
        label: 'information_shipping_returns',
        url: 'shipping'
      },
      {
        label: 'information_private_police',
        url: 'private-police'
      },
      {
        label: 'information_terms_of_use',
        url: 'term-of-use'
      }
    ]
  })
}
</script>
