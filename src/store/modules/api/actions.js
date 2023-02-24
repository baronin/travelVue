import { api } from '@/api/api'
import * as types from './mutation-types'

export const getToken = async ({ commit }, payload) => {
  const response = await api.auth.getToken()
  localStorage.setItem('access_token', response.data.accessToken)
  commit(types.SET_TOKEN, response.data.accessToken)
}
/**
 * @param commit
 * @param dispatch
 * @param state
 */
export const getDataFromApi = ({ commit, dispatch, state }) => {
  dispatch('spinner/show', null, { root: true })
  commit(types.SET_DATA_FROM_API_EXIST, false)
  api.flightOffers.get({
    origin: state.dataForApi.originCity.cityCode,
    destination: state.dataForApi.destinationCity.cityCode,
    departureDate: state.dataForApi.flightDates.startDate,
    returnDate: state.dataForApi.flightDates.endDate,
    adults: state.dataForApi.countPassenger.sumPassengers,
    travelClass: 'ECONOMY',
  })
}

/**
 * @param state
 */
export const getSortByPrice = ({ state }) => {
  state.filteredArray.sort((a, b) =>
    +a.data.offerItems[0].price.total > +b.data.offerItems[0].price.total
      ? 1
      : +b.data.offerItems[0].price.total > +a.data.offerItems[0].price.total
      ? -1
      : 0
  )
}

/**
 * Set filters in state
 *
 * @param commit
 * @param payload
 */
export const setFilters = ({ commit }, payload) => {
  commit(types.SET_FILTERS, payload)
}

/**
 * @param commit
 * @param payload
 */
export const setDataForApi = ({ commit }, payload) => {
  commit(types.SET_DATA_FOR_API, payload)
}

/**
 * @param commit
 * @param getters
 */
export const setFilteredData = ({ commit, getters }) => {
  commit(types.SET_FILTERED_DATA, getters.filteredArrayForCounting)
}

export default {
  getToken,
  getDataFromApi,
  getSortByPrice,
  setFilters,
  setDataForApi,
  setFilteredData,
}
