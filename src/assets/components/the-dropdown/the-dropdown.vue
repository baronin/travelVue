<template>
  <div class="dropdown-wrap" v-toggle="hide" >
    <div class="dropdown-text"
         tabindex="0"
         @click="toggle"
         v-on:keyup.enter="toggle">
      <span>
        {{sumPassengers + ' ' + changeTitlePassengers()}},
        {{cabinTypeTitle }}
      </span>
      <the-button :modifier="[{'is-icon-arrow': true},{'is-icon-arrow-active': !isActiveDropDown}]"
                  :disabled="true"></the-button>
    </div>
    <transition name="slide-fade">
      <div class="additional-fields-inner-wrap"
           v-if="!isActiveDropDown">
        <slot name="slotPassenger"></slot>
        <slot name="slotCabinType"></slot>
      </div>
    </transition>

  </div>
</template>

<script>
  import './the-dropdown.scss';
  import TheButton from '../the-button/the-button';

  export default {
    name: 'the-dropdown',
    components: { TheButton },
    props: {
      title: String,
      cabinTypeTitle: String,
      sumPassengers: Number,
    },
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
      toggle() {
        this.isActiveDropDown = !this.isActiveDropDown;
      },
      hide() {
        this.isActiveDropDown = true;
      },
    },
  };
</script>