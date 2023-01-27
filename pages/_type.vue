<template>
  <main class="main">
    <div class="container">
      <div class="container-form bg-blue-grey">
        <div class="tabs">
          <nuxt-link
            v-for="item in menuItems"
            :key="item.href"
            :to="item.href"
            class="tab"
          >
            {{ item.title }}
          </nuxt-link>
        </div>
        <template v-if="$route.params.type === 'round-trip'">
          <p>round trip</p>
        </template>
        <template v-else>
          <p>one way</p>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'Index',

    validate({ params }) {
      return ['round-trip', 'one-way'].includes(params.type);
    },

    data() {
      return {
        /**
         * Available routes
         */
        menuItems: [
          {
            title: 'Round trip',
            href: '/round-trip',
          },
          {
            title: 'One way',
            href: '/one-way',
          },
        ],
      };
    },

    computed: {
      type: {
        get() {
          return this.$route.params.type;
        },
        set(value) {

        },
      },
    },
  };
</script>

<style lang="scss">
  .main {
    min-height: 628px;
    height: 100%;
    padding-top: 70px;
    background: url("../assets/img/bg-main.jpg");

    .container-form {
      min-height: 150px;
      padding: 20px 20px 36px 20px;
    }
  }

  .tabs {
    margin-bottom: 20px;

    .tab {
      margin-left: 16px;
      padding-bottom: 5px;
      font-size: 13px;
      text-transform: uppercase;
      color: $color-white;

      &:first-child {
        margin-left: 0;
      }
    }

    .nuxt-link-active {
      border-bottom: 2px solid $color-blue-medium;
    }
  }
</style>
