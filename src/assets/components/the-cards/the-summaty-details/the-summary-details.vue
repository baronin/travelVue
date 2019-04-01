<template>
  <div class="flight-info">
    <button class="btn-close">close</button>

    <div class="flight-info-top">
      <p class="is-size-medium-large has-text-weight-bold">Outbound test  </p>
      <span class="is-size-medium">14h 30m</span>
    </div>
    <main class="segment-body">
      <div class="line"><p class="has-text-weight-bold">{{ departTime }} Los Angeles (LAX)</p></div>
      <div class="line">
        <div class="logo-airline">
          <a href="#" class="logo-link">
            <img src="../../../img/logo-airlines.jpg" alt="logo airline">
          </a>
        </div>
        <div class="about-company-info">
          <span>Norwegian 7084 · Operated by Lufthansa</span>
          <span>Boeing 787-8 · Economy</span></div>
        <span>9h:20m</span>
        </div>

      <div class="line"><p class="has-text-weight-bold">15:20 Oslo (OSL)</p></div>
    </main>
    <div class="transplant-info">
      <div class="transplant-info-text">
        <span>Layover in Oslo</span>
        <span class="has-text-red">Long layover</span>
      </div>
      <span> 10h 20m</span>
    </div>
    <main class="segment-body">
      <div class="line"><p class="has-text-weight-bold">20:30 Los Angeles (LAX)</p></div>
      <div class="line">
        <div class="logo-airline">
          <a href="#" class="logo-link">
            <img src="../../../img/logo-airlines.jpg" alt="logo airline">
          </a>
        </div>
        <div class="about-company-info">
          <span>Norwegian 7084 · Operated by Lufthansa</span>
          <span>Boeing 787-8 · Economy</span></div>
        <span>9h:20m</span>
      </div>

      <div class="line"><p class="has-text-weight-bold">15:20 Oslo (OSL)</p></div>
    </main>


    <div class="flight-info-top">
      <p class="is-size-medium-large has-text-weight-bold">Return </p>
      <span class="is-size-medium">14h 30m</span>
    </div>
    <main class="segment-body">
      <div class="line"><p class="has-text-weight-bold">20:30 Los Angeles (LAX)</p></div>
      <div class="line">
        <div class="logo-airline">
          <a href="#" class="logo-link">
            <img src="../../../img/logo-airlines.jpg" alt="logo airline">
          </a>
        </div>
        <div class="about-company-info">
          <span>Norwegian 7084 · Operated by Lufthansa</span>
          <span>Boeing 787-8 · Economy</span></div>
        <span>9h:20m</span>
      </div>

      <div class="line"><p class="has-text-weight-bold">15:20 Oslo (OSL)</p></div>
    </main>
  </div>
</template>

<script>
  import './the-summary-details.scss';

  export default {
    name: 'the-summary-details',
    props: ['departTime'],
    data() {
      return {
        hide: true,
      }
    }
  };
</script>
