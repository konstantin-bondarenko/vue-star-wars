<template>
  <default-card :loading="loading">
    <template #nav>
      <v-btn
        color="primary"
        text
        @click="$router.push({ name: 'nav.people' })">
        Back to heroes list
      </v-btn>
    </template>
    <template
      #content
      v-if="personFilms.length">
      <v-card-title>
        <v-icon
          v-if="person.gender && person.gender !== 'n/a'"
          class="me-2">
          mdi-gender-{{ person.gender }}
        </v-icon> {{ person.name }}
      </v-card-title>
      <div
        class="person-content">
        <div class="person-content-section">
          <v-card-subtitle>
            Personal
          </v-card-subtitle>
          <v-card-text>
            <div
              v-for="(key, index) in Object.keys(personData)"
              :key="'person-prop-' + index"
              class="person">
              <div class="person-key">
                {{key.replace('_', ' ')}}:
              </div>
              <div class="person-value">
                {{ personData[key] }}
              </div>
            </div>
          </v-card-text>
        </div>
        <div class="person-content-section">
          <v-card-subtitle>
            Films
          </v-card-subtitle>
          <v-card-text>
            <div
              v-for="(key, index) in personFilms"
              :key="'person-prop-' + index"
              class="person">
              {{ key.title }} | {{ key.release_date }} | Word count of the opening crawl: {{ wordsCount(key.opening_crawl) }}
            </div>
          </v-card-text>
        </div>
      </div>
    </template>
  </default-card>
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex"

  export default {
    name: 'Person',
    computed: {
      ...mapState(['person', 'loading']),
      ...mapGetters(['personData', 'personFilms']),
    },
    async mounted() {
      await this.getPersonData(this.$route.params.id)
      await this.getContentData('films')
    },
    methods: {
      ...mapActions(['getPersonData', 'getContentData']),
      wordsCount(str) {
        return str.replace(/(.\r\n|\n|\r)/gm, " ").split(' ').filter(el => !!el).length
      }
    }
  }
</script>

<style lang="scss" scoped>
.person {
  display: flex;
  gap: 12px;
  margin: 4px 0;
  color: #7e7863;
  &-key {
    text-transform: capitalize;
  }
}

.person-content {
  display: flex;
  flex-wrap: wrap;

  &-section {
    flex-grow: 1;
  }
}
</style>
