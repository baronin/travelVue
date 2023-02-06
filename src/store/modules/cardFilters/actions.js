import * as types from './mutation-types'

/**
 * Open filters sidebar
 *
 * @param commit
 */
export const open = ({ commit }) => {
  commit(types.OPEN)
}

/**
 * Close filters sidebar
 *
 * @param commit
 */
export const close = ({ commit }) => {
  commit(types.CLOSE)
}

/**
 * Toggle filters sidebar
 *
 * @param commit
 */
export const toggle = ({ commit }) => {
  commit(types.TOGGLE)
}

export default {
  open,
  close,
  toggle,
}
