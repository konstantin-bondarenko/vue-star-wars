import Vue from "vue";
import Vuex from "vuex";
import axios from "../plugins/axios";
Vue.use(Vuex);

export default new Vuex.Store({
  // STATE
  state: {
    contentData: {
      people: [],
      films: [],
      species: [],
    },
    loading: true,
    isBySearch: false,
    selectedRow: [],
    filteredItems: [],
    currentTable: "people",
    allowedPersonKeys: [
      "birth_year",
      "height",
      "mass",
      "hair_color",
      "eye_color",
      "skin_color",
    ],
    person: {},
    headers: {
      people: [
        { text: "Height", value: "height" },
        { text: "Hair color", value: "hair_color" },
        { text: "Eye color", value: "eye_color" },
        { text: "Birth year", value: "birth_year" },
      ],
      films: [
        { text: "Title", value: "title" },
        { text: "Director", value: "director" },
        { text: "Producer", value: "producer" },
        { text: "Release date", value: "release_date" },
      ],
      species: [
        { text: "Name", value: "name" },
        { text: "Classification", value: "classification" },
        { text: "Language", value: "language" },
        { text: "Hair colors", value: "hair_colors" },
        { text: "Eye colors", value: "eye_colors" },
        { text: "Skin colors", value: "skin_colors" },
      ],
    },
  },

  // GETTERS
  getters: {
    contentData(state) {
      const data = state.contentData[state.currentTable];

      if (state.currentTable !== "people" && state.isBySearch) {
        return data.filter((el) =>
          state.filteredItems[state.currentTable].includes(el.url)
        );
      } else return data;
    },
    headers(state) {
      return state.headers[state.currentTable];
    },
    currentNames(state) {
      return state.filteredItems.names;
    },

    // Filter person data by allowed fields
    personData(state) {
      return Object.keys(state.person)
        .filter((el) => state.allowedPersonKeys.includes(el))
        .reduce((obj, key) => {
          obj[key] = state.person[key];
          return obj;
        }, {});
    },

    // Filter films by person
    personFilms(state) {
      return state.contentData.films.filter((el) =>
        state.person?.films?.includes(el.url)
      );
    },
  },

  // MUTATIONS
  mutations: {
    SET_CONTENT_DATA(state, { payload, type }) {
      state.contentData[type] = payload;
    },
    SET_PERSON_DATA(state, payload) {
      state.person = payload;
    },
    SET_SELECTED_ROW(state, payload) {
      state.selectedRow = payload;
    },
    SET_CURRENT_TABLE(state, payload) {
      state.currentTable = payload;
    },
    SET_FILTERED_ITEMS(state, payload) {
      state.filteredItems = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_BY_SEARCH(state, payload) {
      state.isBySearch = payload;
    },
  },

  // ACTIONS
  actions: {
    // Data fetch
    async getContentData({ commit, state }, payload) {
      commit("SET_LOADING", true);
      if (!state.contentData[payload]?.length) {
        await axios
          .get(payload)
          .then((resp) => {
            if (resp.data) {
              commit("SET_CONTENT_DATA", {
                payload: resp.data.results,
                type: payload,
              });
            }
          })
          .catch((e) => {
            throw new Error(e.message);
          });
      }
      commit("SET_LOADING", false);
    },
    async getPersonData({ commit }, id) {
      commit("SET_LOADING", true);
      await axios
        .get(`people/${id}`)
        .then((resp) => {
          if (resp) commit("SET_PERSON_DATA", resp.data);
        })
        .catch((e) => {
          throw new Error(e.message);
        });
      commit("SET_LOADING", false);
    },

    setSelectedRow({ commit }, payload) {
      commit("SET_SELECTED_ROW", payload);
    },
    setCurrentTable({ commit }, payload) {
      commit("SET_CURRENT_TABLE", payload);
    },
    setBySearch({ commit }, payload) {
      commit("SET_BY_SEARCH", payload);
    },

    // Save filtered items
    setFilteredItems({ commit, state }, payload) {
      if (state.currentTable === "people") {
        const films = payload
          .map((el) => el.films)
          .flat()
          .filter((v, i, a) => a.indexOf(v) === i);
        const species = payload
          .map((el) => el.species)
          .flat()
          .filter((v, i, a) => a.indexOf(v) === i);
        const names = payload.map((el) => el.name);
        commit("SET_FILTERED_ITEMS", { films, species, names });
      }
    },
  },
});
