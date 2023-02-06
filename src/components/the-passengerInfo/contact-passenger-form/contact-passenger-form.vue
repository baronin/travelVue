<template>
  <div>
    <div v-for="index in passengerOfNumber" :key="index" class="passenger-info-wrap">
      <h3>Passenger {{ index }} – Adult</h3>
      <div class="row passenger-info">
        <div class="column">
          <label for="firstName" class="form-group-label">First Name</label>
          <input
            id="firstName"
            class="form-group-input"
            type="text"
            placeholder="First Name"
            required
          />
        </div>
        <div class="column">
          <label for="middleName" class="form-group-label">Middle Name (optional)</label>
          <input
            id="middleName"
            class="form-group-input"
            type="text"
            placeholder="Middle Name (optional)"
            required
          />
        </div>
        <div class="column">
          <label for="lastName" class="form-group-label">Last Name</label>
          <input
            id="lastName"
            class="form-group-input"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div class="row passenger-info">
        <div class="column">
          <label for="birth" class="form-group-label">Date of Birth</label>
          <input id="birth" type="date" class="form-group-input" required />
        </div>
        <div class="column">
          <label class="form-group-label">Gender</label>
          <radio-button :number-for-id="index"></radio-button>
        </div>
        <!--  to prevent breaking layout -->
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import './_contact-passenger-form.scss'
import RadioButton from '../../radio-button/radio-button'
export default {
  name: 'ContactPassengerForm',
  components: { RadioButton },
  props: {
    passengerOfNumber: Number,
  },
}
</script>