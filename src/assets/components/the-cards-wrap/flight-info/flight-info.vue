<template>
  <div class="flight-info-wrap" v-show="!hide">
    <div class="button-wrap">
      <button class="is-close display-none-mobile display-none-table" @click="closeButton"></button>
    </div>
    <div class="flights-result-row"
         v-for="(itemCard, index) in ticketData.offerItems[0].services"
         :key="index">
      <div class="row flight-info-top">
        <div class="title">
          <div class="flex">
            <h3 class="has-text-weight-bold flex">
              {{arrivalsAndDeparture[index]}}
            </h3>
            <h3 class="display-none-desktop">
              {{getTimeArrival(itemCard, 'departure', true)}}
            </h3>
          </div>
          <h5 class="total-time has-text-info display-none-desktop">
            {{getTimeArrival(itemCard, 'arrival')}}
          </h5>
        </div>
        <span class="">{{getTotalTime(itemCard)}}</span>
      </div>
      <div class="row">
        <div class="column-date">
          <p class="has-text-weight-bold">
            {{getTimeArrival(itemCard, 'departure', true)}}
          </p>
          <p class="has-text-weight-bold has-text-info">
            {{getTimeArrival(itemCard, 'arrival' ,)}}
          </p>
        </div>
        <itinerary-results :itemCard="itemCard"></itinerary-results>
      </div>
    </div>
  </div>
</template>

<script>
  import './_flight-info.scss'
  import {mapState} from 'vuex'
  import moment from 'moment'
  import ItineraryResults from "../itinerary-results/itinerary-results";

  export default {
    name: "flight-info",
    components: {ItineraryResults},

    props: {
      dataFromAmadeusApi: Object,
      isModalShown: Boolean,
      ticketData: Object,
    },

    data() {
      return {
        arrivalsAndDeparture: [
          'Outbound',
          'Return'
        ],
        hide: false,
        toFrom: '',
        airJsons: this.dataFromAmadeusApi,
      }
    },
    computed: mapState(['durationTime']),

    methods: {
      closeButton() {
        this.$emit('closebtn', this.hide)
      },
      getAirlines(item) {
        for (let key in this.airlines) {
          if (key === item.segments[0].flightSegment.carrierCode) {
            return this.airlines[key]
          }
        }
      },
      getTimeArrival(item, direction, directionArr) {
        let data = item.segments[0].flightSegment[direction].at;

        let departureDay = moment(item.segments[0].flightSegment.departure.at).format('D');
        let arrivalDay = moment(item.segments[0].flightSegment.arrival.at).format('D');
        if (item.segments.length === 1) {
          if (departureDay !== arrivalDay) {
            return moment(data).format('ddd, MMM D')
          } else if (directionArr) {
            return moment(data).format('ddd, MMM D')
          }
        } else {
          let departureDay = moment(item.segments[0].flightSegment.departure.at).format('D');
          let arrivalDay = moment(item.segments[item.segments.length - 1].flightSegment.departure.at).format('D');
          if (departureDay !== arrivalDay) {
            return moment(data).format('ddd, MMM D')
          } else if (directionArr) {
            return moment(data).format('ddd, MMM D')
          }

        }
      },
      getTotalTime(value) {
        let durationValue = moment.duration('P' + value.segments[0].flightSegment.duration);
        let getHoursMinutes = `${durationValue._data.hours}h ${durationValue._data.minutes}m`;

        if (value.segments.length > 1) {
          let departureTime = moment.utc(moment(value.segments[0].flightSegment.departure.at)).format('x');
          let arrivalTime = moment.utc(moment(value.segments[value.segments.length - 1].flightSegment.arrival.at)).format('x');
          let totalMilliseconds = arrivalTime - departureTime;
          let totalMinutes = moment(totalMilliseconds).format('mm');
          let hours = Math.floor(moment.duration(totalMilliseconds).asHours());

          getHoursMinutes = hours + 'h' + ' ' + totalMinutes + 'm';
          return getHoursMinutes;
        }
        return getHoursMinutes;
      },
    },
  }
</script>
