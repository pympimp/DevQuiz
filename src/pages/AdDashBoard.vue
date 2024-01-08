<template>
  <Dashboard />
</template>

<script setup>
import Dashboard from '../components/DashBoard.vue'
</script>

<style scoped>
.box-1 {
  background-color: #ececec;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  height: 250px;
  display: flex;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}

.about-content {
  display: flex;
  align-items: center;
}

.about-image {
  width: 300px;
  height: 250px;
  margin-top: 15px;
  /* background-color: #bfffbf; */
  margin-right: 30px;
}

.about-text p {
  font-size: 40px;
  margin-left: 10px;
  /* background-color: #bfffbf; */
}

.about-text h1 {
  font-size: 50px;
  margin-left: 190px;
}

.box-2-3-container {
  display: flex;
  margin-bottom: 10px;
  height: 150px;
}

.box-2 {
  flex-grow: 1;
  background-color: #ececec;
  padding: 20px;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}

.box-2 p {
  font-size: 50px;
}

.box-3 {
  flex-grow: 1;
  background-color: #ececec;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}

.box-3 p {
  font-size: 50px;
}

.box-4 {
  background-color: #ececec;
  padding: 20px;
  border-radius: 5px;
  height: 150px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}
</style>
