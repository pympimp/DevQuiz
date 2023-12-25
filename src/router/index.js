import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: () => import('../pages/MainPage.vue')
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
      path: '/login',
      name: 'LogIn',
      component: () => import('../pages/LogIn.vue') // กำหนดให้หน้าหลักเป็น LogIn.vue
    },

    {
      path: '/register',
      name: 'RegisteR',
      component: () => import('../pages/RegisteR.vue') // กำหนดให้หน้าหลักเป็น LogIn.vue
    },

    {
      path: '/Articie',
      name: 'Articie',
      component: () => import('../pages/ArticIE.vue')
    },

    {
      path: '/Class',
      name: 'Class',
      component: () => import('../pages/ClasS.vue') 
    },


    {
      path: "/EditUser",
      name: 'EditUser',
      component: () => import('../pages/EditUser.vue') 
    },

    {
      path: "/EditPassword",
      name: 'EditPassword',
      component: () => import('../pages/EditPassword.vue') 
    },

    {
      path: "/UserProfile",
      name: 'UserProfile',
      component: () => import('../pages/Userprofile.vue') 
    }
    
    

   
    
  ]
})

// const routes = [
// {
  // {
  //   path: '/',
  //   name: 'MainPage',
  //   component: () => import('../pages/MainPage.vue')
  // },

  // {
  //   path: '/HomePage',
  //   name: 'HomePage',
  //   component: () => import('../pages/HomePage.vue')
  // },

  // {
  //   path: '/login',
  //   name: 'LogIn',
  //   component: () => import('../pages/LogIn.vue') // กำหนดให้หน้าหลักเป็น LogIn.vue
  // },

  // {
  //   path: '/register',
  //   name: 'RegisteR',
  //   component: () => import('../pages/RegisteR.vue') // กำหนดให้หน้าหลักเป็น LogIn.vue
  // },

  // {
  //   path: '/Articie',
  //   name: 'Articie',
  //   component: () => import('../pages/ArticIE.vue')
  // },

  // {
  //   path: '/Class',
  //   name: 'Class',
  //   component: () => import('../pages/ClasS.vue')
  // },

  // {
  //   path: '/AdminDashboard',
  //   name: '/AdminDashboard',
  //   component: () => import('../pages/AdDashBoard.vue')
  // },

  // {
  //   path: '/AdminManageUser',
  //   name: '/AdminManageUser',
  //   component: () => import('../pages/AdManageUser.vue')
  // }
// }
// ]
// const router = Router();
// export default router;
// function Router(){
//   const router = new createRouter({
//     history: createWebHistory(),
//     routes,
//   })
    // return router;
// }

export default router
