<template>
  <form class="round-trip">
    <div class="form-row">
    </div>
    <div class="form-row">
    </div>
    <div class="form-row">
    </div>
  </form>
</template>

<script>
  export default {
    name: 'Index',

    validate({ params }) {
      return ['round-trip', 'one-way'].includes(params.type);
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
