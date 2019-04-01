<template>
  <div class="dropdown-wrap" v-toggle="hide">
    <div class="dropdown-text" tabindex="0"  @click="isActiveDropDown = !isActiveDropDown">
      <span> {{ sumPassengers + ' ' + changeTitlePassengers() }},
             {{ cabinTypeTitle }}</span>
      <button
          class="btn is-btn-dropdown"
          :class="{'is-btn-dropdown-active': !isActiveDropDown }"></button>
    </div>

    <div class="additional-fields-inner-wrap"
         :class="{'is-hidden': isActiveDropDown}">
      <slot name="slotPassenger"></slot>
      <slot name="slotCabinType"></slot>
    </div>
  </div>

</template>

<script>
  import './the-dropdown.scss';

  export default {
    name: 'the-dropdown',
    props: [
      'title',
      'sumPassengers',
      'cabinTypeTitle'
    ],
    data() {
      return {
        isActiveDropDown: true,
      };
    },
    methods: {
      changeTitlePassengers() {
        if (this.sumPassengers > 1) {
          return this.title + 's';
        } else {
          return this.title
        }
      },
      show: function () {
        this.isActiveDropDown = false;
      },
      hide: function () {
        this.isActiveDropDown = true;
      }
    }
  };
</script>