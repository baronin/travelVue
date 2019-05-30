<template>
  <div class="container">
    <the-bread-cramps/>
    <div
        v-if="dataFromApiExist"
        :key="'display-on-page'"
        class="passenger-info-holder"
    >
      <div class="passenger-info-main">
        <the-cards :flightCardsData="itemCard"/>
        <the-price-summary
            :card="itemCard"
            class="display-none-desktop" />
        <contact-passenger-form :passengerOfNumber="dataForApi.countPassenger.sumPassengers"/>
      </div>
      <div class="passenger-info-main-aside">
        <the-price-summary
            class="display-none-mobile display-none-table"
            :card="itemCard"  />
      </div>
    </div>
    <div
        v-else
        class="not-found"
        :key="'display-on-page'"
    >
      Please return and enter your flight...
    </div>
  </div>
</template>

<script>

  import './_passengerInfo.scss';
  import TheCards from '../the-cards-wrap/the-cards/the-cards';
  import TheButton from '../the-button/the-button';
  import ThePriceSummary from '../the-price-summary/the-price-summary';
  import TheBreadCramps from '../the-braead-cramps/the-bread-cramps';
  import { mapState } from 'vuex';
  import ContactPassengerForm from '../contact-passenger-form/contact-passenger-form';

  export default {
    name: 'passenger-info',
    components: { ContactPassengerForm, TheBreadCramps, ThePriceSummary, TheButton, TheCards },
    data() {
      return {
        card: {},
        breadCrampsItems: [
          {
            pageName: 'Search',
            path: 'result',
          },
          {
            pageName: 'Passenger Info',
            path: 'passenger-info',
          },
          {
            pageName: 'Review',
            path: 'review',
          },
        ],

      };
    },

    methods: {},
    computed: mapState(['dataFromApi', 'dataFromApiExist', 'itemCard', 'dataForApi']),

    created() {
      this.card = this.$route.params;
    },
  };
</script>
