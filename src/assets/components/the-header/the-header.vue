<template>
    <header class="header">
      <div class="container">
        <router-link to="/">
          <a href="#" class="link-logo" title="logotype">
            baronin.dev
          </a>
        </router-link>
      </div>
    </header>
</template>

<script>
 export default {
    name: "the-header",
  }
</script>

<style lang="scss">
.header {
  width: 100%;
  background-color: $color-white;
  padding: 20px 0;
}

.link-logo {
  display: inline-block;
  max-width: 125px;
  max-height: 28px;
  color: $color-blue-medium;
  font-weight: 700;
}
</style>
