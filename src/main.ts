import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import PortalVue from 'portal-vue';
import Vuex from 'vuex';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(PortalVue);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
