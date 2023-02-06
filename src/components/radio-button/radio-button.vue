<template>
  <form class="radio-wrap">
    <input
      :id="'male' + numberForId"
      v-model="gender"
      value="Male"
      class="radio"
      type="radio"
      name="radio"
      required=""
    />
    <label :for="'male' + numberForId" class="label-radio">Male</label>
    <input
      :id="'female' + numberForId"
      v-model="gender"
      value="Female"
      class="radio"
      type="radio"
      name="radio"
      required=""
    />
    <label :for="'female' + numberForId" class="label-radio">Female</label>
  </form>
</template>

<script>
import './_radio-button.scss'
export default {
  name: 'RadioButton',
  props: {
    numberForId: Number,
  },
  data() {
    return {
      gender: 'Male',
    }
  },
}
</script>
