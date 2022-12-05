import axios from 'axios'

const state = {
  // User
  loginState: false,
  // Authentication
  // Posts
  indexPosts: [],
  lastPagePosts: false,
  // Events
  eventContent: {},
  eventContentImages: [],
  eventComments: [],
  // File
  // Places

  // User Bookmarks
  // Rating

  // Categories
  indexCategories: [],
  filteredIndexCategories: [],
  categoriesName: [], // Fetch category name by id
  categoryPosts: [],
  lastPageCategoryPosts: false,
  // Comments
  // Adimins
  // Tags
  // Authers
  // Photographers
  // Search
  // Cities
  indexCities: [],
  currentCityId: '',
  // Celebrities
  // Characters
  //  Loader

  categoriesLoader: false,
  categoryPostsLoader: false,
  postsLoader: false

}

const getters = {
  // User
  loginState (state) {
    return state.loginState
  },

  // Events

  eventContent (state) {
    return state.eventContent
  },

  eventContentImages (state) {
    return state.eventContentImages
  },

  eventComments (state) {
    return state.eventComments
  },

  // Posts

  indexPosts (state) {
    return state.indexPosts
  },
  lastPagePosts (state) {
    return state.lastPagePosts
  },

  // Categories

  indexCategories (state) {
    return state.indexCategories
  },
  filteredIndexCategories (state) { // filters the categories for main page
    return state.filteredIndexCategories
  },
  categoryPosts (state) {
    return state.categoryPosts
  },
  categoriesName (state) {
    return state.categoriesName
  },
  lastPageCategoryPosts (state) {
    return state.lastPageCategoryPosts
  },

  // Cities

  indexCities (state) {
    return state.indexCities
  },
  currentCityId (state) {
    return state.currentCityId
  },

  // Loader

  categoriesLoader (state) {
    return state.categoriesLoader
  },
  categoryPostsLoader (state) {
    return state.categoryPostsLoader
  },
  postsLoader (state) {
    return state.postsLoader
  }
}

const mutations = {
  // User

  setLoginState (state, data) {
    state.loginState = data
  },

  // Events

  setEventContent (state, data) {
    state.eventContent = data
  },

  setEventContentImages (state) {
    let temp = state.eventContent.media
    let urls = []
    for (let i in temp) {
      urls.push('http://' + temp[i]['path'])
    }
    state.eventContentImages = urls
  },

  setEventComments (state, data) {
    state.eventComments = data
  },

  // Posts

  setIndexPosts (state, data) {
    state.indexPosts = [...state.indexPosts, ...data]
  },
  resetIndexPosts (state) {
    state.indexPosts = []
  },
  setLastPagePosts (state, data) {
    state.lastPagePosts = data
  },

  // Categories

  setIndexCategories (state, data) {
    state.indexCategories = data
  },
  filteredIndexCategories (state) {
    let primary = state.indexCategories
    let secondary = []
    let idList = [7, 14, 21, 26]

    for (let i = 0; i < primary.length; i++) {
      if (idList.includes(primary[i]['id'])) {
        secondary.push(primary[i])
      }
    }
    state.filteredIndexCategories = secondary
  },
  setCategoryPosts (state, data) {
    state.categoryPosts = [...state.categoryPosts, ...data]
  },
  resetCategoryPosts (state) {
    state.categoryPosts = []
  },

  categoriesName (state) {
    let primary = state.indexCategories
    let secondary = {}

    for (let i in primary) {
      secondary[primary[i]['id']] = primary[i]['name']
    }

    state.categoriesName = secondary
  },
  setLastPageCategoryPosts (state, data) {
    state.lastPageCategoryPosts = data
  },

  // Cities

  setIndexCities (state, data) {
    state.indexCities = data
  },
  setCurrentCityId (state, data) {
    state.currentCityId = data
  },

  // Loader

  setCategoriesLoader (state, data) {
    state.categoriesLoader = data
  },
  setCategoryPostsLoader (state, data) {
    state.categoryPostsLoader = data
  },
  setPostsLoader (state, data) {
    state.postsLoader = data
  }

}

const actions = {

  // Events

  getEventContent ({ commit }, eventId) {
    commit('setEventComments', {})
    commit('setEventContentImages')

    axios.get(`events/${eventId}`)
      .then(data => {
        commit('setEventContent', data.data)
      })
      .catch(err => console.log(err))
  },

  getEventComments ({ commit }, eventId) {
    axios.get(`events/${eventId}/comments`)
      .then(data => {
        commit('setEventComments', data.data)
        commit('setEventContentImages')
      })
      .catch(err => console.log(err))
  },

  // Posts

  getIndexPosts ({ commit }, data) {
    axios.get(`posts?page=${data.page}${data.city}`)
      .then(data => {
        commit('setIndexPosts', data.data.data)
        commit('setPostsLoader', false)

        if (data.data.meta.last_page === data.data.meta.current_page) {
          commit('setLastPagePosts', true)
        }
      })
      .catch(err => console.log(err))
  },

  // Categories

  getIndexCategories ({ commit }) {
    commit('setIndexCategories', [])
    axios.get('categories')
      .then(data => {
        commit('setCategoriesLoader', false)
        commit('setIndexCategories', data.data)
        commit('filteredIndexCategories')
        commit('categoriesName')
      })
      .catch(err => console.log(err))
  },
  getCategoryPosts ({ commit }, data) {
    commit('setCategoryPosts', [])

    axios.get(`categories/${data.categoryId}?page=${data.page}&city_id=${data.city}`)
      .then(data => {
        commit('setCategoryPostsLoader', false)
        commit('setCategoryPosts', data.data.items)
        let temp = data.data.items.length
        console.log(temp)
        if (temp === 0) {
          commit('setLastPageCategoryPosts', true)
        }
      })
      .catch(err => console.log(err))
  },

  // Cities

  getIndexCities ({ commit }) {
    axios.get('cities')
      .then(data => {
        commit('setIndexCities', data)
      })
      .catch(err => console.log(err))
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
