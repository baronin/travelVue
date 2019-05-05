<template>
  <div>
    <div class="flights-results-item" v-for="(segments, index) in flightCardsData.offerItems[0].services" :key="index">
      <div class="column">
        <a href="#" class="logo-airline">
          <img src="../../../img/logo-airlines.jpg" alt="logo airline">
        </a>
        <div class="ticket-range-time">
          {{toDepartureTime(segments)}} — {{toArrivedTime(segments )}}
          <span>
            {{ getAirlines(segments)}}
          </span>
        </div>
      </div>
      <div class="column">
        <p>
          {{toTotalTime(segments)}}
        </p>
        <span>
          {{toDepartureIata(segments)}}
          {{toArrivalIata(segments)}}
        </span>
      </div>
      <div class="column">
        <p :class="{'hes-text-green': segments.segments.length === 1}">
          {{getStop(segments)}}
        </p>
        <span v-for="(item, index) in segments.segments" :key="index">
          {{getLayoverCity(segments, index)}}
          {{getLayoverTime(segments, index)}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import './_flights-results-item.scss';
  import moment from 'moment';
  import airlines from '../../../jsons/airlines';

  export default {
    name: 'FlightsResultsItem',
    props: {
      departureTime: String,
      flightCardsData: Object,
      ticketLine: Object,
    },
    data() {
      return {
        airlinesJson: airlines,
      };
    },
    methods: {
      toDepartureIata(value) {
        let iataCode = value.segments[0].flightSegment.departure.iataCode;
        return iataCode;
      },
      toArrivalIata(value) {
        let iataCode = value.segments[0].flightSegment.arrival.iataCode;
        if (value.segments.length > 1) {
          iataCode = value.segments[1].flightSegment.arrival.iataCode;
          return iataCode;
        }
        return iataCode;
      },
      toDepartureTime(value) {
        let departureTime = moment(value.segments[0].flightSegment.departure.at).format('H:mm');
        return departureTime;
      },
      toArrivedTime(value) {
        return moment(value.segments[value.segments.length - 1].flightSegment.arrival.at).format('H:mm');
      },
      toTotalTime(value) {
        let durationValue = moment.duration('P' + value.segments[0].flightSegment.duration);
        let getHoursMinutes = `${ durationValue._data.hours }h ${ durationValue._data.minutes }m`;

        if (value.segments.length > 1) {
          let departureTime = moment.utc(moment(value.segments[0].flightSegment.departure.at)).format('x');
          let arrivalTime = moment.utc(moment(value.segments[value.segments.length - 1].flightSegment.arrival.at))
              .format('x');
          let totalMilliseconds = arrivalTime - departureTime;
          let totalMinutes = moment(totalMilliseconds).format('mm');
          let hours = Math.floor(moment.duration(totalMilliseconds).asHours());

          getHoursMinutes = hours + 'h' + ' ' + totalMinutes + 'm';
          return getHoursMinutes;
        }
        return getHoursMinutes;
      },
      getStop(value) {
        let transfer = 'nonstop';

        if (value.segments.length > 1) {
          transfer = value.segments.length - 1 + ' stop';
          return transfer;
        }
        return transfer;
      },
      getLayoverCity(value, index) {
        if (value.segments.length > 1) {
          for (let i = index; i < value.segments.length - 1; i++) {
            let getCity = value.segments[i].flightSegment.arrival.iataCode;
            return getCity + ',';
          }
        }
      },
      getLayoverTime(value, index) {
        if (value.segments.length > 1) {
          for (let i = index; i < value.segments.length - 1; i++) {
            let arrivalTime = moment(moment(value.segments[i].flightSegment.arrival.at)).format('x');
            let departureTime = moment(moment(value.segments[i + 1].flightSegment.departure.at)).format('x');
            let totalTimeLayover = departureTime - arrivalTime;

            let getHours = moment.utc(totalTimeLayover).format('H');
            let getMinutes = moment.utc(totalTimeLayover).format('mm');
            return getHours + 'h ' + getMinutes + 'm';
          }
        }
      },
      getAirlines(value) {
        for (let key in this.airlinesJson) {
          if (key === value.segments[0].flightSegment.carrierCode) {
            return this.airlinesJson[key];
          }
        }
      },
    },
  };
</script>