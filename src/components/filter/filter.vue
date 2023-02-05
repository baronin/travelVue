<template>
  <div class="filter" :class="[{'filter-mobile-show': filterMobileShow}]">
    <div class="filter-top">Filter your results</div>
    <div class="filter-wrapper">
      <div class="filter-item-wrap">
        <h4 class="filter-title">Frequent</h4>
        <div class="content-wrap">
          <label @click="displayFloatingFilterButton">
            <input class="checkbox"
                   type="radio"
                   name="frequent"
                   value="withLuggage"
                   v-model="dataForFilter.frequent"
            >
            <span @click="displayFloatingFilterButton" class="checkbox-custom"></span>
            <span class="label">Only with luggage</span>
          </label>
        </div>
        <div class="content-wrap">
          <label @click="displayFloatingFilterButton">
            <input class="checkbox"
                   type="radio"
                   name="frequent"
                   value="nonStop"
                   v-model="dataForFilter.frequent"
            >
            <span class="checkbox-custom"></span>
            <span class="label">Only nonstop</span>
          </label>
        </div>
      </div>
      <div class="filter-item-wrap">
        <h4 class="filter-title">Duration</h4>
        <div class="content-wrap">
          <div class="range-value">
            <span>Flight duration</span>
            <span class="chosen-value"
                  v-if="value < maxDuration"
            >{{value | toHours}}</span>
            <span class="chosen-value"
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
              @change="filterDataChange"
            ></vue-slider>
          </div>

        </div>
      </div>
      <div class="filter-item-wrap">
        <h4 class="filter-title">Stops</h4>
        <template v-for="stop in dataForFilter.stops">
          <div class="content-wrap"
               :key="stop.code"
          >
            <label @click="displayFloatingFilterButton">
              <input class="checkbox"
                     type="checkbox"
                     name="stops"
                     v-model="stop.isChecked"
                     @change="filterDataChange"
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
          <button type="button"
                  class="btn bg-none clear-btn"
                  @click="clearPrice"
          >Clear
          </button>
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
              @drag-end="filterDataChange"
            ></vue-slider>
          </div>

        </div>
      </div>
      <div class="filter-item-wrap">
        <h4 class="filter-title">Airlines</h4>
        <template v-for="(airline, index) in dataForFilter.carrierCode">
          <div class="content-wrap"
               v-if="index < variable" :key="airline.value"
          >
            <label @click="displayFloatingFilterButton">
              <input class="checkbox"
                     type="checkbox"
                     name="Airlines"
                     v-model="airline.isChecked"
                     @change="filterDataChange"
              >
              <span class="checkbox-custom"></span>
              <span class="label">{{airline.name}}</span>
            </label>
          </div>
        </template>
        <div class="btn-wrap">
          <button type="button"
                  class="btn bg-none arrow"
                  :class="{'arrow-active': visible}"
                  @click="showMoreAirlines"
          >Show more
          </button>
        </div>
      </div>
      <div class="filter-item-wrap">
        <h4 class="filter-title">Airports</h4>
        <h5 class="filter-subtitle">Departure</h5>
        <template v-for="departItem in dataForFilter.departure">
          <div class="content-wrap"
               :key="departItem.value"
          >
            <label @click="displayFloatingFilterButton">
              <input class="checkbox"
                     @change="filterDataChange"
                     type="checkbox"
                     name="Airports"
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
          <div class="content-wrap"
               :key="item.value"
          >
            <label @click="displayFloatingFilterButton">
              <input class="checkbox"
                     type="checkbox"
                     @change="filterDataChange"
                     name="Airports"
                     :disabled="dataForFilter.arrival.length === 1"
                     v-model="item.isChecked"
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
            @button-click="setFilteredData"
          >Filter
          </the-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/default.css';
  import { mapActions, mapGetters } from 'vuex';
  import airlines from '../../assets/jsons/airlines.json';
  import airports from '../../assets/jsons/airports.json';
  import '../the-button/_the-button.scss';
  import TheButton from '../the-button/the-button';
  import './_filter.scss';

  export default {
    name: 'filters',
    components: { TheButton, VueSlider },
    data() {
      return {
        elementPosition: '',
        airlinesList: airlines,
        airportsList: airports,
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
        value: 0,
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
      };
    },

    created() {
      this.getPriceValues();
      this.getIataArrival();
      this.getArrivalAirports();
      this.getIataDeparture();
      this.getDepartAirports();
      this.getDuration();
      this.getAirlines();
    },

    computed: {
      ...mapGetters('cardFilters', {
        'filterMobileShow': 'isOpened',
      }),

      ...mapGetters('api', [
        'dataFromApi',
        'filteredArrayForCounting',
      ]),
    },

    filters: {
      toHours(value) {
        value = moment.duration(value);
        if (value._data.hours === 0) {
          return `${value._data.minutes} m`;
        } else {
          return `${value._data.hours} h ${value._data.minutes} m`;
        }
      },
    },

    methods: {
      ...mapActions('api', ['setFilters']),

      displayFloatingFilterButton(event) {
        let filterButton = window.document.querySelector('.filter-footer');
        this.elementPosition = event.currentTarget.offsetTop - 17;
        filterButton.style = this.elementPosition;
        filterButton.style = 'display: flex; top: ' + this.elementPosition + 'px;';
      },
      showMoreAirlines() {
        this.visible = !this.visible;
        if (this.variable === 4) {
          this.variable = Object.keys(this.dataFromApi.dictionaries.carriers).length;
        } else {
          this.variable = 4;
        }
      },
      clearPrice() {
        if (this.priceValues) {
          return this.priceValues = [this.minPrice, this.maxPrice];
        }
      },
      getAirlines() {
        let arr = this.dataFromApi.data.map(item => item.offerItems[0].services
          .map(service => service.segments
            .map(segment => segment.flightSegment.carrierCode)))
          .flat(2);
        let dictionariesKeys = Object.keys(this.dataFromApi.dictionaries.carriers);
        this.dataForFilter.carrierCode = dictionariesKeys.filter(item => {
            return arr.includes(item);
          })
          .reduce((arr, key) => {
            arr.push({
              code: key,
              name: this.airlinesList[key],
              isChecked: true,
            });
            return arr;
          }, []);
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
        for (let code in this.airportsList) {
          for (let key in this.obj) {
            if (code === key) {
              let arrivalObject = {};
              arrivalObject.iataCode = code;
              arrivalObject.name = this.airportsList[code].name;
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
                if (segment === 0) {
                  departure = this.dataFromApi.data[i].offerItems[0].services[service].segments[segment].flightSegment.departure.at;
                } else if (segment === targetSegment - 1) {
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
        this.unsortedDur.forEach(function (val) {
          const fVal = val || 0;
          maxDuration = Math.max(maxDuration, fVal);
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
        unsortedArr.forEach(function (val) {
          minPrice = Math.min(minPrice, val);
          maxPrice = Math.max(maxPrice, val);
        });
        this.minPrice = Math.ceil(minPrice) - 1;
        this.maxPrice = Math.floor(maxPrice) + 1;
        this.priceValues.push(this.minPrice, this.maxPrice);
      },
      filterDataChange() {
        this.dataForFilter.total = this.priceValues;
        this.dataForFilter.duration = this.value;
        this.setFilters(JSON.parse(JSON.stringify(this.dataForFilter)));
      },

      setFilteredData() {
        this.$store.dispatch('api/setFilteredData');
      },
    },
  };
</script>
