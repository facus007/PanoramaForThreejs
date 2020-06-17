import request from '@/utils/request'
/**外链接口 */
// 查询AR展箱 校验数据
export function exhibitionBox(query) {
  return request({
    url: '/ruiyue/exhibitionBox',
    method: 'get',
    params: query
  })
}
// 新增
export function brandHall(data) {
  return request({
    url: '/ruiyue/brandHall',
    method: 'post',
    data: data
  })
}
export function addexhibitorBox(vdata, data) {
  return request({
    url: '/ruiyue/addexhibitorBox',
    method: 'post',
    params: vdata,
    data: data
  })
}
// 选择 type: 1-3D展箱  2-AR展箱 3-品牌展厅 refId 
export function addchoosebox(vdata, data) {
  return request({
    url: '/ruiyue/addchoosebox',
    method: 'post',
    params: vdata,
    data: data
  })
}
//删除
export function delexhibitorBox(data, id) {
  return request({
    url: '/ruiyue/delexhibitorBox/' + id,
    method: 'delete',
    params: data
  })
}

// 品牌厅管理
export function brandHalls(query) {
  return request({
    url: '/ruiyue/brandHall',
    method: 'get',
    params: query
  })
}
// 品牌厅管理详情
export function hallDetail(query, id) {
  return request({
    url: '/ruiyue/ehallInfo/' + id,
    method: 'get',
    params: query
  })
}
//展会列表
export function fairlist(query) {
  return request({
    url: '/ruiyue/fairlist',
    method: 'get',
    params: query
  })
}
//新增品牌厅
export function addEhall(data, query) {
  return request({
    url: '/ruiyue/addEhall',
    method: 'post',
    data: data,
    params: query
  })
}
//单选 type: 1-3D展箱  2-AR展箱 3-品牌展厅 refId 
export function addChooseBoxs(data, query) {
  return request({
    url: '/ruiyue/addchoosebox',
    method: 'post',
    data: data,
    params: query
  })
}
export function getmateriallist(query) {
  return request({
    url: '/ruiyue/getmateriallist',
    method: 'get',
    params: query
  })
}
/** 展箱列表 */
export function boxlist(query) {
  return request({
    url: '/vr/exhibitionBox/list',
    method: 'get',
    params: query
  })
}
/** 展箱列表 */
export function boxaddChooseBox(data) {
  return request({
    url: '/vr/exhibitionBox/addChooseBox/' + data,
    method: 'get'
    // params: data
  })
}
/** 产品资源 */
export function saveproductchoose(data) {
  return request({
    url: '/vr/saveproductchoose',
    method: 'post',
    data: data
  })
}
/** 广告资源 */
export function saveAdvResource(data) {
  return request({
    url: '/vr/resource/saveAdvResource',
    method: 'post',
    data: data
  })
}
