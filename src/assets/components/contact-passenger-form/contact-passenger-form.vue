<template>
  <div>
    <form action="" class="form">
      <h2 class="form-main-title">Passenger Information</h2>
      <span class="text-bg-blue">
        Passenger names must match passport for international travel or government issued
            photo ID for US domestic travel
      </span>
      <h3 class="form-content-title">Contact Details</h3>
      <div class="flex-grid">
        <div class="column-6">
          <label class="form-group-label">Email</label>
          <input
              id="email"
              :class="{'form-group--error': $v.email.$error }"
              class="form-group-input"
              type="text"
              @input="setEmailValue($event.target.value, 'email')"
              name="email"
              placeholder="Email"
              required
          >
        </div>
        <div class="column-6">
          <label class="form-group-label">Phone Number</label>
          <vue-tel-input
              :defaultCountry="'UA'"
              :maxLen="15"
              :disabledFormatting="true"
              :enabledCountryCode="true"
              :dropdownOptions="{ disabledDialCode: true }"
              :class="[{'form-phone-number': true,
                        'form-group--error': $v.phoneNumber.$error}]"
              @onInput="setPhoneNumberValue"
          />
        </div>
      </div>
      <div
          :class="[{'passenger-info-wrap' : value.quantity > 0 }]"
          v-for="(value, i) in dataForApi.passengersTypes"
          :key="i"
      >
        <div
            class="passenger-info-container"
            v-for="(item, index) in value.quantity"
            :key="index"
        >
          <h3 class="form-content-title">
            Passenger
            {{getCountOfPassenger(item, i)}} – {{dataForApi.passengersTypes[i].title | getPassengerType}}
          </h3>
          <div class="flex-grid">
            <div class="column-4">
              <label class="form-group-label">First Name</label>
              <input
                  id="firstName"
                  class="form-group-input"
                  type="text"
                  placeholder="First Name"
                  maxlength="255"
                  :class="{
                     'form-group--error':
                     $v['firstName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].$error
                     ||  !$v['firstName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].firstName.alpha}"
                  v-model.trim="$v['firstName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].firstName.$model"
              >
              <p
                  v-if="!$v['firstName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].firstName.alpha"
                  class="warning-message"
              >
                enter only letters, please
              </p>
              <p
                  v-if="!$v['firstName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].$error
                        === !$v['firstName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].firstName.alpha"
                  class="warning-message"
              >
                These fields are required
              </p>
            </div>
            <div class="column-4">
              <label class="form-group-label">Middle Name (optional)</label>
              <input
                  id="middleName"
                  class="form-group-input"
                  type="text"
                  placeholder="Middle Name (optional)"
                  maxlength="255"
                  pattern="[a-zA-Z]*"
              >
            </div>
            <div class="column-4">
              <label class="form-group-label">Last Name</label>
              <input
                  id="lastName"
                  class="form-group-input"
                  type="text"
                  placeholder="Last Name"
                  maxlength="255"
                  :class="{ 'form-group--error': $v['lastName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].$error
                  || !$v['lastName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].lastName.alpha}"
                  v-model.trim="$v['lastName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].lastName.$model"
              >
              <p
                  v-if="!$v['lastName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].lastName.alpha"
                  class="warning-message"
              >
                enter only letters, please
              </p>
              <p
                  v-if="!$v['lastName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].$error
                        === !$v['lastName'+ dataForApi.passengersTypes[i].title].$each.$iter[index].lastName.alpha"
                  class="warning-message"
              >
                These fields are required
              </p>
            </div>
          </div>
          <div class="flex-grid">
            <div class="column-4">
              <label class="form-group-label">Date of Birth</label>
              <input
                  id="dateBirth"
                  type="date"
                  class="form-group-input"
                  :class="{ 'form-group--error': $v['dateOfBirth'+ dataForApi.passengersTypes[i].title].$each.$iter[index].$error  }"
                  v-model.trim="$v['dateOfBirth'+ dataForApi.passengersTypes[i].title].$each.$iter[index].dateOfBirth.$model"
              >
              <p
                  v-if="$v['dateOfBirth'+ dataForApi.passengersTypes[i].title].$each.$iter[index].$error && i === 0"
                  class="warning-message"
              >
                Date of birth must be no later than {{controlDateOfBirth}}
              </p>
              <p
                  v-if="$v['dateOfBirth'+ dataForApi.passengersTypes[i].title].$each.$iter[index].$error && i === 1"
                  class="warning-message"
              >
                Date of birth must be between
                {{controlDateOfBirth}} and {{controlDateForInfants}}
              </p>
              <p
                  v-if="$v['dateOfBirth'+ dataForApi.passengersTypes[i].title].$each.$iter[index].$error && i === 2"
                  class="warning-message"
              >
                Date of birth must be no earlier than {{controlDateForInfants}}
              </p>
            </div>
            <div class="column-4">
              <label class="form-group-label">{{ nameInput }}</label>

              <div :id="nameInput" class="fieldset-gender">
                <radio-button
                    :number-for-id="index"
                    :name-for-id="dataForApi.passengersTypes[i].title"
                    :name-label="nameLabel.male"
                    :name-input="nameInput"
                    :checked="true"
                >
                </radio-button>
                <radio-button
                    :number-for-id="index"
                    :name-for-id="dataForApi.passengersTypes[i].title"
                    :name-label="nameLabel.female"
                    :name-input="nameInput"
                >
                </radio-button>
              </div>
            </div>
            <div class="column-4"></div>
          </div>
        </div>
      </div>
    </form>
    <the-button :modifier="[{'is-primary': true}]" @button-click="getReviewPage($v.validationGroup.$touch)">
      Book
    </the-button>
  </div>
</template>
<script>

  import './_contact-passenger-form.scss';
  import RadioButton from '../radio-button/radio-button';
  import {
    required,
    minLength,
    maxLength,
    integer,
    email,
    alpha,
    // helpers,
    // minValue,
    // maxValue,
  } from 'vuelidate/lib/validators';
  import TheButton from '../the-button/the-button';
  import VueTelInput from 'vue-tel-input';
  import { mapState, mapMutations } from 'vuex';
  import moment from 'moment';

  export default {
    name: 'contact-passenger-form',
    components: { TheButton, RadioButton, VueTelInput },
    data() {
      return {
        phoneNumber: 0,
        email: '',
        validationGroup: [
          'firstName',
          'lastName',
          'dateOfBirth',
        ],

        count: [],

        ageControl: false,
        controlDateOfBirth: '',
        controlDateForInfants: '',

        dateOfBirthAdults: [],
        firstNameAdults: [],
        lastNameAdults: [],

        dateOfBirthChildren: [],
        firstNameChildren: [],
        lastNameChildren: [],

        dateOfBirthInfants: [],
        firstNameInfants: [],
        lastNameInfants: [],

        nameLabel: {
          male: 'Male',
          female: 'Female',
        },
        nameInput: 'Gender',
      };
    },

    computed: {
      ...mapState(['dataForApi', 'countOfPassengers']),

    },
    created() {
      for (let i = 0; i < this.dataForApi.passengersTypes.length; i++) {
        for (let j = 0; j < this.dataForApi.passengersTypes[i].quantity; j++) {
          this['firstName' + this.dataForApi.passengersTypes[i].title].push({ firstName: '' });
          this['lastName' + this.dataForApi.passengersTypes[i].title].push({ lastName: '' });
          this['dateOfBirth' + this.dataForApi.passengersTypes[i].title].push({ dateOfBirth: '' });
        }
      }

    },
    props: {
      passengerOfNumber: Number,
    },
    validations() {
      return this.itemsForValidation();
    },
    methods: {
      ...mapMutations(['SET_INVALID_FORMS_PASSENGER_INFO_PAGE']),
      getCountOfPassenger(value, index) {
        if (index === 1) {
          return this.dataForApi.passengersTypes[0].quantity + value;
        } else if (index === 2) {
          return this.dataForApi.passengersTypes[0].quantity + this.dataForApi.passengersTypes[1].quantity + value;
        } else {
          return value;
        }
      },

      itemsForValidation() {
        let validationObject = {
          phoneNumber: {
            required,
            minLength: minLength(9),
            maxLength: maxLength(14),
            integer,
          },
          email: {
            required,
            maxLength: maxLength(64),
            email,
          },
          validationGroup: [
            'phoneNumber',
            'email',
          ],
        };
        let startFlightDay = new Date();
        this.controlDateForInfants = moment(startFlightDay).add(-2, 'year').format('MM-DD-YYYY');
        this.controlDateOfBirth = moment(startFlightDay).add(-12, 'year').format('MM-DD-YYYY');

        for (let i = 0; i < this.dataForApi.passengersTypes.length; i++) {
          if (this.dataForApi.passengersTypes[i].quantity) {
            for (let j = 0; j < this.validationGroup.length; j++) {
              if (this.validationGroup[j] === 'dateOfBirth' && i === 0) {
                validationObject[this.validationGroup[j] + this.dataForApi.passengersTypes[i].title] = {
                  required,
                  minLength: minLength(1),
                  $each: {
                    [this.validationGroup[j]]: {
                      required,
                      minLength: minLength(1),
                      maxLength: maxLength(64),
                      minValue: (currentValue) => moment(currentValue).isSameOrBefore(this.controlDateOfBirth),
                    },
                  },
                };
              } else if (this.validationGroup[j] === 'dateOfBirth' && i === 1) {
                validationObject[this.validationGroup[j] + this.dataForApi.passengersTypes[i].title] = {
                  required,
                  minLength: minLength(1),
                  $each: {
                    [this.validationGroup[j]]: {
                      required,
                      minLength: minLength(1),
                      maxValue: (currentValue) => moment(currentValue).isBetween(this.controlDateOfBirth,
                          this.controlDateForInfants, null, '[]'),
                    },
                  },
                };
              } else if (this.validationGroup[j] === 'dateOfBirth' && i === 2) {
                validationObject[this.validationGroup[j] + this.dataForApi.passengersTypes[i].title] = {
                  required,
                  minLength: minLength(1),

                  $each: {
                    [this.validationGroup[j]]: {
                      required,
                      minLength: minLength(1),
                      maxLength: maxLength(64),
                      maxValue: (currentValue) => moment(currentValue).isBetween(this.controlDateForInfants, new Date(),
                          null, '[]'),
                    },
                  },
                };
              } else {
                validationObject[this.validationGroup[j] + this.dataForApi.passengersTypes[i].title] = {
                  required,
                  minLength: minLength(1),
                  $each: {
                    [this.validationGroup[j]]: {
                      required,
                      alpha,
                      minLength: minLength(1),
                      maxLength: maxLength(255),
                    },
                  },
                };
              }
              validationObject.validationGroup.push(this.validationGroup[j] + this.dataForApi.passengersTypes[i].title);
            }
          }
        }
        return validationObject;
      },

      getReviewPage(vuelidateTouch) {
        this.itemsForValidation();
        vuelidateTouch();
        if (!this.$v.$invalid) {
          this.$router.push({ name: 'review' });
        }
      },

      setEmailValue(inputValue, inputType) {
        this[inputType] = inputValue;
        this.$v[inputType].$touch();
      },

      setPhoneNumberValue(inputValue) {

        this.phoneNumber = inputValue.number;
        this.$v.phoneNumber.$touch();
        return inputValue;
      },
    },
    filters: {
      getPassengerType(passengerType) {
        if (passengerType === 'Children') {
          return 'Child';
        } else {
          return passengerType.slice(0, -1);
        }
      },
    },
    watch: {
      '$v.$invalid'(value) {
        this.SET_INVALID_FORMS_PASSENGER_INFO_PAGE(value);
      },
    },
  };
</script>