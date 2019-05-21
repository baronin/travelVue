<template>
  <div class="radio-button">
    <input :id="nameForId+nameLabel+numberForId"
           :value="nameForId"
           :checked="checked"
           :name="nameInput"
           type="radio"
           class="radio">
    <label :for="nameForId+nameLabel+numberForId"
           class="label-radio">
      {{ nameLabel }}
    </label>
  </div>
</template>

<script>
  import './_radio-button.scss'
  export default {
    name: "radio-button",
    props:{
      numberForId: Number,
      nameForId: String,
      nameLabel: String,
      nameInput: String,
      checked: Boolean
    },
  }
</script>
