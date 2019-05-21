<template>
  <div>
    <div class="container result-component">
      <filters
          v-if="dataFromApiExist && !runSpiner && !foundError"
          :key="'display-on-page'"
      ></filters>
      <card-wrap v-if="dataFromApiExist && !runSpiner && !foundError"
                 :dataFromAmadeusApi="filteredArray"
                 :showOnPassengerInfoPage="false"
      ></card-wrap>
      <div class="not-found" v-if="foundError"
      >Flights are not found. Perhaps, such a flight direction does not exist. Please, try again.
      </div>
    </div>
    <div class="spiner-holder">
      <half-circle-spinner
          v-if="runSpiner"
          :animation-duration="1000"
          :size="60"
          color="#6DB3F1"
      ></half-circle-spinner>
    </div>
  </div>
</template>

<script>
  import "./_result-component.scss"
  import dataMixin from '../../assets/helpers/data.mixin';
  import HalfCircleSpinner from "epic-spinners/src/components/lib/HalfCircleSpinner";
  import Filters from "../../assets/components/filter/filter";
  import CardWrap from "../../assets/components/the-cards-wrap/card-wrap";
  import {mapState, mapMutations} from "vuex";


  export default {
    name: "ResultComponent",
    components: {CardWrap, Filters, HalfCircleSpinner},
    data: function () {
      return {
        dataFromAmadeusApi: '',
        filteredDataFromApi: [],
      }
    },
    mixins: [dataMixin],
    computed: mapState([ 'foundError','dataFromApi', 'runSpiner', 'filteredArray', 'dataFromApiExist']),
    methods: {
      ...mapMutations(['SET_FILTERED_ARRAY']),
    },
  }
</script>