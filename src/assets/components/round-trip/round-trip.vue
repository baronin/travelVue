<template>
  <div class="round-trip">
    <div class="form-row">
        <autocomplete :cityChange="dataForApi.destinationCity.cityName"
                      :city-code.sync="dataForApi.originCity.cityCode"
                      :dataOptions="autocompleteOptions"
                      :emptyOriginInput="dataForApi.originCity.emptyInput"
                      :placeholder="'From'"
                      :token="dataForApi.tokenForRequest.token"
                      :hasClass="true"
                      v-model="dataForApi.originCity.cityName">
          <reverse-button :initialFirst="dataForApi.originCity"
                          :initialSecond="dataForApi.destinationCity"
                          @reverse="changeValues"></reverse-button>
        </autocomplete>
        <autocomplete :cityChange="dataForApi.originCity.cityName"
                      :city-code.sync="dataForApi.destinationCity.cityCode"
                      :dataOptions="autocompleteOptions"
                      :emptyDestinationInput="dataForApi.destinationCity.emptyInput"
                      :placeholder="'To'"
                      :token="dataForApi.tokenForRequest.token"
                      :hasClass="false"
                      v-model="dataForApi.destinationCity.cityName"/>
    </div>
    <div class="form-row">
      <the-datepicker @get-date="showSelectedDays"
                      :empty-input="dataForApi.flightDates.emptyInput"/>
      <the-dropdown :sum-passengers="getSumPassengers"
                    :title="passengersTitle"
                    :cabin-type-title="selectedType">
        <div class="passenger-row"
             slot="slotPassenger"
             v-for="(item, index) in passengersTypes" :key="index">
          <span> {{ item.title }}</span>

          <the-counter v-model="item.quantity"
                       :is-decrement-disabled="isDecrementDisabled(item.quantity, item.min)"
                       :is-increment-disabled="isIncrementDisabled">
          </the-counter>
        </div>
        <the-cabin-type slot="slotCabinType"
                        :cabin-type-title="cabinTypeTitle"
                        @changecabintype="changeCabinType">
        </the-cabin-type>
      </the-dropdown>
    </div>
    <div class="form-row">
      <search-button :dataForApi="dataForApi"></search-button>
    </div>
  </div>
</template>
<script>
  import './_round-trip.scss'
  import Autocomplete from "../autocomplete/autocomplete";
  import dataMixin from "../../helpers/data.mixin";
  import SearchButton from "../search-button/search-button";
  import ReverseButton from "../reverse-button/reverse-button";

  import TheDatepicker from "../the-datepicker/the-datepicker";
  import TheDropdown from "../dropdown/the-dropdown";
  import TheCounter from "../the-counter/the-counter";
  import TheCabinType from "../the-cabintype/the-cabintype";

  export default {
    name: 'round-trip',
    components: {ReverseButton, SearchButton, Autocomplete, TheCabinType, TheDropdown, TheCounter, TheDatepicker},
    data() {
      return {
        dataForApi: {
          destinationCity: {
            cityName: '',
            cityCode: '',
            emptyInput: false,
          },
          originCity: {
            cityName: '',
            cityCode: '',
            emptyInput: false,
          },
          flightDates: {
            startDate: '',
            endDate: '',
            emptyInput: false
          },
          tokenForRequest: {
            token: ''
          },
          countPassenger: {
            sumPassengers: this.getSumPassengers,
          },
          cabinType: {
            getCabinType: this.selectedType,
          },
        },
        getTokenOptions: {
          url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: 'grant_type=client_credentials&client_id=PfLKQhYRrlT574SUGrivkbpPZQ2MHIK1&client_secret=U2O26SHh0EmAtXfx'
        },
        autocompleteOptions: {
          url: 'https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=',
          method: 'GET',
          headers: {
            Authorization: 'Bearer '
          }
        },
        passengersTitle: 'Passenger',
        maxPassengersQuantity: 9,
        minPassengersQuantity: 0,
        passengersTypes: [
          {title: 'Adults', min: 1, quantity: 1},
          {title: 'Children', min: 0, quantity: 0},
          {title: 'Infants', min: 0, quantity: 0},
        ],
        incrementDisabled: true,
        decrementDisabled: false,
        cabinTypeTitle: 'Cabin Type',
        selectedType: 'Economy',
      }
    },
    mixins: [dataMixin],
    created() {
      this.getDataFromMixin(this.getTokenOptions)
          .then(response => (this.dataForApi.tokenForRequest.token = response.data.access_token));
    },
    computed: {
      getSumPassengers() {
        let sum = 0;
        this.passengersTypes.map(item => sum += item.quantity);
        this.dataForApi.countPassenger.sumPassengers = sum;
        return sum;
      },
      isIncrementDisabled() {
        return this.getSumPassengers >= this.maxPassengersQuantity;
      },
    },
    methods: {
      showSelectedDays: function (datesForApi) {
        this.dataForApi.flightDates.startDate = datesForApi.startDate;
        this.dataForApi.flightDates.endDate = datesForApi.endDate;
      },

      isDecrementDisabled(quantity, min) {
        return quantity <= min;
      },

      changeCabinType(value) {
        this.selectedType = value;
        this.dataForApi.cabinType.getCabinType = value.toUpperCase().replace(' ', '_');
      },
      changeValues(originCity, destinationCity) {
        this.dataForApi.destinationCity = originCity;
        this.dataForApi.originCity = destinationCity;
        this.$emit('update')
      },
    },
  }
</script>