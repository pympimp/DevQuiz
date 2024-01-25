<template>
  <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#ff1d5e"
            class="loading"
            v-if="isLoading"
          />
  <div v-if="!isLoading" class="h-[calc(100vh-50px)] p-[20px]" style="background-color: #fff">
    <h1>Dashboard</h1>
    <div class="containers">
      <div class="box-container">
        <div class="box-1">
          <VueApexCharts type="bar" :options="chartOptions" :series="series" style="width: 500px;height: 300px;"></VueApexCharts>
          <!-- <div class="about-text">
                  <h1>ยินดีต้อนรับ</h1>
                  <p>ระบบ e-Laerning แบบ Interactive สำหรับวิชาการเขียนโปรแกรมเบื้องต้น</p>
                </div>
              <div class="about-content">
                <div class="about-image">
                  <img src="/images/main.png" alt="Main Image" class="h-auto">
                </div>
              </div> -->
        </div>
      </div>
      <div class="box-2-3-container">
        <div class="box-2">
          จำนวนผู้ใช้งานวันนี้
          <transition mode="out-in">
          <p v-if="userStatAll" :key="userStatAll.totalCount">{{ userStatAll.totalCount }} คน</p>
        </transition>

        </div>
        <div class="box-3">
          จำนวนสมาชิกที่เข้าใช้ระบบ
          <p v-if="userData" >{{ userData.length }} คน</p>
        </div>
      </div>
      <!-- <div class="box-4">Box 4</div> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useAuthenStore } from '../stores/auth'
import { HalfCircleSpinner } from 'epic-spinners'
import VueApexCharts from 'vue3-apexcharts'

const authenStore = useAuthenStore()
const userStatAll = ref()
const isLoading = ref(false)
const userData = ref()
const chartOptions = ref({
  chart: {
    id: 'basic-bar',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
});

const series = ref([
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
]);

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    countStat()
    fetchUser()
    isLoading.value = false
  }, 800)
})

const countStat = () => {
  const fetchData = () => {
    if (authenStore.auth.id) {
      const eventSource = new EventSource(
        `http://localhost:5000/test-elearning-b0646/us-central1/api/user/userStat/${authenStore.auth.id}`
      )
      eventSource.addEventListener('message', (event) => {
        const eventData = JSON.parse(event.data)
        userStatAll.value = eventData
        console.log("stat",userStatAll.value)
      })
    }
  }

  // เรียก fetchData ครั้งแรก
  fetchData()

  // เรียก fetchData ทุก 1 นาที
  setInterval(fetchData, 60000) // 1 นาที = 60,000 มิลลิวินาที
}

const fetchUser = async() =>{
const result = await axios.get("http://localhost:5000/test-elearning-b0646/us-central1/api/user")
if(result){
  userData.value = result.data
  console.log(userData.value)
}
}
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
  font-weight: bolder;
  padding-bottom: 1.5%;
}
.loading {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
}
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
  font-size: 1.2rem;
  font-weight: bolder;
  height: 100%;
  display: flex; /* เพิ่มบรรทัดนี้ */
  flex-direction: column; /* เพิ่มบรรทัดนี้ */
}

.box-2 p {
  font-size: 50px;
  color: #ec4088;
  margin: 0;
  justify-self: center;
  align-self: center;
  padding-top: 3%;
}

.box-3 {
  flex-grow: 1;
  background-color: #ececec;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
  font-size: 1.2rem;
  font-weight: bolder;
}

.box-3 p {
  font-size: 50px;
  color: #ec4088;
}

.box-4 {
  background-color: #ececec;
  padding: 20px;
  border-radius: 5px;
  height: 150px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}
</style>
