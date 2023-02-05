<template>
  <form class="radio-wrap" >
    <input value="Male" v-model="gender"
           class="radio" :id="'male'+numberForId"
           type="radio" name="radio" required="">
    <label :for="'male'+numberForId" class="label-radio">Male</label>
    <input value="Female" v-model="gender"
           class="radio" :id="'female'+numberForId"
           type="radio" name="radio" required="">
    <label :for="'female'+numberForId" class="label-radio">Female</label>
  </form>
</template>

<script>
  import './_radio-button.scss'
  export default {
    name: "radio-button",
    props:{
      numberForId: Number
    },
    data() {
      return {
        gender: 'Male',
      }
    },
  }
</script>
