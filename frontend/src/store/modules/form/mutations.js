import * as types from '@/store/types'
export default {
  SET_FORMS(state, data) {
    state.forms = data
  },
  SET_ADMIN_FORMS(state, data) {
    state.adminForms = data
  }
}
