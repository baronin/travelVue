<template>

  <div class="bread-cramps-holder">
    <div class="bread-cramps" v-for="(item, index) in breadCrampsItems" :key="index">
      <div class="numeration-of-pages" :class="{'active-page-name': item.path === breadCrampsActive}">{{index + 1}}
      </div>
      <div class="pages-names" :class="{'active-page-name': item.path === breadCrampsActive}"
           @click="getToPage(item.path, index)">
        {{item.pageName}}
      </div>
      <svg class="bread-cramps-arrows" v-if="index < breadCrampsItems.length-1" version="1.1" id="Capa_1"
           x="0px" y="0px"
           fill="currentColor"
           width="10px" height="10px" viewBox="0 0 268.832 268.832"
           style="enable-background:new 0 0 268.832 268.832;"
           xml:space="preserve">
            <path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,
                12.796,0,17.678l58.661,58.661H12.5
                c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,
                4.882-4.882,12.796,0,17.678
                c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,
                8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"/>
        </svg>
    </div>
  </div>
</template>

<script>
  import './_bread-cramps.scss';
  import { mapGetters } from 'vuex';

  export default {
    name: 'the-bread-cramps',

    data() {
      return {
        isActive: 0,
        breadCrampsItems: [
          {
            pageName: 'Search',
            path: 'result',
          },
          {
            pageName: 'Passenger Info',
            path: 'passenger-info',
          },
          {
            pageName: 'Review',
            path: 'review',
          },
        ],
      };
    },
    computed: {
      ...mapGetters('global', ['breadCrampsActive']),
    },
    methods: {
      getToPage(item, index) {
        console.log(this.breadCrampsActive);
        this.isActive = index;
        this.$router.push({ name: item });
      },
    },
    watch: {
      '$route'(to) {
        console.log(to);
      },
    },
  };
</script>

