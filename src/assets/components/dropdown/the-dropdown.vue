<template>
  <div class="dropdown-wrap">
    <div
      class="dropdown-text"
      @click="isActiveDropDown = !isActiveDropDown"
    >
      <span> {{ sumPassengers + ' ' + changeTitlePassengers() }},
             {{ cabinTypeTitle }}</span>
      <button
        class="btn-dropdown"
        :class="{'btn-dropdown-active': !isActiveDropDown }"
      ></button>
    </div>

    <div class="additional-fields-inner-wrap"
         :class="{'is-hidden': !isActiveDropDown}"
    >
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
      'cabinTypeTitle',
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
          return this.title;
        }
      },
    },
  };
</script>
