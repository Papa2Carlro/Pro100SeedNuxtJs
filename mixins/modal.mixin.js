export default {
  methods: {
    openModalHandler () {
      this.isOpen = true
      document.body.classList.add('lock-modal')
    },

    closeModal () {
      this.isOpen = false
      document.body.classList.remove('lock-modal')
    },

    addGeneticHandler (item) {
      this.genetic.push(item)
    },
    removeGeneticHandler (id) {
      this.genetic = this.genetic.filter(item => item._id !== id)
    },

    addTasteHandler (item) {
      this.taste.push(item)
    },
    removeTasteHandler (id) {
      this.taste = this.taste.filter(item => item._id !== id)
    },

    addEffectHandler (item) {
      this.effect.push(item)
    },
    removeEffectHandler (id) {
      this.effect = this.effect.filter(item => item._id !== id)
    },

    resetFilter () {
      this.genetic = []
      this.taste = []
      this.effect = []
    }
  }
}
