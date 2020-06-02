import request from '@/utils/request'

export function listProducts(params){
  return request({
    url: '/listProducts',
    method: 'get',
    params
  })
}

export function listTmps(params){
  return request({
    url: '/listTmps',
    method: 'get',
    params,
  })
}

export function listMaterials(params){
  return request({
    url: '/listMaterials',
    method: 'get',
    params
  })
}

export function addMaterial(data){
  return request({
    url: '/addMaterial',
    method: 'post',
    data
  })
}

export function listHotspots(params){
  return request({
    url: '/listHotspots',
    method: 'get',
    params
  })
}

export function listRandomHotspots(params){
  return request({
    url: '/listRandomHotspots',
    method: 'get',
    params
  })
}

export function saveVR(data){
  return request({
    url: '/saveVR',
    method: 'post',
    data
  })
}

export function getProduct(params){
  return request({
    url: '/getProduct',
    method: 'get',
    params
  })
}
