import { instance } from '@/api/instance'

export const flightOffers = {
  get(options) {
    return instance.get('shopping/flight-offers', {
      params: {
        origin: options.originCity.cityCode,
        destination: options.destinationCity.cityCode,
        departureDate: options.flightDates.startDate,
        returnDate: options.flightDates.startDate,
        adults: options.countPassenger.sumPassengers,
        travelClass: options.travelClass,
      },
    })
  },
}
