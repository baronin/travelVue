import { api } from '@/api'
import * as types from './mutation-types'
import Cookies from 'js-cookie'

export const getToken = async ({ commit }, payload) => {
  const tokenCookie = Cookies.get('access_token')

  if (tokenCookie) {
    commit(types.SET_TOKEN, tokenCookie)
    return
  }
  const response = await api.auth.getToken()
  const token = response.data.accessToken
  const in30Minutes = 1 / 48
  Cookies.set('access_token', token, { expires: in30Minutes }) // Set the token in a cookie that expires in 30 minutes
  commit(types.SET_TOKEN, token)
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
