import {
  SET_DATA_FOR_API,
  SET_DATA_FROM_API,
  SET_DATA_FROM_API_EXIST,
  SET_FILTERED_ARRAY,
  SET_FILTERED_DATA,
  SET_FILTERS,
  SET_TOKEN,
} from './mutation-types'

export default {
  [SET_TOKEN](state, token) {
    state.token = token
  },
  /**
   * @param state
   * @param payload
   */
  [SET_DATA_FOR_API](state, payload) {
    state.dataForApi = payload
  },

  /**
   * @param state
   * @param payload
   */
  [SET_DATA_FROM_API](state, payload) {
    state.dataFromApi = JSON.parse(JSON.stringify(payload))
  },

  /**
   * @param state
   * @param payload
   */
  [SET_DATA_FROM_API_EXIST](state, payload) {
    state.dataFromApiExist = payload
  },

  /**
   * @param state
   * @param payload
   */
  [SET_FILTERED_ARRAY](state, payload) {
    const response = JSON.parse(JSON.stringify(payload))
    state.filteredArray = response
    state.filteredData = response.data
  },

  /**
   * Set filters
   *
   * @param state
   * @param payload
   */
  [SET_FILTERS](state, payload) {
    state.filters = payload
  },

  /**
   * Set filtered data to shown
   *
   * @param state
   * @param payload
   */
  [SET_FILTERED_DATA](state, payload) {
    state.filteredData = payload
  },
}
