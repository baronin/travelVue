export default {
  name: 'optionsForDatepicker',
  data: function () {
    return {
      Options: {
        sundayFirst: true,
        colors: {
          selected: '#C5E1F9',
          inRange: '#E8F3FD',
          selectedText: '#363637',
          text: '#363637',
          inRangeBorder: 'none',
          disabled: '#fff',
        },
        daysShort: ['M', 'T ', 'W', 'T', 'F', 'S ', 'S'],
      },
    }
  },
}
