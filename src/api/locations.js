import { instance } from '@/api/instance'

export const locations = {
  get(options) {
    return instance.get('reference-data/locations', {
      params: {
        subType: options.subType,
        keyword: options.keyword,
      },
    })
  },
}
