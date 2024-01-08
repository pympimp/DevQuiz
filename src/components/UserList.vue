<template>
  <div class="byd">
    <div class="container">
      <h1>Manage User</h1>
      <div class="border border-gray-300 rounded-md h-full w-full">
        <!-- หัวข้อ -->
        <ul class="grid-list">
          <li class="grid-item col-1" style="font-weight: bold;">ID</li>
          <li class="grid-item col-4" style="font-weight: bold;">Username</li>
          <li class="grid-item col-3" style="font-weight: bold;">Email</li>
          <li class="grid-item col-2" style="font-weight: bold;">Role</li>
          <li class="grid-item col-3" style="font-weight: bold;">Tools</li>
        </ul>

        <!-- ตัวอย่างรายชื่อ -->
        <ul class="grid-list" v-for="user in users" :key="user.id">
          <li class="grid-item col-1">{{ user.id }}</li>
          <li class="grid-item col-4">{{ user.username }}</li>
          <li class="grid-item col-3">{{ user.email }}</li>
          <li class="grid-item col-2">{{ user.role }}</li>
          <li class="grid-item col-3">
            <router-link to="/login">
              <i class="bi bi-pencil" />
            </router-link>
            <i class="bi bi-trash" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
  { id: 1, username: 'User01', email: 'user01@gmail.com', role: 'Admin' },
  { id: 2, username: 'User02', email: 'user02@gmail.com', role: 'User' },
  // เพิ่มข้อมูลผู้ใช้เพิ่มเติมตามต้องการ
]);

</script>

<style>
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
