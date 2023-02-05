<template>
  <button type="button" class="btn"
          :class="modifier? modifier : null" @click="$emit('button-click')">
    <slot></slot>
  </button>
</template>

<script>
  import './_the-button.scss'

  export default {
    name: "the-button",
    props: {
      modifier: Array
    }
  }
</script>