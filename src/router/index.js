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
      path: '/',
      name: 'MainPage',
      component: () => import('../pages/MainPage.vue')
    },
    {
      path:'/play',
      name:'plat',
      component:()=> import('../pages/PlayGround.vue')
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
      path: '/Articie/:ArticieId',
      name: 'Articie',
      component: () => import('../pages/ArticIE.vue')
    },
  
    {
      path: '/Class/:classId',
      name: 'Class',
      component: () => import('../pages/ClasS.vue')
    },
  
    {
      path: '/AdminDashboard',
      name: '/AdminDashboard',
      component: () => import('../pages/AdDashBoard.vue')
    },
  
    {
      path: '/AdminManageUser',
      name: '/AdminManageUser',
      component: () => import('../pages/AdManageUser.vue')
    },
    

    {
      path: "/UserProfile",
      name: 'UserProfile',
      component: () => import('../pages/Userprofile.vue') 
    },

    {
      path:'/Admin',
      name:'admin',
      component: () => import('../layouts/AdNav.vue'),
      children:
      [
        {
          path: "AdminDashboard",
          name: 'AdminDashboard',
         component: () => import('../pages/AdDashBoard.vue') 
       },
        {
          path: "AdminManageUser",
          name: 'AdminManageUser',
          component: () => import('../pages/AdManageUser.vue') 
        },
        {
          path: "AdminManageClass",
          name: 'AdminManageClass',
          component: () => import('../pages/AdManageClass.vue') 
        },
        {
          path: "AdminManageArticle",
          name: 'AdminManageArticle',
          component: () => import('../pages/AdManageArticle.vue') 
        },
        {
          path: "AdminEditUser",
          name: "AdminEditUser",
          component: () => import('../pages/AdEditUser.vue') 
        },
        {
          path: "AdminAddUser",
          name: "AdminAddUser",
          component: () => import('../pages/AdAddUser.vue') 
        },

        {
          path: "ArticleList",
          name: "ArticleList",
          component: () => import('../pages/ArticleList.vue') 
        },

        {
          path: "AdminEditArticle",
          name: "AdminEditArticle",
          component: () => import('../pages/AdEditArticle.vue') 
        },

        {
          path: "AdminAddArticle",
          name: "AdminAddArticle",
          component: () => import('../pages/AdAddArticle.vue') 
        },

        {
          path: "ClassList",
          name: "ClassList",
          component: () => import('../pages/ClassList.vue') 
        },

        {
          path: "AdminEditClass",
          name: "AdminEditClass",
          component: () => import('../pages/AdEditClass.vue') 
        },

        
        {
          path: "AdminAddClass",
          name: "AdminAddClass",
          component: () => import('../pages/AdAddClass.vue') 
        },
      ]
    }
    
  ]
})

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
