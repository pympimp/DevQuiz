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
  height: auto;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
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


.box-content {
  flex-grow: 1;
}

.inner-box h1 {
  color: #000000;
  font-size: 20px;
}

.inner-box p {
  color: #000000;
  font-size: 16px;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  color: #000000;
  font-size: 16px;
}

  </style>
  



 