<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="mt-3">Въведете номер на бланка:</h1>
        <form>
          <input type="text" class="form-control mb-3" placeholder="Номер на бланка" v-model="form.code" @input="search($event)">
          <b-list-group v-if="suggestions.length > 0">
            <b-list-group-item
            :to="{ name: 'AdminFormEdit', params: { code: suggestion.code } }"
            class="flex-column align-items-start"
            :key="suggestion._id"
            v-for="suggestion in suggestions"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Бланка №{{ suggestion.code }}</h5>
                <small class="text-muted"> преди {{ getDate(new Date(parseInt( suggestion._id.substring(0,8), 16 ) * 1000 )) }}</small>
              </div>
            </b-list-group-item>
          </b-list-group>
          <router-link :to="{ name: 'AdminForms' }" class="mr-3">Преглед на активните карантинирани</router-link>
          <router-link :to="{ name: 'AdminUsers' }">Направете потребител администратор</router-link>

        </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        code: ''
      },
      suggestions: []
    }
  },
  methods: {
    async search(ev) {
      if(ev.target.value.length > 1) {
        this.suggestions = await this.$store.dispatch('form/search', ev.target.value)
      }
    }
  }
}
</script>
