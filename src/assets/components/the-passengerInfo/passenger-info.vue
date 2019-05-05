<template>
  <div class="container">
    <the-bread-cramps></the-bread-cramps>
    <div v-if="dataFromApiExist"
         :key="'display-on-page'"
         class="passenger-info-holder">
      <div class="passenger-info-main">
        <the-card :flightCardsData="itemCard"></the-card>
        <the-price-summary :card="itemCard" class="display-none-desktop"></the-price-summary>

        <form action="" class="form">
          <h2>Passenger Information</h2>
          <span class="bg-blue">Passenger names must match passport for international travel or government issued
            photo ID for US domestic travel</span>
          <h3>Contact Details</h3>

          <div class="row contact-info">

            <div class="column">
              <label for="email"
                     class="form-group-label">Email</label>
              <input id="email"
                     class="form-group-input"
                     type="text"
                     name="email"
                     placeholder="Email"
                     required>
            </div>
            <div class="column">
              <label for="number-input"
                     class="form-group-label">Phone Number</label>
              <vue-phone-number-input
                  id="number-input"
                  color='#6DB3F1'
                  default-country-code="UA"
                  :translations="{phoneNumberLabel: 'Phone Number'}"
                  :no-validator-state="true"
              />
            </div>
          </div>

          <template>
            <contact-passenger-form :passengerOfNumber="dataForApi.countPassenger.sumPassengers"
            ></contact-passenger-form>
          </template>

        </form>


        <the-button :modifier="[{'is-primary': true}]" @button-click="getReviewPage">Book</the-button>
      </div>
      <div class="passenger-info-main-aside">
        <the-price-summary :card="itemCard" class="display-none-mobile display-none-table"></the-price-summary>
      </div>
    </div>
    <div class="not-found" v-else
         :key="'display-on-page'">Please return and enter your flight...
    </div>
  </div>
</template>

<script>
  import './_passengerInfo.scss';
  import TheCard from '../the-cards-wrap/the-card/the-card';
  import TheButton from '../the-button/the-button';

  import ThePriceSummary from '../the-price-summary/the-price-summary';
  import TheBreadCramps from '../the-braead-cramps/the-bread-cramps';
  import { mapGetters } from 'vuex';
  import ContactPassengerForm from './contact-passenger-form/contact-passenger-form';

  export default {
    name: 'passenger-info',
    components: { ContactPassengerForm, TheBreadCramps, ThePriceSummary, TheButton, TheCard },
    data() {
      return {
        card: {},
      };
    },
    methods: {
      getReviewPage() {
        this.$router.push({ name: 'review' });
      },
    },
    computed: {
      ...mapGetters('global', ['itemCard']),
      ...mapGetters('api', [
        'dataFromApi',
        'dataFromApiExist',
        'dataForApi',
      ]),
    },
    created() {
      this.card = this.$route.params;
    },
  };
</script>
