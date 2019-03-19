<template>
  <div class="container-form">
    <form action="" class="form bg-blue-grey">
      <div class="input-wrap">
        <tabs>
          <tab  name="Round Trip">
            <round-trip></round-trip>
          </tab>

          <tab name="One Way">
            One Way's content will be here
          </tab>
        </tabs>
      </div>
    </form>
  </div>
</template>

<script>
  import './_the-form.scss';
  import {Tabs, Tab} from 'vue-tabs-component';
  import RoundTrip from "../round-trip/round-trip";

  export default {
    name: "the-form",
    components: {RoundTrip, Tabs, Tab}
  }
</script>
