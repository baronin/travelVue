<template>
  <div class="container-form bg-blue-grey">
    <tabs>
      <tab name="Round trip">
        <round-trip></round-trip>
      </tab>
      <tab name="One way">
        <the-cards/>
        One Way's content will be here
      </tab>
    </tabs>

  </div>
</template>

<script>
  import './_the-form.scss';
  import {Tabs, Tab} from 'vue-tabs-component';
  import RoundTrip from "../round-trip/round-trip";
  import TheCards from "../the-cards/the-cards";

  export default {
    name: "the-form",
    components: {TheCards, RoundTrip, Tabs, Tab}
  }
</script>
