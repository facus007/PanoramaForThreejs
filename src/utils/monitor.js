import Cookies from 'js-cookie'

const key = 'monitor_param_key'

export function getParam() {
  return Cookies.get(key)
}

export function setParam(param) {
  return Cookies.set(key, param)
}

export function removeParam() {
  return Cookies.remove(key)
}
