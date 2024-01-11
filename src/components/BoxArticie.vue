<!-- <template>
  <div class="container">
    <div class="content">
      <h1>{{ contentData.title }}</h1>
      <p>{{ contentData.description }}</p>
      <div v-for="(box, index) in contentData.boxes" :key="index" class="inner-box" :style="{ height: box.isExpanded ? 'auto' : '50px' }">
        <div class="box-content">
          <h1>{{ box.boxTitle }}</h1>
          <p v-if="box.isExpanded">{{ box.boxText }}</p>
        </div>
        <button @click="toggleBox(index) " >
          <i class="bi" :class="{'bi-chevron-up': box.isExpanded, 'bi-chevron-down': !box.isExpanded}"></i>
        </button>
      </div>
    </div>
  </div>
</template> -->



<template>
  <div class="container">
    <div class="content">
      <h1>{{ contentData.fullname }}</h1>
      <p>{{ contentData.discription }}</p>
      <div v-if="unitData && ProgressIndex">
      <div v-for="(box, index) in unitData" :key="index" >
      <div class="inner-box" :style="{ height: box.isExpanded? 'auto' : '50px' }">
        <div class="box-content">
          <div class="box-header">
            <h1>{{ box.nameLesson }}</h1>
            <button @click="toggleBox(index)">
              <i class="bi" :class="{'bi-chevron-up': box.isExpanded , 'bi-chevron-down': !box.isExpanded}"></i>
            </button>
          </div>
        </div>
      </div>
      <Transition name="slide-fade">
      <div class="card-container" v-if="box.isExpanded ">
      <div v-for="(subitem, subindex) in box.units" :key="subindex">
      <div  @click="console.log(subitem.unitId)" class="card-unit" :style="{backgroundColor:authenStore.auth.progress[ProgressIndex][box.nameLesson][subitem.nameUnit]? 'rgba(237, 237, 237, 1)' : 'rgba(209, 209, 209, 0.7)'}" :class="{'not-clickable' : authenStore.auth.progress[ProgressIndex][box.nameLesson][subitem.nameUnit] == false}">
            <div style="align-self: center;">{{ subitem.nameUnit }}</div>
            <div class="icon-card" :style="{backgroundColor: authenStore.auth.progress[ProgressIndex][box.nameLesson][subitem.nameUnit]? 'rgba(151, 221, 118, 1)' : 'rgba(223, 115, 115, 0.7)'}">
              <FontAwesomeIcon icon="fa-solid fa-check" v-if="authenStore.auth.progress[ProgressIndex][box.nameLesson][subitem.nameUnit] == true"/>
              <FontAwesomeIcon icon="fa-solid fa-xmark" v-else></FontAwesomeIcon>
          </div>
          </div>
        </div>
      </div>
    </Transition>
    </div>
  </div>

  <div v-else>
      <div v-for="(box, index) in unitData" :key="index" >
        <div v-for="(subitem, subindex) in box.units" :key="subindex">
      <div class="inner-box" :style="{ height: subitem.isExpanded? 'auto' : '50px' }">
        <div class="box-content">
          <div class="box-header">
            <h1> {{subitem.header }}</h1>
            <button @click="toggleBoxUnit(index,subindex)">
              <i class="bi" :class="{'bi-chevron-up': subitem.isExpanded , 'bi-chevron-down': !subitem.isExpanded}"></i>
            </button>
          </div>
          <Transition name="slide-fade">
            <div v-if="subitem.isExpanded" class="Description">
            <div>{{ subitem.discription }}</div>
          </div>
        </Transition>
        </div>
      </div>
    </div>
    </div>
  </div>
    </div>
  </div>
</template>





<script>
import { reactive } from 'vue';
import { useAuthenStore } from '../stores/auth';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components:{
    FontAwesomeIcon
  },
  props: {
    contentData: {
      type: Object,
      default: () => ({}),
    },
    unitData:{
      type: Object,
      default:()=>({})
    },
    ProgressIndex:{
      type: Number,
    }
  },
  data(){
    return{
      authenStore:useAuthenStore(),
      Numaa:0,
    }
  },
  setup(props) {

    // กำหนด reactive object ที่เก็บข้อมูล
    const internalContentData = reactive(props.contentData);
    const unitData1 = reactive(props.unitData);


    // ฟังก์ชันสำหรับการเปลี่ยนสถานะของกล่อง

    return {
      internalContentData,
      unitData1,
    };
  },
  methods:{
    toggleBox(index) {
      console.log('Toggle Box Clicked', index);
      if(this.unitData1[index].isExpanded == false){
        this.unitData1[index].isExpanded = true
        console.log(this.ProgressIndex)
      }else{
        this.unitData1[index].isExpanded = false
      }
    
    },
    toggleBoxUnit(index,subindex){
      if(this.unitData1[index].units[subindex].isExpanded == false){
        this.unitData1[index].units[subindex].isExpanded = true
      }else{
        this.unitData1[index].units[subindex].isExpanded = false
      }
    },
    async check(coures,lesson,unit){
  try {
      const result = await axios.put(`http://localhost:5000/test-elearning-b0646/us-central1/api/user/Test/${this.authenStore.auth.id}/${coures}`, {
      [lesson]: {
        [unit]: true
      }
    });

    if (result) {
      console.log("Update:", result.data.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
    },
  }
};

</script>


<style scoped>
.container{
  display: flex;
  flex-direction: column;
  width: auto;
  /* background-color: #bd6a6a; */
}

.Description{
  margin-left: 26px;
  margin-top: 5px;
}

.card-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 80%;
  margin-left: 4%;
  
}

.inner-box {
  background-color: #f5f5f5;
  margin-bottom: 1px;
  margin-top: 15px;
  width: 800px;
  height: auto;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  transition: height 0.3s ease;
}

h1 {
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
}

p {
  color: #a6a6a6;
  font-size: 16px;
  margin-top: 5px;
  margin-left: 20px;
}

.content{
  margin-top: 50px;
  /* background-color: #6b0000; */
  width: 900px;
}

.icon-card {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  width: 40px; /* ปรับขนาดตามที่ต้องการ */
  height: 40px; /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%; /* ทำให้เป็นวงกลม */
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25); /* inner shadow */
}

.box-content {
  flex-grow: 1;
  padding-right: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

.inner-box h1 {
  color: #000000;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 8px;
}

.inner-box p {
  margin-left: 20px;
  margin-top: 2px;
  color: #000000;
  font-size: 16px;
  max-height: 70px;
  overflow: hidden;
}



.bi-chevron-up {
  margin-right: 15px;
  font-size: 24px;
  color: #1f1f1f;
  cursor: pointer;
 
  
  
}

.bi-chevron-down {
  margin-right: 15px;
  font-size: 24px;
  color: #1f1f1f;
  cursor: pointer;
  
  /* transform-origin: center;  */
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-unit{
  margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease
}

.not-clickable {
  pointer-events: none;
}

.card-unit:hover {
  background-color: white;
  transform: scale(0.98);
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}





/* responsive */

@media screen and (max-width: 2560px){
 

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
  .container{
  display: flex;
  flex-direction: column;
  width: auto;
  /* background-color: #bd6a6a; */
  margin-left: 20px;
}



.content {
  display: flex;
  flex-direction: column;
  margin-left: -1px;
  width: auto;
  /* background-color: #e52626; */
}

.inner-box {
  background-color: #f5f5f5;
  margin-bottom: -5px;
  margin-top: 25px;
  width: 270px;
  border-radius: 10px;
  overflow: hidden;
  transition: height 0.3s ease;
}

h1 {
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  margin-top: -20px;
}

p {
  color: #a6a6a6;
  font-size: 15px;
  margin-top: 20px;
  margin-left: 10px;
}

.box-content {
  flex-grow: 1;
  padding-right: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

.inner-box h1 {
  color: #000000;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 8px;
}

.inner-box p {
  margin-left: 20px;
  margin-top: 2px;
  color: #000000;
  font-size: 10px;
  max-height: 400px;
  overflow: hidden;
}



.bi-chevron-up {
  margin-right: 15px;
  font-size: 24px;
  color: #1f1f1f;
  cursor: pointer;
 
  
  
}

.bi-chevron-down {
  margin-right: 15px;
  font-size: 24px;
  color: #1f1f1f;
  cursor: pointer;
  
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
} 

  
}


@media screen and (max-width: 320px) {

  .container{
  display: flex;
  flex-direction: column;
  width: auto;
  /* background-color: #bd6a6a; */
  margin-left: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  margin-left: -1px;
  width: auto;
  /* background-color: #e52626; */
}

.inner-box {
  background-color: #f5f5f5;
  margin-bottom: -5px;
  margin-top: 25px;
  width: 270px;
  border-radius: 10px;
  overflow: hidden;
  transition: height 0.3s ease;
}

h1 {
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  margin-top: -20px;
}

p {
  color: #a6a6a6;
  font-size: 15px;
  margin-top: 20px;
  margin-left: 10px;
}

.box-content {
  flex-grow: 1;
  padding-right: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

.inner-box h1 {
  color: #000000;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 8px;
}

.inner-box p {
  margin-left: 20px;
  margin-top: 2px;
  color: #000000;
  font-size: 10px;
  max-height: 400px;
  overflow: hidden;
}



.bi-chevron-up {
  margin-right: 15px;
  font-size: 24px;
  color: #1f1f1f;
  cursor: pointer;
 
  
  
}

.bi-chevron-down {
  margin-right: 15px;
  font-size: 24px;
  color: #1f1f1f;
  cursor: pointer;
  
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
} 

}

</style>
