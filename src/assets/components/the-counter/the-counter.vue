<template>
  <div class="counter">
    <the-button :modifier="[{'is-btn-counter': true}, {'is-minus': true}]"
                @button-click="decrement"
                :disabled="isDecrementDisabled"></the-button>
    <span>{{  label }}</span>
    <the-button
        :modifier="[{'is-btn-counter': true}, {'is-plus': true}]"
        @button-click="increment"
        :disabled="isIncrementDisabled"></the-button>
  </div>
</template>

<script>
  import './_the-counter.scss';
  import TheButton from '../the-button/the-button';

  export default {
    name: 'the-counter',
    components: { TheButton },
    model: {
      event: 'changeСounter',
    },
    props: {
      value: Number,
      isDecrementDisabled: Boolean,
      isIncrementDisabled: Boolean,
    },
    data() {
      return {
        label: 0,
      };
    },
    mounted() {
      this.label = this.value;
    },
    methods: {
      increment() {
        this.label++;
        this.$emit('changeСounter', this.label);
      },
      decrement() {
        this.label--;
        this.$emit('changeСounter', this.label);
      },
    },
  };
</script>