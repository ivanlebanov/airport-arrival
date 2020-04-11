<template lang="html">
  <div v-if="loaded">
    <div class="container">
      <div class="row mt-3 mb-3">
        <div class="col-md-12">
          <b-jumbotron bg-variant="info" text-variant="white" header="Бланки" lead="Система за попълване на бланки при пристигане на летищата в България по време на Covid-19." v-if="!logged_in">
            <p>Влезте в своя профил и попълнете нова бланка.</p>
            <b-button variant="light" :to="{ name: 'Login' }">Влез в своя профил</b-button>
            <b-button variant="default" :to="{ name: 'Register' }">или се регистрирай първо</b-button>
          </b-jumbotron>
          <b-jumbotron bg-variant="info" text-variant="white" header="Бланки" lead="Система за попълване на бланки при пристигане на летищата в България по време на Covid-19." v-else>
            <b-button variant="light" :to="{ name: 'Form' }">Започнете нова бланка</b-button>
          </b-jumbotron>
        </div>
        <section>
          <div class="col-md-12 mb-3" v-if="logged_in">
            <h2>Вашите форми</h2>
            <b-list-group>
              <b-list-group-item
              :to="(form.verified) ? { name: 'FormPreview', params: { code: form.code } } : { name: 'FormEdit', params: { code: form.code } }"
              class="flex-column align-items-start"
              :key="form._id"
              v-for="form in forms"
              >
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Бланка №{{ form.code }}</h5>
                  <small class="text-muted"> преди {{ getDate(new Date(parseInt( form._id.substring(0,8), 16 ) * 1000 )) }}</small>
                </div>
                <p class="m-0" :class="(form.verified) ? 'text-success' : 'text-danger'">
                  Вашата бланка <strong>{{ (form.verified) ? 'е' : 'не е' }}</strong> потвърдена от полицай.
                  <template v-if="form.homeDate">
                    Имате до <strong>{{ new Date(form.homeDate).getHours() }}:{{ new Date(form.homeDate).getMinutes() }}</strong>
                    на <strong> {{ getDateOnly(new Date(form.homeDate)) }}</strong> да се приберете.
                    Вашата карантина изтича на
                    <strong>{{ getQuarantineEnd(new Date(form.homeDate)) }}</strong>.
                  </template>
                </p>
              </b-list-group-item>
            </b-list-group>
          </div>

        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  metaInfo() { return { title: 'Начало' } },
  async mounted() {
    await this.$store.dispatch('form/list')
  },
  computed: {
    ...mapGetters('user', ['logged_in', 'user', 'loaded']),
    ...mapGetters('form', ['forms'])
  }
}
</script>
