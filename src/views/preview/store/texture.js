import * as three from 'three'
import multiaction from '@/utils/multiaction'

const texloader = new three.TextureLoader()

function loadtex(url, loaders) {
  return new Promise((resolve, reject) => {
    let loader = () => texloader.load(url, resolve, null, loader)
    loaders.push(loader())
  });
}

const state = {
  textures: {},
  loaders: [],
}

const mutations = {
  SET_LOADERS: state => state.loaders = []
}

const actions = {
  async load({state, commit}, {scene, onloadblur, onloadclear}){
    state.textures[scene.scene_id] = []
    for (var i = 0; i < 6; i++) {
      state.textures[scene.scene_id][i] = {}
    }

    // await multiaction(new Array(6), async (item, i) => {
    //   let url = scene['pano_graphic_blur_url'+(i+1)].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
    //   let index = i
    //   state.textures[scene.scene_id][index].clear = await loadtex(url, state.loaders)
    // })
    //
    // onloadblur && onloadblur()

    await multiaction(new Array(6), async (item, i) => {
      let url = scene['pano_graphic_url'+(i+1)].replace('https://manager.flycloudinfo.com/websources', process.env.VUE_APP_WEBSOURCE_API)
      let index = i
      state.textures[scene.scene_id][index].clear = await loadtex(url, state.loaders)
    })

    onloadclear && onloadclear()
  },
  async unload({state, commit}){
    state.loaders.forEach((item, i) => {
      item.dispose()
    });
    commit('SET_LOADERS')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
