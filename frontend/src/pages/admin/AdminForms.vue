<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-12">
        <h2>
          Активни карантинирани
          <h6>или <router-link :to="{ name: 'Admin' }">търси по номер на бланка</router-link></h6>
        </h2>
      </div>
      <div class="col-md-6">
        <label for="inputa">Покажи само</label>
        <b-form inline>
          <input id="inputa" type="text" class="form-control mb-3" v-model="filter" placeholder="Град/село">
          <button type="button" name="button" class="mb-3 btn btn-dark" @click="filtertable">Покажи</button>
        </b-form>
      </div>
      <div class="col-md-12">
        <b-table ref="table" id="my-table" striped hover :items="myProvider" :fields="fields" :currentPage="currentPage" :per-page="perPage"></b-table>
        <b-pagination
        ref="pagination"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="my-table"
        @click.native="changeUrl"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      ready: false,
      perPage: (this.$route.query.perPage) ? parseInt(this.$route.query.perPage) : 10,
      currentPage: (this.$route.query.currentPage) ? parseInt(this.$route.query.currentPage) : 1,
      totalRows: (this.$route.query.perPage && this.$route.query.currentPage) ? parseInt(this.$route.query.perPage) * parseInt(this.$route.query.currentPage) : 10,
      filter: (this.$route.query.filter) ? this.$route.query.filter : '',
      fields: [
        {
          key: 'user.name',
          label: 'Име'
        },
        {
          key: 'code',
          label: 'Бланка'
        },
        {
          key: 'form.addressQuarantine.city',
          label: 'Град/село'
        }
      ],
    }
  },
  methods: {
    async myProvider() {
      let data = await this.$store.dispatch('form/adminList', { page: this.currentPage, filter: this.filter, perPage: this.perPage })
      this.totalRows = data.pagination.totalRows
      return data.items || []
    },
    filtertable() {
      this.$refs.table.refresh()
      this.changeUrl()
    },
    changeUrl(){
      this.$router.replace({ name: "AdminForms", query: { currentPage: this.currentPage, filter: this.filter, perPage: this.perPage } })
    }
  },
  computed: {
    ...mapGetters('form', ['adminForms'])
  }
}
</script>
