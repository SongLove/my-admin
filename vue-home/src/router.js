import Vue from 'vue'
import VueRouter from 'vue-router'
import Article from './views/Article/ArticleDetails.vue'
import Home from './views/Home/Home.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/article',
      component: Article,
      name: Article.name
    },
    {
      path: '/home',
      component: Home,
      name: Home.name
    }
  ]
})


export default router