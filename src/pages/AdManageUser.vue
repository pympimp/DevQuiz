<template><div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]">
  <h1>Manage User</h1>
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
      <li class="grid-item col-3"><router-link to="/Admin/AdminEditUser"><i class="bi bi-pencil "/></router-link><i class="bi bi-trash "/></li>
    </ul>

    <ul class="grid-list">
      <li class="grid-item col-1">2</li>
      <li class="grid-item col-4">User02</li>
      <li class="grid-item col-3">User02@gmail.com</li>
      <li class="grid-item col-2">User</li>
      <li class="grid-item col-3"><i class="bi bi-pencil "/><i class="bi bi-trash "/></li>
    </ul>
  </div>
</div>
</template>

<script setup>


</script>


<style>
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
