<template>
  <div slot="slotCabinType" class="cabin-type">
    <span>{{ cabinTypeTitle }}</span>
    <cool-select v-model="selected" :items="items" @select="changeTitleCabinClass" />
  </div>
</template>
<script>
import './_the-cabintype.scss'
import { CoolSelect } from 'vue-cool-select'

export default {
  name: 'TheCabinType',
  components: {
    CoolSelect,
  },
  model: {
    prop: 'cabinTypes',
    event: 'change',
  },
  props: {
    cabinTypeTitle: String,
    cabinTypes: String,
  },
  data() {
    return {
      items: [
        { title: 'Economy' },
        { title: 'Premium' },
        { title: 'Business' },
        { title: 'First' },
      ],
      selected: { title: 'Economy' },
      isActiveEconomyClass: true,
    }
  },
  watch: {
    selected(newValue) {
      this.$emit('changecabintype', newValue)
    },
  },
  methods: {
    changeTitleCabinClass() {
      this.$emit('selectedChange', this.selected)
    },
  },
}
</script>