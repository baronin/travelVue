<template>
  <div class="round-trip">
    <div class="form-row">
      <autocomplete
        v-model="dataForApi.originCity.cityName"
        :input-value="dataForApi.originCity"
        :city-code.sync="dataForApi.originCity.cityCode"
        :data-options="autocompleteOptions"
        :empty-origin-input="dataForApi.originCity.emptyInput"
        :placeholder="'From'"
        :token="dataForApi.tokenForRequest.token"
        :has-class="true"
        @input-value="checkInput"
      >
        <the-button :modifier="[{ 'is-reverse-button': true }]" @button-click="changeValues">
          <svg fill="currentColor" width="17px" height="15px" viewBox="0 0 17 15">
            <g
              id="search-min-1200"
              transform="translate(-604.000000, -361.000000)"
              fill-rule="nonzero"
            >
              <path
                id="Combined-Shape"
                transform="translate(410.000000, 343.000000)"
                d="M197.535534,29 L209,29 L209,30 L197.535534,30 L197.535534,33.0710678 L194,29.5355339 L197.535534,26 L197.535534,29 Z M206.535534,21 L206.535534,18 L210.071068,21.5355339 L206.535534,25.0710678 L206.535534,22 L195,22 L195,21 L206.535534,21 Z"
              ></path>
            </g>
          </svg>
        </the-button>
      </autocomplete>
      <autocomplete
        v-model="dataForApi.destinationCity.cityName"
        :input-value="dataForApi.destinationCity"
        :city-code.sync="dataForApi.destinationCity.cityCode"
        :data-options="autocompleteOptions"
        :empty-destination-input="dataForApi.destinationCity.emptyInput"
        :placeholder="'To'"
        :token="dataForApi.tokenForRequest.token"
        :has-class="false"
        @input-value="checkInput"
      />
    </div>
    <div class="form-row">
      <the-datepicker
        :empty-input="dataForApi.flightDates.emptyInput"
        @get-date="showSelectedDays"
      />
      <the-dropdown
        :sum-passengers="getSumPassengers"
        :title="passengersTitle"
        :cabin-type-title="selectedType"
      >
        <div
          v-for="(item, index) in passengersTypes"
          slot="slotPassenger"
          :key="index"
          class="passenger-row"
        >
          <span> {{ item.title }}</span>
          <the-counter
            v-model="item.quantity"
            :is-decrement-disabled="isDecrementDisabled(item.quantity, item.min)"
            :is-increment-disabled="isIncrementDisabled"
          >
          </the-counter>
        </div>
        <the-cabin-type
          slot="slotCabinType"
          :cabin-type-title="cabinTypeTitle"
          @changecabintype="changeCabinType"
        >
        </the-cabin-type>
      </the-dropdown>
    </div>
    <div class="form-row">
      <the-button :modifier="[{ 'is-primary': true }]" @button-click="getLowFareFlight"
        >Search
      </the-button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import dataMixin from '../../helpers/data.mixin'
import Autocomplete from '../the-autocomplete/the-autocomplete'
import TheButton from '../the-button/the-button'
import TheCabinType from '../the-cabintype/the-cabintype'
import TheCounter from '../the-counter/the-counter'
import TheDatepicker from '../the-datepicker/the-datepicker'
import TheDropdown from '../the-dropdown/the-dropdown'
import './_the-round-trip.scss'

export default {
  name: 'TheRoundTrip',
  components: { TheButton, Autocomplete, TheCabinType, TheDropdown, TheCounter, TheDatepicker },
  mixins: [dataMixin],
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
          emptyInput: false,
        },
        tokenForRequest: {
          token: '',
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
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: 'grant_type=client_credentials&client_id=gH8ii41KPfyRJve5jFQArjmbaL4KObxr&client_secret=7bXMTlDA0AVtcy2m',
      },
      autocompleteOptions: {
        url: 'https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ',
        },
      },
      passengersTitle: 'Passenger',
      maxPassengersQuantity: 9,
      minPassengersQuantity: 0,
      passengersTypes: [
        { title: 'Adults', min: 1, quantity: 1 },
        { title: 'Children', min: 0, quantity: 0 },
        { title: 'Infants', min: 0, quantity: 0 },
      ],
      incrementDisabled: true,
      decrementDisabled: false,
      cabinTypeTitle: 'Cabin Type',
      selectedType: 'Economy',
    }
  },
  computed: {
    getSumPassengers() {
      let sum = 0
      this.passengersTypes.map((item) => (sum += item.quantity))
      // this.dataForApi.countPassenger.sumPassengers = sum;
      return sum
    },
    isIncrementDisabled() {
      return this.getSumPassengers >= this.maxPassengersQuantity
    },
  },
  created() {
    // обновляем токен
    // dataMixin.getDataFromMixin(this.getTokenOptions)
    //   .then(response => (this.dataForApi.tokenForRequest.token = response.data.access_token));
  },
  methods: {
    // ...mapActions('api', ['getDataFromApi', 'setDataForApi']),
    showSelectedDays(datesForApi) {
      this.dataForApi.flightDates.startDate = datesForApi.startDate
      this.dataForApi.flightDates.endDate = datesForApi.endDate
    },

    isDecrementDisabled(quantity, min) {
      return quantity <= min
    },

    changeCabinType(value) {
      this.selectedType = value
      this.dataForApi.cabinType.getCabinType = value.toUpperCase().replace(' ', '_')
    },

    changeValues() {
      let cityObject = this.dataForApi.destinationCity
      this.dataForApi.destinationCity = this.dataForApi.originCity
      this.dataForApi.originCity = cityObject
    },

    checkInput() {
      console.log('check input', this.dataForApi)
      if (this.dataForApi.originCity.cityName !== '') {
        this.dataForApi.originCity.emptyInput = false
      } else {
        this.dataForApi.originCity.cityCode = ''
      }

      if (this.dataForApi.destinationCity.cityName !== '') {
        this.dataForApi.destinationCity.emptyInput = false
      } else {
        this.dataForApi.destinationCity.cityCode = ''
      }
    },

    getLowFareFlight() {
      let emptyInputArray = []
      console.log('click getLowFareFlight', emptyInputArray)
      for (let key in this.dataForApi) {
        for (let item in this.dataForApi[key]) {
          if (
            (this.dataForApi[key][item] === '' && item === 'cityCode') ||
            (this.dataForApi[key][item] === '' && item === 'endDate')
          ) {
            emptyInputArray.push(false)
            this.dataForApi[key].emptyInput = true
          } else if (
            (this.dataForApi[key][item] !== '' && item === 'cityCode') ||
            (this.dataForApi[key][item] !== '' && item === 'endDate')
          ) {
            emptyInputArray.push(true)
            this.dataForApi[key].emptyInput = false
          }
        }
      }
      let inputEmpty = emptyInputArray.filter((element) => element === false)
      if (inputEmpty.length === 0) {
        this.setDataForApi(this.dataForApi)
        console.log('test')

        this.$router.push({ name: 'result', params: this.dataForApi })
        // this.getDataFromApi();
        console.log('test')
        this.$emit('get-result')
      }
    },
  },
}
</script>
