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
      <h1>{{ contentData.title }}</h1>
      <p>{{ contentData.description }}</p>
      <div v-for="(box, index) in contentData.boxes" :key="index" class="inner-box" >
        <div class="box-content">
          <div class="box-header">
            <h1>{{ box.boxTitle }}</h1>
            <button @click="toggleBox(index)">
              <i class="bi" :class="{'bi-chevron-up': box.isExpanded, 'bi-chevron-down': !box.isExpanded}"></i>
            </button>
          </div>
          <p v-if="box.isExpanded">{{ box.boxText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { reactive } from 'vue';

export default {
  props: {
    contentData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {


    // กำหนด reactive object ที่เก็บข้อมูล
    const internalContentData = reactive(props.contentData);

    // ฟังก์ชันสำหรับการเปลี่ยนสถานะของกล่อง
    const toggleBox = (index) => {
      console.log('Toggle Box Clicked', index);
      
      // ให้ Vue ทราบถึงการเปลี่ยนแปลงค่า isExpanded
      internalContentData.boxes[index].isExpanded = !internalContentData.boxes[index].isExpanded;
    };

    return {
      internalContentData,
      toggleBox,
    };
  },
};

</script>


<style scoped>
.container{
  display: flex;
  flex-direction: column;
  width: auto;
  /* background-color: #bd6a6a; */
  margin-left: 250px;
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
