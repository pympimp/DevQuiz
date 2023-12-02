<!-- <template>



    <div class="container">
    <h1>cccccccccccc</h1>
    </div>


</template>


<style scoped>
.container{
    margin-top: 50px;
    margin-right: 50px;
    width: 1000px;
    height: 1000px;
    background-color: aqua;
}
</style> -->



<template>
  <div class="container">
    <div class="content">
      <h1>{{ contentData.title }}</h1>
      <p>{{ contentData.description }}</p>
      <div v-for="(box, index) in contentData.boxes" :key="index" class="inner-box">
        <div class="box-content">
          <h1>{{ box.boxTitle }}</h1>
          <p>{{ box.boxText }}</p>
        </div>
        <button @click="toggleBox(index)">
          <i :class="['fas', box.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    contentData: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    toggleBox(index) {
      this.$set(this.contentData.boxes, index, {
        ...this.contentData.boxes[index],
        isExpanded: !this.contentData.boxes[index].isExpanded,
      });
    },
  },
};
</script>



  
  <style scoped>
  .container {
    margin-top: 50px;
    margin-right: 50px;
    width: 1000px;
    height: 1000px;
    background-color: #1F1F1F;
    /* background-color: #c51e1e; */
    display: flex;
    
  }

  .content {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.inner-box {
  background-color: #F5F5F5; /* สีของกล่องภายใน */
  margin-bottom: 1px;
  margin-top: 15px;
  width:800px ;
  height: 70px;
  border-radius:10px ;
}

.inner-box h1{
  color: #000000;
  margin-left: 20px;
  margin-top: 8px;
  font-size: 20px;
}

.inner-box p{
    color: #000000;
    margin-left: 20px;
    margin-top: 2px;
    font-size: 16px;
}


h1{
    
    color: #ffffff; /* ตั้งค่าสีตัวอักษร */
    font-size: 24px; /* ตั้งค่าขนาดตัวอักษร */
    font-weight: bold; /* ตั้งค่าตัวหนา */
   
  }

  p{
    
    color: #A6A6A6; /* ตั้งค่าสีตัวอักษร */
    font-size: 16px; /* ตั้งค่าขนาดตัวอักษร */
    margin-top: 5px;
    margin-left: 20px;
  }


/* ปุ่ม */
button {
  position: absolute;
  top: 50%;
  right: 70px;
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
}

  </style>
  



