<template>
  <div class="column-flights">
    <div class="flights-results-itinerary"
         v-for="(item, index) in itemCard.segments"
         :key="index">
      <div class="column">
        <div class="column-holder">
          <div class="border-left"></div>
          <div class="line">
            <p>
              {{getCity(item, 'departure', 'at') | filterTime}}
              {{getIATACode(item, 'departure')}}
              ({{getCity(item, 'departure', 'iataCode')}})
            </p>
            <div class="about-company-info-wrap">
              <a href="#" class="logo-link">
                <img src="../../../img/logo-airlines.jpg" alt="logo airline">
              </a>
              <div class="about-company-info">
                    <span>
                      {{airlines(item)}}
                      {{item.flightSegment.operating.number }}
                      · Operated by
                      {{getOperating(item)}}
                    </span>
                <span>
                      {{getAircraft(item)}}
                      · <b>Economy</b>
                    </span>
              </div>
              <span class="display-none-desktop">
                    <div >{{getTotalTime(item)}}</div>
                  </span>
            </div>
          </div>
        </div>
        <p>{{getCity(item, 'arrival', 'at') | filterTime}} {{getIATACode(item, 'arrival')}} ({{getCity(item,
          'arrival', 'iataCode')}})</p></div>
      <div class="line" v-if="index < itemCard.segments.length-1">
        <div class="transfer">
          <div class="transfer-text">
            <span >Layover in {{getLayout(itemCard, index)}}</span>
            <span class="has-text-info">{{getLayoverTime(itemCard, index)}}</span>
          </div>
          <span class="display-none-desktop">{{getLayoverTime(itemCard, index, 'onlyTime')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './_itinerary-results.scss'
  import {mapState} from 'vuex'
  import moment from 'moment'
  import airports from '../../../jsons/airports'
  import airlines from '../../../jsons/airlines'

  export default {
    name: "itinerary-results",

    props: {
      itemCard: Object
    },

    computed: mapState(['dataFromApi']),

    methods: {
      getLayoverTime(value, index, onlyTime) {
        let arrivalTime = moment(moment(value.segments[0].flightSegment.arrival.at)).format('x');
        let departureTime = moment(moment(value.segments[1].flightSegment.departure.at)).format('x');

        if (value.segments.length === 1) {
          let totalTimeLayover = departureTime - arrivalTime;

          return moment.utc(totalTimeLayover).format('H:mm');
        } else if (value.segments.length > 1) {
          for(let i = index; i < value.segments.length-1; i++){

            let arrivalTime = moment(moment(value.segments[i].flightSegment.arrival.at)).format('x');
            let departureTime = moment(moment(value.segments[i+1].flightSegment.departure.at)).format('x');
            let totalTimeLayover = departureTime - arrivalTime;
            let totalTimeLayoverInHours = moment.utc(totalTimeLayover).format('H');

            if( parseInt(totalTimeLayoverInHours) > 6 && !onlyTime){
              return   'Long layover'
            } else if (onlyTime){
              return moment.utc(totalTimeLayover).format('H:mm')
            }
          }
        }
      },
      getTotalTime(value) {
        let durationValue = moment.duration('P' + value.flightSegment.duration);
        let getHoursMinutes = `${durationValue._data.hours}h ${durationValue._data.minutes}m`;

        return getHoursMinutes;
      },
      getCity(item, direction, directionData) {
        let departureAndArrival = item.flightSegment[direction][directionData];

        return departureAndArrival;
      },
      getIATACode(item, direction) {
        let shortIATACode = item.flightSegment[direction].iataCode;
        for (let key in airports) {
          if (key === shortIATACode) {
            return airports[key].city;
          }
          for (let i = 0; i < item.length; i++) {
            let IATACode = item[i].flightSegment[direction].iataCode;
            return IATACode
          }
        }
      },
      getOperating(item) {
        for (let key in this.dataFromApi.dictionaries.carriers) {
          if (key === item.flightSegment.operating.carrierCode) {
            return this.dataFromApi.dictionaries.carriers[key].toLowerCase();
          }
        }
      },
      getAircraft(item) {
        for (let key in this.dataFromApi.dictionaries.aircraft) {
          if (key === item.flightSegment.aircraft.code) {
            return this.dataFromApi.dictionaries.aircraft[key].toLowerCase()
          }
        }
      },
      airlines(item) {
        for (let key in airlines) {
          if (key === item.flightSegment.carrierCode) {
            return airlines[key]
          }
        }
      },
      getLayout(value, index) {
        if (value.segments.length > 1) {
          for (let i = index; i < value.segments.length -1; i++) {
            let getCity = value.segments[i].flightSegment.arrival.iataCode;
            return getCity;
          }
        }
      }
    },

    filters: {
      filterTime(item) {
        return moment(item).format('H:mm');
      },
    }
  }
</script>
