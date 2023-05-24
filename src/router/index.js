import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const ManageView = () => import('@/views/ManageView.vue')
const SongView = () => import('@/views/SongView.vue')

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeView
  },
  {
    name: "about",
    path: "/about",
    component: AboutView
  },
  {
    name: "manage",
    path: "/manage-music",
    component: ManageView,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard')
      next()
    }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    name: 'song',
    path: '/song/:id',
    component: SongView
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

// router.beforeEach((to, from, next) => {
//   console.log('Global guard')
//   console.log(to, from)

//   next()
// })

export default router
