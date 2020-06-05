// import {getProduct} from './test'
import {getProduct, listHotspots} from '@/api/server'
import Cookies from 'js-cookie'
const SettingKey = 'avalon_setting'

async function getProduct_(product_id){
  var result = await getProduct({product_id})
  for (var i = 0; i < result.productInfo.scenes.length; i++) {
    let embeddings = await listHotspots({scene_id: result.productInfo.scenes[i].scene_id})
    result.productInfo.scenes[i].embeddings = embeddings.sceneInfo.embeddings || []
    var rebuild = [{group:1, hotspots:[]},{group:2, hotspots:[]},{group:3, hotspots:[]}]
    result.productInfo.scenes[i].embeddings && result.productInfo.scenes[i].embeddings.forEach((item, i) => {
      item.hotspots && item.hotspots.forEach((item_, i) => {
        item_.target = item_.target && JSON.parse(item_.target) || {}
        item_.attribute = item_.attribute && JSON.parse(item_.attribute) || {}
      });
      rebuild[item.group-1] = item
    });
    result.productInfo.scenes[i].embeddings = rebuild
  }
  return result.productInfo
}

export function getSetting() {
  return Cookies.get(SettingKey) || '{"autosave":true}'
}

export function setSetting(setting) {
  return Cookies.set(SettingKey, setting)
}

const state = {
  product: null,
  setting: JSON.parse(getSetting()),
  cursave: null,
  curedit: null,
  curindex: 0,
}

const mutations = {
  SET_PRODUCT:(state, param) => state.product = param,
  SET_CURSAVE:(state, param) => state.cursave = param,
  SET_CUREDIT:(state, param) => state.curedit = param,
  SET_CURINDEX:(state, param) => state.curindex = param,
  SET_SETTING:(state, param) => {
    state.setting = param
    setSetting(JSON.stringify(param))
  },
}

const actions = {
  async init({state, commit, dispatch}, product_id){
    commit('SET_PRODUCT', await getProduct_(product_id))
    dispatch('setEdit', 0)
  },
  async deinit({state, commit}){
    state.product && commit('SET_PRODUCT', {})
  },
  setEdit({state, commit}, index){
    commit('SET_CURINDEX', index)
    commit('SET_CURSAVE', JSON.stringify(state.product.scenes[index]))
    commit('SET_CUREDIT', state.product.scenes[index])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
