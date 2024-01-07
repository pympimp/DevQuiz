<script>

import NavBar from "@/components/NavBar.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default {
    name: 'UserProfile',
    components: {
    NavBar,
   
  },
  methods: {
    EditUser() {
      this.$router.push({ name: "EditUser" });
    },
  }
};
</script>



<template>
  <div>
      <NavBar />
      <div class="app">
  <div class="container">
    <div class="boxs">
        <h1>ข้อมูลผู้ใช้</h1>
        <h3>Username :</h3>
        <h3>Email :</h3>
        <h3>Password :</h3>
        <div class="button-container">
        <button @click="EditUser" class="button">แก้ไขข้อมูล</button>
      </div>
    </div>
    <div class="box">
        <h1>ประวัติการเรียน</h1>
    <div class="containers">
    <div class="sub-box">
    <div class="sub-item">
      <h2>Lesson 1 HTML</h2>
      <p><span>1.1 การกำหนดรูปแบบอักษร</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.2 การใส่รูปภาพการสร้างลิงค์ด้วยรูปภาพ</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.3 การจัดย่อหน้าข้อความ</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.4 Lists:หัวข้อแบบรายการ</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.5 การอ้างถึง</span> <i class="bi bi-check-circle"></i></p>
    </div>
    </div>

    <div class="sub-boxs">
    <div class="sub-items">
      <h2>Lesson 1 CSS</h2>
      <p><span>1.1 การตกแต่งสี</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.2 การเว้นระยะ </span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.3 การจัดแถว</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.4 alignment ของ flexbox</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.5 การจัดรูปแบบตัวอักษร</span> <i class="bi bi-check-circle"></i></p>
    </div>
    </div>

    <div class="sub-boxss">
    <div class="sub-itemss">
      <h2>Lesson 3 JavaScript</h2>
      <p><span>1.1 การใช้งานและการแสดงผลบนหน้า HTML</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.2 ตัวแปรจาวาสคริปต์</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.3 JavaScript Operators</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.4 Data types</span> <i class="bi bi-check-circle"></i></p>
      <p><span>1.5 function</span> <i class="bi bi-check-circle"></i></p>
    </div>
    </div>
</div>

    </div>
  </div>
</div>
</div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

.container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.boxs {
  width: 300px;
  height: 200px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #F4F4F4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  width: 800px;
  height: 600px;
  background-color:#F4F4F4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 15px;
    margin-left: 20px;
    /* line-height: 1.5; */
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 14px;
    font-weight: 1000;
    margin-top: 20px;
    margin-left: 100px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 90px;
    height: 25px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* ระยะห่างด้านบน */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}



h2 {
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}

p {
 
  font-size: 0.9rem;
  margin-left: 80px;
  /* margin-bottom: 1.2px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 80%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 1.1em;
  
}



/* responsive */
@media screen and (max-width: 2560px) {

/* .app{
  background-color: #02BDCC;
  
  } */
  .container {
 margin-left: 450px;
  margin-top: 30px;
  width: auto;
}

.boxs {
  width: 700px;
  height: 400px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #F4F4F4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  width: 1800px;
  height: 1200px;
  background-color:#F4F4F4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 45px;
    margin-top: 20px;
    margin-bottom: 35px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 28px;
    margin-left: 20px;
    /* line-height: 1.5; */
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 25px;
    font-weight: 1000;
    margin-top: 90px;
    margin-left: 140px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 140px;
    height: 40px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* ระยะห่างด้านบน */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}



h2 {
  font-size: 35px;
  margin-left: 50px;
  margin-top: 15px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 30px;
  margin-left: 55px;
  margin-bottom: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 25px;
  
}

}


@media screen and (max-width: 1890px) {



}

@media screen and (max-width: 1440px) {
/* .app{
  background-color: #02BDCC;
  
  } */
  .container {
 margin-left: 80px;
  margin-top: 70px;
  width: auto;
}

.boxs {
  width: 700px;
  height: 400px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #F4F4F4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  width: 1800px;
  height: 1200px;
  background-color:#F4F4F4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 40px;
    margin-top: 20px;
    margin-bottom: 35px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 28px;
    margin-left: 20px;
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 25px;
    font-weight: 1000;
    margin-top: 90px;
    margin-left: 100px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 140px;
    height: 40px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* ระยะห่างด้านบน */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}



h2 {
  font-size: 35px;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 30px;
  margin-left: 55px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 25px;
  
}

}

@media screen and (max-width: 1024px) {
/* .app{
  background-color: #02BDCC;
  
  } */
  .container {
 margin-left: 5px;
  margin-top: 70px;
  width: auto;
}

.boxs {
  width: 500px;
  height: 400px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #F4F4F4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  width: 900px;
  height: 1200px;
  background-color:#F4F4F4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 35px;
    margin-top: 20px;
    margin-bottom: 35px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 25px;
    margin-left: 20px;
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 25px;
    font-weight: 1000;
    margin-top: 90px;
    margin-left: 100px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 140px;
    height: 40px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* ระยะห่างด้านบน */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}



h2 {
  font-size: 30px;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 25px;
  margin-left: 35px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 25px;
  
}

}

@media screen and (max-width: 820px) {

}

@media screen and (max-width: 768px) {
/* .app{
  display: flex;
  flex-direction: column;
  background-color: #02BDCC;
  
  } */
  .container {
  display: flex;
  flex-direction: column;
 margin-left: 5px;
  margin-top: 20px;
  width: auto;
}

.boxs {
  width: 500px;
  height: 290px;
  margin-left: 125px;
  margin-bottom: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #F4F4F4;
  border-radius: 20px;
}

.box {
  width: 710px;
  height: 1000px;
  margin-left: 25px;
  background-color:#F4F4F4;
  border-radius: 20px;
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 35px;
    margin-top: 20px;
    margin-bottom: 5px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 25px;
    margin-left: 20px;
    line-height: 1.8;
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 25px;
    font-weight: 1000;
    margin-top: 18px;
    margin-left: 160px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 140px;
    height: 40px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* ระยะห่างด้านบน */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}



h2 {
  font-size: 30px;
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 25px;
  margin-left: 35px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 25px;
  
}

}

@media screen and (max-width: 425px) {

/* .app{
  display: flex;
  flex-direction: column;
  background-color: #02BDCC;
  
  } */
  .container {
  display: flex;
  flex-direction: column;
 margin-left: 5px;
  margin-top: 20px;
  width: auto;
}

.boxs {
  width: 500px;
  height: 290px;
  margin-left: 125px;
  margin-bottom: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #F4F4F4;
  border-radius: 20px;
}

.box {
  width: 710px;
  height: 1000px;
  margin-left: 25px;
  background-color:#F4F4F4;
  border-radius: 20px;
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 25px;
    margin-top: 20px;
    margin-bottom: 5px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 25px;
    margin-left: 20px;
    line-height: 1.8;
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 25px;
    font-weight: 1000;
    margin-top: 18px;
    margin-left: 160px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 140px;
    height: 40px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* ระยะห่างด้านบน */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}



h2 {
  font-size: 20px;
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 25px;
  margin-left: 35px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 25px;
  
}

}

@media screen and (max-width: 376px) {


}



@media screen and (max-width: 320px) {


}




</style>





