<template>
  <div class="passengers-block">
    <div class="passengers-row" v-for="pa in passenger">
      <div class="passenger-title" >
        <span >{{pa.title}}</span>
      </div>
      <div class="passenger-amount">
        <div class="passengers-adults">
          <the-counter
              :counter="passenger[0].counter"
              @increment="consLog">
          </the-counter>

          <the-counter
              :counter="passenger[2].counter"
              @increment="consLog">
          </the-counter>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './passenger.scss';
  import TheCounter from './the-counter-passengers/the-counter';

  export default {
    name: 'passengersTypes',
    components: {TheCounter},
    props: [
      'passenger',
    ],
    data() {
      return {};
    },
    methods: {
      consLog(value) {
        this.$emit('inParent', value);
        console.log('parent ' + value)
      }
    },
  };
</script>

