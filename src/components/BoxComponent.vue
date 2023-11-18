<template>
  <div class="boxcontainer">
    <div class="box">
      <div class="flex-container">
        <div class="image-container">
          <img :src="box.imageSrc" alt="Box Image">
        </div>
        <div class="text-container">
          <h2 class="main-title">{{ getHTMLTitle() }}</h2>
          <p class="sub-title">{{ getHTMLSubtitle() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boxData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    box() {
      return this.boxData;
    },
  },
  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    getHTMLTitle() {
      const parts = this.box.data.split(':');
      return parts[0].trim();
    },
    getHTMLSubtitle() {
      const parts = this.box.data.split(':');
      return parts[1].trim();
    },
    toggleBox() {
      this.isActive = !this.isActive;
    },

  },
};
</script>

<style scoped>



.box:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
}


/* .boxcontainer{
  background-color: aqua;
  
} */


/* กล่องแบบฝึก */
.box {
  text-align: center;
  width: 700px;
  height: 120px;
  margin: 15px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(229, 219, 241);
  position: relative;
  margin-bottom: 20px; /* ปรับตำแหน่งขึ้น 50px */
; /* กำหนดสีเทาให้กล่อง */
}


.flex-container {
  display: flex;
  align-items: center;
  flex-direction: row; /* เปลี่ยนเป็นแนวนอน */
  /* background-color: blue; */
}


.image-container {
  text-align: center;
  background-color: black; /* กำหนดสีดำให้กับพื้นหลัง */
  width: 80px; /* ปรับขนาดตามที่ต้องการ */
  height: 80px; /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%; /* ทำให้รูปร่างเป็นวงกลม */
  overflow: hidden; /* ป้องกันรูปภาพที่มีขนาดใหญ่เกินไป */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}


/* ส่วนข้างในแบบฝึก */
img {
  max-width: 50px;
  height: 50px;
  /* margin-left: 40px; */
}

.text-container {
  text-align: left;
  margin-left: 20px;
  flex: 1; /* ทำให้ text-container ยืดเต็มทั้งความกว้าง */
}

.main-title {
  font-size: 26px; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
}

.sub-title {
  font-size: 20px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
}

</style>
