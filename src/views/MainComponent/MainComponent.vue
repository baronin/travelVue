<template>
  <div class="main-components">
    <Header/>
    <the-main/>
  </div>
</template>

<script>
  import Header from "../../assets/components/the-header/the-header";
  import TheMain from "../../assets/components/the-main/the-main";
  import TheCards from "../../assets/components/the-cards/the-cards";

  export default {
    name: 'MainComponent',
    components: {TheMain, Header},
  }
</script>
