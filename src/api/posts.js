import { instancePlaceholder } from '@/api/instancePlaceholder'

export const posts = {
  get(options) {
    return instancePlaceholder.get('posts', {
      params: {
        _limit: options.limit,
      },
    })
  },
}
