import * as THREE from 'three'

var frameCounter = 0
var frame = 0

const event = new Event('update');

function render({state, commit}){
  if(!state.domElement){
    return
  }

  let aspect = state.domElement.clientWidth / state.domElement.clientHeight;
  if(state.camera.aspect !== aspect){
    state.camera.aspect = aspect
    state.camera.updateProjectionMatrix();
    state.renderer.setSize( state.domElement.clientWidth, state.domElement.clientHeight );
    commit('SET_NEEDS_UPDATE' ,true)
  }
  state.domElement.dispatchEvent(event)
  if(state.needsUpdate || ++frameCounter % 4 == 0){
    state.renderer.render( state.scene, state.camera );
    commit('SET_NEEDS_UPDATE' ,false)
    frameCounter = 0
  }
}

function rendering({state, commit}){
  render({state, commit})
  frame = requestAnimationFrame(()=>rendering({state, commit}))
}

function startRendering({state, commit}){
  frame = requestAnimationFrame(()=>rendering({state, commit}))
}

function stopRendering({state, commit}){
  cancelAnimationFrame(frame)
}

const state = {
  domElement: null,
  renderer: null,
  camera: null,
  scene: null,
  needsUpdate: true,
}

const mutations = {
  SET_DOMELEMENT:(state, param) => state.domElement = param,
  SET_RENDERER:(state, param) => state.renderer = param,
  SET_CAMERA:(state, param) => state.camera = param,
  SET_SCENE:(state,param) => {state.scene = param; window.scene = param },
  SET_NEEDS_UPDATE:(state, param) => state.needsUpdate = param,
}

const actions = {
  start({state, commit}, param) {
    commit('SET_RENDERER', new THREE.WebGLRenderer({antialias:true}))
    commit('SET_CAMERA', new THREE.PerspectiveCamera(60, 0, 1, 10000))
    commit('SET_SCENE', new THREE.Scene())
    startRendering({state, commit})
  },

  stop({state, commit}, param) {
    stopRendering({state, commit})
    commit('SET_SCENE', state.scene.dispose() && null)
    commit('SET_CAMERA', null)
    commit('SET_RENDERER', state.renderer.dispose() && null)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules:{},
}
