<template>
  <div class="ticket-wrapper">
    <div class="flight-offer" v-for="(data, index) in json.data" :key="index">
      <div class="result-wrapper">
        <div class="ticket-content">
          <div class="ticket-body-line">
            <div class="column">
              <div class="logo-airline">
                <a href="#">
                  <img src="../../img/logo-airlines.jpg" alt="logo airline">
                </a>
              </div>
              <div class="ticket-range-time">
                <p>{{ getDepartureTime(data) }} — {{getArrivalTime(data)}}</p>
                <span class="">{{getIataDeparture(data)}} — {{getIataArrival(data)}}</span>
              </div>
            </div>
            <div class="column">
              <p>{{ getTotalTimeHours(data) + 'h'}} {{ getTotalTimeMinutes(data) + 'm' }}</p>
              <span>Brussels Airlines</span>

              <div class="total-time-wrap">
              </div>
            </div>
            <div class="column">
              <p>1 stop</p>
              <span class="text-small">WAW, <span class="text-small">1h 15m</span></span>
            </div>
          </div>
          <div class="ticket-body-line">
            <div class="column">
              <div class="logo-airline">
                <a href="#">
                  <img src="../../img/logo-airlines.jpg" alt="logo airline">
                </a>
              </div>
              <div class="ticket-range-time flex">
                <p class="">15:40 — 20:15</p>
                <span class="text-small">LAX — CDG</span>
              </div>
            </div>
            <div class="column">
              14h 35m
              <span class="text-small">Brussels Airlines</span>

              <div class="total-time-wrap">
              </div>
            </div>
            <div class="column">
              <p class="">nonstop</p>
              {{  }}
            </div>
          </div>
        </div>
        <div class="ticket-price-wrap">
          <div class="ticket-price">
            <span class=""> total</span>
            <p class="has-text-weight-bold is-size-large">$ {{ getPriceTicket(data) }}</p>
          </div>
          <button class="btn is-info">
            Book Flight
          </button>

        </div>
        <button class="btn is-arrow" @click="index = !index" >
          <i class=" arrow-down"></i>

        </button>
      </div>
      <div class="test" style="margin: 0 auto;text-align: center; background-color: #7A88A4; width:100px;height: 50px;">
        <a href="#" v-for="num in 3" :key="num">{{num}}</a>
      </div>
      <the-summary-details
          :departTime="getDepartureTime(data)"
          :class="{'is-hidden': index}"/>
    </div>
  </div>
</template>
<script>
  import air from './data';
  import moment from 'moment';
  import './_the-cards.scss';
  import './_settings-card.scss';
  import TheSummaryDetails from './the-summaty-details/the-summary-details';

  export default {
    name: 'the-cards',
    components: {TheSummaryDetails},
    data() {
      return {
        isModalShown: false,
        selectedItem: null,
        activeClass: true,

        hide: true,
        json: air,

        objectTest: {},
        shouldShowInfoTicket: false,
        timeDeparture: '',
        test: null,
      };
    },
    methods: {
      //id ticket
      triggerModal() {

      },
      // time departure
      getIataDeparture(item) {
        return item.offerItems[0].services[0].segments[0].flightSegment.departure.iataCode;
      },
      getDepartureTime(item) {
        return moment(item.offerItems[0].services[0].segments[0].flightSegment.departure.at).format('H:mm');
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
    },
    mounted() {
      console.log(this.data)
      /*for (test in json.data.index)
      console.log(test);*/
    }
  };
</script>
