import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import qrData from './modules/qrData'
import ApiMaster from './modules/ApiMaster'
import Authentication from './modules/Authentication'

Vue.use(Vuex)

const DOMAIN_URL = 'https://api.myluxit.ir/'

const API_VER = 'v3'
const BASE_URL = DOMAIN_URL + API_VER + '/'

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vNS4xOTYuMTAxLjUwOjQwMDAvdjMvdXNlcnMvYWN0aXZhdGlvbiIsImlhdCI6MTU0MzkyNjc1NSwibmJmIjoxNTQzOTI2NzU1LCJqdGkiOiJZb05SS1dMcTE5RGIxSnNrIiwic3ViIjozMTcsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.pFO2opAd3wXdwmtm-dvtk97xo5bsdRzJpIsL8Fun6qg'

axios.defaults.baseURL = BASE_URL
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default new Vuex.Store({
  state: {
    BASE_URL
  },
  getters: {
    BASE_URL (state) {
      return state.BASE_URL
    }
  },
  mutations: {

  },
  actions: {

  },

  modules: {
    qrData,
    ApiMaster,
    Authentication
  }
})
