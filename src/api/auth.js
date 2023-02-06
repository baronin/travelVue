import { instance } from '@/api/instance'

export const auth = {
  getToken() {
    return instance.post('security/oauth2/token', {
      grant_type: 'client_credentials',
      client_id: 'gH8ii41KPfyRJve5jFQArjmbaL4KObxr',
      client_secret: '7bXMTlDA0AVtcy2m',
    })
  },
}
