<template>
  <div id="app" class="bootstrap-wrapper">
    <div id="google_translate_element"></div>
    <HeaderComp />
    <main>
      <router-view />
    </main>
    <notifications group="foo" position="top right" :duration="num"></notifications>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp"

import { mapGetters } from "vuex"
import moment from 'moment'

export default {
  metaInfo: {
    title: "",
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Бланки` : 'Бланки'
  }
  },
  components: { HeaderComp },
  watch: {
    'user': function(newVal, oldVal) {
      if(newVal){
        // this.$socket.emit('SET_SOCKET_USER', newVal._id)
      }
    }
  },
  async mounted(){
    await this.$store.dispatch('user/checkToken')
  },
  data() {
    return {
      num: 5000,
      show: false
    }
  },
  computed: {
    ...mapGetters("user", ["user", "id"]),
  }
}
</script>
<style lang="scss">
@import './assets/style.css';
</style>
