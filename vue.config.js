module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "@/assets/scss/_variable.scss";
        @import "@/assets/scss/_mixins.scss";
        `,
      },
    },
  },
};