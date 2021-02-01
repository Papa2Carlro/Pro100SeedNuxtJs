import {required, minLength, email} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    firstName: 'Максим',
    lastName: 'Приймак',
    country: 'Украина',
    city: 'Одесса',
    stateProvince: 'Гвардейское',
    address: 'Мира 8',
    apartment: 'кв. 7',

    zipCode: '67445',
    email: 'priymak615@gmail.com',
    phone: '+380677126286',

    newsletters: false,
    notPhone: false
  }),
  validations: {
    firstName: {required},
    lastName: {required},
    country: {required},
    city: {required},
    stateProvince: {required},
    address: {required},
    apartment: {required},

    zipCode: {required, minLength: minLength(5)},
    email: {required, email},
    phone: {required}
  },
  watch: {
    zipCode () {
      if (this.zipCode.length > 5) { this.zipCode = this.zipCode.substring(0, 5) }
    }
  }
}
