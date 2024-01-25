<template>
  <div class="boxcontainer">
    <div class="box">
      <div class="flex-container">
        <div class="img-container">
          <img :src="box.imageSrc" alt="Box Image" class="Langimg">
        </div>
        <div class="text-container">
          <h2 class="main-title">{{box.name}}</h2>
          <p class="sub-title">{{box.data}}</p>
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

.boxcontainer{
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}


/* กล่องแบบฝึก */
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px;
  height: 100px;
  margin: 15px;
  border: 1px solid #1F1F1F;
  background-color:  #1F1F1F;
  position: relative;
  margin-top: 20px;
  margin-bottom: 25px; /* ปรับตำแหน่งขึ้น 50px */
; /* กำหนดสีเทาให้กล่อง */
}


.flex-container {
  display: flex;
  align-items: center;
  /* flex-direction: row;  */
  margin-top: 10px;
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
  margin-left: 10px;
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



/* reponsive */
@media only screen and (max-width: 480px) {

  .box:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
}

.boxcontainer{
   display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* กล่องแบบฝึก */
.box {
  width: 400px;
  height: 100px;
  margin: 15px;
  border: 1px solid #1F1F1F;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin-top: 1%;
  margin-bottom: 25px; /* ปรับตำแหน่งขึ้น 50px */
; /* กำหนดสีเทาให้กล่อง */
}


.flex-container {
  display: flex;
  align-items: center;
  /* flex-direction: row;  */
  margin-top: 10px;
  /* background-color: blue; */
}


.img-container{
  background-color: #F1F1F1; /* กำหนดสีดำให้กับพื้นหลัง */
  width: 70px; /* ปรับขนาดตามที่ต้องการ */
  height: 70px; /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%; /* ทำให้รูปร่างเป็นวงกลม */
  overflow: hidden; /* ป้องกันรูปภาพที่มีขนาดใหญ่เกินไป */
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 15%; */
}


/* ส่วนข้างในแบบฝึก */

img {
  width: 40px;
  height: 40px;
  /* margin-left: 40px; */
}

.text-container {
  text-align: left;
  margin-left: 15px;
  flex: 1; /* ทำให้ text-container ยืดเต็มทั้งความกว้าง */
}

.main-title {
  font-size: 1.2rem; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 0.9rem; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}

}


@media screen and (min-width: 481px) and (max-width: 768px) {
  .box:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
}

.boxcontainer{
   display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* กล่องแบบฝึก */
.box {
  width: 500px;
  height: 100px;
  margin: 15px;
  border: 1px solid #1F1F1F;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color:  #1F1F1F;
  position: relative;
  margin-bottom: 3%; /* ปรับตำแหน่งขึ้น 50px */
; /* กำหนดสีเทาให้กล่อง */
}


.flex-container {
  display: flex;
  align-items: center;
  /* flex-direction: row;  */
  margin-top: 5px;
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
  
}


/* ส่วนข้างในแบบฝึก */

img {
  max-width: 50px;
  height: 50px;
  /* margin-left: 40px; */
}

.text-container {
  text-align: left;
  margin-left: 15px;
  flex: 1; /* ทำให้ text-container ยืดเต็มทั้งความกว้าง */
}

.main-title {
  font-size: 1.7rem; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 1.2rem; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .box:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
}

.boxcontainer{
   display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* กล่องแบบฝึก */
.box {
  width: 550px;
  height: 110px;
  margin: 15px;
  margin-left: 135px;
  border: 1px solid #1F1F1F;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color:  #1F1F1F;
  position: relative;
  margin-top: 1%;
  margin-bottom: 2.5%; /* ปรับตำแหน่งขึ้น 50px */
; /* กำหนดสีเทาให้กล่อง */
}


.flex-container {
  display: flex;
  align-items: center;
  /* flex-direction: row;  */
  margin-top: 5px;
  /* background-color: blue; */
}


.img-container{
  background-color: #F1F1F1; /* กำหนดสีดำให้กับพื้นหลัง */
  width: 90px; /* ปรับขนาดตามที่ต้องการ */
  height: 90px; /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%; /* ทำให้รูปร่างเป็นวงกลม */
  overflow: hidden; /* ป้องกันรูปภาพที่มีขนาดใหญ่เกินไป */
  display: flex;
  justify-content: center;
  align-items: center;
  
}


/* ส่วนข้างในแบบฝึก */

img {
  max-width: 60px;
  height: 60px;
  /* margin-left: 40px; */
}

.text-container {
  text-align: left;
  margin-left: 15px;
  flex: 1; /* ทำให้ text-container ยืดเต็มทั้งความกว้าง */
}

.main-title {
  font-size: 1.8rem; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 1.3rem; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}

}

@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .box:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
}

.boxcontainer{
   display: flex;
    flex-direction: column;
}
/* กล่องแบบฝึก */
.box {
  width: 600px;
  height: 110px;
  margin: 15px;
 margin-left: 30%;
  border: 1px solid #1F1F1F;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color:  #1F1F1F;
  position: relative;
  margin-top: 20px;
  margin-bottom: 25px; /* ปรับตำแหน่งขึ้น 50px */
; /* กำหนดสีเทาให้กล่อง */
}


.flex-container {
  display: flex;
  align-items: center;
  /* flex-direction: row;  */
  margin-top: 5px;
  /* background-color: blue; */
}


.img-container{
  background-color: #F1F1F1; /* กำหนดสีดำให้กับพื้นหลัง */
  width: 90px; /* ปรับขนาดตามที่ต้องการ */
  height: 90px; /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%; /* ทำให้รูปร่างเป็นวงกลม */
  overflow: hidden; /* ป้องกันรูปภาพที่มีขนาดใหญ่เกินไป */
  display: flex;
  justify-content: center;
  align-items: center;
  
}


/* ส่วนข้างในแบบฝึก */

img {
  max-width: 62px;
  height: 62px;
  /* margin-left: 40px; */
}

.text-container {
  text-align: left;
  margin-left: 15px;
  flex: 1; /* ทำให้ text-container ยืดเต็มทั้งความกว้าง */
}

.main-title {
  font-size: 1.9rem; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 1.4rem; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}
}

@media screen and (min-width: 1200px)  {
  .box:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
}

.boxcontainer{
   display: flex;
    flex-direction: column;
    
}



/* กล่องแบบฝึก */
.box {
  width: 600px;
  height: 110px;
  margin: 15px;
  margin-left: 30%;
  border: 1px solid #1F1F1F;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color:  #1F1F1F;
  position: relative;
  margin-top: 20px;
  margin-bottom: 25px; /* ปรับตำแหน่งขึ้น 50px */
; /* กำหนดสีเทาให้กล่อง */
}


.flex-container {
  display: flex;
  align-items: center;
  /* flex-direction: row;  */
  margin-top: 5px;
  /* background-color: blue; */
}


.img-container{
  background-color: #F1F1F1; /* กำหนดสีดำให้กับพื้นหลัง */
  width: 90px; /* ปรับขนาดตามที่ต้องการ */
  height: 90px; /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%; /* ทำให้รูปร่างเป็นวงกลม */
  overflow: hidden; /* ป้องกันรูปภาพที่มีขนาดใหญ่เกินไป */
  display: flex;
  justify-content: center;
  align-items: center;
  
}


/* ส่วนข้างในแบบฝึก */

img {
  max-width: 62px;
  height: 62px;
  /* margin-left: 40px; */
}

.text-container {
  text-align: left;
  margin-left: 15px;
  flex: 1; /* ทำให้ text-container ยืดเต็มทั้งความกว้าง */
}

.main-title {
  font-size: 1.9rem; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 1.4rem; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}
}

</style>
