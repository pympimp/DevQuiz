<template>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.17.0/font/bootstrap-icons.css"
      rel="stylesheet"
    />
    <div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]">
      <router-link to="/Admin/AdminManageClass" class="back-link">
        <!-- <i class="bi bi-arrow-left"></i> -->
        <i class="fa fa-arrow-left"></i>
        <p>Back</p>
      </router-link>
  
      <div class="border border-gray-300 rounded-md p-[20px] h-full">
        <h1>Add Class</h1>
        <h3>Article :</h3>
        <h4 style="font-weight: bold;"> P Tag</h4>
        <h4>มีไว้เพื่อกำหนดย่อหน้า เมื่อมีแท็กครอบที่ข้อความจะทำให้ขึ้นบรรทัดใหม่เสมอ </h4>
        <div>
          <h3>Class :</h3>
          <input type="text" v-model="header" />
  
          <h3>Code format :</h3>
          <textarea v-model="body" class="body"></textarea>
  
          <br />
  
          <button type="submit">Submit</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1vh;
  }
  
  h3 {
    font-size: 1rem;
    color: #089DAA;
    font-weight: bold;
  }
  
  input {
    width: 50%;
    border-radius: 15px;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1); /* กำหนดเงา */
    border: none; /* กำหนดไม่มีเส้นขอบ */
    margin: 5px; /* กำหนดการเว้นระยะขอบของ input */
  }
  textarea.body {
    width: 50%;
    height: 40vh;
    border-radius: 15px;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1); /* กำหนดเงา */
    border: none; /* กำหนดไม่มีเส้นขอบ */
    margin: 5px;
  }
  
  button {
    background-color: #ec4088; /* สีพื้นหลัง */
    color: white; /* สีตัวอักษร */
    border: none; /* ไม่มีเส้นขอบ */
    border-radius: 15px; /* มุมทรงกลม */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* เงา */
    padding: 10px 20px; /* การเว้นระยะขอบของปุ่ม */
    cursor: pointer; /* เปลี่ยนรูปลูกศรเป็นหลังคา */
    margin-left: 71vh;
    margin-top: 1.5vh;
  }
  
  button:hover {
    background-color: #d32f6a; /* สีพื้นหลังเมื่อ hover */
  }
  
  .back-link {
    text-decoration: none;
    color: #333;
    display: flex;
    align-items: center;
    margin-bottom: 1vh;
  }
  
  .back-link i {
    color: #d32f6a;
    font-size: 2vh;
  }
  
  .back-link p {
    color: #d32f6a;
    font-weight: bolder;
    margin-left: 2vh;
    font-size: 2vh;
  }
  </style>
  