<template>
  <div class="counter">
    <button
        class="button-counter btn-minus"
        @click="decrement"
        :disabled="isDecrementDisabled"></button>
    <span>{{  label }}</span>
    <button
        class="button-counter btn-plus"
        @click="increment"
        :disabled="isIncrementDisabled"></button>
  </div>
</template>

<script>
  import './the-counter-passengers.scss';

  export default {
    name: 'the-counter',
    model: {
      event: 'changeCounter'
    },
    props: [
      'counter',
      'value',
      'isDecrementDisabled',
      'isIncrementDisabled'
    ],
    data() {
      return {
        label: this.value
      };
    },
    methods: {
      increment() {
        this.label++;
        this.$emit("changeCounter", this.label)
      },
      decrement() {
        this.label--;
        this.$emit("changeCounter", this.label);
      },
    },
  };
</script>

<style lang="scss">
  .btn-minus,
  .btn-plus {
    position: relative;
    width: 33px;
    height: 33px;
    border: 1px solid $color-dark-main;
    border-radius: 18px;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 15px;
      left: 10px;

      width: 11px;
      height: 1px;
      background: $color-dark-main;
    }
  }
</style>