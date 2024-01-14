<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="buttons">
        <h1>บทเรียน </h1>

        <div class="button" v-for="(item, index) in classAllData" :key="index + 1">
          <button @click="scrollToAdditionalBox(item.classID,item.name)" 
          class="scroll-button" 
          :style="{ backgroundColor: changeColor === item.name ? '#EE5684' : '#1F1F1F' }">
            <img :src="item.img" alt="Image" class="button-image">
            <p>{{item.name}}</p>
          </button>
        </div>
      </div>

      <!-- ตรวจสอบว่ามีข้อมูลใน languageData หรือไม่ และแสดงข้อมูล -->
      <!-- <BoxArticie
        v-if="currentContent && languageData[currentContent]"
        :contentData="languageData[currentContent]"
      /> -->
      <BoxArticie v-if="currentContent ===  unitData.name " :contentData="classData" :unitData="unitData" :ProgressIndex="ProgressIndex"/>

      <!-- <BoxArticie v-if="currentContent === 'css'" :contentData="classData" :unitData="unitData.lessons"/>
      <BoxArticie v-if="currentContent === 'javascript'" :contentData="classData" :unitData="unitData.lessons"/> -->
      <!-- <div v-else class="container-no-data">
        <h1>No Data</h1>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import BoxArticie from '@/components/BoxArticie.vue'
import { useRoute,useRouter} from 'vue-router'
import axios from 'axios';
import { useAuthenStore } from '../stores/auth';
import { ref, onMounted } from 'vue';

const  classId = ref('');
const route = useRoute();
const authenStore = useAuthenStore();
const currentContent = ref('')
const changeColor = ref('')
const classData = ref({})
const router = useRouter();
const classAllData = ref([])
const unitData = ref({})
const ProgressIndex = ref()

   onMounted(() => {
    setTimeout(() => {
    if(route.params.classId){
      classId.value = route.params.classId
      fetchData();
    }
    if(classId.value){
      fetchOneClass(classId.value);
    }
  },800);
  })

  const scrollToAdditionalBox = (id,name) =>{
      currentContent.value = name
      changeColor.value = name
      router.push(`/class/${id}`)
      if(router.push){
        fetchOneClass(id)
      }
    };

    const fetchOneClass = async(id) =>{
      try {
        const result = await axios.get(`http://localhost:5000/test-elearning-b0646/us-central1/api/class/${id}`)
          if(result){
            classData.value = result.data
            changeColor.value = classData.value.name
            console.log(classData.value)
              if(classData.value){
                if(!authenStore.auth.progress){
                  window.location.reload()
                }else{
                  userProgress(classData.value.name)
                  fetchUnitData(classData.value.name);
                }
              }
      }
      } catch (error) {
        console.error("Error during getdata:", error);
      }
    };

    const fetchData = async() =>{
      try {
        const result = await axios.get('http://localhost:5000/test-elearning-b0646/us-central1/api/class/');
        if (result) {
          classAllData.value = result.data;
          console.log("classAllData", classAllData.value);
        }
      } catch (error) {
        console.error("Error during getdata:", error);
      }
    };

    const fetchUnitData = async(name) => {
      try {
        const result = await axios.get('http://localhost:5000/test-elearning-b0646/us-central1/api/coures/');
        if(result){
          const Index = result.data.findIndex((item) => item.name === name)
          if(Index !== -1){
            unitData.value = result.data[Index]
            currentContent.value = unitData.value.name
          console.log('unitData', unitData.value)
          }
        }
      } catch (error) {
        console.error("Error during getdata:", error);
      }
    };

   const userProgress = (contentName) =>{
    const userIndex = authenStore.auth.progress
      try {
        const foundIndex = userIndex.findIndex((item) => item.name === contentName);
          if (foundIndex !== -1) {
              ProgressIndex.value = foundIndex;
              console.log(ProgressIndex.value)
          } else {
              console.log("Not found");
          }
      }catch(error){
        console.error("Error loading progress data: ", error);
      }
}
</script>

<style scoped>
h1 {
  margin-top: 50px;
  margin-left: 35px;
  color: #fffdfd;
  font-size: 27px;
  font-weight: bolder;
}

.button-image {
  transform: translateY(10%);
  width: 40px;
  height: 40px;
  margin-left: 65px;
  object-fit: cover;
  /* background-color: aqua; */
}

.scroll-button {
  margin-top: 5px;
  margin-left: -40px;
  margin-bottom: 15px;
  width: 270px;
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
  margin-left: 115px;
  transform: translateY(-105%);
  font-weight: bolder;
  color: #fffdfd;
  width: 20px;
  /* background-color: aqua; */
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 150px;
}

/* หากต้องการให้เปิดมาแล้วเป็นกล่องเปล่าๆ */
.container-no-data {
  background-color: #f5f5f5;
  margin-top: 50px;
  margin-right: 50px;
  width: 1000px;
  height: 1000px;
}
.container-no-data h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}

.buttons {
  grid-column: 1 / 2;
}

.sub-container {
  background-color: #f5f5f5;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
}
</style>


