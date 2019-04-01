<template>
  <the-cards/>
</template>

<script>
  import TheCards from "./the-cards";
  export default {
    name: "card-wrap",
    components: {TheCards},
    methods: {
      //id ticket
      triggerModal(item) {
        this.isModalShown = true;
        this.selectedItem = item;
      },
      // time departure
      getIataDeparture(item) {
        return item.offerItems[0].services[0].segments[0].flightSegment.departure.iataCode;
      },
      getDepartureTime(item) {
        return this.timeDeparture = moment(item.offerItems[0].services[0].segments[0].flightSegment.departure.at).format('H:mm');
      },
      getIataArrival(item) {
        return item.offerItems[0].services[0].segments[0].flightSegment.arrival.iataCode;
      },
      getArrivalTime(item) {
        return moment(item.offerItems[0].services[0].segments[0].flightSegment.arrival.at).format('H:mm');
      },
      // total time need fix
      getTotalTimeHours(item) {
        return moment(moment(item.offerItems[0].services[0].segments[0].flightSegment.arrival.at).diff(moment(item.offerItems[0].services[0].segments[0].flightSegment.departure.at))).format('H');
      },
      getTotalTimeMinutes(item) {
        return moment(moment(item.offerItems[0].services[0].segments[0].flightSegment.arrival.at).diff(moment(item.offerItems[0].services[0].segments[0].flightSegment.departure.at))).format('mm');
      },
      // price
      getPriceTicket(item) {
        return item.offerItems[0].price.total;
      }
  }
</script>