<template>
  <button type="button" class="btn is-search" @click="getLowFareFlight">Search</button>
</template>

<script>
  import './_search-button.scss'
  export default {
    name: "search-button",
    data() {
      return {}
    },
    props: {
      dataForApi: Object
    },
    methods: {
      getLowFareFlight: function () {
        for (let item in this.dataForApi) {
          if (this.dataForApi[item].cityName === '' || this.dataForApi[item].cityCode === '') {
            return this.dataForApi[item].emptyInput = true
          } else {
            this.dataForApi[item].emptyInput = false
          }
          if (this.dataForApi[item].dateOne === '') {
            console.log('error')
          }
        }
        console.log(this.dataForApi)
        this.getPageByRout()
      },
      getPageByRout() {
        this.$router.push({name: 'result', params: this.dataForApi})
      },
    }
  }
</script>