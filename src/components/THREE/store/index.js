import * as THREE from 'three'

const event = new Event('update');

function render({state, commit}){
  state.domElement.dispatchEvent(event)
}

const state = {
  domElement: null,
  camera: null,
  scene: null,
  needsUpdate: true,
}

const mutations = {
  SET_DOMELEMENT:(state, param) => state.domElement = param,
  SET_CAMERA:(state, param) => state.camera = param,
  SET_SCENE:(state,param) => {state.scene = param; window.scene = param },
}

const actions = {
  start({state, commit}, param) {
    commit('SET_CAMERA', new THREE.PerspectiveCamera(60, 0, 0.1, 1000))
    commit('SET_SCENE', new THREE.Scene())
  },

  stop({state, commit}, param) {
    commit('SET_SCENE', state.scene.dispose() && null)
    commit('SET_CAMERA', null)
  },

  render,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules:{},
}
