import axios from 'axios'

export default {
  name: 'dataMixin',
  getDataFromMixin(options) {
    return axios(options)
  },
}
