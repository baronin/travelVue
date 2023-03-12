<template>
  <main class="main-components">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: 'MainComponent',
}
</script>

<style lang="scss">
.main-components {
  flex-grow: 1;
}
</style>
