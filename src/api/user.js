import request from '@/utils/request'

export function captchaImage(params){
  return request({
    url: '/captchaImage',
    method: 'get',
    params
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
