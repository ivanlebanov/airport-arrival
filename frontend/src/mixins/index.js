import Moment from 'moment'
import { extendMoment } from 'moment-range'
Moment.locale('bg')
const moment = extendMoment(Moment)
let mixin = {
  methods: {
    moment() {
      return moment()
    },
    getDate(date) {
      return this.moment().from(date, true)
    },
    getDateOnly(date) {
      return this.moment(date).format('LL')
    },
    getQuarantineEnd(date) {
      return this.moment(date).add(14, 'days').format('LL')
    },
    getImgUrl(icon){
      var images = require.context('../assets/img/', false, /\.svg$/)
      return images('./' + icon)
    }
  }
}
export default mixin
