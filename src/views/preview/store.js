import { getProduct } from '@/utils/server'
import Cookies from 'js-cookie'

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

const sides = [
  {position: [ 0, 0, -1 ],rotation: [ 0, 0, 0 ]},
  {position: [ 1, 0, 0 ],rotation: [ 0, - Math.PI / 2, 0 ]},
  {position: [ 0, 0, 1 ],rotation: [ 0, Math.PI, 0 ]},
  {position: [ - 1, 0, 0 ],rotation: [ 0, Math.PI / 2, 0 ]},
  {position: [ 0, 1, 0 ],rotation: [ Math.PI / 2, 0, Math.PI ]},
  {position: [ 0, - 1, 0 ],rotation: [ - Math.PI / 2, 0, Math.PI ]},
];

const state = {
  product: null,
  scenes: {},
  curSceneId: cookies && cookies.scene_id,
  cookies,
  sides,
}

const mutations = {
  SET_PRODUCT: (state, value) => {
    state.product = value
    document.title = value.name
    value.scenes.forEach(item => { state.scenes[item.scene_id] = item });
  },
  SET_COOKIES: (state, value) => {
    value && Cookies.set('vrpreivew' + getProductId(), value) || Cookies.remove('vrpreivew' + getProductId());
    state.cookies = value
  },
  SET_CURSCENE_ID: (state, value) => {
    state.curSceneId = value
  }
}

const actions = {
  async init({state, commit}){
    commit('SET_PRODUCT', await getProduct(getProductId(), true))
  },
  async deinit({state, commit}){
    commit('SET_PRODUCT')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
