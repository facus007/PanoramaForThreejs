import request from '@/utils/request'

export function listProducts(params) {
  return request({
    url: '/listProducts',
    method: 'get',
    params
  })
}
/**模板接口 */
export function listTmps(params) {
  return request({
    url: '/listTmps',
    method: 'get',
    params,
  })
}
export function saveTmpInfo(data) {
  return request({
    url: '/saveTmpInfo',
    method: 'post',
    data,
  })
}
export function updateTmpInfo(data) {
  return request({
    url: '/updateTmpInfo',
    method: 'post',
    data,
  })
}
export function getTmpUploadInfo(params) {
  return request({
    url: '/getTmpUploadInfo',
    method: 'get',
    params
  })
}
export function deleteTmpUpload(params) {
  return request({
    url: '/deleteTmpUpload',
    method: 'get',
    params
  })
}

export function listMaterials(params) {
  return request({
    url: '/listMaterials',
    method: 'get',
    params
  })
}

export function addMaterial(data) {
  return request({
    url: '/addMaterial',
    method: 'post',
    data
  })
}

export function listHotspots(params) {
  return request({
    url: '/listHotspots',
    method: 'get',
    params
  })
}

export function listRandomHotspots(params) {
  return request({
    url: '/listRandomHotspots',
    method: 'get',
    params
  })
}

export function saveVR(data) {
  return request({
    url: '/saveVR',
    method: 'post',
    data
  })
}

export function getProduct(params) {
  return request({
    url: '/getProduct',
    method: 'get',
    params
  })
}

export function delProduct(params) {
  return request({
    url: '/delproduct',
    method: 'get',
    params
  })
}

export function addembed(data) {
  return request({
    url: '/addembed',
    method: 'post',
    data
  })
}

export function delembed(params) {
  return request({
    url: '/delembed',
    method: 'get',
    params
  })
}

export function listexhibitor(params) {
  return request({
    url: '/listexhibitor',
    method: 'get',
    params
  })
}

export function listChooseHotspots(data) {
  return request({
    url: '/listChooseHotspots',
    method: 'get',
    params: data
  })
}

export function listAdvHotspots(data) {
  return request({
    url: '/listAdvHotspots',
    method: 'get',
    params: data
  })
}

export function getshareconfig(data) {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: 'share/getshareconfig',
    method: 'get',
    params: data
  })
}
/**素材库管理接口 */
// 查询素材列表
export function listMaterial(query) {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: '/fair/material/vr/list',
    method: 'get',
    params: query
  })
}

// 查询素材详细
export function getMaterial(id) {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: '/fair/material/' + id,
    method: 'get'
  })
}

// 新增素材
export function addVrMaterial(data) {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: '/fair/material/vr',
    method: 'post',
    data: data
  })
}

// 修改素材
export function updateMaterial(data) {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: '/fair/material',
    method: 'put',
    data: data
  })
}

// 删除素材
export function delMaterial(id) {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: '/fair/material/' + id,
    method: 'delete'
  })
}
/**素材类型 */
export function dictType() {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: 'system/dict/data/dictType/vr_material_type',
    method: 'get'
  })
}
/**参展商列表 */
export function listFair() {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: '/fair/fair/list',
    method: 'get'
  })
}

export function listExhibitor() {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: '/fair/exhibitor/list',
    method: 'get'
  })
}

export function getInfo() {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: '/getInfo',
    method: 'get'
  })
}
