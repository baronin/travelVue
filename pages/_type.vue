<template>
  <main class="main">
    <div class="container">
      <div class="container-form bg-blue-grey">
        <div class="round-trip">
          <div class="form-row">
            <div class="autocomplete-container">
              <autocomplete
                v-model="dataForApi.originCity.cityName"
                :data-list=""
                :input-value="dataForApi.originCity"
                :city-code.sync="dataForApi.originCity.cityCode"
                :data-options="autocompleteOptions"
                :empty-origin-input="dataForApi.originCity.emptyInput"
                :check-language="dataForApi.originCity.checkLanguage"
                :placeholder="'From'"
                :token="dataForApi.tokenForRequest.token"
                border-left-radios
                @input-value="inputValidation($event, 'originCity')"
              />
              <div
                v-show="dataForApi.originCity.checkLanguage &&
                  !dataForApi.originCity.emptyInput"
                class="warning-message"
              >
                Please use only english letters
              </div>
              <div
                v-show="dataForApi.originCity.emptyInput"
                class="warning-message"
              >
                Please enter your origin
              </div>
            </div>
            <div class="autocomplete-container">
              <autocomplete
                v-model="dataForApi.destinationCity.cityName"
                :input-value="dataForApi.destinationCity"
                :city-code.sync="dataForApi.destinationCity.cityCode"
                :data-options="autocompleteOptions"
                :empty-destination-input="dataForApi.destinationCity.emptyInput"
                :check-language="dataForApi.destinationCity.checkLanguage"
                :placeholder="'To'"
                :token="dataForApi.tokenForRequest.token"
                border-right-radios
                @input-value="inputValidation($event, 'destinationCity')"
              />
              <div
                v-show="dataForApi.destinationCity.emptyInput"
                class="warning-message"
              >
                Please enter your destination
              </div>
              <div
                v-show="dataForApi.destinationCity.checkLanguage &&
                  !dataForApi.destinationCity.emptyInput"
                class="warning-message"
              >
                Please use only english letters
              </div>
            </div>
          </div>
          <div class="form-row">
            <the-datepicker
              :empty-input="dataForApi.flightDates.emptyInput"
              :dates="dataForApi.flightDates"
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
                />
              </div>
              <the-cabin-type
                slot="slotCabinType"
                :cabin-type-title="cabinTypeTitle"
                :cabin-type="dataForApi.cabinType.getCabinType"
                @changecabintype="changeCabinType"
              />
            </the-dropdown>
          </div>
          <div class="form-row">
            <the-button
              :modifier="[{ 'is-primary': true }]"
              @button-click="getLowFareFlight"
            >
              Search
            </the-button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'Index',

    validate({ params }) {
      return ['round-trip', 'one-way'].includes(params.type);
    },

    computed: {
      type: {
        get() {
          return this.$route.params.type;
        },
        set(value) {

        },
      },
    },
  };
</script>

<style lang="scss">
  .main {
    min-height: 628px;
    height: 100%;
    padding-top: 70px;
    background: url("../assets/img/bg-main.jpg");

    .container-form {
      padding: 20px 20px 36px 20px;
    }
  }
</style>
