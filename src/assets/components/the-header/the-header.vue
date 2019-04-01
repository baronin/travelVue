<template>
    <header class="header">
      <div class="container">
        <the-logo/>
      </div>
    </header>

</template>

<script>
  import "./_the-header.scss";
  import TheLogo from "../the-logo/the-logo";

  export default {
    name: "the-header",
    components: {TheLogo}
  }
</script>