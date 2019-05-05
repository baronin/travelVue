import { HIDE, SHOW, TOGGLE } from './mutation-types';

export default {
  /**
   * Shows spinner
   *
   * @param state
   */
  [SHOW](state) {
    state.isShown = true;
  },

  /**
   * Hides spinner
   *
   * @param state
   */
  [HIDE](state) {
    state.isShown = false;
  },

  /**
   * Toggles spinner
   *
   * @param state
   */
  [TOGGLE](state) {
    state.isShown = !state.isShown;
  },
};
