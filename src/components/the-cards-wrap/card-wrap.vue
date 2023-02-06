<template>
  <div class="wrapper">
    <div class="columns">
      <div class="column display-none-table display-none-desktop">
        <p>Filter your results</p>
        <the-button :modifier="[{ 'is-return': true }]" @button-click="showFilter">
          <span class="is-icon-arrow"></span>
          Filter
        </the-button>
      </div>
      <div class="column display-none-mobile">{{ filteredArray.length }} flights found</div>
      <div class="column">
        <p class="sort-by">Sort by:</p>
        <div class="sort-dropdown-holder">
          <cool-select
            v-model="selected"
            :class="[{ 'sort-dropdown': true }]"
            :items="sortItems"
            :disable-search="true"
            @select="sortByPrice"
          >
          </cool-select>
        </div>
      </div>
    </div>
    <div v-for="(cardsData, index) in dataFromAmadeusApi" :id="index" :key="`card_${index}`">
      <the-card
        :flight-cards-data="cardsData"
        :get-price-ticket="getPriceTicket(cardsData)"
        :show-on-passenger-info-page="showOnPassengerInfoPage"
      >
      </the-card>
    </div>
  </div>
</template>

<script>
import { CoolSelect } from 'vue-cool-select'
import { mapActions, mapGetters } from 'vuex'
import TheButton from '../the-button/the-button'
import './_card-wrap.scss'
import TheCard from './the-card/the-card'

export default {
  name: 'CardWrap',
  components: { TheButton, TheCard, CoolSelect },
  props: ['dataFromAmadeusApi', 'showOnPassengerInfoPage'],
  data() {
    return {
      sortItems: [{ title: 'Price' }],
      selected: { title: 'Price' },
      nonstop: true,
      editedItem: null,
      editedModel: null,
      passengerInfoPage: true,
    }
  },

  computed: {
    ...mapGetters('api', ['dataFromApi', 'filteredArray']),
  },

  created() {
    window.document.addEventListener('scroll', () => {
      const buttonFooter = document.querySelector('.filter-footer')
      if (buttonFooter) {
        buttonFooter.style.display = 'none'
      }
    })
  },

  methods: {
    ...mapActions(['getSortByPrice']),
    ...mapActions('cardFilters', {
      showFilterMobile: 'open',
    }),
    getPriceTicket(cardsData) {
      return cardsData.offerItems[0].price.total
    },
    sortByPrice(selectedSortItem) {
      if (selectedSortItem.title === 'Price') {
        this.getSortByPrice()
      }
    },
    showFilter() {
      this.showFilterMobile()
    },
  },
}
</script>
