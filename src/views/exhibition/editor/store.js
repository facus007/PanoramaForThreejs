// import {getProduct} from './test'
import {getProduct, saveVR} from '@/utils/server'
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
