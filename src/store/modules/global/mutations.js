import {
  CHANGE_ROUTER_PATH,
  CHANGE_STYLES_FOR_PASSENGER_INFO_PAGE,
  SET_BREAD_CRAMPS_ACTIVE,
  SET_ITEM_CARD,
} from './mutation-types';

export default {
  /**
   * @param state
   * @param payload
   */
  [CHANGE_STYLES_FOR_PASSENGER_INFO_PAGE](state, payload) {
    state.changeStylesForPassengerInfoPage = payload;
  },

  /**
   * @param state
   * @param payload
   */
  [SET_BREAD_CRAMPS_ACTIVE](state, payload) {
    state.breadCrampsActive = payload;
  },

  /**
   * @param state
   * @param payload
   */
  [SET_ITEM_CARD](state, payload) {
    state.itemCard = payload;
  },

  /**
   * @param state
   * @param payload
   */
  [CHANGE_ROUTER_PATH](state, payload) {
    const passInfoOrReview = ['/passenger-info', '/review']
        .includes(payload.path);
    state.changeStylesForResultPage = !payload.path === '/';
    state.showSearchForms = !passInfoOrReview;
    state.changeStylesForPassengerInfoPage = passInfoOrReview;
    state.breadCrampsActive = payload.name;
  },
};
