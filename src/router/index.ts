import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Categories from '@/views/Categories.vue'
import Series from '@/views/Series.vue'
import SeriesReviews from '@/views/SeriesReviews.vue'
import About from '@/views/About.vue'
import Review from '@/views/Review.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: '/', name: '', component: Categories },
        { path: '/category/:slug', name: 'Categories', component: Categories },
        { path: '/series/:slug', name: 'Series Reviews', component: SeriesReviews },
        { path: '/series', name: 'Series', component: Series },
        { path: '/about', name: 'About', component: About },
      ],
    },
    {
      path: '/:slug',
      name: 'Review',
      component: Review,
    },
  ],
})

export default router
