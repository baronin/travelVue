<template>
  <div class="passenger-info-container">
    <h3>Passenger {{ index }} – {{ typeTitle }}</h3>
    <div class="row passenger-info">
      <div class="column">
        <label class="form-group-label">First Name</label>
        <input id="firstName" class="form-group-input"
               maxlength="65"
               :class="{ 'form-group--error': firstNameHasErr }"
               v-model.trim="fName"
               type="text" placeholder="First Name"
        >
      </div>
      <div class="column">
        <label class="form-group-label">Middle Name (optional)</label>
        <input id="middleName" class="form-group-input" type="text"
               placeholder="Middle Name (optional)"
               maxlength="65"
        >
      </div>
      <div class="column">
        <label class="form-group-label">Last Name</label>
        <input id="lastName" class="form-group-input"
               maxlength="65"
               :class="{ 'form-group--error': lastNameHasErr }"
               v-model.trim="lName"
               type="text" placeholder="Last Name"
        >
      </div>
    </div>
    <div class="row passenger-info">
      <div class="column">
        <label class="form-group-label">Date of Birth</label>

        <input id="dateBirth"
               type="date"
               class="form-group-input"
               :min="minYears"
               :max="maxYears"
               :class="{ 'form-group--error': dateOfBirthHasErr }"
               v-model.trim="dOfBirth"
        >

        <slot name="date-of-birth-err"></slot>
      </div>
      <div class="column">
        <label class="form-group-label">{{ nameInput }}</label>

        <div :id="nameInput" class="fieldset-gender">
          <radio-button :number-for-id="index"
                        :name-for-id="typeTitle"
                        :name-label="nameLabel.male"
                        :name-input="nameInput"
                        :checked="true"
          >
          </radio-button>
          <radio-button :number-for-id="index"
                        :name-for-id="typeTitle"
                        :name-label="nameLabel.female"
                        :name-input="nameInput"
          >
          </radio-button>
        </div>
      </div>
      <!--  to prevent breaking layout -->
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
  import RadioButton from '@/assets/components/radio-button/radio-button';

  export default {
    name: 'passenger-info-container',

    components: {
      RadioButton,
    },

    props: {
      index: {
        required: true,
        type: Number,
      },

      passengersType: {
        required: true,
        type: Object,
      },

      firstNameHasErr: {
        required: true,
        type: Boolean,
      },

      lastNameHasErr: {
        required: true,
        type: Boolean,
      },

      dateOfBirthHasErr: {
        required: true,
        type: Boolean,
      },

      firstName: {
        required: true,
        type: String,
      },

      lastName: {
        required: true,
        type: String,
      },

      dateOfBirth: {
        required: true,
        type: String,
      },
    },

    data() {
      return {
        nameInput: 'Gender',

        nameLabel: {
          male: 'Male',
          female: 'Female',
        },
      };
    },

    computed: {
      fName: {
        get() {
          return this.firstName;
        },
        set(value) {
          this.$emit('firstName', value);
        },
      },

      lName: {
        get() {
          return this.lastName;
        },
        set(value) {
          this.$emit('lastName', value);
        },
      },

      dOfBirth: {
        get() {
          return this.dateOfBirth;
        },
        set(value) {
          this.$emit('dateOfBirth', value);
        },
      },

      minYears() {
        let sub = 0;
        if (this.typeTitle === 'Adult') {
          sub = 100;
        } else if (this.typeTitle === 'Child') {
          sub = 12;
        } else {
          sub = 2;
        }

        const date = new Date();
        date.setFullYear(date.getFullYear() - sub);

        return date.toISOString().split('T')[0];
      },

      maxYears() {
        let sub = 0;
        if (this.typeTitle === 'Adult') {
          sub = 12;
        } else if (this.typeTitle === 'Child') {
          sub = 2;
        }

        const date = new Date();
        date.setFullYear(date.getFullYear() - sub);

        return date.toISOString().split('T')[0];
      },

      typeTitle() {
        if (this.passengersType.title === 'Children') {
          return 'Child';
        } else {
          return this.passengersType.title.slice(0, -1);
        }
      },
    },
  };
</script>
