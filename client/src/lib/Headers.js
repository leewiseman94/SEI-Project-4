import Cookies from 'js-cookie'
const csrftoken = Cookies.get('csrftoken')
import { getTokenFromLocalStorage } from '../components/helpers/auth'
// when you send a request that does not need to be authenticated with the jwt token,
// only send the headers.common object, otherwise send the full headers object
export const headers = {
  common: {
    'X-CSRF-TOKEN': csrftoken,
  },
  headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
}