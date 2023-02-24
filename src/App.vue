<template>
  <div id="app" class="app">
    <the-header></the-header>
    <main-component></main-component>
    <the-footer v-if="dataFromApiExist || !isSpinnerShown"></the-footer>
  </div>
</template>

<script>
import './assets/scss/_fonts.scss'
import './assets/scss/_base-settings.scss'
import TheHeader from './components/the-header/the-header'
import MainComponent from './views/MainComponent/MainComponent'
import TheFooter from './components/the-footer/the-footer'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { TheFooter, MainComponent, TheHeader },
  computed: {
    ...mapGetters('api', ['dataFromApiExist']),
    ...mapGetters('spinner', {
      isSpinnerShown: 'isShown',
    }),
  },
  created() {
    this.changeRouterPath(this.$route)
  },
  methods: {
    ...mapActions('global', ['changeRouterPath']),
  },
}
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
