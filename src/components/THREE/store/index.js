import * as THREE from 'three'

// var frameCounter = 0

const event = new Event('update');

function render({state, commit}){
  state.domElement.dispatchEvent(event)
  if(state.needsUpdate){
    // state.renderer.render( state.scene, state.camera );
    commit('SET_NEEDS_UPDATE' ,false)
    // frameCounter = 0
  }
}

const state = {
  domElement: null,
  // renderer: null,
  camera: null,
  scene: null,
  needsUpdate: true,
}

const mutations = {
  SET_DOMELEMENT:(state, param) => state.domElement = param,
  // SET_RENDERER:(state, param) => state.renderer = param,
  SET_CAMERA:(state, param) => state.camera = param,
  SET_SCENE:(state,param) => {state.scene = param; window.scene = param },
  SET_NEEDS_UPDATE:(state, param) => state.needsUpdate = param,
}

const actions = {
  start({state, commit}, param) {
    // commit('SET_RENDERER', new THREE.WebGLRenderer({antialias:true}))
    commit('SET_CAMERA', new THREE.PerspectiveCamera(60, 0, 0.1, 10000))
    commit('SET_SCENE', new THREE.Scene())
  },

  stop({state, commit}, param) {
    commit('SET_SCENE', state.scene.dispose() && null)
    commit('SET_CAMERA', null)
    // commit('SET_RENDERER', state.renderer.dispose() && null)
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
