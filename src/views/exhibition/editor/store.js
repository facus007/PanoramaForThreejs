import {getProduct} from './test'

const state = {
  product: null,
  setting: {
    autosave: true,
  },
  preview: null,
  cursave: null,
  curedit: null,
  curindex: 0,
}

const mutations = {
  SET_PRODUCT:(state, param) => state.product = param,
  SET_PREVIEW:(state, param) => state.preview = param,
  SET_CURSAVE:(state, param) => state.cursave = param,
  SET_CUREDIT:(state, param) => state.curedit = param,
  SET_CURINDEX:(state, param) => state.curindex = param,
}

const actions = {
  async init({state, commit, dispatch}, product_id){
    commit('SET_PRODUCT', await getProduct(product_id))
    dispatch('setEdit', 0)
  },
  async deinit({state, commit}){
    state.product && commit('SET_PRODUCT', {})
  },
  setEdit({state, commit}, index){
    commit('SET_CURINDEX', index)
    commit('SET_CURSAVE', JSON.stringify(state.product.scenes[index]))
    commit('SET_CUREDIT', JSON.parse(state.cursave))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
