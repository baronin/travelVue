<template>
  <div>
    <form action="" class="form">
      <h2>Passenger Information</h2>
      <span class="bg-blue">Passenger names must match passport for international travel or government issued
            photo ID for US domestic travel</span>
      <h3>Contact Details</h3>
      <div class="row contact-info">
        <div class="column">
          <label class="form-group-label">Email</label>
          <input id="email"
                 :class="{'form-group--error': $v.email.$error }"
                 class="form-group-input"
                 type="text"
                 @input="setEmailValue($event.target.value, 'email')"
                 name="email"
                 placeholder="Email"
                 required
          >
        </div>
        <div class="column">
          <label class="form-group-label">Phone Number</label>
          <vue-tel-input
            :defaultCountry="'UA'"
            :maxLen="15"
            :disabledFormatting="true"
            :enabledCountryCode="true"
            :dropdownOptions="{disabledDialCode: true }"
            :class="[{'form-phone-number': true, 'form-group--error': $v.phoneNumber.$error}]"
            @onInput="setPhoneNumberValue"
          ></vue-tel-input>
        </div>
      </div>
      <div class="passenger-info-wrap"
           v-for="(passengersType, i) in dataForApi.passengersTypes"
           :key="`passenger-info-wrap_${i}`"
      >
        <!-- TODO index should be fixed -->
        <passenger-info-container
          v-for="(item, index) in passengersType.quantity"
          :key="`passenger-info-container_${index}`"
          :index="i + index + 1"
          :passengers-type="passengersType"
          :first-name-has-err="$v['firstName'+ passengersType.title].$each.$iter[index].$error"
          :last-name-has-err="$v['lastName'+ passengersType.title].$each.$iter[index].$error"
          :date-of-birth-has-err="$v['dateOfBirth'+ passengersType.title].$each.$iter[index].$error"

          :first-name="$v['firstName'+ passengersType.title].$each.$iter[index].firstName.$model"
          :last-name="$v['lastName'+ passengersType.title].$each.$iter[index].lastName.$model"
          :date-of-birth="$v['dateOfBirth'+ passengersType.title].$each.$iter[index].dateOfBirth.$model"
          @firstName="val => $v['firstName'+ passengersType.title].$each.$iter[index].firstName.$model = val"
          @lastName="val => $v['lastName'+ passengersType.title].$each.$iter[index].lastName.$model = val"
          @dateOfBirth="val => $v['dateOfBirth'+ passengersType.title].$each.$iter[index].dateOfBirth.$model = val"
        >
          <template v-slot:date-of-birth-err>
            <p
              v-if="$v['dateOfBirth'+ passengersType.title].$each.$iter[index].$error && i === 0"
              class="warning-message"
            >
              Date of birth must be no later than {{controlDateOfBirth}}</p>
            <p
              v-if="$v['dateOfBirth'+ passengersType.title].$each.$iter[index].$error && i === 1"
              class="warning-message"
            >
              Date of birth must be between {{controlDateOfBirth}} and
              {{controlDateForInfants}}</p>
            <p
              v-if="$v['dateOfBirth'+ passengersType.title].$each.$iter[index].$error && i === 2"
              class="warning-message"
            >
              Date of birth must be no earlier than {{controlDateForInfants}}
            </p>
          </template>
        </passenger-info-container>
      </div>
    </form>
    <the-button :modifier="[{'is-primary': true}]"
                @button-click="getReviewPage($v.validationGroup.$touch)"
    >
      Book
    </the-button>
  </div>
</template>
<script>

  import moment from 'moment';
  import VueTelInput from 'vue-tel-input';
  import { email, integer, maxLength, minLength, required } from 'vuelidate/lib/validators';
  import { mapMutations, mapState } from 'vuex';
  import TheButton from '../../the-button/the-button';
  import './_contact-passenger-form.scss';
  import PassengerInfoContainer from './passwnger-info-wrap/passenger-info-container';

  export default {
    name: 'contact-passenger-form',
    components: { TheButton, VueTelInput, PassengerInfoContainer },
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
          dateBirth: {
            integer,
            required,
            maxLength: maxLength(10),
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
                validationObject[this.validationGroup[j]
                + this.dataForApi.passengersTypes[i].title] = {
                  required,
                  minLength: minLength(1),
                  $each: {
                    [this.validationGroup[j]]: {
                      required,
                      minLength: minLength(1),
                      maxLength: maxLength(64),
                      minValue: (currentValue) => moment(currentValue)
                        .isSameOrBefore(this.controlDateOfBirth),
                    },
                  },
                };
              } else if (this.validationGroup[j] === 'dateOfBirth' && i === 1) {
                validationObject[this.validationGroup[j]
                + this.dataForApi.passengersTypes[i].title] = {
                  required,
                  minLength: minLength(1),
                  $each: {
                    [this.validationGroup[j]]: {
                      required,
                      minLength: minLength(1),
                      maxValue: (currentValue) => moment(currentValue)
                        .isBetween(this.controlDateOfBirth,
                          this.controlDateForInfants, null, '[]'),
                    },
                  },
                };
              } else if (this.validationGroup[j] === 'dateOfBirth' && i === 2) {
                validationObject[this.validationGroup[j]
                + this.dataForApi.passengersTypes[i].title] = {
                  required,
                  minLength: minLength(1),

                  $each: {
                    [this.validationGroup[j]]: {
                      required,
                      minLength: minLength(1),
                      maxLength: maxLength(64),
                      maxValue: (currentValue) => moment(currentValue)
                        .isBetween(this.controlDateForInfants, new Date(),
                          null, '[]'),
                    },
                  },
                };
              } else {
                validationObject[this.validationGroup[j]
                + this.dataForApi.passengersTypes[i].title] = {
                  required,
                  minLength: minLength(1),
                  $each: {
                    [this.validationGroup[j]]: {
                      required,
                      minLength: minLength(1),
                      maxLength: maxLength(64),
                    },
                  },
                };
              }
              validationObject.validationGroup.push(
                this.validationGroup[j] + this.dataForApi.passengersTypes[i].title);
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
    watch: {
      '$v.$invalid'(value) {
        this.SET_INVALID_FORMS_PASSENGER_INFO_PAGE(value);
      },
    },
  };
</script>
