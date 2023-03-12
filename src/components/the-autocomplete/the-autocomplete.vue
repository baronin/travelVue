<template>
  <div class="autocomplete-container">
    <div class="autocomplete-input-holder">
      <input
        class="form-field"
        :class="[
          {
            'has-border-radius-left': hasClass,
            'has-border-radius-right': !hasClass,
            'warning-input-border': checkInputLanguage || emptyDestinationInput || emptyOriginInput,
          },
        ]"
        :value="defaultValue"
        :placeholder="placeholder"
        type="text"
        @input="getInputValue"
        @blur="clearAutocomplete"
        @keydown="getCityInFocus"
      />
      <slot></slot>
      <div
        v-show="checkInputLanguage && !emptyDestinationInput && !emptyOriginInput"
        class="warning-message"
      >
        Please use only english letters
      </div>
      <div v-show="emptyDestinationInput" class="warning-message">
        Please enter your destination
      </div>
      <div v-show="emptyOriginInput" class="warning-message">Please enter your origin</div>
      <transition name="slide-fade">
        <ul v-if="results.length" class="city-holder">
          <li
            v-for="(item, index) in results"
            :key="index"
            class="city-item"
            :class="{ active: isActive === index }"
            @click="getCityForInput(item.address.cityName, item.address.cityCode, $event)"
            @mouseenter="isActive = index"
          >
            <span class="city-item-value">
              {{ showCityName(item) }}
            </span>
            <span class="city-item-value">{{ item.address.cityCode }} </span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import './_the-autocomplete.scss'
import { api } from '@/api'
import { helpers } from '@/helpers'

export default {
  name: 'TheAutocomplete',
  model: {
    event: 'change',
  },
  props: {
    defaultValue: { type: String, default: '' },
    results: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    emptyOriginInput: Boolean,
    emptyDestinationInput: Boolean,
    hasClass: Boolean,
  },
  data() {
    return {
      showArrayList: false,
      checkInputLanguage: false,
      cityObject: {},
      city: '',
      cityCode: '',
      isActive: 0,
    }
  },
  // watch: {
  //   dataAmadeus() {
  //     this.showArrayList = true
  //     return (this.cityObject = this.dataAmadeus.data.data)
  //   },
  // },
  methods: {
    clearAutocomplete() {
      this.showArrayList = false
      if (event.target.classList[0] === 'form-field') {
        this.cityObject = {}
      }
    },
    getCityForInput(cityName, cityCode) {
      console.log('this.city', this.city)
      this.city = `${helpers.toUpperCase(cityName)}(${cityCode})`
      this.$emit('change', this.city)
      this.$emit('update:city-code', cityCode)
      return this.city
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
        this.city = this.cityObject[this.isActive].address.cityName
        this.getCityForInput(this.city, this.cityObject[this.isActive].address.cityCode)
        this.showArrayList = false
      }
    },
    getCodeOrCountry(address) {
      if (address.stateCode) {
        return address.stateCode
      } else {
        return helpers.toUpperCase(address.countryName)
      }
    },
    getInputValue(event) {
      /*let regExp = new RegExp()
      regExp = /[a-z()]/gi

      this.city = event.target.value

      if (regExp.test(event.target.value)) {
        this.checkInputLanguage = false
        this.getAmadeusData(this.city)
      } else {
        this.checkInputLanguage = true
      }

      if (event.target.value === '') {
        this.showArrayList = false
        this.cityObject = {}
        this.checkInputLanguage = false
      }
      this.$emit('change', this.city)*/
      this.$emit('input', event.target.value)
    },
    showCityName(value) {
      return (
        helpers.toUpperCase(value.address.cityName) + ', ' + this.getCodeOrCountry(value.address)
      )
    },
  },
}
</script>
