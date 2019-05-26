import Vue from 'vue';
import Vuex from 'vuex';
import api from '../assets/helpers/data.mixin';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataFromApiExist: false,
    dataForApi: {},
    dataFromApi: {},
    runSpiner: false,
    filteredArray: {
      data: []
    },
    filterData: [],
    routerPath: '',
    filteredArrayForCounting: [],
    changeStylesForResultPage: false,
    changeStylesForPassengerInfoPage: false,
    showSearchForms: true,
    durationTime: '',
    breadCrampsActive: '',
    itemCard: {},
    filterMobileShow: false,
    invalidFormsOnPassengerInfoPage: false,
    foundError: false,
  },
  mutations: {
    SET_DATA_FOR_API(state, payload) {
      state.dataForApi = payload
    },
    SET_DATA_FROM_API(state, payload) {
      state.dataFromApi = JSON.parse(JSON.stringify(payload))
    },
    RUN_SPINER(state, runSpiner) {
      state.runSpiner = runSpiner
    },
    SET_FILTERED_ARRAY(state, payload) {
      state.filteredArray = JSON.parse(JSON.stringify(payload))
    },
    SET_FILTER_DATA(state, payload) {
      state.filterData = payload
    },
    SET_DATA_FROM_API_EXIST(state, payload) {
      state.dataFromApiExist = payload
    },
    CHANGE_STYLES_FOR_PASSENGER_INFO_PAGE(state, payload){
      state.changeStylesForPassengerInfoPage = payload;
    },
    SET_BREAD_CRAMPS_ACTIVE(state, payload){
      state.breadCrampsActive = payload
    },
    SET_ITEM_CARD(state, payload){
      state.itemCard = payload
    },
    SET_SHOW_FILTER_MOBILE(state, payload) {
      state.filterMobileShow = payload
    },
    SET_INVALID_FORMS_PASSENGER_INFO_PAGE(state, payload){
      state.invalidFormsOnPassengerInfoPage = payload
    },
    SET_FOUND_ERROR(state, payload){
      state.foundError = payload
    }
  },
  actions: {
    getItemCard({commit}, payload){
      commit('SET_ITEM_CARD', payload)
    },
    getDataFromApi({commit, state}) {
      commit('RUN_SPINER', true);
      commit('SET_DATA_FROM_API_EXIST', false);
      commit('SET_FOUND_ERROR', false)
      api.getDataFromMixin({
        url: 'https://test.api.amadeus.com/v1/shopping/flight-offers?origin=' + state.dataForApi.originCity.cityCode + '&destination=' + state.dataForApi.destinationCity.cityCode + '&departureDate=' + state.dataForApi.flightDates.startDate + '&returnDate=' + state.dataForApi.flightDates.endDate + '&adults=' + state.dataForApi.passengersTypes[0].quantity + '&children=' + state.dataForApi.passengersTypes[1].quantity + '&infants=' + state.dataForApi.passengersTypes[2].quantity + '&travelClass=ECONOMY',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + state.dataForApi.tokenForRequest.token
        }
      }).then(response => {
        commit('SET_DATA_FROM_API', response.data);
        commit('SET_FILTERED_ARRAY', response.data);
      }).finally(() => {
        commit('RUN_SPINER', false)
        commit('SET_DATA_FROM_API_EXIST', true)

      }).catch((error)=> { if(error.response.status == 400) {
        commit('SET_FOUND_ERROR', true)
      } })
    },
    changeRouterPath({ state}, payload) {
      if(Object.keys(payload.query).length !== 0){
        this.state.dataForApi = payload.query
      }

      if (payload.path === '/') {
        state.changeStylesForResultPage = false
      } else {
        state.changeStylesForResultPage = true
       // payload.query = state.dataForApi;
      }

      if (payload.path === '/passenger-info' || payload.path === '/review') {
        state.showSearchForms = false
        state.changeStylesForPassengerInfoPage = true
      } else {
        state.showSearchForms = true
        state.changeStylesForPassengerInfoPage = false
      }
        state.breadCrampsActive = payload.name

    },

    getFilteredArrayForCounting({state}){
      state.filteredArray.data = state.filteredArrayForCounting
    },

    cardsFilters({state}) {
      state.filteredArrayForCounting = state.dataFromApi.data.filter(offer => {
        const jsonPrice = offer.offerItems[0].price.total;
        return jsonPrice <= state.filterData.total[1] && jsonPrice >= state.filterData.total[0];
      })
          .filter(offer => {
            for (let i = 0; i < offer.offerItems[0].services.length; i++) {
              const segments = offer.offerItems[0].services[i].segments;
              for (let j = 0; j < segments.length; j++) {
                const indexOfStops = state.filterData.stops.findIndex(item => item.code === segments.length && item.isChecked);
                if ((indexOfStops > -1)) {
                  return true;
                }
              }
            }
            return false;
          })
          .filter(offer => {
            return getJsonDuration(offer.offerItems[0].services) <= state.filterData.duration
          })
          .filter(offer => {
            return filterByCheckedObjects(offer, state.filterData.carrierCode, 'code', 'carrierCode')
          })
          .filter(offer => {
            return filterByAirports(offer, state.filterData.departure, 'iataCode')
          })
          .filter(offer => {
            return filterByAirports(offer, state.filterData.arrival, 'iataCode')
          });

      function filterByCheckedObjects(offer, data, code, codeName) {
        let services = offer.offerItems[0].services;
        for (let i = 0; i < services.length; i++) {
          let segments = services[i].segments;
          for (let j = 0; j < segments.length; j++) {
            let indexOfCodeName = data.findIndex(item => item[code] === segments[j].flightSegment[codeName] && item.isChecked);
            if ((indexOfCodeName > -1)) {
              return true;
            }
          }
        }
        return false;
      }

      function getJsonDuration(services) {
        for (let i = 0; i < services.length; i++) {
          let lastSegment = services[i].segments.length - 1;
          let departure = services[i].segments[0].flightSegment.departure.at;
          let arrival = services[i].segments[lastSegment].flightSegment.arrival.at;
          let arrSec = moment.utc(arrival).valueOf(),
              depSec = moment.utc(departure).valueOf(),
              differenceInMs = arrSec - depSec;
          return differenceInMs;
        }
      }

      function filterByAirports(offer, data, codeName) {
        let services = offer.offerItems[0].services;
        for (let i = 0; i < services.length; i++) {
          let segments = services[i].segments;
          for (let j = 0; j < segments.length; j++) {
            let indexOfCodeName = data.findIndex(item => item[codeName] === segments[j].flightSegment.departure[codeName] && item.isChecked);
            if ((indexOfCodeName > -1)) {
              return true;
            }
          }
        }
        return false;
      }
    },
    getSortByPriceAscending({state}) {
      state.filteredArray.data.sort((a, b) =>
          (+a.offerItems[0].price.total > +b.offerItems[0].price.total) ? 1 : ((+b.offerItems[0].price.total > +a.offerItems[0].price.total) ? -1 : 0))
    },
    getSortByPriceDescending({state}) {
      state.filteredArray.data.sort((a, b) =>
          (+a.offerItems[0].price.total < +b.offerItems[0].price.total) ? 1 : ((+b.offerItems[0].price.total < +a.offerItems[0].price.total) ? -1 : 0))
    },

    showFilterMobile({commit}, payload) {
      commit("SET_SHOW_FILTER_MOBILE", payload)
    }
  },
})