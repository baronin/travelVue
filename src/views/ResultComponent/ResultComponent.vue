<template>
 <div></div>
</template>

<script>
  import dataMixin from '../../assets/helpers/data.mixin';
    export default {
        name: "ResultComponent",
        data: function () {
          return {
              newData: '',
              dataForApi: ''
          }
        },
        mixins: [dataMixin],
        mounted() {
          this.getDataFromRout()


        },
        methods:  {
          getDataFromRout: function () {
            this.dataForApi = this.$route.params
          },
          getDat(){

            this.getDataFromMixin({

              url: 'https://test.api.amadeus.com/v1/shopping/flight-offers?origin=' + this.dataForApi.originCity.cityCode + '&destination=' +  this.dataForApi.destinationCity.cityCode + '&departureDate='+this.dataForApi.flightDates.startDate+'&returnDate='+this.dataForApi.flightDates.startDate+'&adults='+this.dataForApi.countPassenger.sumPassengers+'&travelClass=ECONOMY&&max=10',
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + this.dataForApi.tokenForRequest.token
              }
            })
                .then(response => (this.newData = response.data));
          }
        },
        watch: {
          dataForApi(){

            this.getDat()
          }
        }
    }
</script>