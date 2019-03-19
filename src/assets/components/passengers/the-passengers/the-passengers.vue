<template>
	<div class="passenger-wrap">

	</div>
</template>

<script>
  import './the-passengers.scss';

  export default {
    name: 'the-passengers',
    components: {},
    props: [
      'counter',
    ],
    data() {
      return {
        passengersTitle: 'Passenger',
        cabinType: 'Economy Class',
        sum: '',
        classType: '',
        passengersTypes: [
          {title: 'Adults', min: 1, max: 9},
          {title: 'Children', min: 0, max: 8},
          {title: 'Infants', min: 0, max: 8},
        ],
        isActiveDropDownAir: true,
      };
    },
    methods: {
      updateCounter(type, value) {
        this.counter[type] = value;
      },
    },
  };
</script>

