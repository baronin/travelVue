<template>
  <div class="counter">
    <button class="btn is-btn-counter is-minus"
            @click="decrement"
            :disabled="isDecrementDisabled"></button>
    <span>{{  label }}</span>
    <button class="btn is-btn-counter is-plus"
            @click="increment"
            :disabled="isIncrementDisabled"></button>
  </div>
</template>

<script>
  import './_the-counter-passengers.scss';

  export default {
    name: 'the-counter',
    model: {
      event: 'changeСounter'
    },
    props: {
      value: Number,
      isDecrementDisabled: Boolean,
      isIncrementDisabled: Boolean
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
        this.$emit("changeСounter", this.label)
      },
      decrement() {
        this.label--;
        this.$emit("changeСounter", this.label);
      },
    },
  };
</script>