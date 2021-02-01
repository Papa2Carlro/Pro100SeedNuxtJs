export default {
  computed: {
    locale () {
      return this.$store.getters['localize/getLocale']
    },
    currency () {
      return this.$store.getters['localize/getCurrency']
    }
  }
}
