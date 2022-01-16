<template>
  <default-card>
    <v-btn @click="$router.push({ name: 'nav.people' })">
      Back to heroes list
    </v-btn>
    <v-card-title>
      <v-icon class="me-2">
        mdi-gender-{{ person.gender }}
      </v-icon> {{ person.name }}
    </v-card-title>
    <v-card-text>
      <div
        style="text-transform: capitalize;"
        v-for="(key, index) in Object.keys(personData)"
        :key="'person-prop-' + index">
        {{key.replace('_', ' ')}}:
        <span>{{ personData[key] }}</span>
      </div>
    </v-card-text>
  </default-card>
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex"

  export default {
    name: 'Person',
    data() {
      return {
        loading: true
      }
    },
    computed: {
      ...mapState(['person', 'contentData']),
      ...mapGetters(['personData'])
    },
    async mounted() {
      await this.getPersonData(this.$route.params.id)
      !this.contentData?.films?.length && await this.getContentData({ req: 'films' })
    },
    methods: {
      ...mapActions(['getPersonData', 'getContentData'])
    }
  }
</script>
