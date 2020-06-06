// import {getProduct} from './test'
import {getProduct, saveVR} from '@/utils/server'
import { listRandomHotspots } from '@/api/server'

import Cookies from 'js-cookie'
const SettingKey = 'avalon_setting'

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
  SET_SETTING:(state, param) => { state.setting = param;setSetting(JSON.stringify(param))},
}

const actions = {
  async init({state, commit, dispatch}, product_id){
    commit('SET_PRODUCT', await getProduct(product_id))
    commit('SET_CURSAVE', JSON.stringify(state.product))
    dispatch('setEdit', 0)
  },
  async deinit({state, commit}){
    state.curedit && commit('SET_CUREDIT', null)
    state.cursave && commit('SET_CURSAVE', null)
    state.product && commit('SET_PRODUCT', {})
  },
  setEdit({state, commit}, index){
    commit('SET_CURINDEX', index)
    commit('SET_CUREDIT', state.product.scenes[index])
  },
  async save({state, commit}){
    await saveVR(state.product)
    commit('SET_CURSAVE', JSON.stringify(state.curedit))
  },

  async randomHotspots({state, commit}){
    let product = JSON.parse(JSON.stringify(state.product))
    let {tmps} = await listRandomHotspots({tmp_group_id:product.tmp_group_id})
    product.scenes.forEach((item, i) => {
      item.embeddings[0].hotspots = tmps[i].embeddings[0].hotspots
      item.embeddings[0].hotspots.forEach((item_, i) => {
        item_.target = JSON.parse(item_.target)
        item_.embed_id = null
      });
      item.embeddings[1].hotspots = tmps[i].embeddings[1].hotspots
      item.embeddings[1].hotspots.forEach((item_, i) => {
        item_.target = JSON.parse(item_.target)
        item_.embed_id = null
      });
    });
    await saveVR(product)
    commit('SET_PRODUCT', await getProduct(product.product_id))
    commit('SET_CURSAVE', JSON.stringify(state.product))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
