<template>
  <div class="price-summary">
    <h3>Price Summary</h3>
    <ul class="list-group">
      <li>
        <p>{{ dataForApi.countPassenger.sumPassengers }} × Adults</p>
        <p>
          ${{ (card.offerItems[0].price.total - card.offerItems[0].price.totalTaxes).toFixed(2) }}
        </p>
      </li>
      <li>
        <p>Taxes & Fees</p>
        <p>${{ card.offerItems[0].price.totalTaxes }}</p>
      </li>
      <li>
        <p>Total Price</p>
        <p>${{ card.offerItems[0].price.total }}</p>
      </li>
    </ul>
    <span
      >All prices are in US Dollars (USD) and include all taxes and fees. Some airlines may charge
      baggage & seat assignment.</span
    >
  </div>
</template>

<script>
import './_the-price-summary.scss'
import { mapGetters } from 'vuex'

export default {
  name: 'ThePriceSummary',
  props: ['card'],
  computed: {
    ...mapGetters('api', ['dataForApi']),
  },
}
</script>
