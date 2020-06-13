import request from '@/utils/request'

const cosUrl = process.env.VUE_APP_COS_API

export function fileUpload(data){
  return request({
    baseURL: cosUrl,
    timeout: 0,
    url: '/fileUpload',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

export function imageUpload(data){
  return request({
    baseURL: cosUrl,
    timeout: 0,
    url: '/imageUpload',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

export function mediaUpload(data){
  return request({
    baseURL: cosUrl,
    timeout: 0,
    url: '/mediaUpload',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}
