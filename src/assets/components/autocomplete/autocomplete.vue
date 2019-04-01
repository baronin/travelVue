<template>
  <div class="autocomplete-container">
    <div class="autocomplete-input-holder">
      <input class="form-field" v-model="city"
             :class="[{'has-border-radius-left': hasClass, 'has-border-radius-right': hasClass == false, 'warning-input-border': checkInputLanguage}]"
             @input="getInput"
             :placeholder="placeholder"
             @blur="clearAutocomplete"
             @keydown="getCityInFocus"
             type="text">
      <slot></slot>
      <div class="warning-message" v-if="checkInputLanguage">Please use only english letters</div>
      <div class="warning-message" v-if="emptyDestinationInput">Please enter your destination</div>
      <div class="warning-message" v-if="emptyOriginInput">Please enter your origin</div>
    </div>
    <ul class="city-holder" >
      <li class="city-item"
          v-for="(item, index) in cityObject"
          @mousedown="getCityForInput(item.address.cityName, item.address.cityCode, $event)"
          @keydown="getCityForInput(item.address.cityName, item.address.cityCode, $event)"
          @mouseenter="isActive = index"
          :class="{active: isActive === index}"
      ><span class="city-item-value">{{toUpperCase(item.address.cityName)+', '+ getCodeOrCountry(item.address) }}</span><span
          class="city-item-value">{{item.address.cityCode}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import './_autocomplete.scss';
  import dataMixin from '../../helpers/data.mixin';

  export default {
    name: "autocomplete",
    data() {
      return {
        checkInputLanguage: false,
        checkInputEmptiness: false,
        dataAmadeus: {},
        cityObject: {},
        cityIndex: '',
        city: '',
        cityCode: '',
        isActive: 0,
      }
    },
    props: {
      cityChange: String,
      token: String,
      dataOptions: Object,
      placeholder: String,
      emptyOriginInput: Boolean,
      emptyDestinationInput: Boolean,
      hasClass: Boolean
    },
    mixins: [dataMixin],
    model: {
      event: 'change'
    },
    mounted() {
      this.$parent.$on('update', this.changeInputValue);
    },
    methods: {
      debounced(delay, fn) {
        let timerId;
        return function (...args) {
          if (timerId) {
            clearTimeout(timerId);
          }
          timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
          }, delay);
        }
      },
      getAmadeusData(value) {
        if (this.token && value !== '') {
          this.debounced(1000,
              this.getDataFromMixin({
                url: this.dataOptions.url + value,
                method: this.dataOptions.method,
                headers: {
                  Authorization: this.dataOptions.headers.Authorization + this.token
                }
              })
                  .then(response => (this.dataAmadeus = response))
                  .catch(error => console.log(error)))
        }
      },
      getCityForInput(cityName, cityCode) {
        this.city = this.toUpperCase(cityName);
        this.city = this.city + `(${cityCode})`;
        this.$emit('change', this.city);

        this.$emit('update:city-code', cityCode);
        return this.city;
      },
      changeInputValue() {
        this.city = this.cityChange;
      },
      getCityInFocus(event) {
        if (event.key === 'ArrowDown') {
          if(this.isActive < this.cityObject.length - 1){
            this.isActive++
          }
        } else if (event.key === 'ArrowUp') {
          if(this.isActive > 0){
            this.isActive--
          }
        }
        if (event.key === 'Enter') {
          this.city = this.cityObject[this.isActive].address.cityName;
          this.getCityForInput(this.city, this.cityObject[this.isActive].address.cityCode)
        }
      },
      toUpperCase(cityToUpperCase) {
        return cityToUpperCase.split(" ").map(elemnt => elemnt.charAt(0) + elemnt.slice(1).toLowerCase()).join(" ");
      },
      clearAutocomplete(event) {
        if (event.target.className === 'form-field has-border-radius-left' || event.target.className === 'form-field has-border-radius-right') {
          this.cityObject = {}
        }
      },
      getCodeOrCountry(address) {
        if (address.stateCode) {
          return address.stateCode
        } else {
          return this.toUpperCase(address.countryName)
        }
      },
      getInput(event) {

        let regExp = new RegExp();
        regExp = /[a-z()]/gi;

        this.city = event.target.value;

        if (this.city.match(regExp)) {
          this.checkInputLanguage = false;
          this.$emit('change', this.city);
          this.getAmadeusData(event.target.value)
        } else {
          this.$emit('change', this.city);
          this.checkInputLanguage = true
        }

        if (event.target.value === '') {
          this.cityObject = {};
          this.checkInputLanguage = false
        }
      },
    },
    watch: {
      dataAmadeus() {
        return this.cityObject = this.dataAmadeus.data.data
      }
    }
  }
</script>
