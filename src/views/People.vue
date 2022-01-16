<template>
  <default-card :loading="loading">
    <template #nav>
      <v-card-title>
        <v-text-field
          v-model="search"
          ref="search"
          :disabled="loading"
          style="max-width: 300px"
          color="primary"
          type="text" label="Name"
          @focus="setCurrentTable('people')" />
        <v-btn
          color="primary"
          :disabled="currentTable === 'people'"
          text
          @click="() => $refs && $refs.search.focus()">
          People
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="getFilteredByData('films')">
          Films
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="getFilteredByData('species')">
          Species
        </v-btn>
      </v-card-title>
    </template>
    <template #content>
      <v-card-subtitle v-if="search">
        <v-chip-group>
          <v-chip
            v-for="(name, index) in currentNames"
            :key="'filtered-name-' + index"
            small disabled>
            {{ name }}
          </v-chip>
        </v-chip-group>
      </v-card-subtitle>
      <v-data-table
        v-model="selected"
        :headers="currentHeaders"
        :items="contentData"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        class="table-content"
        item-key="name"
        disable-sort
        hide-default-footer
        single-select
        @current-items="setFilteredItems"
        @click:row="openPerson">
        <!-- eslint-disable vue/valid-v-slot -->
        <template #item.name="{ item }">
          <v-icon
            v-if="item.gender && item.gender !== 'n/a'"
            class="me-2">
            mdi-gender-{{ item.gender }}
          </v-icon>
          {{ item.name }}
        </template>
      </v-data-table>
      <v-row
        v-if="pageCount > 1"
        class="text-center my-2 align-center"
        wrap>
        <v-col>
          <v-pagination
            v-model="page"
            :length="pageCount" />
        </v-col>
      </v-row>
    </template>
  </default-card>
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex"

  export default {
    name: 'People',
    data() {
      return {
        search: '',
        page: 1,
        itemsPerPage: 6
      }
    },
    computed: {
      ...mapState(['selectedRow', 'currentTable', 'loading', 'filteredItems']),
      ...mapGetters(['contentData', 'headers', 'currentNames']),

      currentHeaders() {
        return this.currentTable === 'people' ? [{ text: "Name", value: "name",
          filter: (f) => {
            return (f + "")
              .toLowerCase()
              .includes(this.search.toLowerCase());
          }},
          ...this.headers,
          ] : this.headers
      },
      selected: {
        get() {
          return this.selectedRow
        },
        set(val) {
          // Set clicked row as selected
          this.setSelectedRow(val)
        }
      },
      pageCount() {
        return Math.round(this.contentData?.length / this.itemsPerPage)
      },
    },
    async mounted() {
      await this.getContentData('people')
      // Set to input maximum length
      this.$refs && (this.$refs.search.$refs.input.maxLength = 50)
    },
    methods: {
      ...mapActions(['setBySearch', 'getContentData', 'setSelectedRow', 'setCurrentTable', 'setFilteredItems']),

      async openPerson(e, item) {
        if (this.currentTable === 'people') {
          await item.select()
          const person = e.url.split('/').filter(el => !!el).pop()
          this.$router.push({ name: 'nav.person', params: { id: person } })
        }
      },

      async getFilteredByData(payload) {
        await this.getContentData(payload)
        this.setBySearch(!!this.search)
        this.setCurrentTable(payload)
      },
    }
  }
</script>

<style lang="scss" scoped>
.table-content {
  cursor: pointer;
}
::v-deep.theme--light.v-data-table tbody tr.v-data-table__selected {
  background: lightgrey;
}
</style>
