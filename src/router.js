import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './views/main_page.vue'
import Profile from './views/profile.vue'
import Login from './views/login.vue'
import Artist from './views/artist.vue'
import Place from './views/place.vue'
import Event from './views/event.vue'
import Categories from './views/categories.vue'
import Posts from './views/posts.vue'
import CategoryPosts from './views/category-posts.vue'
import search from './views/search.vue'
import AboutUs from './views/aboutus.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: MainPage,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/artist',
      name: 'artist',
      component: Artist
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    },
    {
      path: '/place',
      name: 'place',
      component: Place
    },
    {
      path: '/event',
      name: 'event',
      component: Event
    },
    {
      path: '/category-posts',
      name: 'category-posts',
      component: CategoryPosts
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
