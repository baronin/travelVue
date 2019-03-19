<template>
  <div class="cabin-type"
       slot="slotCabinType">
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

    <!--<v-select :options="options"
              v-model="selected"/>-->
    <vue-single-select/>
  </div>
</template>
<script>
  import './the-cabintype.scss';
  import VueSingleSelect from "vue-single-select";

  export default {
    name: 'the-cabin-type',
    components: {
      VueSingleSelect
    },
    props: ['cabinTypeTitle', 'cabinTypes'],
    data() {
      return {
        selectedType: 'Economy Class',
        isActiveEconomyClass: true,
        options: [
          {id: 1, label: 'foo'},
          {id: 3, label: 'bar'},
          {id: 2, label: 'baz'},
        ],
        selected: {id: 3, label: 'bar'},
        /* cabinTypeTitle: 'Cabin Type'*/
      };
    },
    methods: {
      btnFun() {
        let btn = document.getElementById("selectCabinType").options[n].setAttribute('style', "background-color:#008000");
        console.log(btn);


      }
    }
    /* methods: {
       changeType(key) {
         this.selectedType = key;
         this.$emit('selectedChange', this.selectedType)
       },
     }*/
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
  .dropdown {
    min-width: 162px;
  }


  .dropdown li {
    background-color: $color-white;
    padding: 14px;
    border-bottom: 1px solid rgba(112, 128, 144, 0.1)
  }

  .dropdown li:last-child {
    border-bottom: none;
  }

  .dropdown li a {
    padding: 10px 20px;
    display: flex;
    width: 100%;
    align-items: center;
    font-size: 1.25em;
  }

  .dropdown li a .fa {
    padding-right: 0.5em;
  }

  /*
  .form-control {
    margin: 0!important;
    padding: 14px!important;
  }

  .open-indicator::before {
    border-width: 1px 1px 0 0!important;
    height: 9px!important;
    width: 9px!important;
    border-color: $color-gray!important;
  }
  .v-select .selected-tag {
    padding: 14px!important;
    margin: 0!important;
  }
  .v-select .dropdown-toggle {
    padding: 0!important;
  }
  .v-select .vs__selected-options {
    padding: 0!important;
  }
  .v-select .vs__actions {
    padding-right: 14px!important;
  }
  .v-select .dropdown-menu .highlight a {
    background-color: white!important;
    color: #000!important;
  }
  .v-select .dropdown-menu .highlight a:hover {
    background-color: #fff!important;
  }
  .v-select .dropdown-menu .active a {
    color: $color-dark-main;
    background: $color-white;
  }*/

</style>