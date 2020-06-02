import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUserId, setUserId } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    user_id: getUserId(),
    name: '',
    avatar: '',
    roles: [],
    menu: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, code, uuid } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, code: code, uuid: uuid }).then(data => {
        commit('SET_TOKEN', 'Bearer ' + data.token)
        setToken('Bearer '+data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
