<template>
  <div class="ticket-wrapper" @click="isModalShown = !isModalShown">
    <div class="flight-offer-row">
      <div class="result-wrapper">
        <div v-if="!changeStylesForPassengerInfoPage" class="column-content">
          <FlightsResultsItem :flightCardsData="flightCardsData"></FlightsResultsItem>
        </div>

        <div v-if="!changeStylesForPassengerInfoPage" class="column-price">
          <div class="ticket-price">
            <span class=""> total</span>
            <p class="has-text-weight-bold is-size-large">&dollar; {{getPriceTicket}} </p>
          </div>
          <the-button :modifier="[{'is-info': true}]"
                      @button-click="getToPassengerInfoPage(flightCardsData)"
          >Book Flight
          </the-button>
        </div>

        <div v-if="changeStylesForPassengerInfoPage" class="column-content">
          <h2 class="ticket-title">Your Flight</h2>
          <div>
            <div class="passenger-info-ticket">
              <a href="#" class="logo-airline">
                <img src="../../../assets/img/logo-airlines.jpg" alt="logo airline">
              </a>
              <div class="passenger-info-flights-holder">
                <div class="passenger-info-flights">
                  <div>{{dataForApi.originCity.cityName}}</div>
                  <svg width="16" height="16" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
                    <g>
                      <path fill="#000"
                            d="m63.924,31.031c-0.102-0.246-0.248-0.467-0.434-0.651l-6.838-6.833c-0.783-0.781-2.051-0.781-2.833,0s-0.782,2.049 0,2.83l3.419,3.417-50.318-.002 3.418-3.415c0.781-0.781 0.781-2.049 0-2.83-0.783-0.781-2.051-0.781-2.834,0l-6.839,6.834c-0.392,0.391-0.587,0.902-0.587,1.415s0.195,1.025 0.587,1.416l6.992,6.982c0.392,0.39 0.903,0.585 1.417,0.585 0.512,0 1.024-0.195 1.416-0.586 0.782-0.781 0.782-2.049 0-2.832l-3.57-3.566 50.316,.002-3.57,3.564c-0.781,0.783-0.781,2.051 0,2.832 0.393,0.391 0.904,0.586 1.417,0.586s1.024-0.195 1.417-0.585l6.992-6.982c0.002-0.003 0.004-0.006 0.006-0.009 0.182-0.183 0.326-0.4 0.426-0.643 0.102-0.244 0.154-0.504 0.154-0.765s-0.053-0.52-0.154-0.764z"
                      />
                    </g>
                  </svg>
                  <div>{{dataForApi.destinationCity.cityName}}</div>
                </div>
                <div class="passenger-info-flights">
                  {{getDateFormat(dataForApi.flightDates.startDate, dateFormat)}} -
                  {{getDateFormat(dataForApi.flightDates.endDate, dateFormat)}},
                  {{getDateFormat(dataForApi.flightDates.endDate, dateFormatYear)}},
                  {{dataForApi.countPassenger.sumPassengers}} Adult
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="btn is-arrow"
                :class="{'border-radius': isModalShown}"
        >
          <transition name="ma">
            <i class="arrow-down" :class="{'is-arrows': isModalShown}"></i>
          </transition>
        </button>
      </div>

      <div :class="{'is-hidden': !isModalShown}">
        <flight-info
          :ticketData="flightCardsData"
          @closebtn="!changeHide"
        ></flight-info>
      </div>

    </div>
  </div>
</template>
<script>
  import format from 'date-fns/format';
  import { mapActions, mapGetters } from 'vuex';
  import airlines from '../../../assets/jsons/airlines.json';
  import TheButton from '../../the-button/the-button';
  import FlightInfo from '../flight-info/flight-info';
  import FlightsResultsItem from '../flights-results-item/flights-results-item';
  import './_the-card.scss';

  export default {
    name: 'the-card',
    components: { TheButton, FlightInfo, FlightsResultsItem },
    props: {
      flightCardsData: Object,
      getPriceTicket: String,
    },
    data() {
      return {
        isModalShown: false,
        airlinesJson: airlines,
        nonstop: 'nonstop',
        dateFormat: 'D MMM',
        dateFormatYear: 'YYYY',
        toDepartureIataCode: '',
        toArrivalIataCode: '',
        passengerInfoPage: true,
      };
    },
    computed: {
      ...mapGetters('global', ['changeStylesForPassengerInfoPage']),
      ...mapGetters('api', ['dataForApi']),
    },
    methods: {
      ...mapActions('global', {
        getItemCard: 'getItemCard',
        setStylesForPassengerInfoPage: 'changeStylesForPassengerInfoPage',
      }),
      changeHide() {
        this.isModalShown = false;
      },
      getDateFormat(dateForFormat, dateFormat) {
        return format(dateForFormat, dateFormat);
      },
      getToPassengerInfoPage(flightCardsData) {
        this.setStylesForPassengerInfoPage(true);
        this.getItemCard(flightCardsData);
        this.$router.push({ name: 'passenger-info', params: flightCardsData });
      },
    },
  };
</script>
