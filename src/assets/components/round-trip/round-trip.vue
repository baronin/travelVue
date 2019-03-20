<template>
  <div class="round-trip">
    <div class="form-row">
      <the-dropdown
        :sumPassengers="getSumPassengers"
        :title="passengersTitle"
        :cabinTypeTitle="selectedType"
        @selectedChange="changeTitle"
      >
        {{changeTitle()}}
        <div class="passenger-row"
             slot="slotPassenger"
             v-for="item in passengersTypes"
             :key="item.title"
        >
          <span>{{item.title}}</span>
          <the-counter
            :counter="item.min"
            v-model="item.quantity"
            :isDecrementDisabled="isDecrementDisabled(item.quantity, item.min)"
            :isIncrementDisabled="isIncrementDisabled()"
          />
        </div>
        <the-cabin-type
          slot="slotCabinType"
          :cabinTypeTitle="cabinTypeTitle"
          :cabinTypes="cabinTypes"
          @changecabintype="changeCabinType"
        />

      </the-dropdown>
    </div>
    <button class="button button-search">Search</button>
  </div>
</template>
<script>
  import TheDropdown from '../dropdown/the-dropdown';
  import TheCabinType from '../passengers/the-cabintype/the-cabintype';
  import TheCounter from '../passengers/the-counter-passengers/the-counter';
  import './_round-trip.scss';

  export default {
    name: 'round-trip',
    components: {
      TheCabinType,
      TheCounter,
      TheDropdown,
    },
    props: [
      'selected',
    ],
    data() {
      return {
        dataForApi: {
          sumPassengers: this.getSumPassengers,
          getCabinType: '',
        },
        // passengers
        passengersTitle: 'Passenger',
        maxPassengersQuantity: 9,
        minPassengersQuantity: 0,
        passengersTypes: [
          { title: 'Adults', min: '1', quantity: 1 },
          { title: 'Children', min: '0', quantity: 0 },
          { title: 'Infants', min: '0', quantity: 0 },
        ],
        incrementDisabled: false,
        decrementDisabled: true,
        // cabin type
        cabinTypeTitle: 'Cabin Type',
        selectedType: 'Economy Class',
        cabinTypes: {
          Economy: 'Economy Class',
          Business: 'Business Class',
          VIP: 'VIP Class',
        },
      };
    },
    computed: {
      getSumPassengers() {
        let sum = 0;
        this.passengersTypes.map(item => sum += item.quantity);
        return sum;
      },

    },
    methods: {
      isIncrementDisabled() {
        if (this.getSumPassengers >= this.maxPassengersQuantity) {
          return this.incrementDisabled = true;
        } else {
          return this.incrementDisabled = false;
        }
      },
      isDecrementDisabled(val, min) {
        if (val <= min) {
          return this.decrementDisabled = true;
        } else {
          return this.decrementDisabled = false;
        }
      },
      changeTitle() {
        this.selected;
        console.log(this.selected);
      },

      changeCabinType(value) {
        this.selectedType = value;
      },
    },
  };
</script>

<style lang="scss">
  .counter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100px;
  }

  .btn-dropdown {
    margin-left: 40px;
  }

</style>
