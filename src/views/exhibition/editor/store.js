const state = {
  preview: null
}

const mutations = {
  SET_PREVIEW:(state, param) => state.preview = param
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
