import * as types from './mutation-types';
import api from '@/assets/helpers/data.mixin';
import moment from '../global';

/**
 * @param commit
 * @param dispatch
 * @param state
 */
export const getDataFromApi = ({ commit, dispatch, state }) => {
  dispatch('spinner/show', null, { root: true });
  commit(types.SET_DATA_FROM_API_EXIST, false);
  api.getDataFromMixin({
    url: 'https://test.api.amadeus.com/v1/shopping/flight-offers?origin=' +
        state.dataForApi.originCity.cityCode + '&destination=' +
        state.dataForApi.destinationCity.cityCode + '&departureDate=' +
        state.dataForApi.flightDates.startDate + '&returnDate=' +
        state.dataForApi.flightDates.endDate + '&adults=' +
        state.dataForApi.countPassenger.sumPassengers + '&travelClass=ECONOMY',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + state.dataForApi.tokenForRequest.token,
    },
  }).then(response => {
    commit(types.SET_DATA_FROM_API, response.data);
    commit(types.SET_FILTERED_ARRAY, response.data);
  }).finally(() => {
    dispatch('spinner/hide', null, { root: true });
    commit(types.SET_DATA_FROM_API_EXIST, true);
  });
};

/**
 * @param state
 */
export const getSortByPrice = ({ state }) => {
  state.filteredArray.sort((a, b) =>
      (+a.offerItems[0].price.total > +b.offerItems[0].price.total) ?
          1 :
          ((+b.offerItems[0].price.total > +a.offerItems[0].price.total) ?
              -1 :
              0));
};

/**
 * Set filters in state
 *
 * @param commit
 * @param payload
 */
export const setFilters = ({ commit }, payload) => {
  commit(types.SET_FILTERS, payload);
};

/**
 * @param commit
 * @param payload
 */
export const setDataForApi = ({ commit }, payload) => {
  commit(types.SET_DATA_FOR_API, payload);
};

export default {
  getDataFromApi,
  getSortByPrice,
  setFilters,
  setDataForApi,
};
