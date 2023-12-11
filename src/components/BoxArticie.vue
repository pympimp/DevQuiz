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
      <div v-for="(box, index) in contentData.boxes" :key="index" class="inner-box" :style="{ height: box.isExpanded ? 'auto' : '50px' }">
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
.container {
  margin-top: 50px;
  margin-right: 50px;
  width: 1000px;
  height: 1000px;
  background-color: #1f1f1f;
  display: flex;
}

.content {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.inner-box {
  background-color: #f5f5f5;
  margin-bottom: 1px;
  margin-top: 15px;
  width: 800px;
  height: 70px;
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





</style>
