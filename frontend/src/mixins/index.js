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
      return moment().from(date, true)
    },
    getDateOnly(date) {
      date = moment(date.toString())
      return moment(date).format('LL')
    },
    getQuarantineEnd(date) {
      return moment(date).add(14, 'days').format('LL')
    }
  }
}
export default mixin
