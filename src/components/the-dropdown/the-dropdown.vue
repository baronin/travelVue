<template>
  <div v-toggle="hide" class="dropdown-wrap">
    <div class="dropdown-text" tabindex="0" @click="isActiveDropDown = !isActiveDropDown">
      <span>
        {{ sumPassengers + ' ' + changeTitlePassengers() }},
        {{ cabinTypeTitle }}
      </span>
      <button
        class="btn is-icon-arrow"
        :class="{ 'is-icon-arrow-active': !isActiveDropDown }"
      ></button>
    </div>
    <div class="additional-fields-inner-wrap" :class="{ 'is-hidden': isActiveDropDown }">
      <slot name="slotPassenger"></slot>
      <slot name="slotCabinType"></slot>
    </div>
  </div>
</template>

<script>
import './the-dropdown.scss'

export default {
  name: 'TheDropdown',
  props: {
    title: String,
    cabinTypeTitle: String,
    sumPassengers: Number,
  },
  data() {
    return {
      isActiveDropDown: true,
    }
  },
  methods: {
    changeTitlePassengers() {
      if (this.sumPassengers > 1) {
        return this.title + 's'
      } else {
        return this.title
      }
    },
    show: function () {
      this.isActiveDropDown = false
    },
    hide: function () {
      this.isActiveDropDown = true
    },
  },
}
</script>