<template>
    <div class="round-trip">
      <div class="form-row">
        <div class="autocomplete-container">
        <autocomplete :inputValue="dataForApi.originCity"
                      :city-code.sync="dataForApi.originCity.cityCode"
                      :dataOptions="autocompleteOptions"
                      @input-value="inputValidation($event, 'originCity')"
                      :emptyOriginInput="dataForApi.originCity.emptyInput"
                      :checkLanguage="dataForApi.originCity.checkLanguage"
                      :placeholder="'From'"
                      :token="dataForApi.tokenForRequest.token"
                      :hasClass="true"
                      v-model="dataForApi.originCity.cityName">
          <the-button :modifier="[{'is-reverse-button': true}]"
                      @button-click="changeValues">
            <svg fill="currentColor" width="17px" height="15px" viewBox="0 0 17 15">
              <g id="search-min-1200" transform="translate(-604.000000, -361.000000)" fill-rule="nonzero">
                <path transform="translate(410.000000, 343.000000)"
                      d="M197.535534,29 L209,29 L209,30 L197.535534,30 L197.535534,33.0710678 L194,29.5355339 L197.535534,26 L197.535534,29 Z M206.535534,21 L206.535534,18 L210.071068,21.5355339 L206.535534,25.0710678 L206.535534,22 L195,22 L195,21 L206.535534,21 Z"
                      id="Combined-Shape"></path>
              </g>
            </svg>
          </the-button>
        </autocomplete>
          <div class="warning-message"
               v-show="dataForApi.originCity.checkLanguage &&
                        !dataForApi.originCity.emptyInput">Please use only english letters</div>
          <div class="warning-message"
               v-show="dataForApi.originCity.emptyInput">Please enter your origin</div>
          </div>
        <div class="autocomplete-container">
        <autocomplete :inputValue="dataForApi.destinationCity"
                      :city-code.sync="dataForApi.destinationCity.cityCode"
                      :dataOptions="autocompleteOptions"
                      @input-value="inputValidation($event, 'destinationCity')"
                      :emptyDestinationInput="dataForApi.destinationCity.emptyInput"
                      :checkLanguage="dataForApi.destinationCity.checkLanguage"
                      :placeholder="'To'"
                      :token="dataForApi.tokenForRequest.token"
                      :hasClass="false"
                      v-model="dataForApi.destinationCity.cityName"/>
          <div class="warning-message"
               v-show="dataForApi.destinationCity.emptyInput">Please enter your destination</div>
          <div class="warning-message"
               v-show="dataForApi.destinationCity.checkLanguage &&
                       !dataForApi.destinationCity.emptyInput">Please use only english letters</div>
      </div>
        </div>
      <div class="form-row">
        <the-datepicker @get-date="showSelectedDays"
                        :empty-input="dataForApi.flightDates.emptyInput"
                        :dates="dataForApi.flightDates"/>
        <the-dropdown :sum-passengers="getSumPassengers"
                      :title="passengersTitle"
                      :cabin-type-title="selectedType">
          <div class="passenger-row"
               slot="slotPassenger"
               v-for="(item, index) in passengersTypes"
               :key="index">
            <span> {{ item.title }}</span>
            <the-counter v-model="item.quantity"
                         :is-decrement-disabled="isDecrementDisabled(item.quantity, item.min)"
                         :is-increment-disabled="isIncrementDisabled">
            </the-counter>
          </div>
          <the-cabin-type slot="slotCabinType"
                          :cabin-type-title="cabinTypeTitle"
                          :cabin-type="dataForApi.cabinType.getCabinType"
                          @changecabintype="changeCabinType">
          </the-cabin-type>
        </the-dropdown>
      </div>
      <div class="form-row">
        <the-button
            :modifier="[{'is-primary': true}]"
            @button-click="getLowFareFlight">Search
        </the-button>
      </div>
    </div>
</template>
<script>
  import './_the-round-trip.scss';
  import Autocomplete from '../the-autocomplete/the-autocomplete';
  import dataMixin from '../../helpers/data.mixin';
  import TheButton from '../the-button/the-button';
  import TheDatepicker from '../the-datepicker/the-datepicker';
  import TheDropdown from '../the-dropdown/the-dropdown';
  import TheCounter from '../the-counter/the-counter';
  import TheCabinType from '../the-cabintype/the-cabintype';
  import { mapActions, mapMutations } from 'vuex';

  export default {
    name: 'the-round-trip',
    components: { TheButton, Autocomplete, TheCabinType, TheDropdown, TheCounter, TheDatepicker },
    data() {
      return {
        dataForApi: {
          destinationCity: {
            cityName: '',
            cityCode: '',
            emptyInput: false,
            checkLanguage: false
          },
          originCity: {
            cityName: '',
            cityCode: '',
            emptyInput: false,
            checkLanguage: false,
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
          passengersTypes: [],
          cabinType: {
            getCabinType: this.selectedType,
          },
        },
        defaultData: {
          destinationCity: {
            cityName: '',
            cityCode: '',
            emptyInput: false,
            checkLanguage: false
          },
          originCity: {
            cityName: '',
            cityCode: '',
            emptyInput: false,
            checkLanguage: false,
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
          passengersTypes: [],
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
          data: 'grant_type=client_credentials&client_id=PfLKQhYRrlT574SUGrivkbpPZQ2MHIK1&client_secret=U2O26SHh0EmAtXfx',
        },
        autocompleteOptions: {
          url: 'https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=',
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
      };
    },
    mixins: [dataMixin],
    created() {
      dataMixin.getDataFromMixin(this.getTokenOptions)
          .then(response => (this.dataForApi.tokenForRequest.token = response.data.access_token));
      this.defaultData  =  JSON.parse(JSON.stringify(this.dataForApi));
      if(Object.keys(this.$route.query).length !== 0){
        this.dataForApi = this.$route.query;
        this.passengersTypes = this.$route.query.passengersTypes;
        this.selectedType = this.$route.query.cabinType.getCabinType
      }
    },
    computed: {
      getSumPassengers() {
        let sum = 0;
        this.passengersTypes.map(item => sum += item.quantity);
        this.dataForApi.passengersTypes = this.passengersTypes;
        this.dataForApi.countPassenger.sumPassengers = sum;

        return sum;
      },
      isIncrementDisabled() {
        return this.getSumPassengers >= this.maxPassengersQuantity;
      },
    },
    methods: {
      ...mapActions(['getDataFromApi']),
      ...mapMutations(['SET_DATA_FOR_API']),
      showSelectedDays(datesForApi) {
        this.dataForApi.flightDates.startDate = datesForApi.startDate;
        this.dataForApi.flightDates.endDate = datesForApi.endDate;
        if(this.dataForApi.flightDates.endDate){
          this.dataForApi.flightDates.emptyInput = false
        }
      },

      isDecrementDisabled(quantity, min) {
        return quantity <= min;
      },

      changeCabinType(value) {

        this.selectedType = value;
        this.dataForApi.cabinType.getCabinType = value.toUpperCase().replace(' ', '_');

      },

      changeValues() {
        let cityObject = this.dataForApi.destinationCity;
        this.dataForApi.destinationCity = this.dataForApi.originCity;
        this.dataForApi.originCity = cityObject;
      },

      inputValidation(value, city) {
        let regExp = new RegExp();
        regExp = /[a-z()]/gi;

        if (this.dataForApi[city].cityName !== '' ) {
          this.dataForApi[city].emptyInput = false;
          if (regExp.test(value)) {
            this.dataForApi[city].checkLanguage = false;
          } else {
            this.dataForApi[city].checkLanguage = true;
          }
        } else {
          this.dataForApi[city].cityCode = '';
        }

        if(this.dataForApi[city].cityName !== 'error'){
          this.dataForApi[city].cityCode = '';
        }
      },

      setDataForApiInStorage(data) {
        this.SET_DATA_FOR_API(data);
      },

      getDataFromApiInStorage() {
        this.getDataFromApi();
      },

      getLowFareFlight() {
        let emptyInputArray = [];
        for (let key in this.dataForApi) {
          for (let item in this.dataForApi[key]) {
            if (this.dataForApi[key][item] === '' && item === 'cityCode' || this.dataForApi[key][item] === '' &&
                item === 'endDate') {
              emptyInputArray.push(false);
              this.dataForApi[key].emptyInput = true;
            } else if (this.dataForApi[key][item] !== '' && item === 'cityCode' || this.dataForApi[key][item] !== '' &&
                item === 'endDate') {
              emptyInputArray.push(true);
              this.dataForApi[key].emptyInput = false;
            }
          }
        }
        let inputEmpty = emptyInputArray.filter(element => element == false);
        if (inputEmpty.length == 0) {
          this.setDataForApiInStorage(this.dataForApi);
          this.$router.push({ name: 'result', query: this.dataForApi });
          this.getDataFromApiInStorage();
          this.$emit('get-result');
        }
      },
    },
    watch: {
      '$route'(to){
        if(to.path === '/'){

          this.dataForApi.destinationCity.cityName = '';
          this.dataForApi.destinationCity.cityCode = '';

          this.dataForApi.originCity.cityName = '';
          this.dataForApi.originCity.cityCode = '';

          this.dataForApi.flightDates.startDate = '';
          this.dataForApi.flightDates.endDate = '';

          this.passengersTypes[0].quantity = 1;
          this.passengersTypes[1].quantity = 0;
          this.passengersTypes[2].quantity = 0;

          this.selectedType = 'Economy';

          this.$emit('change-dates', this.defaultData.flightDates)
        }
      }
    }
  };
</script>