import * as types from './mutation-types';

export const changeStylesForPassengerInfoPage = ({ commit }, payload) => {
  commit(types.CHANGE_STYLES_FOR_PASSENGER_INFO_PAGE, payload);
};

export const getItemCard = ({ commit }, payload) => {
  commit(types.SET_ITEM_CARD, payload);
};

export const changeRouterPath = ({ commit }, payload) => {
  commit(types.CHANGE_ROUTER_PATH, payload);
};

export default {
  changeStylesForPassengerInfoPage,
  getItemCard,
  changeRouterPath,
};
