<template>
  <div class="cabin-type"
       slot="slotCabinType"
  >
    <!--<div class="cabin-type-wrap">
      <label for="selectCabinType">{{ cabinTypeTitle }}</label>
      <select
          id="selectCabinType"
          v-model="selectedType">
        <option
            v-for="(title, key) in cabinTypes"
            :value="key"
            :key="key">{{ title }}
        </option>
      </select>
    </div>-->
    <span>{{ cabinTypeTitle }}</span>
    <span>{{changeTitleCabinClass()}}</span>
    <cool-select
      v-model="selected"
      :items="items"
      @select="changeTitleCabinClass"
    />
  </div>
</template>
<script>
  import { CoolSelect } from 'vue-cool-select';
  import './the-cabintype.scss';

  export default {
    name: 'the-cabin-type',
    components: {
      CoolSelect,
    },
    model: {
      prop: 'cabinTypes',
      event: 'change',
    },
    props: [
      'cabinTypeTitle',
      'cabinTypes',
    ],
    data() {
      return {
        items: [
          { title: 'Economy Class' },
          { title: 'Business Class' },
          { title: 'VIP Class' },
        ],
        selected: { title: 'Economy Class' },
        isActiveEconomyClass: true,
      };
    },

    watch: {
      selected(newValue) {
        this.$emit('changecabintype', newValue);
      },
    },

    methods: {
      changeTitleCabinClass() {
        this.$emit('selectedChange', this.selected);
        //console.log(this.selected);
      },
    },
  };
</script>

<style lang="scss">
  #selectCabinType {
    padding: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 4px;
    width: 100%;
    background: none;
  }

  .clear {
    display: none;
  }

</style>
