const state = {
  loading: false,
  first_loaded: false,
  after_animation_loaded: false,
}

const mutations = {
  SET_LOADING: (state, value) => state.loading = value,
  SET_FIRST_LOADED: (state, value) => state.first_loaded = value,
  SET_AFTER_ANIMATION_LOADED: (state, value) => state.after_animation_loaded = value,
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
