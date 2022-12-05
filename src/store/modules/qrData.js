
const state = {
  QRState: false
}

const getters = {
  QRState (state) {
    return state.QRState
  }
}
const mutations = {
  openQR (state) {
    state.QRState = true
  },
  closeQR (state) {
    state.QRState = false
  }
}

export default {
  state,
  getters,
  mutations
}
