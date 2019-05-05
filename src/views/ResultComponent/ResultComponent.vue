<template>
  <div>
    <div class="container result-component">
      <filters
        v-if="dataFromApiExist && !isSpinnerShown"
        :key="'display-on-page'"
      ></filters>
      <card-wrap v-if="dataFromApiExist && !isSpinnerShown"
                 :dataFromAmadeusApi="dataFromAmadeusApi"
                 :showOnPassengerInfoPage="false"
      ></card-wrap>
      <div class="not-found" v-if="!dataFromApiExist && !isSpinnerShown"
      >Please enter your flight...
      </div>
    </div>
    <div class="spinner-holder">
      <half-circle-spinner
        v-if="isSpinnerShown"
        :animation-duration="1000"
        :size="60"
        color="#6DB3F1"
      ></half-circle-spinner>
    </div>
  </div>
</template>

<script>
  import HalfCircleSpinner from 'epic-spinners/src/components/lib/HalfCircleSpinner';
  import { mapGetters } from 'vuex';
  import Filters from '../../assets/components/filter/filter';
  import CardWrap from '../../assets/components/the-cards-wrap/card-wrap';
  import dataMixin from '../../assets/helpers/data.mixin';
  import './_result-component.scss';

  export default {
    name: 'ResultComponent',
    components: { CardWrap, Filters, HalfCircleSpinner },
    mixins: [dataMixin],
    computed: {
      ...mapGetters('api', [
        'dataFromApi',
        'dataFromApiExist',
        'filteredData',
      ]),
      ...mapGetters('spinner', {
        isSpinnerShown: 'isShown',
      }),

      dataFromAmadeusApi() {
        return this.filteredData;
      },
    },
  };
</script>
