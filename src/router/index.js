import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/compat/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty'},
    component: () => import('../views/login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: { layout: 'empty'},
    component: () => import('../views/registration.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/profile.vue')
  },
  {
    path: '/book',
    name: 'book',
    meta: { layout: 'main'},
    component: () => import('../views/book.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    meta: { layout: 'main'},
    component: () => import('../views/admin/orders.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: { layout: 'main'},
    component: () => import('../views/admin/order.vue')
  },
  {
    path: '/addBook',
    name: 'addBook',
    meta: { layout: 'main'},
    component: () => import('../views/admin/addBook.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: { layout: 'main'},
    component: () => import('../views/search.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// to - куда, from - откуда, next - пропустить куда либо
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  //const requireAdmin = to.matched.some(record => record.meta.admin)

  if (requireAuth && !currentUser) {
    next('/login')
  }
  else {
    next()
  }
  /*
  if (requireAdmin && this.$store.getters.info.role == 'admin') {
    next()
  }
  else {
    next('/')
  }
  */
})

export default router
