import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Categories from '@/views/Categories.vue'
import Series from '@/views/Series.vue'
import About from '@/views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: '', component: Categories },
        { path: '/category/:slug', component: Categories },
        { path: '/series/:slug?', component: Series },
        { path: '/series', component: Series },
        { path: '/about', component: About },
      ],
    },
  ],
})

export default router
