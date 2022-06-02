import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

// const storeUser = useUserStore()



// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// })
// function adminGuard(to:string, from:string, next:any) {
//   if (storeUser.user?.username=='admin') {
//     next(); // allow to enter route
//   }
//   else {
//     next('/login'); // go to '/login';
//   }
// }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/profile',
      name: 'lprofile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/admin/main',
      name: 'admin-main',
      // beforeEnter: adminGuard,
      component: () => import('../views/admin/Main.vue')
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   // we wanted to use the store here
//   if (store.isLoggedIn) next()
//   else next('/login')
// })

router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const storeUser = useUserStore()
 console.log(to)
  if (true && storeUser.user?.username !=='admin') return '/login'
})

export default router
