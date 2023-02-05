<template>
    <header class="header">
      <div class="container">
        <router-link to="/">
          <a href="#" class="link-logo">
            <img src="@/assets/img/logo.svg" alt="logotype" class="logo">
          </a>
        </router-link>

      </div>
    </header>
</template>

<script>
  import "./_the-header.scss";

  export default {
    name: "the-header",
  }
</script>