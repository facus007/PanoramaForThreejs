import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'get',
    params: data
  })
}

export function getRoles() {
  return request({
    url: '/user/roles',
    method: 'get',
  })
}

export function userAdd(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function userEdit(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export function delUser(data) {
  return request({
    url: '/user/del',
    method: 'post',
    params: data
  })
}
