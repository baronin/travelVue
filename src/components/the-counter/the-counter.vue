<template>
  <div class="counter">
    <button
      class="btn is-btn-counter is-minus"
      :disabled="isDecrementDisabled"
      @click="decrement"
    ></button>
    <span>{{ label }}</span>
    <button
      class="btn is-btn-counter is-plus"
      :disabled="isIncrementDisabled"
      @click="increment"
    ></button>
  </div>
</template>

<script>
import './_the-counter-passengers.scss'

export default {
  name: 'TheCounter',
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
    }
  },
  mounted() {
    this.label = this.value
  },
  methods: {
    increment() {
      this.label++
      this.$emit('changeСounter', this.label)
    },
    decrement() {
      this.label--
      this.$emit('changeСounter', this.label)
    },
  },
}
</script>