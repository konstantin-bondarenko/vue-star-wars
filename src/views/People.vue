<template>
  <default-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        ref="search"
        style="max-width: 300px"
        type="text" label="Name"
        @focus="setCurrentTable('people')" />
      <v-btn
        color="orange"
        :disabled="currentTable === 'people'"
        text
        @click="() => $refs.search.focus()">
        People
      </v-btn>
      <v-btn
        color="orange"
        text
        @click="getFilteredByData('films')">
        Films
      </v-btn>
      <v-btn
        color="orange"
        text
        @click="getFilteredByData('species')">
        Species
      </v-btn>
    </v-card-title>
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
      class="table-content"
      item-key="name"
      disable-sort
      hide-default-footer
      single-select
      :loading="loading"
      @current-items="setFilteredItems"
      @click:row="openPerson">
      <!-- eslint-disable vue/valid-v-slot -->
      <template #item.name="{ item }">
        <v-icon class="me-2">
          mdi-gender-{{ item.gender }}
        </v-icon>
        {{ item.name }}
      </template>
    </v-data-table>
  </default-card>
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex"

  export default {
    name: 'People',
    data() {
      return {
        search: '',
        loading: true
      }
    },
    computed: {
      ...mapState(['selectedRow', 'currentTable']),
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
      }
    },
    async mounted() {
      await this.getContentData({req: 'people', callback: this.callback})
      // Set to input maximum length
      this.$refs && (this.$refs.search.$refs.input.maxLength = 50)
    },
    methods: {
      ...mapActions(['getContentData', 'filterBy', 'setSelectedRow', 'setCurrentTable', 'setFilteredItems']),

      async openPerson(e, item) {
        if (this.currentTable === 'people') {
          await item.select()
          this.$router.push({ name: 'nav.person', params: { id: item.index + 1 } })
        }
      },

      async getFilteredByData(payload) {
        this.loading = true
        await this.getContentData({req: payload, callback: this.callback})
        this.search && this.filterBy(payload)
      },

      callback(payload) {
        this.loading = payload
      }
    }
  }
</script>

<style lang="scss" scoped>
.table-content {
  cursor: pointer;
}
</style>
