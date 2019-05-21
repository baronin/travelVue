<template>
  <div class="price-summary">
    <h3>Price Summary</h3>
    <ul class="list-group">

      <li>
        <p>{{dataForApi.passengersTypes[0].quantity}} × Adults</p>
        <p>${{(card.offerItems[0].pricePerAdult.total - card.offerItems[0].pricePerAdult.totalTaxes).toFixed(2)}}</p>
      </li>
      <li>
        <p>Taxes & Fees</p>
        <p>${{card.offerItems[0].pricePerAdult.totalTaxes}}</p>
      </li>

     <li v-if="dataForApi.passengersTypes[1].quantity>0">
        <p>{{dataForApi.passengersTypes[1].quantity}} × Children</p>
        <p>${{(card.offerItems[0].pricePerChild.total - card.offerItems[0].pricePerChild.totalTaxes).toFixed(2) }}</p>
      </li>
      <li v-if="dataForApi.passengersTypes[1].quantity>0">
        <p>Taxes & Fees</p>
        <p>${{card.offerItems[0].pricePerChild.totalTaxes}}</p>
      </li>

      <li v-if="dataForApi.passengersTypes[2].quantity>0">
        <p>{{dataForApi.passengersTypes[2].quantity}} × Infants</p>
        <p>${{(card.offerItems[0].pricePerInfant.total - card.offerItems[0].pricePerInfant.totalTaxes).toFixed(2) }}</p>
      </li>
      <li v-if="dataForApi.passengersTypes[2].quantity>0">
        <p>Taxes & Fees</p>
        <p>${{card.offerItems[0].pricePerInfant.totalTaxes}}</p>
      </li>

      <li><p>Total Price</p> <p>${{card.offerItems[0].price.total}}</p></li>
    </ul>
    <span>All prices are in US Dollars (USD) and include all taxes and fees. Some airlines may charge baggage & seat assignment.</span>
  </div>
</template>

<script>
  import './_the-price-summary.scss'
  import {mapState} from "vuex"
  export default {
    name: "the-price-summary",
    props:['card'],
    computed: mapState(["dataForApi", "dataFromApi"])
  }
</script>
