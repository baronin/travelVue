import moment from 'moment'

export default {
  token(state) {
    return state.token
  },

  /**
   * @param state
   * @returns {default.dataFromApi|(function(*))|default.dataFromApi|{}|any}
   */
  dataFromApi(state) {
    return state.dataFromApi
  },

  /**
   * @param state
   * @returns {default.dataFromApi|(function(*))|default.dataFromApi|{}|any}
   */
  dataForApi(state) {
    return state.dataForApi
  },

  /**
   * @param state
   * @returns {default.dataFromApi|(function(*))|default.dataFromApi|{}|any}
   */
  dataFromApiExist(state) {
    return state.dataFromApiExist
  },

  /**
   * @param state
   * @returns {default.dataFromApi|(function(*))|default.dataFromApi|{}|any}
   */
  filteredArray(state) {
    return state.filteredArray
  },

  /**
   * @param state
   * @returns {default.dataFromApi|(function(*))|default.dataFromApi|{}|any}
   */
  filteredData(state) {
    return state.filteredData
  },

  /**
   * @param state
   * @returns {default.dataFromApi|(function(*))|default.dataFromApi|{}|any}
   */
  filteredArrayForCounting(state) {
    const filterByAirports = (offer, data, codeName) => {
      let services = offer.offerItems[0].services
      for (let i = 0; i < services.length; i++) {
        let segments = services[i].segments
        for (let j = 0; j < segments.length; j++) {
          let indexOfCodeName = data.findIndex(
            (item) =>
              item[codeName] === segments[j].flightSegment.departure[codeName] && item.isChecked
          )
          if (indexOfCodeName > -1) {
            return true
          }
        }
      }
      return false
    }

    return state.dataFromApi.data
      .filter((offer) => {
        const jsonPrice = offer.offerItems[0].price.total
        return jsonPrice <= state.filters.total[1] && jsonPrice >= state.filters.total[0]
      })
      .filter((offer) => {
        for (let i = 0; i < offer.offerItems[0].services.length; i++) {
          const segments = offer.offerItems[0].services[i].segments
          for (let j = 0; j < segments.length; j++) {
            const indexOfStops = state.filters.stops.findIndex(
              (item) => item.code === segments.length && item.isChecked
            )
            if (indexOfStops > -1) {
              return true
            }
          }
        }
        return false
      })
      .filter((offer) => () => {
        return (
          ((services) => {
            for (let i = 0; i < services.length; i++) {
              let lastSegment = services[i].segments.length - 1
              let departure = services[i].segments[0].flightSegment.departure.at
              let arrival = services[i].segments[lastSegment].flightSegment.arrival.at
              let arrSec = moment.utc(arrival).valueOf(),
                depSec = moment.utc(departure).valueOf(),
                differenceInMs = arrSec - depSec
              return differenceInMs
            }
          })(offer.offerItems[0].services) <= state.filters.duration
        )
      })
      .filter((offer) => () => {
        return ((offer, data, code, codeName) => {
          let services = offer.offerItems[0].services
          for (let i = 0; i < services.length; i++) {
            let segments = services[i].segments
            for (let j = 0; j < segments.length; j++) {
              let indexOfCodeName = data.findIndex(
                (item) => item[code] === segments[j].flightSegment[codeName] && item.isChecked
              )
              if (indexOfCodeName > -1) {
                return true
              }
            }
          }
          return false
        })(offer, state.filters.carrierCode, 'code', 'carrierCode')
      })
      .filter((offer) => () => {
        return filterByAirports(offer, state.filters.departure, 'iataCode')
      })
      .filter((offer) => () => {
        return filterByAirports(offer, state.filters.arrival, 'iataCode')
      })
  },
}
