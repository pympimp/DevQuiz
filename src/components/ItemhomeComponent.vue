<!-- ItemComponent.vue -->
<template>
    <div class="item-container">
      <img :src="imageSrc" alt="Item Image" class="item-image" />
      <div class="item-text">{{ data }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: Number,
      label: String,
      data: String,
      imageSrc: String,
    },
  };
  </script>
  
  <style scoped>
  .item-container {
    display: flex;
    align-items: center;
  }
  
  .item-image {
    width: 50px; /* ปรับขนาดตามที่ต้องการ */
    height: auto;
    margin-right: 10px; /* ระยะห่างระหว่างรูปภาพกับข้อความ */
  }
  
  .item-text {
    text-align: left;
  }
  </style>
  