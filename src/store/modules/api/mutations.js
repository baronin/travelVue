import {
  SET_DATA_FOR_API,
  SET_DATA_FROM_API,
  SET_DATA_FROM_API_EXIST,
  SET_FILTERED_ARRAY, SET_FILTERS,
} from './mutation-types';

export default {
  /**
   * @param state
   * @param payload
   */
  [SET_DATA_FOR_API](state, payload) {
    state.dataForApi = payload;
  },

  /**
   * @param state
   * @param payload
   */
  [SET_DATA_FROM_API](state, payload) {
    state.dataFromApi = JSON.parse(JSON.stringify(payload));
  },

  /**
   * @param state
   * @param payload
   */
  [SET_DATA_FROM_API_EXIST](state, payload) {
    state.dataFromApiExist = payload;
  },

  /**
   * @param state
   * @param payload
   */
  [SET_FILTERED_ARRAY](state, payload) {
    state.filteredArray = JSON.parse(JSON.stringify(payload));
  },

  /**
   * Set filters
   *
   * @param state
   * @param payload
   */
  [SET_FILTERS](state, payload) {
    state.filters = payload;
  },
};
