import * as types from './mutation-types'

/**
 * Open spinner
 *
 * @param commit
 */
export const show = ({ commit }) => {
  commit(types.SHOW)
}

/**
 * Close spinner
 *
 * @param commit
 */
export const hide = ({ commit }) => {
  commit(types.HIDE)
}

/**
 * Toggle spinner
 *
 * @param commit
 */
export const toggle = ({ commit }) => {
  commit(types.TOGGLE)
}

export default {
  show,
  hide,
  toggle,
}
