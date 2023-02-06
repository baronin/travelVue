<template>
  <div class="container padding-bottom">
    <the-bread-cramps></the-bread-cramps>
    <div class="review-wrap flex">
      <div class="circle-accept"></div>
      <h2>Thank you for booking with us</h2>
      <div class="flight-info">
        <div class="flex">
          <h3>{{ dataForApi.originCity.cityName }}</h3>
          <svg width="16" height="16" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
            <g>
              <path
                fill="#000"
                d="m63.924,31.031c-0.102-0.246-0.248-0.467-0.434-0.651l-6.838-6.833c-0.783-0.781-2.051-0.781-2.833,0s-0.782,2.049 0,2.83l3.419,3.417-50.318-.002 3.418-3.415c0.781-0.781 0.781-2.049 0-2.83-0.783-0.781-2.051-0.781-2.834,0l-6.839,6.834c-0.392,0.391-0.587,0.902-0.587,1.415s0.195,1.025 0.587,1.416l6.992,6.982c0.392,0.39 0.903,0.585 1.417,0.585 0.512,0 1.024-0.195 1.416-0.586 0.782-0.781 0.782-2.049 0-2.832l-3.57-3.566 50.316,.002-3.57,3.564c-0.781,0.783-0.781,2.051 0,2.832 0.393,0.391 0.904,0.586 1.417,0.586s1.024-0.195 1.417-0.585l6.992-6.982c0.002-0.003 0.004-0.006 0.006-0.009 0.182-0.183 0.326-0.4 0.426-0.643 0.102-0.244 0.154-0.504 0.154-0.765s-0.053-0.52-0.154-0.764z"
              />
            </g>
          </svg>
          <h3>{{ dataForApi.destinationCity.cityName }}</h3>
        </div>
        <p>
          {{ getDateFormat(dataForApi.flightDates.startDate, dateFormat) }} -
          {{ getDateFormat(dataForApi.flightDates.endDate, dateFormat) }},
          {{ getDateFormat(dataForApi.flightDates.endDate, dateFormatYear) }},
          {{ dataForApi.countPassenger.sumPassengers }} Adult
        </p>
      </div>
      <span class="reference-number">Booking reference number: <b>NM23U6</b></span>
      <the-button :modifier="[{ 'is-return': true }]">Go to Home</the-button>
    </div>
  </div>
</template>

<script>
import './_review.scss'
import TheButton from '../the-button/the-button'
import TheBreadCramps from '../the-braead-cramps/the-bread-cramps'
import format from 'date-fns/format'
import { mapGetters } from 'vuex'

export default {
  name: 'Review',
  components: { TheBreadCramps, TheButton },
  data() {
    return {
      dateFormat: 'D MMM',
      dateFormatYear: 'YYYY',
    }
  },
  computed: {
    ...mapGetters('api', ['dataForApi']),
  },
  methods: {
    getDateFormat(dateForFormat, dateFormat) {
      return format(dateForFormat, dateFormat)
    },
  },
}
</script>
