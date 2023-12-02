import { createRouter, createWebHistory } from 'vue-router'

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
      name: 'MainPage',
      component: () => import('../pages/MainPage.vue'),
      // children:
      // [
      //   {
      //     path:'',
      //     name:'Mainpage',
      //     component: () => import('../pages/MainPage.vue')
      //   }
      // ]
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
      path: "/Articie",
      name: 'Articie',
      component: () => import('../pages/ArticIE.vue') 
    }

    

   
    
  ]
  



  
});

 export default router
