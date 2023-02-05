import { client} from "@/api/client";

export const flightOffers = {
    get(options) {
        return client.get('shopping/flight-offers', {
            params: {
                origin: options.originCity.cityCode,
                destination: options.destinationCity.cityCode,
                departureDate: options.flightDates.startDate,
                returnDate: options.flightDates.startDate,
                adults: options.countPassenger.sumPassengers,
                travelClass: options.travelClass
            }
        })
    }
}
