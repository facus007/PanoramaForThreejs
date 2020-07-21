const state = {
  canMusicPlay: true,
}

const mutations = {
  SET_CAN_MUSIC_PLAY: (state, value) => {state.canMusicPlay = value},
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
