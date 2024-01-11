<template>
  <div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]">
    <div class="top-sec">
      <router-link to="/Admin/ClassList" class="back-link">
        <!-- <i class="bi bi-arrow-left"></i> -->
        <i class="fa fa-arrow-left"></i>
        <p>Back</p>
      </router-link>
      <div class="line">
        <img src="C:\Users\Pymmie\Desktop\html\TestTer\images\html.png" alt="" />
        <h1>HTML : Hypertext Markup Language</h1>
      </div>
      <router-link to="/Admin/AdminAddClass">
        <button class="btn"><i class="fa fa-plus"></i></button
      ></router-link>
    </div>
    <div class="border border-gray-300 rounded-md p-[20px] h-full">
      <!-- หัวข้อ -->
      <ul class="grid-list">
        <li class="grid-item col-1" style="font-weight: bold">Unit</li>
        <li class="grid-item col-4" style="font-weight: bold">Name</li>

        <li class="grid-item col-3" style="font-weight: bold">Tools</li>
      </ul>

      <!-- ตัวอย่างรายชื่อ -->
      <ul class="grid-list">
        <li class="grid-item col-1">1</li>
        <li class="grid-item col-4">Basic html tag</li>

        <li class="grid-item col-3">
          <router-link to="/Admin/AdminEditClass"><i class="bi bi-pencil" /></router-link
          ><i class="bi bi-trash" style="color: rgb(163, 22, 22);"/>
        </li>
      </ul>

      <!-- <ul class="grid-list">
    <li class="grid-item col-1">2</li>
    <li class="grid-item col-4">User02</li>
  
    <li class="grid-item col-3"><i class="bi bi-pencil "/><i class="bi bi-trash "/></li>
  </ul> -->
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.top-sec {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.line {
  display: flex;
  align-items: start;
}

img {
  width: 3.5vh;
  height: 3.5vh;
  margin-bottom: 1vh;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1vh;
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
  flex-basis: calc(20% - 10px); /* 10% ของความกว้างแต่ละรายการ */
}

.col-4 {
  flex-basis: calc(20% - 10px); /* 10% ของความกว้างแต่ละรายการ */
}

.col-3 {
  flex-basis: calc(60% - 10px); /* 80% ของความกว้างแต่ละรายการ */
}

.bi {
  padding: 3vh;
}

button {
  width: fit-content;
  height: fit-content;
  background-color: #ec4088; /* สีพื้นหลัง */
  color: white; /* สีตัวอักษร */
  border: none; /* ไม่มีเส้นขอบ */
  border-radius: 15px; /* มุมทรงกลม */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* เงา */
  padding: 10px 20px; /* การเว้นระยะขอบของปุ่ม */
  cursor: pointer; /* เปลี่ยนรูปลูกศรเป็นหลังคา */
}

button:hover {
  background-color: #d32f6a; /* สีพื้นหลังเมื่อ hover */
}

.btn {
  margin-bottom: 0.5vh;
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