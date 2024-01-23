

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
      <BoxArticie v-if="currentContent ===  unitData.name " :contentData="classData" :unitData="unitData.lessons" class="articleBox"/>
      <!-- <div v-else class="container-no-data">
        <h1>No Data</h1>
      </div> -->
    </div>
  </div>
</template>
<script>
import BoxArticie from '@/components/BoxArticie.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRoute,useRouter} from 'vue-router'
import axios from 'axios';
import { useAuthenStore } from '../stores/auth';
import { ref } from 'vue';
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  components: {
    BoxArticie,
    HalfCircleSpinner,
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
      isLoading:false
    }
  },

  mounted(){
    this.isLoading = true
    setTimeout(() => {
    if(this.route.params.ArticieId){
      this.classId = this.route.params.ArticieId
      this.fetchData();
    }
    if(this.classId){
      this.fetchOneClass(this.classId);
      // fetchUnitData();
      this.isLoading = false
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

<style scoped>

* {
  box-sizing: border-box;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* ตัวอย่างการกำหนดสไตล์เพิ่มเติมสำหรับ Spinner หากต้องการ */
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
  margin-left: 45px;
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
  margin-left: 85px;
  transform: translateY(-85%);
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

.articleBox {
  width: fit-content;
  margin-left: 2%;
}

@media only screen and (max-width: 480px) {

  .container {
    display: flex;
    flex-direction: column;
    margin-top: -2.3rem;
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
 
  .container{
    max-width: 100%;
  }
  .buttons {
    margin-top: -2rem;
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
    margin-top: 2rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .container{
    max-width: 100%;
  }
 .buttons {
   margin-top: -2rem;
 }

 h1 {
    font-size: 1.2rem;

 }

 .button p {
    font-size: 1.2rem;
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
   margin-top: 2rem;
   width: 100%;
   
 }
}

@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .container{
    width: 100%;
  }
 .buttons {
   margin-top: -2rem;
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
   margin-left: 5%;
   margin-top: 2rem;
   width: 100%;
   
 }
}

@media screen and (min-width: 1201px) {
  .container{
    width: 100%;
  }
 .buttons {
   margin-top: -2.5rem;
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
   margin-left: 5%;
   margin-top: 2rem;
   width: 100%;
   
 }
}

/* @media screen and (max-width: 2560px) {

}


@media screen and (min-width: 481px) and (max-width: 768px) {

}

@media screen and (min-width: 769px) and (max-width: 1024px) {

}

@media screen and (min-width: 1025px) and (max-width: 1200px) {

}

@media screen and (min-width: 1200px)  {
 
}


@media screen and (max-width: 1890px) {

  

}

@media screen and (max-width: 1440px) {

}

@media screen and (max-width: 1024px) {

}

@media screen and (max-width: 820px) {

}

@media screen and (max-width: 768px) {

}

@media screen and (max-width: 425px) {

}

@media screen and (max-width: 375px) {
  .container {
  display: flex;
  flex-direction: column;
}


  h1 {
  margin-top: 20px;
  margin-bottom: 45px;
  margin-left: 85px;
  color: #fffdfd;
  font-size: 20px;
  font-weight: bolder;
}

.button-image {
  transform: translateY(10%);
  width: 35px;
  height: 35px;
  margin-left: 65px;
}

.scroll-button {
  margin-top: -5px;
  margin-left: -40px;
  width: 250px;
  height:45px;
  background-color: #1f1f1f;
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
  transform: translateY(-95%);
  font-weight: bolder;
  color: #fffdfd;
  width: 20px;
}
  
}



@media screen and (max-width: 320px) {
  .container {
  display: flex;
  flex-direction: column;
}


  h1 {
  margin-top: 20px;
  margin-bottom: 45px;
  margin-left: 85px;
  color: #fffdfd;
  font-size: 20px;
  font-weight: bolder;
}

.button-image {
  transform: translateY(10%);
  width: 35px;
  height: 35px;
  margin-left: 65px;
}

.scroll-button {
  margin-top: -5px;
  margin-left: -40px;
  width: 250px;
  height:45px;
  background-color: #1f1f1f;
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
  transform: translateY(-95%);
  font-weight: bolder;
  color: #fffdfd;
  width: 20px;
}
 
} */






</style>

