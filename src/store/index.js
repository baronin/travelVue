import Vue from 'vue';
/**
 * Configuration of Vuex storage package
 */
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import global from './modules/global';
import cardFilters from './modules/cardFilters';
import api from './modules/api';
import spinner from './modules/spinner';

/**
 * If the current environment is not prod
 *
 * @type {boolean}
 */
const debug = process.env.NODE_ENV !== 'production';

/**
 * Plugins which are used for all environments
 *
 * @type {*[]}
 */
const defaultPlugins = [];

Vue.use(Vuex);
export default new Vuex.Store({
  /**
   * Modules in Vuex store
   */
  modules: {
    global,
    api,
    cardFilters,
    spinner,
  },

  strict: debug,

  plugins: debug ? defaultPlugins.concat([createLogger()]) : defaultPlugins,
});
