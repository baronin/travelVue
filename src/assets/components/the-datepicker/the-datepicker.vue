<template>
  <div class="datepicker-trigger">
    <input class="form-field"
           :class="[{'warning-input-border': emptyInput}]"
           type="text"
           id="datepicker-trigger"
           placeholder="Depart - Return"
           :value="formatDates(dateOne, dateTwo)"
           readonly
    >
    <div class="warning-message" v-if="emptyInput">Please, select dates</div>
    <AirbnbStyleDatepicker
        :trigger-element-id="'datepicker-trigger'"
        :mode="'range'"
        :min-date="minDate"
        :fullscreen-mobile="false"
        :date-one="dateOne"
        :date-two="dateTwo"
        :offsetY="2"
        :offsetX="0"
        :showActionButtons="false"
        :showShortcutsMenuTrigger="false"
        @date-one-selected="val => { dateOne = val }"
        @date-two-selected="val => { dateTwo = val }"
        @previous-month="onPreviousMonthClick"
        @next-month="onNextMonthClick"
        ref="datepicker"
    >
    </AirbnbStyleDatepicker>
  </div>
</template>

<script>
  import format from 'date-fns/format'
  import './the-datepicker.scss'
  import moment from 'moment'

  export default {
    props: {emptyInput: Boolean},
    data() {
      return {
        isPrevDisabled: false,
        prevDescriptor: null,
        prevButtonDescriptor: null,
        temp: '',
        monthsToShow: 2,
        onlyMonth: [],
        dateFormat: 'D MMM',
        dateOne: null,
        datesForApi: {
          startDate: '',
          endDate: ''
        },
        dateTwo: null,
        minDate: moment().subtract(1, 'day').toString(),
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        daysShort: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        sundayFirst: true,
        countMonth: 0,
        windowWidth: '',
      }
    },

    mounted() {
      this.prevDescriptor = document.querySelector('.asd__change-month-button--previous');
      this.prevButtonDescriptor = document.querySelector('.asd__change-month-button--previous > button');
      this.onPreviousMonthClick([moment(new Date()).format('YYYY-MM-DD')]);
    },

    methods: {
      formatDates: function (dateOne, dateTwo) {
        let formattedDates = '';
        if (dateTwo && dateOne) {
          formattedDates = format(dateOne, this.dateFormat) + ' - ' + format(dateTwo, this.dateFormat);
          this.datesForApi.endDate = dateTwo;
          this.$emit('get-date', this.datesForApi);
        } else if (dateOne) {
          formattedDates += format(dateOne, this.dateFormat) + ' - Return';
          this.datesForApi.startDate = dateOne;
          this.datesForApi.endDate = ''
          this.$emit('get-date', this.datesForApi);
        }
        return formattedDates;
      },

      onPreviousMonthClick(param) {
        const nowDate = moment();
        const incomeDate = moment(param[0], 'YYYY-MM-DD');
        const nowYear = parseInt(nowDate.format('YYYY'));
        const incomeYear = parseInt(incomeDate.format('YYYY'));
        const nowMonth = parseInt(nowDate.format('M'));
        const incomeMonth = parseInt(incomeDate.format('M'));
        this.isPrevDisabled = incomeYear < nowYear || (nowYear === incomeYear && incomeMonth <= nowMonth);
        if (incomeYear < nowYear || (nowYear === incomeYear && incomeMonth < nowMonth)) {
          this.$refs.datepicker.nextMonth();
        }
      },

      onNextMonthClick() {
        this.isPrevDisabled = false;
      },
    },

    watch: {
      isPrevDisabled(newValue) {
        if (newValue) {
          this.prevDescriptor.classList.add('gray');
          this.prevButtonDescriptor.setAttribute('disabled', 'disabled');
        } else {
          this.prevDescriptor.classList.remove('gray');
          this.prevButtonDescriptor.removeAttribute('disabled');
        }
      }
    },
  }
</script>
