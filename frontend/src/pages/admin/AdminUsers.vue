<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="mt-3">Въведете мейл:</h1>
        <form>
          <input type="text" class="form-control mb-3" placeholder="Мейл на потребител" v-model="form.code" @input="search($event)">
          <b-list-group v-if="suggestions.length > 0">
            <b-list-group-item
            class="flex-column align-items-start"
            :key="suggestion._id"
            v-for="suggestion in suggestions"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ suggestion.name }}</h5>
                <small class="text-muted">{{ suggestion.email }}</small>
              </div>
              <button type="button" v-if="!suggestion.isAdmin" class="btn btn-success btn-sm mr-1" @click="makeAdmin(suggestion.email, 1)">Направи админ</button>
              <button type="button" v-if="suggestion.isAdmin" class="btn btn-sm btn-danger" @click="makeAdmin(suggestion.email, 0)">Премахни админ привилегии</button>
            </b-list-group-item>
          </b-list-group>
          <router-link :to="{ name: 'AdminForms' }" class="mr-3">Преглед на активните карантинирани</router-link>
          <router-link :to="{ name: 'Admin' }">Търсачка за неактивни бланки</router-link>

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
    async makeAdmin(email, status) {
      await this.$store.dispatch('user/makeAdmin', { email, status })
    },
    async search(ev) {
      if(ev.target.value.length > 1) {
        this.suggestions = await this.$store.dispatch('form/searchUsers', ev.target.value)
      }
    }
  }
}
</script>
