<template>
  <div id="app">
    <the-header></the-header>
    <main-component></main-component>
    <the-footer v-if="dataFromApiExist || !isSpinnerShown"></the-footer>
  </div>
</template>

<script>

  import './_general.scss';
  import TheHeader from '../../assets/components/the-header/the-header';
  import MainComponent from '../MainComponent/MainComponent';
  import TheFooter from '../../assets/components/the-footer/the-footer';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'app',
    components: { TheFooter, MainComponent, TheHeader },
    computed: {
      ...mapGetters('api', ['dataFromApiExist']),
      ...mapGetters('spinner', {
        isSpinnerShown: 'isShown',
      }),
    },
    created() {
      this.changeRouterPath(this.$route);
    },
    methods: {
      ...mapActions('global', ['changeRouterPath']),
    },
  };
</script>