<template>
<div class="h-[calc(98vh-50px)] bg-gray-50 p-[20px] ">
          <h1>Manage Class</h1>
          <div class="border border-gray-300 rounded-md p-[20px] h-full">
            <!-- หัวข้อ -->
            <ul class="grid-list" >
              <li class="grid-item col-1" style="font-weight: bold;">ID</li>
              <li class="grid-item col-3"></li>
              <li class="grid-item col-4" style="font-weight: bold;">Class</li>
              <li class="grid-item col-3" style="font-weight: bold;"></li>
            </ul>
            
            <!-- ตัวอย่างรายชื่อ -->
            <ul class="grid-list">
              <li class="grid-item col-1">1</li>
              <li class="grid-item col-3" style="display: flex; justify-self: center;"><img src="C:\Users\Pymmie\Desktop\html\TestTer\images\html.png" alt="html icon" style="width: 2vh;"></li>
              <li class="grid-item col-4">HTML (Hypertext Markup Language)</li>
              <li class="grid-item col-3"><i class="bi bi-caret-right-fill"></i></li>
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
    // import { ref } from 'vue';
    
    // const users = ref([
    //   { id: 1, username: 'User01', email: 'user01@gmail.com', role: 'Admin' },
    //   { id: 2, username: 'User02', email: 'user02@gmail.com', role: 'User' },
    //   // เพิ่มข้อมูลผู้ใช้เพิ่มเติมตามต้องการ
    // ]);
    
    </script>
    
    <style scoped>
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .admin {
      background-color: rgb(183, 229, 229);
    }
    
    .border {
      max-height: 20vh;
    }
    
    .container {
      width: 100%;
      height: 100%;
    }
    
    .grid-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0;
      flex-direction: row;
    }
    
    .grid-item {
      padding: 0px;
      text-align: center;
      margin: 5px;
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
    
    .bi {
      padding: 3vh;
    }
    .byd{
      height: 100vh;
      width: 100vh;
      background-color: white;
      padding: 20px;
    }
    </style>
    