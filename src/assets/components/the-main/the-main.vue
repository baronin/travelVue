<template>
  <main :class="changeStylesForResultPage ? [{'main-result': true}] : [{'main': true, 'bg-blue-grey': true}] ">
    <div v-show="showSearchForms" :class="[{'bg-forms-result': changeStylesForResultPage}]">
      <div class="container">
        <div
            :class="changeStylesForResultPage?[{'container-form-result': true}]:[{'container-form': true, 'bg-blue-grey': !changeStylesForResultPage }]">
          <tabs>
            <tab name="Round trip">
              <the-round-trip></the-round-trip>
            </tab>
            <tab name="One way">
              One Way's content will be here
            </tab>
          </tabs>
        </div>
      </div>
    </div>

    <div class="main-result-bg">
      <div :class="[{'container-main-result': changeStylesForResultPage}]">
        <router-view></router-view>
      </div>
    </div>

  </main>
</template>

<script>
  import './the-main.scss';
  import { Tabs, Tab } from 'vue-tabs-component';
  import TheRoundTrip from '../the-round-trip/the-round-trip';
  import { mapState, mapActions } from 'vuex';
  import Review from '../review/review';

  export default {
    name: 'the-main',
    components: { TheRoundTrip, Tabs, Tab },
    data() {
      return {};
    },
    computed: mapState(['changeStylesForResultPage', 'showSearchForms', ' filteredArray']),
    methods: {
      ...mapActions(['changeRouterPath']),
    },
    watch: {
      '$route'(to) {

        this.changeRouterPath(to);

      },
    },
  };
</script>