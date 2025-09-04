import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Categories from '@/components/Categories.vue'
import Series from '@/components/Series.vue'
import About from '@/components/About.vue'

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
        { path: '/about', component: About },
      ],
    },
  ],
})

export default router
