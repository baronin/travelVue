<template>
  <div class="round-trip">
    <div class="form-row">
      <autocomplete
        v-model="dataForApi.originCity.cityName"
        :default-value="dataForApi.originCity.cityName"
        :city-code.sync="dataForApi.originCity.cityCode"
        :empty-origin-input="dataForApi.originCity.emptyInput"
        :has-class="true"
        :results="locations"
        placeholder="From"
        @input="checkInput($event, 'from')"
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
        :default-value="dataForApi.destinationCity.cityName"
        :city-code.sync="dataForApi.destinationCity.cityCode"
        :empty-destination-input="dataForApi.destinationCity.emptyInput"
        placeholder="To"
        :has-class="false"
        @input="checkInput"
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
import dataMixin from '../../helpers/data.mixin'
import Autocomplete from '../the-autocomplete/the-autocomplete'
import TheButton from '../the-button/the-button'
import TheCabinType from '../the-cabintype/the-cabintype'
import TheCounter from '../the-counter/the-counter'
import TheDatepicker from '../the-datepicker/the-datepicker'
import TheDropdown from '../the-dropdown/the-dropdown'
import './_the-round-trip.scss'
import { api } from '@/api'
import { helpers } from '@/helpers'

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
          sumPassengers: 1,
        },
        cabinType: {
          getCabinType: this.selectedType,
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
      locations: [],
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
    // ...mapActions('index', ['getDataFromApi', 'setDataForApi']),
    async getLocations(city) {
      const locationsResponse = await api.locations.get({ subType: 'AIRPORT', keyword: city })
      const locations = await locationsResponse.data.data
      this.results.splice(0, this.results.length, ...locations)
      console.log('results', this.results)
    },
    async getAmadeusData(city) {
      const token = this.$store.state.api.token || ''
      console.log('getAmadeusData')
      if (token && city !== '' && city.length > 2) {
        helpers.debounced(1000, await this.getLocations(city))
      }
    },
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

    checkInput(e, where) {
      console.log('check input', e, where)
      /*if (this.dataForApi.originCity.cityName !== '') {
        this.dataForApi.originCity.emptyInput = false
      } else {
        this.dataForApi.originCity.cityCode = ''
      }

      if (this.dataForApi.destinationCity.cityName !== '') {
        this.dataForApi.destinationCity.emptyInput = false
      } else {
        this.dataForApi.destinationCity.cityCode = ''
      }*/
    },

    getLowFareFlight() {
      let emptyInputArray = []
      console.log('search', emptyInputArray)
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
