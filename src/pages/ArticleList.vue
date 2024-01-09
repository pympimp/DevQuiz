<template>
    <div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]">
        <h1>Manage Article</h1>
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <!-- หัวข้อ -->
          <ul class="grid-list" >
            <li class="grid-item col-1" style="font-weight: bold;">ID</li>
            <li class="grid-item col-3"></li>
            <li class="grid-item col-4" style="font-weight: bold;">Articles</li>
            <li class="grid-item col-3" style="font-weight: bold;"></li>
          </ul>
          
          <!-- ตัวอย่างรายชื่อ -->
          <ul class="grid-list">
            <li class="grid-item col-1">1</li>
            <li class="grid-item col-3" style="display: flex; justify-self: center;"><img src="C:\Users\Pymmie\Desktop\html\TestTer\images\html.png" alt="html icon" style="width: 2vh;"></li>
            <li class="grid-item col-4">HTML (Hypertext Markup Language)</li>
            <router-link to="/Admin/AdminManageArticle">
            <li class="grid-item col-3"><i class="bi bi-caret-right-fill"></i></li>
          </router-link>
          </ul>
  
          <ul class="grid-list">
            <li class="grid-item col-1">2</li>
            <li class="grid-item col-3"><img src="C:\Users\Pymmie\Desktop\html\TestTer\images\css.png" alt="css icon" style="width: 2vh;"></li>
            <li class="grid-item col-4">CSS (Cascading Style Sheets)</li>
            <li class="grid-item col-3"><i class="bi bi-caret-right-fill"></i></li>
          </ul>
  
          <ul class="grid-list">
            <li class="grid-item col-1">3</li>
            <li class="grid-item col-3"><img src="C:\Users\Pymmie\Desktop\html\TestTer\images\javascript.png" alt="css icon" style="width: 2vh;"></li>
            <li class="grid-item col-4">JavaScript</li>
            <li class="grid-item col-3"><i class="bi bi-caret-right-fill"></i></li>
          </ul>
  
        </div>
      </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .admin {
    background-color: rgb(183, 229, 229);
  }
  
  .grid-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
  }
  
  .grid-item {
    /* background-color: #f2f2f2; */
    padding: 10px;
    text-align: center;
  }
  
  .col-1 {
    flex-basis: calc(5% - 10px);
  }
  
  .col-4 {
    flex-basis: calc(45% - 10px);
  }
  .col-2 {
    flex-basis: calc(10% - 10px);
  }
  
  .col-3 {
    flex-basis: calc(20% - 10px);
  }
  
  .bi{
    padding: 3vh;
  }
  
  /* Customize as needed for other column sizes */
  </style>
  