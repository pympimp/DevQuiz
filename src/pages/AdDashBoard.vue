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
          <apexchart
            type="bar"
            :options="chartOptions"
            :series="series"
            style="width: 500px; height: 300px"
          ></apexchart>
          <apexchart width="380" type="donut" :options="options" :series="series1"></apexchart>
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
          <h6>
          จำนวนผู้ใช้งานวันนี้</h6>
          <transition mode="out-in">
            <p v-if="userStatAll" :key="userStatAll.totalCount">{{ userStatAll.totalCount }} คน</p>
          </transition>
        </div>
        <div class="box-3">
          <h6>
          จำนวนสมาชิกที่เข้าใช้ระบบ
        </h6>
          <p v-if="userData" >{{ userData.length }} คน</p>
        </div>
      </div>
      <!-- <div class="box-4">Box 4</div> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useAuthenStore } from '../stores/auth'
import { HalfCircleSpinner } from 'epic-spinners'
import { authenKey } from '../utils/config';
import { useRouter } from 'vue-router';

const authenStore = useAuthenStore()
const userStatAll = ref()
const isLoading = ref(false)
const userData = ref()
const router = useRouter()

const options = ref({
      labels: ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4', 'สัปดาห์ 5'],
    });
const series1 = ref([0, 0, 0, 0,0])
const chartOptions = ref({
  chart: {
    id: 'basic-bar'
  },
  xaxis: {
    categories: ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4', 'สัปดาห์ 5']
  }
})

const series = ref([
  {
    data: [0,0,0,0,0]
  }
])

const lastResetDate = ref(new Date().getDate());

onMounted(() => {
  setTimeout(()=>{
    if (!localStorage.getItem(authenKey)) {
        router.push({ name: 'LogIn' })
  }if(authenStore.auth.role !== 'admin'){
    router.push("/")
  }
  },800)
  isLoading.value = true
  checkAndResetDaily();
  setTimeout(() => {
    countStat()
    fetchUser()
    isLoading.value = false
  }, 800)
})

const countStat = () => {
  if(!authenStore.auth.id){
      window.location.reload()
    }else{
      const fetchData = () => {
    if (authenStore.auth.id) {
      const eventSource = new EventSource(
        `http://192.168.1.110:3000/user/userStat/${authenStore.auth.id}`
      )
      eventSource.addEventListener('message', (event) => {
        const eventData = JSON.parse(event.data)
        userStatAll.value = eventData
        Object.entries(userStatAll.value.weeklyTotal).forEach(([key, value]) => {
          series.value[0].data[parseInt(key) - 1] = value;
          series1.value[parseInt(key) - 1] = value;
        })
      })
    }
  }
    // เรียก fetchData ครั้งแรก
    fetchData()

// เรียก fetchData ทุก 1 นาที
setInterval(fetchData, 60000) // 1 นาที = 60,000 มิลลิวินาที
    }
}

const fetchUser = async () => {
  const result = await axios.get('http://192.168.1.110:3000/user')
  if (result) {
    userData.value = result.data
  }
}

const checkAndResetDaily = () => {
  const today = new Date();

  if (lastResetDate.value !== today.getDate()) {
    resetTotalLogins();
    lastResetDate.value = today.getDate(); // รีเซ็ตค่าวันที่ล่าสุด
  }
}

const resetTotalLogins = () => {
  userStatAll.value.totalCount = 0;
};
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
  justify-content: space-around;
  align-items: center;
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
  display: flex; /* เพิ่มบรรทัดนี้ */
  flex-direction: column; /* เพิ่มบรรทัดนี้ */
}

.box-3 p {
  font-size: 50px;
  color: #ec4088;
  justify-self: center;
  align-self: center;
  padding-top: 3%;
}

.box-4 {
  background-color: #ececec;
  padding: 20px;
  border-radius: 5px;
  height: 150px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}


@media only screen and (max-width: 480px) {

  .box-2 h6 {
  font-size: 1rem;
}

.box-3 h6{
  font-size: 1rem;
}

.box-3 p {
  font-size: 2rem;
  color: #ec4088;
  justify-self: center;
  align-self: center;
  padding-top: 3%;
}
}

@media screen and (min-width: 481px) and (max-width: 768px) {

}

@media screen and (min-width: 769px) and (max-width: 1024px) {

}

@media screen and (min-width: 1025px) {

}
</style>
