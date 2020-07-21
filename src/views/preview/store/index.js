import Cookies from 'js-cookie'
import texture from './texture'
import loading from './loading'
import audio from './audio'

function getQueryString(name) {
  try {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.href.split('?')[1] && window.location.href.split('?')[1].match(reg);
    if (r != null) return unescape(r[2]); return null;
  } catch (e) {
    return null
  }
}

var getProductId = () => getQueryString('product_id')
var cookies = Cookies.get('vrpreivew' + getProductId()) && JSON.parse(Cookies.get('vrpreivew' + getProductId()))
Cookies.remove('vrpreivew' + getProductId())

const state = {
  cookies,
  product: null,
  scenes: {},
  curSceneId: cookies && cookies.scene_id,
  curRotation: null,
}

const mutations = {
  SET_PRODUCT: (state, value) => {
    state.product = value
    if(value){
      document.title = value.name
      value.scenes.forEach(item => { state.scenes[item.scene_id] = item });
      state.curSceneId = state.curSceneId || value.scenes[0].scene_id
    }
  },
  SET_COOKIES: (state, value) => {
    value && Cookies.set('vrpreivew' + getProductId(), value) || Cookies.remove('vrpreivew' + getProductId());
    state.cookies = value
  },
  SET_CURSCENE_ID: (state, value) => {
    state.curSceneId = value
  },
  SET_CURROTATION: (state, value) => {
    state.curRotation = value
  }
}

const actions = {
  async init({state, commit, dispatch}, {getProduct}){
    commit('SET_PRODUCT', await getProduct(getProductId(), true))
  },
  async deinit({state, commit}){
    commit('SET_PRODUCT')
  },
  async setCookies({state, commit}) {
    commit('SET_COOKIES', {scene_id: state.curSceneId, start_rotation: state.curRotation})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules:{ texture, loading, audio}
}
