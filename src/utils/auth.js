import Cookies from 'js-cookie'

const TokenKey = 'hiclue_token'
const UserIdKey = 'hiclue_user_id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(user_id) {
  return Cookies.set(UserIdKey, user_id)
}
