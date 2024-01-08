<script>
import NavBar from "@/components/NavBar.vue";
import BoxComponent from '@/components/BoxComponent.vue';
import axios from "axios";
import { authenKey } from "../utils/config";
// import ItemhomeComponent from '../components/ItemhomeComponent.vue';

export default {
  mounted(){
    if(!localStorage.getItem(authenKey)){
      this.$router.push({ name: "LogIn" });
    };

    this.fetchData()
  },
  components: {
    NavBar,
    BoxComponent,
  //   ItemhomeComponent,
   },
   data() {
    return {
      dataClass: [],
      currentSection: 1, // เริ่มต้นที่ section 1
      boxes: [],
      isDropdownOpen1: false,
      isDropdownOpen2: false,
      isDropdownOpen3: false,

       // ... ข้อมูลอื่น ๆ ...
    dropdownOpen: {
      1: false,
      2: false,
      3: false,
      // เพิ่มตามจำนวนกล่องสีชมพูที่มี
    },

    dropdownContent: {
      1: '', // เพิ่มตามจำนวนกล่องสีชมพูที่มี
      2: '',
      3: '',
      // เพิ่มตามจำนวนกล่องสีชมพูที่มี
    },


    articles: [],
  


    };
  },

  methods: {
    goToPage(link) {
      // ให้ทำการเปลี่ยนหน้าไปที่ link ที่กำหนด
      this.$router.push({ path: link });
    },
    async fetchData(){
      try {
        const result = await axios.get('http://localhost:5000/test-elearning-b0646/us-central1/api/class/')
        if(result){
          this.boxes = result.data.map((item, index) =>({
            id:index + 1,
            data:item.fullname,
            imageSrc:item.img,
            name:item.name,
            link:item.classID
          }));
          this.articles = result.data.map((item, index) =>({
            id:index + 1,
            image:item.img,
            visibleText:item.content[0].header,
            visibleText1:item.content[0].body,
            hiddenText:item.content[0].hidden,
            isExpanded:false,
          }));
          console.log(this.articles)
        }
      } catch (error) {
        console.error("Error during getdata:", error);
      }
    },



//     scrollToAdditionalBox() {
//   console.log('scrollToAdditionalBox is called');

//   // ใช้ this.$nextTick เพื่อทำให้แน่ใจว่า DOM ได้ถูกอัปเดตและพร้อมใช้งาน
//   this.$nextTick(() => {
//     const boxes = document.querySelectorAll('.box');
//     const lastBox = boxes[boxes.length - 1]; // เลือกกล่องล่าสุด

//     console.log('lastBox:', lastBox);
//     console.log('isScrolledDown:', this.isScrolledDown);

//     if (lastBox) {
//       const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
//       const windowHeight = window.innerHeight;

//       if (this.isScrolledDown) {
//         // ถ้ามีการเลื่อนลงอยู่ในขณะนี้ ให้เลื่อนขึ้น
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       } else {
//         // ถ้าไม่ได้เลื่อนลง ให้เลื่อนลง
//         window.scrollTo({ top: scrollHeight - windowHeight, behavior: 'smooth' });
//       }

//       // สลับสถานะการเลื่อน
//       this.isScrolledDown = !this.isScrolledDown;

//       // เพิ่ม Console Log ที่คาดหวังว่าควรทำงาน
//       setTimeout(() => {
//         console.log('After scrolling:', window.scrollY);
//       }, 1000); // ระยะเวลาที่ให้ตัวควบคุมรอ
//     }
//   });
// },


// scrollToAdditionalBox() {
//   console.log('scrollToAdditionalBox is called');

//   // ใช้ this.$nextTick เพื่อทำให้แน่ใจว่า DOM ได้ถูกอัปเดตและพร้อมใช้งาน
//   this.$nextTick(() => {
//     const container = document.querySelector('.container');
//     const articleContainer = document.querySelector('.article-container');

//     if (container && articleContainer) {
//       const targetElement = this.isScrolledDown ? articleContainer : container;
//       targetElement.scrollIntoView({ behavior: 'smooth' });

//       // สลับสถานะการเลื่อน
//       this.isScrolledDown = !this.isScrolledDown;

//       // เพิ่ม Console Log ที่คาดหวังว่าควรทำงาน
//       setTimeout(() => {
//         console.log('After scrolling:', window.scrollY);
//       }, 1000); // ระยะเวลาที่ให้ตัวควบคุมรอ
//     }
//   });
// },



toggleSection() {
      this.currentSection = this.currentSection === 1 ? 2 : 1;
    },
    toggleSectionAndScroll() {
      this.toggleSection();

      // ใช้ this.$nextTick เพื่อทำให้แน่ใจว่า DOM ได้ถูกอัปเดตและพร้อมใช้งาน
      this.$nextTick(() => {
        // ทำการเลื่อนลงไปที่ Section 2
        const targetElement = document.querySelector("article-container");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }

      });
    },


    toggleArticle(article) {
      // ถ้า article.isExpanded เป็น true ให้กำหนดเป็น false และ ngượcกัน
      article.isExpanded = !article.isExpanded;
    },





},


  };

</script>



<template>
  <div>
    <!-- section 1 -->
    <div v-if="currentSection === 1">
      <NavBar />
      <div class="container">
        <div v-if="boxes != null || boxes != ''" class="row">
          <router-link v-for="box in boxes" :key="box.id" :to="`/class/${box.link}`" class="box">
            <BoxComponent :boxData="box" />
          </router-link>
        </div>
        <div v-else class="row">
          <h1>Data not available</h1>
        </div>
        <div class="text">
          <h1>เริ่มต้นการเรียน</h1>
          <h2>ภาษาคอมพิวเตอร์เบื้องต้น</h2>
        </div>
      </div>

      <!-- ปุ่มสำหรับสลับ section -->
      <div class="button">
        <button @click="toggleSectionAndScroll" class="scroll-button">อ่านบทความ</button>
      </div>
    </div>

    <!-- section 2 -->
    <div v-if="currentSection === 2">
      <div class="button">
          <button @click="toggleSection" class="scroll-button1">ย้อนกลับ</button>
        </div>

      <h3>บทความเบื้องต้น</h3>
      <div class="article-container">
        <div class="article-box" v-for="article in articles" :key="article.id">
          <img :src="article.image" alt="Article Image" class="article-image" />
            <div class="article-content">
            <div class="visible-text">
                <p v-html="article.visibleText"></p>
                <p v-html="article.visibleText1"></p>
            </div>
            <div class="hidden-text" v-if="article.isExpanded">
                <p v-html="article.hiddenText"></p>
            </div>
         </div>
        <div class="icon" @click="toggleArticle(article)">
      <!-- ใช้ไอคอนเปิด-ปิดกล่อง -->
            <i v-if="!article.isExpanded" class="bi bi-chevron-down"></i>
            <i v-else class="bi bi-chevron-up"></i>
          </div>
       </div>
      </div>
    </div>
  </div>
</template>




<style scoped>
* {
  /* background-color: #FAF5FF; */
  /* margin: 0px;
  padding: 0px; */
  box-sizing: border-box;
}

/* ส่วนของปุ่ม */
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 110px;
}



.scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
 margin-top: -5px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}


.scroll-button1 {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
  /* margin-top: -100px; */
  margin-bottom: 100px; /* ปรับตามความต้องการ */
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}



.scroll-button:hover {
  background-color: #f5c722;
}


.scroll-button2:hover {
  background-color: #f5c722;
}




/* กล่องแบบฝึก */
.container {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  text-align: center;
}

.row {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  margin-right: 30px;
  margin-top: 35px;
}

/* ส่วนตัวหนังสือแนะนำ คู่กับแบบฝึก */
.text{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 110px;
    margin-left: 260px;
     
}

h1 {
  font-size: 40px;
  margin-right: 5px;
  color: #ec4088;
  font-weight: bold;
}

h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #ffffff;
}

h3 {
  font-size: 29px; /* ปรับค่าตามที่คุณต้องการ */
  margin-left: 310px;
  padding-bottom: 1px;
  font-weight: bold;
  color: #ffffff;
  margin-top: -50px;
  margin-left: 320px;
  
}



p{
  background-color: #ffffff;
  font-size: 20px;
}

h{
  background-color: #ffffff;
  font-size: 20px;
  
  
}


/* เพิ่มสไตล์สำหรับกล่องบทความ */

.article-container {
  display: flex;
  flex-direction: column;
  margin: auto; /* เพิ่มบรรทัดนี้ */
  margin-top: 10px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 910px;
  border-radius: 20px;
 
}


.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: 15px;
  background-color: #ffffff;
  width: 900px;
  overflow: hidden;
  transition: height 0.3s ease;
  /* margin: 10px; */
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #000; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

.article-image {
  width: 70px;
  height: 70px;
  margin-top: 17px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}

.article-content {
  flex-grow: 1;
  padding: 10px; /* เพิ่ม padding เพื่อให้เนื้อหาไม่ติดกับขอบของกล่อง */
  
}

.visible-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column; /* เพิ่มบรรทัดนี้เพื่อจัดเรียงให้เป็นคอลัมน์ */
  align-items: flex-start; /* เพิ่มบรรทัดนี้เพื่อจัดให้ตัวหนังสือชิดซ้าย */
}

.visible-text p {
  font-size: 18px; /* ปรับขนาด font-size ตามต้องการ */
  font-weight:600;
}

.visible-text p:not(:first-child) {
  font-size: 16px; /* ปรับขนาด font-size ตามต้องการ */
  font-weight: normal; /* ทำตัวไม่หนาเฉพาะ visibleText1 */
}



.hidden-text {
  margin-top: 2px;
  
}

.hidden-text p {
  font-size: 16px; /* ปรับขนาด font-size ตามต้องการ */
  
}



.article-content {
  flex-grow: 1;
}

.icon {
  cursor: pointer;
  font-size: 25px;
  margin-right: 15px;
  margin-top: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}




@media screen and (max-width: 1441px) {
/* ทำให้ .container เรียงแนวตั้ง */

/* ส่วนตัวหนังสือแนะนำ คู่กับแบบฝึก */
.text{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-left: 100px;
     
}

.scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
 margin-top: 5px;
 margin-right: -10px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.text h1 {
    font-size: 45px;
   
  }

 

}






@media screen and (max-width: 1465px) {
/* ทำให้ .container เรียงแนวตั้ง */

/* ส่วนตัวหนังสือแนะนำ คู่กับแบบฝึก */
.text{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 110px;
    margin-left: 45px;
     
}
}





@media screen and (max-width: 1025px) {
/* ทำให้ .container เรียงแนวตั้ง */

/* ส่วนตัวหนังสือแนะนำ คู่กับแบบฝึก */
.text{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 110px;
    margin-left: 45px;
     
}


.text h1 {
    font-size: 35px;
   
  }


  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
 margin-top: -35px;
 margin-right: -10px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}


/* .scroll-button1 {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
  margin-bottom: 100px; 
  margin-top: -40px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
} */

h3 {
  font-size: 25px; /* ปรับค่าตามที่คุณต้องการ */
  padding-bottom: 1px;
  font-weight: bold;
  color: #ffffff;
  margin-top: -50px;
  margin-left: 180px;
  
}



.article-container {
  display: flex;
  flex-direction: column;
  margin: auto; /* เพิ่มบรรทัดนี้ */
  margin-top: 10px;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 700px;
  margin-bottom: 10px;
  border-radius: 20px;
 
}

.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: -10px;
  width: 50px;
  overflow: hidden;
  transition: height 0.3s ease;
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #000; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

  .article-image {
  width: 60px;
  height: 60px;
  margin-top: 17px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}


  /* ปรับ font-size ของ .visible-text */
  .visible-text p {
    font-size: 16px;
  }

  .visible-text p:not(:first-child) {
    font-size: 14px;
  }


  /* ปรับ font-size ของ .hidden-text */
  .hidden-text p {
    font-size: 14px;
  }

  /* ปรับ font-size ของ .icon */
  .icon {
    font-size: 20px;
  }



}





@media screen and (max-width: 769px) {
/* ทำให้ .container เรียงแนวตั้ง */
.container {
    flex-direction: column;
    text-align: left; /* จัดให้ตัวหนังสือชิดซ้าย */
    align-items: flex-start;
  }

/* ส่วนตัวหนังสือแนะนำ คู่กับแบบฝึก */
.text{
    order: -1;
    margin-top: 20px;
    margin-left: 270px;
    margin-bottom: -30px;
     
}

.text h1 {
    font-size: 35px;
   
  }

  .text h2 {
    font-size: 20px;
   
  }

  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  margin-top: -120px;
  margin-right: 10px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}


h3 {
  font-size: 25px; /* ปรับค่าตามที่คุณต้องการ */
  padding-bottom: 1px;
  font-weight: bold;
  color: #ffffff;
  margin-top: -50px;
  margin-left: 70px;
  
}


.article-container {
  display: flex;
  flex-direction: column;
  margin: auto; /* เพิ่มบรรทัดนี้ */
  margin-top: 10px;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 650px;
  margin-bottom: 10px;
  border-radius: 20px;
 
}

.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: -10px;
  width: 50px;
  overflow: hidden;
  transition: height 0.3s ease;
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #000; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

  .article-image {
  width: 60px;
  height: 60px;
  margin-top: 17px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}


  /* ปรับ font-size ของ .visible-text */
  .visible-text p {
    font-size: 16px;
  }

  .visible-text p:not(:first-child) {
    font-size: 14px;
  }


  /* ปรับ font-size ของ .hidden-text */
  .hidden-text p {
    font-size: 14px;
  }

  /* ปรับ font-size ของ .icon */
  .icon {
    font-size: 20px;
  }

  


}





@media screen and (max-width: 715px) {
/* ทำให้ .container เรียงแนวตั้ง */
.container {
    flex-direction: column;
    text-align: left; /* จัดให้ตัวหนังสือชิดซ้าย */
    align-items: flex-start;
  }

  /* ปรับ margin ของ .button และ .text */
  .button {
    margin-top: 5%;
  }

  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 230px;
   
  }

  .text h1 {
    font-size: 35px;
   
  }

  .text h2 {
    font-size: 17px;
   
  }

  h3 {
  font-size: 25px; /* ปรับค่าตามที่คุณต้องการ */
  font-weight: bold;
  margin-top: -50px;
  margin-left: 55px;
  
}

  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
 margin-top: -20px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

  /* ปรับ font-size ของปุ่ม */
  .scroll-button,
  .scroll-button1
   {
    font-size: 16px;
  }


  /* ปรับ font-size ของ .article-content */
  .article-content {
    padding: 10px;
  }

}


@media screen and (max-width: 663px) {
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 190px;
   
  }
}



@media screen and (max-width: 655px) {
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 190px;
   
  }
}


@media screen and (max-width: 576px) {
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 160px;
   
  }
}

@media screen and (max-width: 551px) {
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 160px;
   
  }

  .text h1 {
    font-size: 30px;
   
  }

  .text h2 {
    font-size: 15px;
   
  }

}


@media screen and (max-width: 535px) {
/* ทำให้ .container เรียงแนวตั้ง */
.container {
    flex-direction: column;
    text-align: left; /* จัดให้ตัวหนังสือชิดซ้าย */
    align-items: flex-start;
  }

  /* ปรับ margin ของ .button และ .text */
  .button {
    margin-top: 5%;
  }

  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 170px;
   
   
  }

  .text h1 {
    font-size: 30px;
   
  }

  .text h2 {
    font-size: 15px;
   
  }

  h3 {
  font-size: 22px; /* ปรับค่าตามที่คุณต้องการ */
  font-weight: bold;
  margin-top: -50px;
  margin-left: 40px;
  
}

  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
 margin-top: -20px;
 margin-right: -10px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}


  /* ปรับ font-size ของปุ่ม */
  .scroll-button,
  .scroll-button1
   {
    font-size: 15px;
  }



  /* ปรับ font-size ของ .article-content */
  .article-content {
    padding: 10px;
  }

  .article-container {
  display: flex;
  flex-direction: column;
  margin: auto; /* เพิ่มบรรทัดนี้ */
  margin-top: 10px;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 470px;
  margin-bottom: 10px;
  border-radius: 20px;
 
}


.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: -10px;
  width: 40px;
  overflow: hidden;
  transition: height 0.3s ease;
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #000; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

  .article-image {
  width: 55px;
  height: 55px;
  margin-top: 17px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}


  /* ปรับ font-size ของ .visible-text */
  .visible-text p {
    font-size: 15px;
  }

  .visible-text p:not(:first-child) {
    font-size: 13px;
  }


  /* ปรับ font-size ของ .hidden-text */
  .hidden-text p {
    font-size: 13px;
  }

  /* ปรับ font-size ของ .icon */
  .icon {
    font-size: 20px;
  }

}


@media screen and (max-width: 515px){
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 140px;
  
  }

}

@media screen and (max-width: 477px){
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 137px;
  
  }

}




@media screen and (max-width: 448px){
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 120px;
  
  }

}

@media screen and (max-width: 426px){
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 113px;
  
  }

  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
 margin-top: 35px;
 margin-right: -10px;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}



h3 {
  font-size: 20px; /* ปรับค่าตามที่คุณต้องการ */
  padding-bottom: 1px;
  font-weight: bold;
  color: #ffffff;
  margin-top: -50px;
  margin-left: 30px;
  
}


.article-container {
  display: flex;
  flex-direction: column;
  margin: auto; /* เพิ่มบรรทัดนี้ */
  margin-top: 10px;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 400px;
  margin-bottom: 10px;
  border-radius: 20px;
 
}

.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: -10px;
  width: 50px;
  overflow: hidden;
  transition: height 0.3s ease;
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #000; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

  .article-image {
  width: 60px;
  height: 60px;
  margin-top: 17px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}


  /* ปรับ font-size ของ .visible-text */
  .visible-text p {
    font-size: 14px;
  }

  .visible-text p:not(:first-child) {
    font-size: 12px;
  }


  /* ปรับ font-size ของ .hidden-text */
  .hidden-text p {
    font-size: 12px;
  }

  /* ปรับ font-size ของ .icon */
  .icon {
    font-size: 17px;
  }






}

@media screen and (max-width: 402px){
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 113px;
  
  }

  
  .text h1 {
    font-size: 27px;
   
  }

  .text h2 {
    font-size: 13px;
   
  }

  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
 margin-top: 13px;
 margin-right: -10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}


  /* ปรับ font-size ของปุ่ม */
  .scroll-button,
  .scroll-button1
   {
    font-size: 13px;
  }

}






@media screen and (max-width: 376px){
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 100px;
  
  }

  
  .text h1 {
    font-size: 27px;
   
  }

  .text h2 {
    font-size: 13px;
   
  }

  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
 margin-top: 10px;
 margin-right: -10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}



  h3 {
  font-size: 20px; /* ปรับค่าตามที่คุณต้องการ */
  font-weight: bold;
  color: #ffffff;
  margin-top: -50px;
  margin-left: 25px;
  
}



.article-container {
  display: flex;
  flex-direction: column;
  margin: auto; /* เพิ่มบรรทัดนี้ */
  margin-top: 10px;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 350px;
  margin-bottom: 10px;
  border-radius: 20px;
 
}

.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: -10px;
  width: 50px;
  overflow: hidden;
  transition: height 0.3s ease;
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #000; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

  .article-image {
  width: 60px;
  height: 60px;
  margin-top: 17px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}


  /* ปรับ font-size ของ .visible-text */
  .visible-text p {
    font-size: 14px;
  }

  .visible-text p:not(:first-child) {
    font-size: 12px;
  }


  /* ปรับ font-size ของ .hidden-text */
  .hidden-text p {
    font-size: 12px;
  }

  /* ปรับ font-size ของ .icon */
  .icon {
    font-size: 20px;
  }







}

@media screen and (max-width: 322px){
  .text {
    order: -1;
    margin-top: 15px;
    margin-bottom: -30px;
    margin-left: 75px;
  
  }

  
  .text h1 {
    font-size: 27px;
   
  }

  .text h2 {
    font-size: 13px;
   
  }

  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
 margin-top: 95px;
 margin-right: -10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}



  h3 {
  font-size: 18px; /* ปรับค่าตามที่คุณต้องการ */
  padding-bottom: 1px;
  font-weight: bold;
  color: #ffffff;
  margin-top: -50px;
  margin-left: 20px;
  
}



.article-container {
  display: flex;
  flex-direction: column;
  margin: auto; /* เพิ่มบรรทัดนี้ */
  margin-top: 10px;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 300px;
  margin-bottom: 10px;
  border-radius: 20px;
 
}

.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: -10px;
  width: 50px;
  overflow: hidden;
  transition: height 0.3s ease;
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #000; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

  .article-image {
  width: 40px;
  height: 40px;
  margin-top: 17px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}


  /* ปรับ font-size ของ .visible-text */
  .visible-text p {
    font-size: 14px;
  }

  .visible-text p:not(:first-child) {
    font-size: 12px;
  }


  /* ปรับ font-size ของ .hidden-text */
  .hidden-text p {
    font-size: 12px;
  }

  /* ปรับ font-size ของ .icon */
  .icon {
    font-size: 20px;
  }





}
  
</style>

