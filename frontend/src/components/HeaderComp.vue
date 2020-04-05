<template lang="html">
  <div v-if="loaded">
  <b-navbar toggleable="lg" variant="light" type="light" >

    <b-navbar-brand :to="{ name: 'Home' }">Бланки</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-item v-if="!user" :to="{ name: 'Login' }">Влез</b-nav-item>
        <b-nav-item  v-if="!user" :to="{ name: 'Register' }">Регистрирай се</b-nav-item> -->
        <b-nav-item-dropdown v-if="user" right>
          <template v-slot:button-content>
            <em>{{ user.name }}</em>
          </template>
          <!-- <b-dropdown-item :to="{ name: 'Profile' }">Профил</b-dropdown-item> -->
          <b-dropdown-item @click="logout">Излез</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComp',
  data() {
    return {
      cards: [],
      inegrated: 0,
      title: 'Home',
      economic: '',
    }
  },
  watch: { },
  components: { },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
    }
  },
  computed: {
    ...mapGetters('user', ['logged_in', 'loaded', 'user'])
  }
}
</script>
