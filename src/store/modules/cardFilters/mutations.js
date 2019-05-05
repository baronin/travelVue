import {CLOSE, OPEN, TOGGLE} from './mutation-types';

export default {
  /**
   * Opens filter sidebar
   *
   * @param state
   */
  [OPEN](state) {
    state.isOpened = true;
  },

  /**
   * Closes filter sidebar
   *
   * @param state
   */
  [CLOSE](state) {
    state.isOpened = false;
  },

  /**
   * Toggles filter sidebar
   *
   * @param state
   */
  [TOGGLE](state) {
    state.isOpened = !state.isOpened;
  },
};
