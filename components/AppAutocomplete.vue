<template>
  <div class="autocomplete-input-holder">
    <input
      v-model="input"
      :class="{ 'has-border-radius-left': borderLeftRadios,
                'has-border-radius-right': borderRightRadios,
                'warning-input-border': !isValidInput }"
      :placeholder="placeholder"
      class="form-field"
      type="text"
      @blur="clearAutocomplete"
      @keydown="getCityInFocus"
    >
    <the-button
      :modifier="[{ 'is-reverse-button': true }]"
      @button-click="changeValues"
    >
      <svg fill="currentColor" width="17px" height="15px" viewBox="0 0 17 15">
        <g id="search-min-1200" transform="translate(-604.000000, -361.000000)" fill-rule="nonzero">
          <path
            id="Combined-Shape"
            transform="translate(410.000000, 343.000000)"
            d="M197.535534,29 L209,29 L209,30 L197.535534,30 L197.535534,33.0710678 L194,29.5355339 L197.535534,26 L197.535534,29 Z M206.535534,21 L206.535534,18 L210.071068,21.5355339 L206.535534,25.0710678 L206.535534,22 L195,22 L195,21 L206.535534,21 Z"
          />
        </g>
      </svg>
    </the-button>

    <transition name="slide-fade">
      <ul v-if="showArrayList" class="city-holder">
        <li
          v-for="(item, index) in cityObject"
          :key="index"
          class="city-item"
          :class="{ active: isActive === index }"
          @mousedown="getCityForInput(item.address.cityName, item.address.cityCode, $event)"
          @keydown="getCityForInput(item.address.cityName, item.address.cityCode, $event)"
          @mouseenter="isActive = index"
        >
          <span
            class="city-item-value"
          >{{ toUpperCase(item.address.cityName)+', '+ getCodeOrCountry(item.address) }}</span><span
          class="city-item-value"
        >{{ item.address.cityCode }}
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
  import AppButton from '@/components/AppButton';

  export default {
    name: 'AppAutocomplete',

    comments: {
      AppButton,
    },

    model: {
      event: 'change',
    },

    props: {
      inputValue: Object,
      token: String,
      dataOptions: Object,
      placeholder: String,
      emptyOriginInput: Boolean,
      emptyDestinationInput: Boolean,
      checkLanguage: Boolean,

      /**
       * Is border right has radius
       */
      borderRightRadios: {
        required: false,
        type: Boolean,
        default: false,
      },

      /**
       * Is border left has radius
       */
      borderLeftRadios: {
        required: false,
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        showArrayList: false,
        checkInputLanguage: false,
        dataAmadeus: {},
        cityObject: {},
        city: '',
        cityCode: '',
        isActive: 0,

        input: null,
      };
    },

    computed: {
      /**
       * Is input valid
       *
       * @returns {boolean}
       */
      isValidInput() {
        return !(this.checkLanguage ||
          this.emptyDestinationInput ||
          this.emptyOriginInput);
      },
    },

    watch: {
      dataAmadeus() {
        this.showArrayList = true;
        this.cityObject = this.dataAmadeus.data.data;
        if (Object.keys(this.cityObject).length === 0) {
          this.$emit('input-value', 'error');
        }
        return this.cityObject;
      },
    },
    methods: {
      clearAutocomplete(event) {
        if (Object.keys(this.cityObject).length !== 0) {
          this.getCityForInput(this.cityObject[this.isActive].address.cityName,
            this.cityObject[this.isActive].address.cityCode);
        }

        this.showArrayList = false;
        if (event.target.classList[0] === 'form-field') {
          this.cityObject = {};
        }
      },
      debounced(delay, fn) {
        let timerId;
        return function(...args) {
          if (timerId) {
            clearTimeout(timerId);
          }
          timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
          }, delay);
        };
      },
      getAmadeusData(value) {
        if (this.token && value !== '' && value.length > 2) {
          this.debounced(1000,
            dataMixin.getDataFromMixin({
              url: this.dataOptions.url + value,
              method: this.dataOptions.method,
              headers: {
                Authorization: this.dataOptions.headers.Authorization + this.token,
              },
            })
              .then(response => (this.dataAmadeus = response))
              .catch(error => console.log(error)));
        }
      },
      getCityForInput(cityName, cityCode) {
        this.city = `${ this.toUpperCase(cityName) } (${ cityCode })`;
        this.$emit('change', this.city);
        this.$emit('update:city-code', cityCode);
        return this.city;
      },
      getCityInFocus(event) {
        if (event.key === 'ArrowDown') {
          if (this.isActive < this.cityObject.length - 1) {
            this.isActive++;
          }
        } else if (event.key === 'ArrowUp') {
          if (this.isActive > 0) {
            this.isActive--;
          }
        }
        if (event.key === 'Enter') {
          this.city = this.cityObject[this.isActive].address.cityName;
          this.getCityForInput(this.city, this.cityObject[this.isActive].address.cityCode);
          this.showArrayList = false;
        }
      },
      toUpperCase(cityToUpperCase) {
        const letterToUpperCaseAfterSlash = cityToUpperCase.split(' ')
          .map(element => element.charAt(0) + element.slice(1)
            .toLowerCase()).join(' ');
        return letterToUpperCaseAfterSlash.split('/')
          .map(element => element.charAt(0).toUpperCase() + element.slice(1)).join('/');
      },
      getCodeOrCountry(address) {
        if (address.stateCode) {
          return address.stateCode;
        } else {
          return this.toUpperCase(address.countryName);
        }
      },
      getInputValue(event) {
        this.city = event.target.value;
        if (!this.checkLanguage) {
          this.getAmadeusData(this.city);
        }
        this.$emit('change', this.city);

        if (event.target.value === '') {
          this.showArrayList = false;
          this.cityObject = {};
          this.checkInputLanguage = false;
        }
        this.$emit('input-value', event.target.value);
      },
    },
  };
</script>

<style lang="scss">
  .city-holder {
    position: absolute;
    width: 100%;
    margin: 2px 0 0 0;
    background: $color-white;
    border-radius: 4px;
    z-index: 10;

    @include desktop {
      width: 350px;
    }
  }

  .active {
    background: $color-blue-fifteen-opacity;
    cursor: pointer;
  }

  .city-item {
    display: flex;
    justify-content: space-between;
    padding: 15px;

    .city-item-value:last-child {
      color: $color-gray;
    }
  }

  .autocomplete-holder {
    width: 100%;
    height: 100%;
  }

  .autocomplete-container {
    position: relative;
    width: 100%;

    &:first-child {
      margin: 0 0 2px 0;
    }

    @include tablet {
      height: 100%;
      &:first-child {
        margin-right: 2px;
      }
    }

    @include desktop {
      &:last-child {
        margin: 0 2px 0 0;
      }
    }
  }

  .autocomplete-input-holder {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .has-border-radius-left {
    border-radius: 4px 4px 0 0;

    @include tablet {
      border-radius: 4px 0 0 0;
    }

    @include desktop {
      border-radius: 4px 0 0 4px;
    }
  }

  .has-border-radius-right {

    @include tablet {
      border-radius: 0 4px 0 0;
    }

    @include desktop {
      border-radius: 0;
    }
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(.2, 0.2, 0.5, .5);
  }

  .slide-fade-enter {
    transform: translateY(5px);
    opacity: 0;
  }

  .slide-fade-leave-to {
    transform: translateX(80px);
    opacity: 0;
  }

</style>
