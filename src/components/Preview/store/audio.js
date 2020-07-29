const state = {
  canMusicPlay: true,
  needPlaying: true,
}

const mutations = {
  SET_CAN_MUSIC_PLAY: (state, value) => {state.canMusicPlay = value},
  SET_NEEDPLAYING: (state, value) => {state.needPlaying = value},
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
