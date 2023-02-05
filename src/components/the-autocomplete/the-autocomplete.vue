<template>
  <div class="autocomplete-container">
    <div class="autocomplete-input-holder">
      <input class="form-field"
             :class="[{'has-border-radius-left': hasClass, 'has-border-radius-right': !hasClass, 'warning-input-border': checkInputLanguage || emptyDestinationInput || emptyOriginInput}]"
             :value="inputValue.cityName"
             @input="getInputValue"
             :placeholder="placeholder"
             @blur="clearAutocomplete"
             @keydown="getCityInFocus"
             type="text">
      <slot></slot>
      <div class="warning-message" v-show="checkInputLanguage && !emptyDestinationInput && !emptyOriginInput ">Please
        use
        only english letters
      </div>
      <div class="warning-message" v-show="emptyDestinationInput">Please enter your destination</div>
      <div class="warning-message" v-show="emptyOriginInput">Please enter your origin</div>
      <transition name="slide-fade">
        <ul class="city-holder" v-if="showArrayList">
          <li class="city-item"
              v-for="(item, index) in cityObject"
              :key="index"
              @mousedown="getCityForInput(item.address.cityName, item.address.cityCode, $event)"
              @keydown="getCityForInput(item.address.cityName, item.address.cityCode, $event)"
              @mouseenter="isActive = index"
              :class="{active: isActive === index}">
            <span
                class="city-item-value">{{toUpperCase(item.address.cityName)+', '+ getCodeOrCountry(item.address) }}</span><span
              class="city-item-value">{{item.address.cityCode}}
            </span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
  import './_the-autocomplete.scss';
  import dataMixin from '../../helpers/data.mixin';

  export default {
    name: "the-autocomplete",
    data() {
      return {
        showArrayList: false,
        checkInputLanguage: false,
        dataAmadeus: {},
        cityObject: {},
        city: '',
        cityCode: '',
        isActive: 0,
      }
    },
    props: {
      inputValue: Object,
      token: String,
      dataOptions: Object,
      placeholder: String,
      emptyOriginInput: Boolean,
      emptyDestinationInput: Boolean,
      hasClass: Boolean,
    },
    mixins: [dataMixin],
    model: {
      event: 'change'
    },
    methods: {
      clearAutocomplete() {
        this.showArrayList = false
        if (event.target.classList[0] === 'form-field') {
          this.cityObject = {}
        }
      },
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
        if (this.token && value !== '' && value.length > 2) {
          this.debounced(1000,
              dataMixin.getDataFromMixin({
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
        this.city = `${this.toUpperCase(cityName)}(${cityCode})`;
        this.$emit('change', this.city);
        this.$emit('update:city-code', cityCode);
        return this.city;
      },
      getCityInFocus(event) {
        if (event.key === 'ArrowDown') {
          if (this.isActive < this.cityObject.length - 1) {
            this.isActive++
          }
        } else if (event.key === 'ArrowUp') {
          if (this.isActive > 0) {
            this.isActive--
          }
        }
        if (event.key === 'Enter') {
          this.city = this.cityObject[this.isActive].address.cityName;
          this.getCityForInput(this.city, this.cityObject[this.isActive].address.cityCode)
          this.showArrayList = false
        }
      },
      toUpperCase(cityToUpperCase) {
        let letterToUpperCaseAfterSlash = cityToUpperCase.split(" ").map(elemnt => elemnt.charAt(0) + elemnt.slice(1).toLowerCase()).join(" ")
        return letterToUpperCaseAfterSlash.split("/").map(elemnt => elemnt.charAt(0).toUpperCase() + elemnt.slice(1)).join("/");
      },
      getCodeOrCountry(address) {
        if (address.stateCode) {
          return address.stateCode
        } else {
          return this.toUpperCase(address.countryName)
        }
      },
      getInputValue(event) {

        let regExp = new RegExp();
        regExp = /[a-z()]/gi;

        this.city = event.target.value;

        if (regExp.test(event.target.value)) {
          this.checkInputLanguage = false;
          this.$emit('change', this.city);
          this.getAmadeusData(this.city)
        } else {
          this.$emit('change', this.city);

          this.checkInputLanguage = true
        }

        if (event.target.value === '') {
          this.showArrayList = false;
          this.cityObject = {};
          this.checkInputLanguage = false
        }

        this.$emit('input-value', event.target.value)
      },
    },
    watch: {
      dataAmadeus() {
        this.showArrayList = true;
        return this.cityObject = this.dataAmadeus.data.data;
      }
    }
  }
</script>
