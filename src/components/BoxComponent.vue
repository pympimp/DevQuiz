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




/* responsive */



@media screen and (max-width: 2561px) {

  .boxcontainer{
    margin-right: -140px;
  }

  .box {
    width: 900px;
    height: 150px;
    margin-bottom: 50px; 
    margin-top: 110px; 
    margin-right: -250px;
    
  }

  .img-container {
  background-color: rgb(255, 255, 255);
  width: 190px;
  height: 190px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 50px;
}


 img {
  max-width: 120px;
  height: 120px;
} 

.text-container {
  text-align: left;
  margin-left: 30px;
  flex: 1; 
}


.main-title {
  font-size: 60px; 
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 45px; 
  color:#FFFFFF;
}


}


@media screen and (max-width: 1891px) {
  .box {
    width: 550px;
    height: 120px;
    margin-bottom: 20px; /* ระยะห่างระหว่างกล่อง */
    margin-top: 20px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
    margin-left: -110px;
    
  }
  
  .img-container {
  background-color: rgb(255, 255, 255);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 28px;
}


 img {
  max-width: 70px;
  height: 70px;
} 

.main-title {
  font-size: 30px; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 25px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}


}


@media screen and (max-width: 1441px) {
  .box {
    width: 550px;
    height: 120px;
    margin-bottom: 20px; /* ระยะห่างระหว่างกล่อง */
    margin-top: 20px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
    margin-left: -110px;
    
  }
  
  .img-container {
  background-color: rgb(255, 255, 255);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 28px;
}


 img {
  max-width: 70px;
  height: 70px;
} 

.main-title {
  font-size: 30px; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 25px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}


}




@media screen and (max-width: 1025px) {
  .box {
    width: 500px;
    margin-bottom: 20px; /* ระยะห่างระหว่างกล่อง */
    margin-top: -15px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
    margin-left: -90px;
    
  }


.flex-container {
  flex-direction: row;
  box-sizing: border-box; /* เพิ่ม line นี้เพื่อปรับแก้ปัญหาการบีบกล่อง */
}

.img-container {
  background-color: rgb(255, 255, 255);
  width: 85px;
  height: 85px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 28px;
}



 img {
  max-width: 60px;
  height: 60px;
} 

.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* จัดเรียงข้อความไปทางด้านบน */
}

.main-title {
  font-size: 25px; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 18px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}

}




@media screen and (max-width: 769px) {
  .box {
    width: 600px;
    margin-bottom: -18px; /* ระยะห่างระหว่างกล่อง */
    margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
    margin-left: 150px;
    
  }


.flex-container {
  flex-direction: row;
  box-sizing: border-box; /* เพิ่ม line นี้เพื่อปรับแก้ปัญหาการบีบกล่อง */
}

.img-container {
  background-color: rgb(255, 255, 255);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 28px;
}



 img {
  max-width: 35px;
  height: 35px;
} 

.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* จัดเรียงข้อความไปทางด้านบน */
}

.main-title {
  font-size: 25px; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 18px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}

}




@media screen and (max-width: 715px) {
  .box {

    width: 340px;
    margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
    margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
    margin-left: 70px;
    
  }


.flex-container {
  flex-direction: row;
  box-sizing: border-box; /* เพิ่ม line นี้เพื่อปรับแก้ปัญหาการบีบกล่อง */
}

.img-container {
  background-color: rgb(255, 255, 255);
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 28px;
}



 img {
  max-width: 45px;
  height: 45px;
} 

.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* จัดเรียงข้อความไปทางด้านบน */
}

.main-title {
  font-size: 25px; /* ขนาดตัวอักษรสำหรับ HTML */
  font-weight: bold;
  color: #CCCCCC;
}


.sub-title {
  font-size: 18px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
  color:#FFFFFF;
}

}


@media screen and (max-width: 648px){
  .box {
align-content: center;
width: 340px;
margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 40px;

}

}


@media screen and (max-width: 595px){
  .box {
align-content: center;
width: 340px;
margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 50px;

}

}


@media screen and (max-width: 558px){
  .box {
align-content: center;
width: 340px;
margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 40px;

}

}



@media screen and (max-width: 535px) {
  .box {
align-content: center;
width: 340px;
margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 70px;

}


.img-container {
background-color: rgb(255, 255, 255);
width: 70px;
height: 70px;
border-radius: 50%;
overflow: hidden;
margin-left: 28px;
}



img {
max-width: 41px;
height: 41px;
} 

.text-container {
display: flex;
flex-direction: column;
align-items: flex-start; /* จัดเรียงข้อความไปทางด้านบน */
}

.main-title {
font-size: 22px; /* ขนาดตัวอักษรสำหรับ HTML */
font-weight: bold;
color: #CCCCCC;
}


.sub-title {
font-size: 16px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
color:#FFFFFF;
}

}


@media screen and (max-width: 515px){
  .box {
align-content: center;
width: 340px;
margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 35px;

}

}

@media screen and (max-width: 477px){
  .box {
align-content: center;
width: 340px;
margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 30px;

}

}

@media screen and (max-width: 438px){
  .box {
align-content: center;
width: 340px;
margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 25px;

}

}


@media screen and (max-width: 426px){
  .box {
align-content: center;
width: 340px;
margin-bottom: -5px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 15px;


}

.main-title {
font-size: 20px; /* ขนาดตัวอักษรสำหรับ HTML */
font-weight: bold;
color: #CCCCCC;
}


.sub-title {
font-size: 15px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
color:#FFFFFF;
}



}

@media screen and (max-width: 376px){
  .box {
align-content: center;
width: 340px;
margin-bottom: -5px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 8px;


}

.main-title {
font-size: 20px; /* ขนาดตัวอักษรสำหรับ HTML */
font-weight: bold;
color: #CCCCCC;
}


.sub-title {
font-size: 15px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
color:#FFFFFF;
}



}

@media screen and (max-width: 359px){
  .box {
align-content: center;
width: 320px;
margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 8px;


}

.main-title {
font-size: 20px; /* ขนาดตัวอักษรสำหรับ HTML */
font-weight: bold;
color: #CCCCCC;
}


.sub-title {
font-size: 13px; /* ขนาดตัวอักษรสำหรับ Hypertext Markup Language */
color:#FFFFFF;
}



}

@media screen and (max-width: 359px){
  .box {
align-content: center;
width: 305px;
margin-bottom: 10px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 8px;


}
}

@media screen and (max-width: 322px){
  .box {
align-content: center;
width: 295px;
margin-bottom: -20px; /* ระยะห่างระหว่างกล่อง */
margin-top: 10px; /* ปรับตำแหน่งของกล่องเมื่อ responsive */
margin-left: 8px;


}

.img-container {
background-color: rgb(255, 255, 255);
width: 60px;
height: 60px;
border-radius: 50%;
overflow: hidden;
margin-left: 28px;
}



img {
max-width: 41px;
height: 41px;
} 


}


</style>
