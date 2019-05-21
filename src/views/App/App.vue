<template>
  <div id="app">
    <the-header></the-header>
    <main-component></main-component>
    <the-footer v-if="dataFromApiExist || !runSpiner"></the-footer>
  </div>
</template>

<script>

  import './_general.scss';
  import TheHeader from "../../assets/components/the-header/the-header";
  import MainComponent from "../MainComponent/MainComponent";
  import TheFooter from "../../assets/components/the-footer/the-footer";
  import {mapState, mapActions} from "vuex"

  export default {
    name: 'app',
    components: {TheFooter, MainComponent, TheHeader},
    computed: mapState(['dataFromApiExist', 'runSpiner']),
    created() {
      this.changeRouterPath(this.$route)
      if(Object.keys(this.$route.query).length != 0){
        this.getDataFromApi()
      }
    },
    methods: {
      ...mapActions(['changeRouterPath','getDataFromApi'])
    }
  };
</script>