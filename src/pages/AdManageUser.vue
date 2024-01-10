<template><div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]">
  <div class="top-sec">
  <h1>Manage User</h1>
  <router-link to="AdminAddUser">
  <button class="btn"><i class="fa fa-plus"></i></button>
</router-link>
</div>
  <div class="border border-gray-300 rounded-md p-[20px] h-full">

    <!-- หัวข้อ -->
    <ul class="grid-list" >
      <li class="grid-item col-1" style="font-weight: bold;">ID</li>
      <li class="grid-item col-4" style="font-weight: bold;">Username</li>
      <li class="grid-item col-3" style="font-weight: bold;">Email</li>
      <li class="grid-item col-2" style="font-weight: bold;">Role</li>
      <li class="grid-item col-3" style="font-weight: bold;">Tools</li>
    </ul>
    
    <!-- ตัวอย่างรายชื่อ -->
    <ul class="grid-list">
      <li class="grid-item col-1">1</li>
      <li class="grid-item col-4">User01</li>
      <li class="grid-item col-3">User01@gmail.com</li>
      <li class="grid-item col-2">Admin</li>
      <li class="grid-item col-3"><router-link to="/Admin/AdminEditUser"><i class="bi bi-pencil "/></router-link><i class="bi bi-trash" style="color: rgb(163, 22, 22);"/></li>
    </ul>

    <!-- <ul class="grid-list">
      <li class="grid-item col-1">2</li>
      <li class="grid-item col-4">User02</li>
      <li class="grid-item col-3">User02@gmail.com</li>
      <li class="grid-item col-2">User</li>
      <li class="grid-item col-3"><i class="bi bi-pencil "/><i class="bi bi-trash "/></li>
    </ul> -->
  </div>
</div>
</template>

<script setup>


</script>


<style scoped>

.top-sec {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

btn{
  width: fit-content;
  height: fit-content;
  margin-bottom: 20px;
}

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

button {
  width: fit-content;
  height: fit-content;
  background-color: #EC4088; /* สีพื้นหลัง */
  color: white; /* สีตัวอักษร */
  border: none; /* ไม่มีเส้นขอบ */
  border-radius: 15px; /* มุมทรงกลม */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* เงา */
  padding: 10px 20px; /* การเว้นระยะขอบของปุ่ม */
  cursor: pointer; /* เปลี่ยนรูปลูกศรเป็นหลังคา */

}

button:hover {
  background-color: #D32F6A; /* สีพื้นหลังเมื่อ hover */
}

button i {
  width: fit-content;
  height: fit-content;
}

.btn{
  margin-bottom: 0.5vh;
}

/* Customize as needed for other column sizes */
</style>
