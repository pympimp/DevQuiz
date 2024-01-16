<script>
import NavBar from '@/components/NavBar.vue'
import BoxArticie from '@/components/BoxArticie.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRoute,useRouter} from 'vue-router'
import axios from 'axios';
import { useAuthenStore } from '../stores/auth';
import { ref } from 'vue';

export default {
  components: {
    NavBar,
    BoxArticie
  },
  data() {
    return {
      currentContent: 'HTML', // กำหนดให้แสดงข้อมูล HTML เริ่มต้น
      authenStore:useAuthenStore(),
      classAllData:ref(),
      changeColor:ref(''),
      route:useRoute(),
      classId:ref(''),
      classData:ref({}),
      unitData:ref({}),
      router:useRouter(),
    }
  },

  mounted(){
    setTimeout(() => {
    if(this.route.params.ArticieId){
      this.classId = this.route.params.ArticieId
      this.fetchData();
    }
    if(this.classId){
      this.fetchOneClass(this.classId);
      // fetchUnitData();
    }
  },300);
  },
  methods: {
    scrollToAdditionalBox(contentId,id,name) {
      this.currentContent = contentId
      this.changeColor = name
      this.router.push(`/Articie/${id}`)
      if(this.router.push){
        this.fetchOneClass(id)
      }
    },

    async fetchData(){
    try {
        const result = await axios.get('http://localhost:5000/test-elearning-b0646/us-central1/api/class/');
        if (result) {
          this.classAllData = result.data;
          console.log("classAllData", this.classAllData);
        }
      } catch (error) {
        console.error("Error during getdata:", error);
      }
  },

  async fetchOneClass(id) {
      try {
        const result = await axios.get(`http://localhost:5000/test-elearning-b0646/us-central1/api/class/${id}`)
          if(result){
            this.classData = result.data
            this.changeColor = this.classData.name
            console.log("sadasd",this.classData)
            if(this.classData){
              this.fetchUnitData(this.classData.name);
            }
      }
      } catch (error) {
        console.error("Error during getdata:", error);
      }
    },

    async fetchUnitData (name) {
      try {
        const result = await axios.get('http://localhost:5000/test-elearning-b0646/us-central1/api/coures/');
        if(result){
          const Index = result.data.findIndex((item) => item.name === name)
          if(Index !== -1){
            this.unitData = result.data[Index]
            this.currentContent = this.unitData.name
          console.log('unitData', this.unitData)
          }
        }
      } catch (error) {
        console.error("Error during getdata:", error);
      }
    },
  }
}
</script>

<template>
  <div>
  <NavBar />
    <div class="container">
      <div class="buttons">
        <h1>บทความทั้งหมด</h1>

        <div class="button" v-for="(item, index) in classAllData" :key="index + 1">
          <button @click="scrollToAdditionalBox('HTML',item.classID,item.name)" 
          class="scroll-button" 
          :style="{ backgroundColor: changeColor === item.name ? '#EE5684' : '#1F1F1F' }">
            <img :src="item.img" alt="Image" class="button-image">
            <p>{{item.name}}</p>
          </button>
        </div>
      </div>

      <!-- <BoxArticie v-if="currentContent && languageData[currentContent]" :contentData="languageData[currentContent]" /> -->
      <!-- <BoxArticie v-if="currentContent === 'html'" :contentData="languageData.html" />
      <BoxArticie v-if="currentContent === 'css'" :contentData="languageData.css" />
      <BoxArticie v-if="currentContent === 'javascript'" :contentData="languageData.javascript" /> -->
      <BoxArticie v-if="currentContent ===  unitData.name " :contentData="classData" :unitData="unitData.lessons"/>
      <!-- <div v-else class="container-no-data">
        <h1>No Data</h1>
      </div> -->
    </div>
  </div>
</template>

<style scoped>

* {
  box-sizing: border-box;
}



.buttons {
  grid-column: 1 / 2;
}

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





/* reponsive */
@media only screen and (max-width: 480px) {

}


@media screen and (min-width: 481px) and (max-width: 768px) {

}

@media screen and (min-width: 769px) and (max-width: 1024px) {

}

@media screen and (min-width: 1025px) and (max-width: 1200px) {

}

@media screen and (min-width: 1200px)  {
 
}


</style>

<!-- 
<template>
    <div>
      <NavBar />
      <div style="display: flex;">
        <BoxArticie />
      <h1>บทความทั้งหมด</h1>
      <div class="button">
      <button @click="scrollToAdditionalBox('html')" class="scroll-button" :style="{ backgroundColor: currentContent === 'html' ? '#EE5684' : '#1F1F1F' }">
        <img src="/images/html.png" alt="Image" class="button-image">
        <p>HTML</p>
      </button>
      
    </div>

    <div class="button">
      <button @click="scrollToAdditionalBox('css')" class="scroll-button" :style="{ backgroundColor: currentContent === 'css' ? '#EE5684' : '#1F1F1F' }">
        <img src="/images/css.png" alt="Image" class="button-image">
        <p>CSS</p>
      </button>
    </div>

    <div class="button">
      <button @click="scrollToAdditionalBox('javascript')" class="scroll-button" :style="{ backgroundColor: currentContent === 'javascript' ? '#EE5684' : '#1F1F1F' }">
        <img src="/images/javascript.png" alt="Image" class="button-image">
        <p>JavaScript</p>
      </button>
    </div>

  </div>
</div>



</template> -->
