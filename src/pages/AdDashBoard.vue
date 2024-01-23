<template>
  <div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]" style="background-color: #f5fcff">
    <h1>Dashboard</h1>
    <div class="border border-gray-300 rounded-md p-[20px] h-full">
      <!-- หัวข้อ -->
      <div class="containers">
        <div class="box-container">
          <div class="box-1">
            <div class="about-text">
              <h1>ยินดีต้อนรับ</h1>
              <p>ระบบ e-Laerning แบบ Interactive สำหรับวิชาการเขียนโปรแกรมเบื้องต้น</p>
            </div>
            <div class="about-content">
              <div class="about-image">
                <img src="/images/main.png" alt="Main Image" class="h-auto" />
              </div>
            </div>
          </div>
          <div class="box-2-3-container">
            <div class="box-2">
              จำนวนผู้ใช้งานวันนี้
              <p>0 คน</p>
            </div>
            <div class="box-3">
              จำนวนสมาชิกที่เข้าใช้ระบบ
              <p v-if="userStatAll">{{ userStatAll.totalCount }} คน</p>
            </div>
          </div>
          <!-- <div class="box-4">Box 4</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthenStore } from '../stores/auth'

const authenStore = useAuthenStore()
const userStatAll = ref()

onMounted(() => {
  setTimeout(() => {
    const eventSource = new EventSource(
      `http://localhost:5000/test-elearning-b0646/us-central1/api/user/userStat/${authenStore.auth.id}`
    )
    eventSource.addEventListener('message', (event) => {
      const eventData = JSON.parse(event.data)
      userStatAll.value = eventData
      console.log('stat', eventData)
    })
  }, 800)
})
</script>

<style scoped>
.box-1 {
  background-color: #ececec;
  padding: 20px;
  margin-top: -5px;
  margin-bottom: 20px;
  border-radius: 5px;
  height: 350px;
  display: flex;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}

.about-content {
  display: flex;
  align-items: center;
}

.about-image {
  width: 400px;
  height: 250px;
  margin-top: -45px;
  /* background-color: #bfffbf; */
  margin-right: 30px;
}

.about-text {
  margin-top: 55px;
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
  margin-bottom: 20px;
  height: 220px;
}

.box-2 {
  flex-grow: 1;
  background-color: #ececec;
  padding: 20px;
  margin-right: 25px;
  border-radius: 5px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}

.box-2 p {
  font-size: 50px;
  color: #2685ad;
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
  color: #2685ad;
}

.box-4 {
  background-color: #ececec;
  padding: 20px;
  border-radius: 5px;
  height: 150px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}
</style>
