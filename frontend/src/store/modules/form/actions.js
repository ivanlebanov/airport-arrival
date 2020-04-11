import router from '../../../router'
import Vue from 'vue'
import axios from 'axios'

export default {

  async add({ commit }, form) {
    try {
      let { data } = await axios.post('/form', form)
      router.push({ name: 'Home' })
    } catch (e) {
      console.log(e)
    }
  },

  async update({ commit }, form) {
    try {
      let { data } = await axios.put(`/form/${form.code}`, form)
      router.push({ name: 'Home' })
    } catch (e) {
      console.log(e)
    }
  },
  async verify({ commit }, form) {
    try {
      let { data } = await axios.put(`/form/verify/${form.code}`, form)
      router.push({ name: 'Admin' })
    } catch (e) {
      console.log(e)
    }
  },

  async search({ commit }, code) {
    try {
      let { data } = await axios.get(`/form/search?code=${code}`)
      return data
    } catch (e) {
      return []
    }
  },

  async searchUsers({ commit }, email) {
    try {
      let { data } = await axios.get(`/user/search/?email=${email}`)
      return data
    } catch (e) {
      return []
    }
  },

  async list({ commit }, form) {
    try {
      let { data } = await axios.get('/forms')
      commit('SET_FORMS', data)
    } catch (e) {
      console.log(e)
    }
  },

  async adminList({ commit }, form) {
    try {
      let qs = '?'
      for (const item in form) {
        qs += `${item}=${form[item]}&`
      }
      console.log(qs)
      let { data } = await axios.get(`/forms/admin${qs}`)
      return data
    } catch (e) {
      console.log(e)
    }
  },

  async single({ commit }, code) {
    try {
      let { data } = await axios.get(`/form/${code}`)
      return data
    } catch (e) {
      console.log(e)
    }
  }
}
