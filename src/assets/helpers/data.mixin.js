import axios from 'axios';
export default {
    name: "dataMixin",
    data: function () {
        return {
            getData: function (dataUrl) {
                return axios.get(dataUrl);
            }
        }
    }
}
