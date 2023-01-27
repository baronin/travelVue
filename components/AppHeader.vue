<template>
  <header class="header">
    <div class="container">
      <nuxt-link :to="'/round-trip'" class="link-logo" title="logotype">
        <svg class="icon logo">
          <use xlink:href="@/assets/svg/sprite.svg#logo" />
        </svg>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',
  };
</script>

<style lang="scss">
  .header {
    width: 100%;
    background-color: $color-white;
    padding: 20px 0;
  }

  .link-logo {
    display: inline-block;

    .logo {
      max-width: 125px;
      width: 100%;
      max-height: 28px;
    }
  }
</style>
