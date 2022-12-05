import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false
Vue.filter('toCurrency', function (str) {
  console.log(str);
  str = String(str)
  str = str.replace(/\,/g, '');
  var objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');
  while (objRegex.test(str)) {
    str = str.replace(objRegex, '$1,$2');
  }
  return str;
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
