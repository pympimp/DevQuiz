<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.17.0/font/bootstrap-icons.css" rel="stylesheet">
    <div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]">
      <router-link to="/Admin/AdminManageUser" class="back-link">
              <!-- <i class="bi bi-arrow-left"></i> -->
              <i class="fa fa-arrow-left"></i> <p>Back</p>
            </router-link>
    
          <div class="border border-gray-300 rounded-md p-[20px] h-full">
            <h1>Add User</h1>
            <div>
        <h3>ID : 1</h3>
        <h3>Username :</h3>
        <input type="text" v-model="username" >
    
        <h3>Email :</h3>
        <input type="text" v-model="email" >
    
        <h3>Password :</h3>
        <input type="password" v-model="password" >
    
        <br>
    
        <button type="submit">Submit</button>
    
      </div>
            </div>
        </div>
    </template>
    
    <script setup>
    </script>
    
    <style scoped>
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1vh;
    }
    h3 {
      font-size: 1rem;
    }
    input {
      width: 20%;
      border-radius: 15px;
      box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1); /* กำหนดเงา */
      border: none; /* กำหนดไม่มีเส้นขอบ */
      margin: 5px; /* กำหนดการเว้นระยะขอบของ input */
    }
    
    button {
      background-color: #EC4088; /* สีพื้นหลัง */
      color: white; /* สีตัวอักษร */
      border: none; /* ไม่มีเส้นขอบ */
      border-radius: 15px; /* มุมทรงกลม */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* เงา */
      padding: 10px 20px; /* การเว้นระยะขอบของปุ่ม */
      cursor: pointer; /* เปลี่ยนรูปลูกศรเป็นหลังคา */
      margin-left: 23vh;
      margin-top: 1.5vh;
    }
    
    button:hover {
      background-color: #D32F6A; /* สีพื้นหลังเมื่อ hover */
    }
    
    .back-link {
      text-decoration: none;
      color: #333;
      display: flex;
      align-items: center;
      margin-bottom: 1vh;
    }
    
    .back-link i {
    color: #D32F6A;
      font-size: 2vh;
    }
    
    .back-link p {
      color: #D32F6A;
      font-weight: bolder;
      margin-left: 2vh;
      font-size: 2vh;
    }
    </style>