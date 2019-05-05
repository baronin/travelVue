export default {
  dataFromApiExist: false,
  dataForApi: {},
  dataFromApi: {
    data: [],
    dictionaries: {
      carriers: {},
    },
  },

  filters: {
    frequent: [],
    stops: [
      {
        code: 1,
        name: 'Nonstop',
        isChecked: true,
      },
      {
        code: 2,
        name: '1 stop',
        isChecked: true,
      },
      {
        code: 3,
        name: ' 2+ stops',
        isChecked: true,
      },
    ],
    departure: [],
    arrival: [],
    carrierCode: [],
    total: 0,
    duration: 0,
  },
  filteredArray: {
    data: [],
  },
};
