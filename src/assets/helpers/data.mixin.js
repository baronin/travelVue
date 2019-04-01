import axios from 'axios';
export default {
    name: "dataMixin",
    data: function () {
        return {
            getDataFromMixin: function (options) {
                return axios(options);
            }
        }
    }
}
