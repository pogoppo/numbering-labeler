const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess({
    scss: {
      prependData: "@import 'src/styles/prepends.scss';",
    }
  }),
};
