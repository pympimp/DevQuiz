<template>
  <div class="boxcontainer">
    <div class="box">
      <div class="flex-container">
        <div class="img-container">
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


/* กล่องแบบฝึก */
.box {
  width: 700px;
  height: 100px;
  margin: 15px;
  margin-left: 25px;
  border: 1px solid #1F1F1F;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color:  #1F1F1F;
  position: relative;
  margin-bottom: 20px; /* ปรับตำแหน่งขึ้น 50px */
; /* กำหนดสีเทาให้กล่อง */
}


.flex-container {
  display: flex;
  align-items: center;
  /* flex-direction: row;  */
  margin-bottom: 5px;
  /* background-color: blue; */
}


.img-container{
  background-color: #F1F1F1; /* กำหนดสีดำให้กับพื้นหลัง */
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
  color: #CCCCCC;
}


.sub-title {
  font-size: 20px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}








@media (max-width: 728px) {
 

  .box {
    width: 100%; /* กลับไปให้กล่องมีขนาดเป็น 700px เมื่อหน้าจอกว้างขึ้น */
    margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
    margin-top: 50px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
  }
}

.flex-container {
  display: flex;
  flex-direction: row;
}

.image-container {
  background-color: black;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}

img {
  max-width: 50px;
  height: 50px;
}

.text-container {
  text-align: left;
  margin-left: 20px;
  flex: 1;
}

.main-title {
  font-size: 26px;
  font-weight: bold;
}

.sub-title {
  font-size: 20px;
}


@media (max-width: 728px) {
 

  .box {
    width: 100%; /* กลับไปให้กล่องมีขนาดเป็น 700px เมื่อหน้าจอกว้างขึ้น */
    margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
    margin-top: 50px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
  }


.flex-container {
  display: flex;
  flex-direction: row;
}

.image-container {
  background-color: black;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  margin-left: 20px;
}

img {
  max-width: 50px;
  height: 50px;
}

.text-container {
  text-align: left;
  margin-left: 20px;
  flex: 1;
}

.main-title {
  font-size: 26px;
  font-weight: bold;
}

.sub-title {
  font-size: 18px;
}

}









</style>
