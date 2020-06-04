// import {getProduct} from './test'
import {getProduct, listHotspots} from '@/api/server'

const state = {
  product: null,
  setting: {
    autosave: false,
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
    var result = await getProduct({product_id})
    for (var i = 0; i < result.productInfo.scenes.length; i++) {
      let embeddings = await listHotspots({scene_id: result.productInfo.scenes[i].scene_id})
      result.productInfo.scenes[i].embeddings = embeddings.sceneInfo.embeddings
      result.productInfo.scenes[i].embeddings && result.productInfo.scenes[i].embeddings.forEach((item, i) => {
        item.hotspots && item.hotspots.forEach((item_, i) => {
          item_.target = JSON.parse(item_.target)
        });
      });
    }
    commit('SET_PRODUCT', result.productInfo)
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
