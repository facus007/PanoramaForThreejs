import {getProduct, saveVR} from '@/utils/server'
import { listRandomHotspots, listChooseHotspots, listAdvHotspots } from '@/api/server'

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
    let product = JSON.parse(JSON.stringify(state.product))
    product.scenes.forEach((item, i) => {
      delete item.fov
    });
    commit('SET_CURSAVE', JSON.stringify(product))
  },

  async randomHotspots({state, commit}){
    let product = JSON.parse(JSON.stringify(state.product))
    let {tmps} = await listRandomHotspots({tmp_group_id:product.tmp_group_id, product_id: state.product.product_id})
    tmps.forEach((item, i) => {
      product.scenes[i].embeddings = product.scenes[i].embeddings || [{group:1, hotspots:[]},{group:2, hotspots:[]},{group:3, hotspots:[]}]
      for (var e = 0; e < 2; e++) {
        var map = {}
        product.scenes[i].embeddings[e] && product.scenes[i].embeddings[e].hotspots.forEach((item_, i) => {
          map[item_.name] = item_
        });
        item.embeddings[e].hotspots.forEach((item_, i) => {
          item_.embed_id = map[item_.name] && map[item_.name].embed_id
          item_.target = JSON.parse(item_.target)
          map[item_.name] = item_
        });
        product.scenes[i].embeddings[e].hotspots = Object.values(map)
      }
    });
    await saveVR(product)
    commit('SET_PRODUCT', await getProduct(product.product_id))
    commit('SET_CURSAVE', JSON.stringify(state.product))
    commit('SET_CUREDIT', state.product.scenes[state.curindex])
  },

  async setExhibition({state, commit}, params){
    let product = JSON.parse(JSON.stringify(state.product))
    let {tmps} = await listChooseHotspots({batch_no: params.batch_no, tmp_group_id:product.tmp_group_id})
    tmps.forEach((item, i) => {
      product.scenes[i].embeddings = product.scenes[i].embeddings || [{group:1, hotspots:[]},{group:2, hotspots:[]},{group:3, hotspots:[]}]
      for (var e = 1; e < 2; e++) {
        var map = {}
        product.scenes[i].embeddings[e] && product.scenes[i].embeddings[e].hotspots.forEach((item_, i) => {
          map[item_.name] = item_
        });
        item.embeddings[e].hotspots.forEach((item_, i) => {
          item_.embed_id = map[item_.name] && map[item_.name].embed_id
          item_.target = JSON.parse(item_.target)
          map[item_.name] = item_
        });
        product.scenes[i].embeddings[e].hotspots = Object.values(map)
      }
    });
    await saveVR(product)
    commit('SET_PRODUCT', await getProduct(product.product_id))
    commit('SET_CURSAVE', JSON.stringify(state.product))
    commit('SET_CUREDIT', state.product.scenes[state.curindex])
  },

  async setExhibitionAds({state, commit}, params){
    let product = JSON.parse(JSON.stringify(state.product))
    let {tmps} = await listAdvHotspots({batch_no: params.batch_no, tmp_group_id:product.tmp_group_id})
    tmps.forEach((item, i) => {
      product.scenes[i].embeddings = product.scenes[i].embeddings || [{group:1, hotspots:[]},{group:2, hotspots:[]},{group:3, hotspots:[]}]
      for (var e = 0; e < 1; e++) {
        var map = {}
        product.scenes[i].embeddings[e] && product.scenes[i].embeddings[e].hotspots.forEach((item_, i) => {
          map[item_.name] = item_
        });
        item.embeddings[e].hotspots.forEach((item_, i) => {
          item_.embed_id = map[item_.name] && map[item_.name].embed_id
          item_.target = JSON.parse(item_.target)
          map[item_.name] = item_
        });
        product.scenes[i].embeddings[e].hotspots = Object.values(map)
      }
    });
    await saveVR(product)
    commit('SET_PRODUCT', await getProduct(product.product_id))
    commit('SET_CURSAVE', JSON.stringify(state.product))
    commit('SET_CUREDIT', state.product.scenes[state.curindex])
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
