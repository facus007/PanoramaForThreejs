import request from '@/utils/request'
// 查询参展商信息列表
export function listExhibitor(query) {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_1,
    url: '/fair/exhibitor/vrlist',
    method: 'get',
    params: query
  })
}

// 查询参展商信息详细
export function getExhibitor(id) {
  return request({
    url: '/fair/exhibitor/exhibitorinfo/' + id,
    method: 'get'
  })
}

// 新增参展商信息
export function addExhibitor(data) {
  return request({
    url: '/fair/exhibitor/addexhibitor',
    method: 'post',
    data: data
  })
}

// 修改参展商信息
export function updateExhibitor(data) {
  return request({
    url: '/fair/exhibitor/updateexhibitor',
    method: 'put',
    data: data
  })
}

// 删除参展商信息
export function delExhibitor(id) {
  return request({
    url: '/fair/exhibitor/delexhibitor/' + id,
    method: 'delete'
  })
}

// 导出参展商信息
export function exportExhibitor(query) {
  return request({
    url: '/fair/exhibitor/export',
    method: 'get',
    params: query
  })
}
