<template>
  <div id="app" class="app">
    <the-header></the-header>
    <main-component></main-component>
    <the-footer v-if="dataFromApiExist || !isSpinnerShown"></the-footer>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import './assets/scss/_fonts.scss'
import './assets/scss/_base-settings.scss'
import TheHeader from './components/the-header/the-header'
import MainComponent from './views/MainComponent/MainComponent'
import TheFooter from './components/the-footer/the-footer'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { api } from '@/api'

export default {
  name: 'App',
  components: { TheFooter, MainComponent, TheHeader },
  computed: {
    ...mapGetters('api', ['dataFromApiExist']),
    ...mapGetters('spinner', {
      isSpinnerShown: 'isShown',
    }),
  },
  async created() {
    this.changeRouterPath(this.$route)
    this.startRefreshTokenTimer()
  },
  methods: {
    ...mapActions('api', ['getToken']),
    ...mapActions('global', ['changeRouterPath']),
    ...mapMutations('api', ['SET_TOKEN']),
    refreshToken() {
      const tokenCookie = Cookies.get('access_token')
      this.SET_TOKEN(tokenCookie)
      if (tokenCookie) return
      api.auth.getToken().then((response) => {
        const newToken = response.data.accessToken
        const in30Minutes = 1 / 48
        Cookies.set('access_token', newToken, { expires: in30Minutes }) // Set the token in a cookie that expires in 30 minutes
        return newToken
      })
    },

    startRefreshTokenTimer() {
      // Call refreshToken immediately to get the initial token
      this.refreshToken()

      setInterval(this.refreshToken, 5000)
    },
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
