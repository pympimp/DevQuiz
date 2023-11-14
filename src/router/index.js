import { createRouter, createWebHistory } from 'vue-router'
import Home1 from '@/pages/Home1.vue';
import Home2 from '@/pages/Home2.vue';
import Home3 from '@/pages/Home3.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }



  
    {
      path: '/',
      name: 'MainPAge',
      component: () => import('../pages/MainPage.vue')
    },

    {
      path: '/HomePage',
      name: 'HomePage',
      component: () => import('../pages/HomePage.vue')
    },

    {
      path: "/login",
      name: 'LogIn',
      component: () => import('../pages/LogIn.vue') // กำหนดให้หน้าหลักเป็น LogIn.vue
    },

    {
      path: '/home1',
      name: 'Home1',
      component: Home1,
    },
    {
      path: '/home2',
      name: 'Home2',
      component: Home2,
    },
    {
      path: '/home3',
      name: 'Home3',
      component: Home3,
    },


    

   
    
  ]
  



  
});

 export default router
