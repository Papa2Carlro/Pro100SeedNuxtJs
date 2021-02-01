/* eslint-disable */
<template>
  <div>
    <Header/>

    <section class="error">
      <div class="error__main">
        <h1 class="error__main-title">
          {{ error.statusCode }}
        </h1>
        <p v-if="error.statusCode === 404" class="error__main-msg">
          Oops, someone already used this page. <br>
          We will help you find what you are looking for. Let's do it!
        </p>
        <p v-else class="error__main-msg">
          {{ error.message }}
        </p>
        <nuxt-link v-if="error.statusCode === 404" class="error__main-button btn btn--green btn--lg1" to="/">
          to the webshop
        </nuxt-link>
      </div>

      <div class="error__bg">
        <img src="~/static/image/bg/bg-3.png" alt="">
      </div>
    </section>
  </div>
</template>
<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  },
  props: ['error']
}
</script>
