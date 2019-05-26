<template>
  <div
      class="filter"
      v-resize="closeFilterOnTablet"
      :class="[{'filter-mobile-show': filterMobileShow}]"
  >
    <div class="filter-top">
      <h3>Filter your results</h3>
      <the-button
          v-if="showResetBtn"
          @button-click="resetAll"
          :modifier="[{'link': true}]"
      >
        Reset All
      </the-button>
      <p class="filter-count">{{filteredArrayForCounting.length}}</p>
      <the-button
          :modifier="[{'is-close': true}]"
          :class="[{'is-hidden': !filterMobileShow}]"
          @button-click="closeButtonFilter()"
      >
      </the-button>
    </div>
    <div class="filter-wrapper">
      <div class="filter-holder">
        <div class="filter-item-wrap">
          <h4 class="filter-title">Frequent</h4>
          <div class="content-wrap">
            <label>
              <input
                  class="checkbox"
                  type="checkbox"
                  name="frequent"
                  value="withLuggage"
                  checked="true"
                  :disabled="true"
              >
              <span class="checkbox-custom"></span>
              <span class="label">Only with luggage</span>
            </label>
          </div>
          <div class="content-wrap">
            <label>
              <input
                  class="checkbox"
                  type="checkbox"
                  name="frequent"
                  value="nonStop"
                  :disabled="true"
                  checked="true"
              >
              <span class="checkbox-custom"></span>
              <span class="label">Only nonstop</span>
            </label>
          </div>
        </div>
        <div class="filter-item-wrap">
          <div class="title-button-wrap">
            <h4 class="filter-title">Duration</h4>
            <the-button v-if="showResetDuration" @button-click="clearDuration()">Reset
            </the-button>
          </div>
          <div class="content-wrap">
            <div class="range-value">
              <span>Flight duration</span>
              <span
                  class="chosen-value"
                  v-if="value < maxDuration"
              >{{value | toHours}}</span>
              <span
                  class="chosen-value"
                  v-else
              >any</span>
            </div>
            <div @mousedown="displayFloatingFilterButton">
              <vue-slider
                  ref="slider"
                  class="type-range"
                  v-model="value"
                  :value="maxDuration"
                  :max="maxDuration"
                  tooltip="none"
                  v-bind="options"
                  @change="filterData"
              ></vue-slider>
            </div>
          </div>
        </div>
        <div class="filter-item-wrap">
          <div class="title-button-wrap">
            <h4 class="filter-title">Stops</h4>
            <the-button
                v-if="showCheckboxesReset(dataForFilter.stops)"
                @button-click="resetCheckboxes(dataForFilter.stops)"
            > Reset
            </the-button>
          </div>
          <template v-for="stop in dataForFilter.stops">
            <div
                class="content-wrap"
                :key="stop.value"
            >
              <label @click="displayFloatingFilterButton">
                <input
                    class="checkbox"
                    type="checkbox"
                    name="stops"
                    v-model="stop.isChecked"
                    :value="stop.code"
                    @change="filterData"
                >
                <span class="checkbox-custom"></span>
                <span class="label">{{stop.name}}</span>
              </label>
            </div>
          </template>
        </div>
        <div class="filter-item-wrap">
          <div class="title-button-wrap">
            <h4 class="filter-title">Price</h4>

            <the-button @button-click="clearPrice" v-if="showResetPriceButton">Reset</the-button>
          </div>
          <div class="content-wrap">
            <div class="range-value"><span>Total price</span>
              <span class="chosen-value">${{priceValues[0]}} - {{priceValues[1]}}</span>
            </div>
            <div @mousedown="displayFloatingFilterButton">
              <vue-slider
                  ref="sliderPrice"
                  class="type-range"
                  v-model="priceValues"
                  :min="minPrice"
                  :max="maxPrice"
                  :enable-cross="false"
                  v-bind="priceOptions"
                  @change="filterData"
              ></vue-slider>
            </div>
          </div>
        </div>
        <div class="filter-item-wrap">
          <div class="title-button-wrap">
            <h4 class="filter-title">Airlines</h4>
            <the-button
                @button-click="resetCheckboxes(dataForFilter.carrierCode)"
                v-if="showCheckboxesReset(dataForFilter.carrierCode)"
            > Reset
            </the-button>
          </div>
          <template v-for="(airline, index) in dataForFilter.carrierCode">
            <div
                class="content-wrap"
                v-if="index < variable"
                :key="airline.value"
            >
              <label @click="displayFloatingFilterButton">
                <input
                    class="checkbox"
                    type="checkbox"
                    name="Airlines"
                    :value="airline.code"
                    v-model="airline.isChecked"
                    :checked="airline.isChecked"
                    @change="filterData"
                >
                <span class="checkbox-custom"></span>
                <span class="label">{{airline.name}}</span>
              </label>
            </div>
          </template>
          <div class="btn-wrap" v-if="dataForFilter.carrierCode.length > 4">
            <the-button
                @button-click="showMoreAirlines"
                :modifier="[{'arrow': true}]"
                :class="{'arrow-active': visible}"
            >
              {{ showMoreLess }}
            </the-button>
          </div>
        </div>
        <div class="filter-item-wrap">
          <div class="title-button-wrap">
            <h4 class="filter-title">Airports</h4>
            <the-button
                v-if="showCheckboxesReset(dataForFilter.departure)"
                @button-click="resetCheckboxes(dataForFilter.departure)"
            >
              Reset
            </the-button>
          </div>
          <h5 class="filter-subtitle">Departure</h5>
          <template v-for="departItem in dataForFilter.departure">
            <div
                class="content-wrap"
                :key="departItem.value"
            >
              <label @click="displayFloatingFilterButton">
                <input
                    class="checkbox"
                    @change="filterData"
                    type="checkbox"
                    name="Airports"
                    :value="departItem.code"
                    :disabled="dataForFilter.departure.length === 1"
                    v-model="departItem.isChecked"
                >
                <span class="checkbox-custom"></span>
                <span class="label">{{departItem.name}}</span>
              </label>
            </div>
          </template>
          <h5 class="filter-subtitle">Arrival</h5>
          <template v-for="item in dataForFilter.arrival">
            <div
                class="content-wrap"
                :key="item.value"
            >
              <label>
                <input
                    class="checkbox"
                    type="checkbox"
                    @change="filterData"
                    name="Airports"
                    :value="item.code"
                    :disabled="dataForFilter.arrival.length === 1"
                    :checked="item.isChecked"
                >
                <span class="checkbox-custom"></span>
                <span class="label">{{item.name}}</span>
                <br>
              </label>
            </div>
          </template>
        </div>
        <div class="filter-footer">
          <div class="filter-counter">{{filteredArrayForCounting.length}}</div>
          <div class="filter-button">
            <the-button
                :modifier="[{'is-primary': true}]"
                @button-click="getFilter"
            >Filter
            </the-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/default.css';
  import { mapActions, mapMutations, mapState } from 'vuex';
  import airlines from '../../jsons/airlines';
  import airports from '../../jsons/airports';
  import '../the-button/_the-button.scss';
  import TheButton from '../the-button/the-button';
  import './_filter.scss';

  export default {
    name: 'filters',
    components: { TheButton, VueSlider },
    data() {
      return {
        showResetPriceButton: false,
        elementPosition: '',
        dataJson: '',
        airlinesList: airlines,
        airportsList: airports,
        positionButtonLeft: 0,
        screenWidth: 0,
        dataForFilter: {
          frequent: [],
          stops: [
            {
              code: 1,
              name: 'Nonstop',
              isChecked: true,
            },
            {
              code: 2,
              name: '1 stop',
              isChecked: true,
            },
            {
              code: 3,
              name: ' 2+ stops',
              isChecked: true,
            },
          ],
          departure: [],
          arrival: [],
          carrierCode: [],
        },
        priceValues: [],
        variable: 4,
        visible: true,
        currentValue: 'any',
        maxDuration: null,
        value: null,
        minPrice: '',
        maxPrice: '',
        priceOptions: {
          dotSize: 18,
          width: '100%',
          height: 2,
          value: this.priceValues,
          min: this.minPrice,
          max: this.maxPrice,
          duration: 0.2,
          dotOptions: {
            style: {
              'background-color': '#6DB3F1',
              'border': '5px solid #fff',
            },
          },
        },
        options: {
          dotSize: 18,
          width: '100%',
          height: 2,
          direction: 'ltr',
          data: null,
          interval: 1000,
          duration: 0.2,
          dotOptions: {
            style: {
              'background-color': '#6DB3F1',
              'border': '5px solid #fff',
            },
          },
        },
        unsortedDur: [],
        objDep: {},
        obj: {},
        disable: false,
        toggleBtnFilter: true,
      };
    },

    props: ['dataFromAmadeusApi'],

    created() {
      this.getData();
      this.getPriceValues();
      this.getIataArrival();
      this.getArrivalAirports();
      this.getIataDeparture();
      this.getDepartAirports();
      this.getDuration();
      this.getAirlines();

    },

    mounted() {
      this.closeFilterOnTablet();
    },

    computed: {
      ...mapState([
        'dataFromApi',
        'filteredArray',
        'filteredArrayForCounting',
        'filterMobileShow',
      ]),

      showMoreLess() {
        if (this.visible) {
          return 'Show more';
        }
        return 'Show less';
      },
      showResetDuration() {
        return this.value < this.maxDuration;
      },
      showResetBtn() {
        return this.showCheckboxesReset(this.dataForFilter.stops) ||
            this.showCheckboxesReset(this.dataForFilter.carrierCode) ||
            this.showCheckboxesReset(this.dataForFilter.departure) ||
            this.showCheckboxesReset(this.dataForFilter.arrival) ||
            this.showResetPriceButton ||
            this.showResetDuration;
      },
    },

    filters: {
      toHours(value) {
        value = moment.duration(value);
        if (value._data.hours === 0) {
          return `${ value._data.minutes } m`;
        } else {
          return `${ value._data.hours } h ${ value._data.minutes } m`;
        }
      },
    },

    methods: {
      ...mapMutations(['SET_FILTER_DATA']),
      ...mapActions(['getFilteredArrayForCounting', 'cardsFilters', 'showFilterMobile']),

      showCheckboxesReset(data) {
        return data.filter(item => item.isChecked === false)
            .length > 0;
      },

      displayFloatingFilterButton(event) {
        let filterButton = window.document.querySelector('.filter-footer');

        if (filterButton.classList.contains('tablet')) {
          let filterButtonTablet = window.document.querySelector('.tablet');
          let filterWrapper = window.document.querySelector('.filter-wrapper');
          this.positionButtonLeft = filterWrapper.clientWidth + 10;
          this.elementPosition = event.currentTarget.offsetTop - 17;
          filterButtonTablet.style = this.elementPosition;
          filterButtonTablet.style = 'display: flex; top: ' + this.elementPosition + 'px;'
              + 'left: ' + this.positionButtonLeft + 'px;';
        }

      },
      getData() {
        this.dataJson = this.dataFromApi;
      },
      setFilterData(data) {
        this.SET_FILTER_DATA(data);
      },
      showMoreAirlines() {
        this.visible = !this.visible;
        if (this.variable === 4) {
          this.variable = Object.keys(this.dataFromApi.dictionaries.carriers).length;
        } else {
          this.variable = 4;
        }
      },

      getAirlines() {
        let arr = [];
        let dictionariesKeys = Object.keys(this.dataFromApi.dictionaries.carriers);
        for (let i = 0; i < this.dataFromApi.data.length; i++) {
          for (let j = 0; j < this.dataFromApi.data[i].offerItems[0].services.length; j++) {
            for (let k = 0; k
            < this.dataFromApi.data[i].offerItems[0].services[j].segments.length; k++) {
              let key = this.dataFromApi.data[i].offerItems[0].services[j].segments[k].flightSegment.carrierCode;
              arr.push(key);
            }
          }
        }
        let dictionary = dictionariesKeys.filter(item => {
          for (let i = 0; i < arr.length; i++) {
            if (item.indexOf(arr[i]) > -1) {
              return true;
            }
          }
          return false;
        });
        for (let code in this.airlinesList) {
          for (let i = 0; i < dictionary.length; i++) {
            if (code === dictionary[i]) {
              let obj = {};
              obj.code = dictionary[i];
              obj.name = this.airlinesList[code];
              obj.isChecked = true;
              this.dataForFilter.carrierCode.push(obj);
            }
          }
        }
      },
//to take departure Iata code:
      getIataDeparture() {
        const departArr = [];
        for (let i = 0; i < this.dataFromApi.data.length; i++) {
          departArr.push(
              this.dataFromApi.data[i].offerItems[0].services[0].segments[0].flightSegment.departure.iataCode);
        }

        for (let i = 0; i < departArr.length; i++) {
          let str = departArr[i];
          this.objDep[str] = true;
        }
        return Object.keys(this.objDep);
      },
//to take arrival Iata code:
      getIataArrival() {
        let arrivalArr = [];
        for (let i = 0; i < this.dataFromApi.data.length; i++) {
          let targetSegment = this.dataFromApi.data[i].offerItems[0].services[0].segments.length
              - 1;
          arrivalArr.push(
              this.dataFromApi.data[i].offerItems[0].services[0].segments[targetSegment].flightSegment.arrival.iataCode);
        }
        arrivalArr.sort();
        for (let i = 0; i < arrivalArr.length; i++) {
          let str = arrivalArr[i];
          this.obj[str] = true;
        }
        return Object.keys(this.obj);
      },
//to compare airport code and to get the airport name:
      getDepartAirports() {
        for (let code in this.airportsList) {
          for (let key in this.objDep) {
            if (code === key) {
              let departureObject = {};
              departureObject.iataCode = code;
              departureObject.name = this.airportsList[code].name;
              departureObject.isChecked = true;
              this.dataForFilter.departure.push(departureObject);
            }
          }
        }
      },
      getArrivalAirports() {
        for (let cod in this.airportsList) {
          for (let key in this.obj) {
            if (cod === key) {
              let arrivalObject = {};
              arrivalObject.iataCode = cod;
              arrivalObject.name = this.airportsList[cod].name;
              arrivalObject.isChecked = true;
              this.dataForFilter.arrival.push(arrivalObject);
            }
          }
        }
      },
      getDuration() {
        for (let i = 0; i < this.dataFromApi.data.length; i++) {
          for (let service in this.dataFromApi.data[i].offerItems[0].services) {
            if (this.dataFromApi.data[i].offerItems[0].services[service].segments.length > 1) {
              let departure = '',
                  arrival = '',
                  targetSegment = this.dataFromApi.data[i].offerItems[0].services[service].segments.length;
              for (let segment in this.dataFromApi.data[i].offerItems[0].services[service].segments) {
                if (segment == 0) {
                  departure = this.dataFromApi.data[i].offerItems[0].services[service].segments[segment].flightSegment.departure.at;
                } else if (segment == targetSegment - 1) {
                  arrival = this.dataFromApi.data[i].offerItems[0].services[service].segments[segment].flightSegment.arrival.at;
                }
              }
              let arrSec = moment.utc(arrival).valueOf(),
                  depSec = moment.utc(departure).valueOf(),
                  differenceInMs = arrSec - depSec;
              this.unsortedDur.push(differenceInMs);
            } else {
              let dep = this.dataFromApi.data[i].offerItems[0].services[service].segments[0].flightSegment.departure.at;
              let arrival = this.dataFromApi.data[i].offerItems[0].services[service].segments[0].flightSegment.arrival.at;
              let arrSec = moment.utc(arrival).valueOf();
              let depSec = moment.utc(dep).valueOf();
              let differenceInMs = arrSec - depSec;
              this.unsortedDur.push(differenceInMs);
            }
          }
        }
        this.unsortedDur.sort(function sIncrease(i, ii) {
          if (i > ii)
            return 1;
          else if (i < ii)
            return -1;
          else
            return 0;
        });
        let maxDuration = this.unsortedDur[0];
        this.unsortedDur.forEach(function(val) {
          maxDuration = Math.max(maxDuration, val);
        });
        this.maxDuration = Number(maxDuration);
        this.value = this.maxDuration;
      },
      // min and max price:
      getPriceValues() {
        let unsortedArr = [];
        for (let i = 0; i < this.dataFromApi.data.length; i++) {
          unsortedArr.push(this.dataFromApi.data[i].offerItems[0].price.total);
        }
        unsortedArr.sort();
        let minPrice = unsortedArr[0], maxPrice = unsortedArr[0];
        unsortedArr.forEach(function(val) {
          minPrice = Math.min(minPrice, val);
          maxPrice = Math.max(maxPrice, val);
        });
        this.minPrice = Math.ceil(minPrice) - 1;
        this.maxPrice = Math.floor(maxPrice) + 1;
        this.priceValues.push(this.minPrice, this.maxPrice);
      },
      filterData() {
        this.dataForFilter.total = this.priceValues;
        this.dataForFilter.duration = this.value;
        this.setFilterData(this.dataForFilter);
        this.cardsFilters();
        this.showResetPriceButton = this.showResetPrice();
      },
      clearDuration() {
        this.value = this.maxDuration;
      },
      /**
       *  price
       */
      showResetPrice() {
        return this.priceValues[0] !== this.minPrice || this.priceValues[1] !== this.maxPrice;
      },
      clearPrice() {
        if (this.priceValues) {
          this.priceValues = [this.minPrice, this.maxPrice];
          this.filterData();
        }
      },

      resetCheckboxes(data) {
        for (let i = 0; i < data.length; i++) {
          data[i].isChecked = true;
        }
        this.filterData();
      },
      resetAll() {
        let objectData = this.dataForFilter;
        this.clearPrice();
        for (let i = 0; i < objectData.stops.length; i++) {
          objectData.stops[i].isChecked = true;
        }
        for (let i = 0; i < objectData.carrierCode.length; i++) {
          objectData.carrierCode[i].isChecked = true;
        }
        for (let i = 0; i < objectData.departure.length; i++) {
          objectData.departure[i].isChecked = true;
        }
        for (let i = 0; i < objectData.arrival.length; i++) {
          objectData.arrival[i].isChecked = true;
        }
        this.value = this.maxDuration;
        this.dataForFilter.total = this.priceValues;
        this.dataForFilter.duration = this.value;
        this.setFilterData(this.dataForFilter);
        this.cardsFilters();
        let filterBtnClose = document.querySelector('.filter-footer');
        if (filterBtnClose.classList.contains('tablet')) {
          filterBtnClose.style.display = 'none';
        }
      },
      closeButtonFilter() {
        document.body.classList.remove('overflow-hidden');
        this.showFilterMobile(!this.filterMobileShow);
      },
      getFilter() {
        this.getFilteredArrayForCounting();

        let filterButton = window.document.querySelector('.filter-footer');
        this.showFilterMobile(false);
        if (filterButton.classList.contains('tablet')) {
          filterButton.style.display = 'none';
        }
        document.body.classList.remove('overflow-hidden');
      },
      closeFilterOnTablet() {
        let filterButton = window.document.querySelector('.filter-footer'),
            filter = window.document.querySelector('.filter');

        if (filterButton === null) {
          return;
        }

        if (filterButton.classList.contains('tablet')) {
          let filterWrapper = window.document.querySelector('.filter-wrapper');
          this.positionButtonLeft = filterWrapper.clientWidth + 10;
          let filterButtonTablet = window.document.querySelector('.tablet');
          filterButtonTablet.style = 'left: ' + this.positionButtonLeft + 'px;';
        }

        let screenSize = window.innerWidth;

        if (screenSize < 600) {
          filterButton.classList.add('mobile');
          filterButton.style = 'position: ';
          if (filterButton.classList.contains('tablet')) {
            filterButton.classList.remove('tablet');
          }
        } else {
          filterButton.classList.add('tablet');
          document.body.classList.remove('overflow-hidden');

          if (filterButton.classList.contains('mobile')) {
            filterButton.classList.remove('mobile');
          }
          if (filter.classList.contains('filter-mobile-show')) {
            filter.classList.remove('filter-mobile-show');
          }
        }
      },
    },
  };
</script>
