import Vue from "vue";
import Vuex from "vuex";
import axios from "../plugins/axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contentData: {
      people: [],
      films: [],
      species: [],
    },
    selectedRow: [],
    filteredItems: [],
    currentTable: "people",
    allowedPersonKeys: ['birth_year', 'height', 'mass', 'hair_color', 'eye_color', 'skin_color'],
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
  getters: {
    contentData(state) {
      return state.contentData[state.currentTable];
    },
    headers(state) {
      return state.headers[state.currentTable];
    },
    currentNames(state) {
      return state.filteredItems.names
    },
    personData(state) {
      return Object.keys(state.person).filter(el => state.allowedPersonKeys.includes(el)).reduce((obj, key) => {
        obj[key] = state.person[key];
        return obj;
      }, {});
    }
  },
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
  },
  actions: {
    async getContentData({ commit }, payload) {
      await axios
        .get(payload.req)
        .then((resp) => {
          console.log("Content Data resp: ", resp.data.results);
          if (resp.data) {
            commit("SET_CONTENT_DATA", {
              payload: resp.data.results,
              type: payload.req,
            });
            commit("SET_CURRENT_TABLE", payload.req);
          }
        })
        .catch((e) => {
          throw new Error(e.message);
        });
        payload.callback && payload.callback(false)
    },
    async getPersonData({ commit }, id) {
      await axios
        .get(`people/${id}`)
        .then((resp) => {
          console.log("Person Data resp: ", resp.data);
          if (resp) commit("SET_PERSON_DATA", resp.data);
        })
        .catch((e) => {
          throw new Error(e.message);
        });
    },
    setSelectedRow({ commit }, payload) {
      commit("SET_SELECTED_ROW", payload);
    },
    setCurrentTable({ commit }, payload) {
      commit("SET_CURRENT_TABLE", payload);
    },
    setFilteredItems({ commit, state }, payload) {
      if (state. currentTable === 'people') {
        const films = payload.map(el => el.films).flat().filter((v, i, a) => a.indexOf(v) === i)
        const species = payload.map(el => el.species).flat().filter((v, i, a) => a.indexOf(v) === i)
        const names = payload.map(el => el.name)
        commit("SET_FILTERED_ITEMS", { films, species, names });
      }
    },
    filterBy({ commit, state }, payload) {
      const data = state.contentData[payload].filter((el) =>
        state.filteredItems[payload].includes(el.url)
      );
      commit("SET_CONTENT_DATA", {
        payload: data,
        type: payload,
      });
    },
  },
  modules: {},
});
