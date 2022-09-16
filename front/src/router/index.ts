import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/public/Home.vue'
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
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/public/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/public/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/public/Login.vue')
    },
    {
      path: '/profile',
      name: 'lprofile',
      component: () => import('../views/public/Profile.vue')
    },
    {
      path: '/admin/main',
      name: 'admin-main',
      // beforeEnter: adminGuard,
      component: () => import('../views/admin/Main.vue')
    },
    {
      path: '/admin/post/:id',
      name: 'admin-post',
      // beforeEnter: adminGuard,
      component: () => import('../views/admin/Post.vue')
    },
    {
      path: '/post/:id',
      name: 'common-post',
      component: () => import('../views/user/Post.vue')
    },

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
  if (storeUser.user?.username == 'admin') {
  } else {
    const category = to.path.split('/')[1];
    if (category == 'admin') return '/login'
  }
  if (to.path == '/profile' && !storeUser.user?.username) return '/login'
});

export default router
