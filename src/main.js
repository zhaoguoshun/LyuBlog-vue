import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
//element ui
import Element from 'element-ui'
import  'element-ui/lib/theme-chalk/index.css'
import utils from './utils'

//markdown
import VMdpreview from '@kangc/v-md-editor/lib/preview'
import   '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from  '@kangc/v-md-editor/lib/theme/github'
VMdpreview.use(githubTheme)
Vue.use(VMdpreview);
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';


VueMarkdownEditor.use(vuepressTheme);
Vue.use(VueMarkdownEditor);

//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper,)


Vue.use(Element);
Vue.config.productionTip = false
Vue.prototype.utils=utils

Vue.directive('title',{
  inserted (dom){
    document.title = dom.dataset.title
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
