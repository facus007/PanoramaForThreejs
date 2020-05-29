async function getProduct(product_id) {
  var template = await (await fetch('/static/model.json')).json()
  return {
    name: 'test',
    description: 'test product',
    cover: '',
    published: false,
    create_time: '',
    update_time: '',
    scenes: [{
      scene_id: '-1',
      name: 'test scene',
      description: '',
      cover: '',
      fov: 60,
      start_rotation: [Math.PI/2, Math.PI/2],
      material_id: '-1',
      type: 1,
      template: template,
      pano_graphic_url1: '/static/test.png/right.jpg',
      pano_graphic_url2: '/static/test.png/back.jpg',
      pano_graphic_url3: '/static/test.png/left.jpg',
      pano_graphic_url4: '/static/test.png/front.jpg',
      pano_graphic_url5: '/static/test.png/top.jpg',
      pano_graphic_url6: '/static/test.png/bottom.jpg',
      embeddings:[{
        group: 1,
        hotspots: [{
          name: 'A6_3_1',
          embed_id: '-1',
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
            affine_transform: [0, 0, 1, 1, 0, 0.5, 0.5],
          },
          type: 2,
          style: null,
          img_url: '/static/3x1.jpeg',
          label: 'label',
          target: {},
        }],
      },{
        group: 2,
        hotspots: [{
          name: 'P30_1_1',
          embed_id: '-1',
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
            affine_transform: [0, 0, 2, 2, 0, 0.5, 0.5],
          },
          type: 1,
          style: null,
          img_url: '/static/test.png/right.jpg',
          label: 'label',
          target: {},
        }],
      },{
        group: 3,
        hotspots: [{
          name: 'spot',
          embed_id: '-1',
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
            affine_transform: [1, 0, 0, 0, 1, 0, 0, 0, 1],
          },
          type: 1,
          style: null,
          img_url: '/static/test.png/right.jpg',
          label: 'label',
          target: {},
        }],
      },]
    }],
  }
}

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
