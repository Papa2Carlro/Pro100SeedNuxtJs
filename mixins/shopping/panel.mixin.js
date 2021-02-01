export default {
  data: () => ({
    header: [
      {id: 1, label: 'customer_information', isPassed: false, isActive: true},
      {id: 2, label: 'shipping_method', isPassed: false, isActive: false},
      {id: 3, label: 'payment_method', isPassed: false, isActive: false}
    ],
    headerId: 1,
    bodyPosition: 0,

    // Card
    activeFilterCard: 'debit_card',
    filtersCard: [
      {label: 'MASTERCARD / Visa', id: 'debit_card', isActive: true},
      {label: 'PAYPAL', id: 'paypal', isActive: false}
    ],

    sliderWidth: 0,

    finallyPanel: false,
    panelType: '',
    panelTitle: ''
  }),
  methods: {
    openCheckoutPanel () {
      this.openPanel = true
      this.panelType = 'order'
      this.panelTitle = 'customer_information'
    },

    // Card
    filterCardHandler (filter) {
      this.filtersCard.map(item => item.isActive = item.id === filter)
      this.activeFilterCard = filter
    },

    // Header
    headerActiveHandler (title) {
      this.header.map((item) => {
        if (title === item.label) { this.headerId = item.id }

        item.isActive = title === item.label
        item.isPassed = item.id <= this.headerId
      })
    },

    prevSteepHandler (panel) {
      if (panel === 'order') {
        this.panelType = 'order'
        this.panelTitle = 'customer_information'
        this.headerActiveHandler(this.panelTitle)
      } else if (panel === 'shipping') {
        this.panelType = 'shipping'
        this.panelTitle = 'shipping_method'
        this.headerActiveHandler(this.panelTitle)
      }

      this.bodyPosition = this.bodyPosition + this.$refs.wrapper.offsetWidth
    },
    nextSteepHandler (panel) {
      if (panel === 'shipping') {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        this.panelType = 'shipping'
        this.panelTitle = 'shipping_method'
        this.headerActiveHandler(this.panelTitle)
      } else if (panel === 'card') {
        if (!this.shippingType) { return }

        this.panelType = 'card'
        this.panelTitle = 'payment_method'
        this.headerActiveHandler(this.panelTitle)
      }

      this.bodyPosition = this.bodyPosition - this.$refs.wrapper.offsetWidth
    }
  }
}
