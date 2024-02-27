<template>
  <div>
    <half-circle-spinner
      :animation-duration="1000"
      :size="60"
      color="#ff1d5e"
      class="loading"
      v-if="isLoading"
    />
    <div class="container" v-if="!isLoading">
      <div class="buttons">
        <h1>บทเรียน</h1>

        <div class="button" v-for="(item, index) in classAllData" :key="index + 1">
          <button
            @click="scrollToAdditionalBox(item.classID, item.name)"
            class="scroll-button"
            :style="{ backgroundColor: changeColor === item.name ? '#EE5684' : '#1F1F1F' }"
          >
            <img :src="item.img" alt="Image" class="button-image" />
            <p>{{ item.name }}</p>
          </button>
        </div>
      </div>

      <BoxArticie
        v-if="currentContent === unitData.name"
        :contentData="classData"
        :unitData="unitData"
        :ProgressIndex="ProgressIndex"
        :userData="userData"
        class="articleBox"
      />
    </div>
  </div>
</template>

<script setup>
import BoxArticie from '@/components/BoxArticie.vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthenStore } from '../stores/auth'
import { ref, onMounted } from 'vue'
import { HalfCircleSpinner } from 'epic-spinners'
import { authenKey } from '../utils/config';

const classId = ref('')
const route = useRoute()
const authenStore = useAuthenStore()
const currentContent = ref('')
const changeColor = ref('')
const classData = ref({})
const router = useRouter()
const classAllData = ref([])
const unitData = ref({})
const ProgressIndex = ref()
const userData = ref()
const isLoading = ref(false)

onMounted(async() => {
  if (!localStorage.getItem(authenKey)) {
        router.push({ name: 'LogIn' })
      }
  isLoading.value = true
  setTimeout(async() => {
    if (route.params.classId) {
      classId.value = route.params.classId
      if(!authenStore.auth.id){
        window.location.reload();
      }else{
        await fetchOneUser()
      fetchData()
      if (classId.value ) {
      fetchOneClass(classId.value)
      isLoading.value = false
    }
      }
    }
  }, 800)
})

const scrollToAdditionalBox = (id, name) => {
  currentContent.value = name
  changeColor.value = name
  router.push(`/class/${id}`)
  if (router.push) {
    fetchOneClass(id)
  }
}

const fetchOneClass = async (id) => {
  try {
    const result = await axios.get(
      `https://functions-khaki-gamma.vercel.app/class/${id}`
    )
    if (result) {
      classData.value = result.data
      changeColor.value = classData.value.name
      if (classData.value) {
          userProgress(classData.value.name)
          fetchUnitData(classData.value.name)
      }
    }
  } catch (error) {
    console.error('Error during getdata:', error)
  }
}

const fetchData = async () => {
  try {
    const result = await axios.get(
      'https://functions-khaki-gamma.vercel.app/class/'
    )
    if (result) {
      classAllData.value = result.data
    }
  } catch (error) {
    console.error('Error during getdata:', error)
  }
}

const fetchUnitData = async (name) => {
  try {
    const result = await axios.get(
      'https://functions-khaki-gamma.vercel.app/coures/'
    )
    if (result) {
      const Index = result.data.findIndex((item) => item.name === name)
      if (Index !== -1) {
        unitData.value = result.data[Index]
        currentContent.value = unitData.value.name
      }
    }
  } catch (error) {
    console.error('Error during getdata:', error)
  }
}

const userProgress = (contentName) => {
  if(unitData.value){
  const userIndex = userData.value.progress
  try {
    const foundIndex = userIndex.findIndex((item) => item.name === contentName)
    if (foundIndex !== -1) {
      ProgressIndex.value = foundIndex
    } else {
      console.log('Not found')
    }
  } catch (error) {
    console.error('Error loading progress data: ', error)
  }
}
}

const fetchOneUser = async()=>{
  if (!authenStore.auth.id) {
          window.location.reload();
  }else{
    const result = await axios.get(`https://functions-khaki-gamma.vercel.app/user/${authenStore.auth.id}`)
  if(result){
    userData.value = result.data
  }
  }
}
</script>

<style scoped>
* {
  /* margin: 0;
  padding: 0; */
  box-sizing: border-box;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* ตัวอย่างการกำหนดสไตล์เพิ่มเติมสำหรับ Spinner หากต้องการ */
}

h1 {
  margin-top: 3%;
  margin-left: 35px;
  color: #fffdfd;
  font-size: 27px;
  font-weight: bolder;
}

.button-image {
  transform: translateY(10%);
  width: 40px;
  height: 40px;
  margin-left: 45px;
  object-fit: cover;
  /* background-color: aqua; */
}

.scroll-button {
  /* margin-top: 5px; */
  margin-left: -15%;
  /* margin-bottom: 15px; */
  width: 35vh;
  height: 50px;
  background-color: #1f1f1f;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);  */
  border-radius: 50px;
  cursor: pointer;
}

.scroll-button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: #ee5684;
}

p {
  font-size: 20px;
  margin-left: 85px;
  transform: translateY(-95%);
  font-weight: bolder;
  color: #fffdfd;
  width: 20px;
  /* background-color: aqua; */
}

.container {
  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 150px; */
  display: flex;
  flex-direction: row;
}

.buttons {
  width: 35vh;
}


.articleBox {
  width: fit-content;
  margin-left: 2%;
  margin-bottom: 10px;
}

@media only screen and (max-width: 480px) {
  .container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 1.2rem;
  }


  .button p {
    font-size: 1rem;
  }

  .scroll-button {
    width: 14rem;
  }

  .button-image {
    max-width: 2rem;
    max-height: 2rem;
    margin-top: 5px;
  }

  .articleBox {
    margin-left: 5%;
    margin-top: 0%;
  }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  .container {
    max-width: 100%;
  }

  h1 {
    font-size: 1.2rem;
  }

  .button p {
    font-size: 1rem;
  }

  .scroll-button {
    width: 14rem;
  }

  .button-image {
    max-width: 2rem;
    max-height: 2rem;
    margin-top: 5px;
  }

  .articleBox {
    margin-top: 2rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .container {
    max-width: 100%;
  }

  h1 {
    font-size: 1.5rem;
  }

  .button p {
    font-size: 1.2rem;
  }

  .scroll-button {
    width: 13.5rem;
  }

  .button-image {
    max-width: 2rem;
    max-height: 2rem;
    margin-top: 5px;
  }

  .articleBox {
    margin-top: 2rem;
  }
}

@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .container {
    max-width: 100%;
  }

  h1 {
    font-size: 1.7rem;
  }

  .button p {
    font-size: 1.4rem;
  }

  .scroll-button {
    max-width: 27vh;
  }

  .button-image {
    max-width: 2rem;
    max-height: 2rem;
    margin-top: 5px;
  }

  .articleBox {
    margin-top: 2rem;
  }
}

@media screen and (min-width: 1200px) {
  .container {
    max-width: 100%;
  }
 
  h1 {
    font-size: 1.7rem;
  }

  .button p {
    font-size: 1.4rem;
  }

  .scroll-button {
    max-width: 27vh;
  }

  .button-image {
    max-width: 2rem;
    max-height: 2rem;
    margin-top: 5px;
  }

  .articleBox {
    margin-top: 2rem;
  }
}
/* 
@media only screen and (min-width: 376px) and (max-width: 430px) {

  .container {
    display: flex;
    flex-direction: column;
  }


  h1 {
    font-size: 20px;
  }

  .button p {
    font-size: 15px;
  }

  .button-image {
    width: 4vh;
    height: 4vh;
    margin-top: 0.5vh;
  }

  .scroll-button {
    width: 24vh;
  }

  .articleBox {
    margin-left: 5%;
    margin-top: -10%;
  }
} */
/* 
@media screen and  (max-width: 360px){

  .container {
  display: flex; flex-direction: column;
}

h1 {
  font-size: 20px;
}

.button p{
  font-size: 15px;
}

.button-image{
  width: 4vh;
  height: 4vh;
  margin-top: 0.5vh;
}

.scroll-button{
  width: 30vh;
}

.articleBox{
margin-left: 5%;
margin-top: -10%;
}
} */
/* 
@media screen and (max-width: 280px) {
  .container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 17px;
  }

  .button p {
    font-size: 13px;
  }

  .button-image {
    width: 3.5vh;
    height: 3.5vh;
    margin-top: 0.5vh;
  }

  .scroll-button {
    width: 30vh;
    height: 5vh;
  }

  .articleBox {
    margin-left: 5%;
    margin-top: -10%;
  }
}

@media screen and (max-width: 540px) {
  .container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 20px;
  }

  .button p {
    font-size: 15px;
  }

  .button-image {
    width: 3.5vh;
    height: 3.5vh;
  }

  .scroll-button {
    width: 30vh;
    height: 5vh;
  }

  .articleBox {
    margin-left: 5%;
    margin-top: -8%;
  }
} */
/* 
@media only screen and (min-width: 768px) {
  .container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 20px;
  }

  .button p {
    font-size: 15px;
  }

  .button-image {
    width: 3vh;
    height: 3vh;
  }
  .scroll-button {
    width: 22vh;
    height: 4.5vh;
  }

  .articleBox {
    margin-left: 3%;
    margin-top: -5%;
  }
}

@media only screen and (max-width: 820px) {
  .container {
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-size: 25px;
  }

  .button p {
    font-size: 20px;
  }

  .button-image {
    width: 3vh;
    height: 3vh;
  }
  .scroll-button {
    width: 22vh;
    height: 4.5vh;
  }

  .articleBox {
    margin-left: 3%;
    margin-top: -5%;
  }
} */
</style>
