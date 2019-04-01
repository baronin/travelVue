<template>
  <div class="cabin-type"
       slot="slotCabinType">
    <span>{{ cabinTypeTitle }}</span>
    <span>{{changeTitleCabinClass() }}</span>
    <cool-select
        v-model="selected"
        :items="items"
        @select="changeTitleCabinClass"
    />
  </div>
</template>
<script>
  import './the-cabintype.scss';
  import {CoolSelect} from "vue-cool-select";

  export default {
    name: 'the-cabin-type',
    components: {
      CoolSelect
    },
    model: {
      prop: 'cabinTypes',
      event: 'change'
    },
    props: [
      'cabinTypeTitle',
      'cabinTypes'],
    data() {
      return {
        items: [
          {title: 'Economy'},
          {title: 'Premium Economy'},
          {title: 'Business'},
          {title: 'First'},
        ],
        selected: {title: 'Economy'},
        isActiveEconomyClass: true,
      };
    },
    watch: {
      selected(newValue) {
        this.$emit('changecabintype', newValue);
      }
    },
    methods: {
      changeTitleCabinClass() {
        this.$emit('selectedChange', this.selected);
      },
    },
  };
</script>