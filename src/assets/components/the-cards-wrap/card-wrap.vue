<template>
  <div class="wrapper">
    <div class="columns">
      <div class="column display-none-table display-none-desktop">
        <p>Filter your results </p>
        <the-button
            :modifier="[{'is-secondary': true}]"
            @button-click="showFilter">
          <span class="is-icon-arrow"></span>
          Filter
        </the-button>
      </div>
      <div class="column display-none-mobile">
        {{filteredArray.data.length}} {{' flight' | addLetterForQuantityOfTickets(filteredArray.data.length)}} found
      </div>
      <div class="column">
        <p class="sort-by">
          Sort by:
        </p>
        <div class="sort-dropdown-holder">
          <cool-select :class="[{'sort-dropdown': true}]"
                       v-model="selected"
                       :items="sortItems"
                       :disableSearch="true"
                       @select="sortByPrice">
          </cool-select>
        </div>
      </div>
    </div>
    <div v-for="(cardsData, index) in dataFromAmadeusApi.data"
         :key="index"
         :id="index">
      <the-cards
          :flightCardsData="cardsData"
          :getPriceTicket="getPriceTicket(cardsData)"
          :dataFromAmadeusApi="dataFromAmadeusApi"
          :showOnPassengerInfoPage="showOnPassengerInfoPage">
      </the-cards>
    </div>
  </div>
</template>

<script>
  import './_card-wrap.scss'
  import TheCards from "./the-cards/the-cards";
  import {mapActions, mapState} from "vuex"
  import {CoolSelect} from "vue-cool-select";
  import TheButton from "../the-button/the-button";

  export default {
    name: "card-wrap",
    components: {TheButton, TheCards, CoolSelect},
    props: ['dataFromAmadeusApi', 'showOnPassengerInfoPage'],
    data() {
      return {
        sortItems: [{title: 'Ascending'}, {title: 'Descending'},],
        selected: {title: 'Ascending'},
        nonstop: true,
        editedItem: null,
        editedModel: null,
        passengerInfoPage: true,
      }
    },

    computed: mapState(['filteredArray', 'dataFromApi', 'filterMobileShow']),

    created() {
      window.document.addEventListener('scroll', () => {
        const buttonFooter = document.querySelector('.filter-footer');
     /*   if (buttonFooter) {
          buttonFooter.style.display = 'none'
        }*/
      })
    },

    methods: {
      ...mapActions(['getSortByPriceAscending', 'showFilterMobile', 'getSortByPriceDescending']),
      getPriceTicket(cardsData) {
        return cardsData.offerItems[0].price.total;
      },
      sortByPrice(selectedSortItem) {
        console.log(selectedSortItem.title)
        if (selectedSortItem.title == 'Ascending') {
          this.getSortByPriceAscending();
        } else {
          this.getSortByPriceDescending()
        }
      },
      showFilter() {
        document.body.classList.add('overflow-hidden');
        this.showFilterMobile(!this.filterMobileShow);
      }
    },
    filters: {
      addLetterForQuantityOfTickets(value, count){
        if(count > 1 ){
          return value + 's'
        } else {
          return  value
        }
      }
    }
  }
</script>