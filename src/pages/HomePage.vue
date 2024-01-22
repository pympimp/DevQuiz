<script>
import NavBar from "@/components/NavBar.vue";
import BoxComponent from '@/components/BoxComponent.vue';
import axios from "axios";
import { authenKey } from '../utils/config';
// import ItemhomeComponent from '../components/ItemhomeComponent.vue';

export default {
  name: "HomePage",
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
        <div class="text">
          <h1>เริ่มต้นการเรียน</h1>
          <h2>ภาษาคอมพิวเตอร์เบื้องต้น</h2>
        </div>
        <div v-if="boxes != null || boxes != ''" class="row" >
          <router-link v-for="box in boxes" :key="box.id" :to="`/class/${box.link}`" class="box">
            <BoxComponent :boxData="box" />
          </router-link>
        </div>
        <div v-else class="row">
          <h1>Data not available</h1>
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
  
        <div class="contai">
          <div class="containers">
            <h3>บทความเบื้องต้น</h3>
        </div>
      <div class="article-container">
        <div class="article-box" v-for="article in articles" :key="article.id">
          <img :src="article.image" alt="Article Image" class="article-image" />
            <div class="article-content">
            <div class="visible-text">
                <p v-html="article.visibleText"></p>
                <p v-html="article.visibleText1"></p>
            </div>
            <Transition name="slide-fade">
            <div class="hidden-text" v-if="article.isExpanded">
                <p v-html="article.hiddenText"></p>
            </div>
          </Transition>
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

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}


.scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
 margin-top: -15px;
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
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  
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
   
     
}

h1 {
  font-size: 65px;
  color: #ec4088;
  font-weight: bold;
}

h2 {
  font-size: 25px;
  margin-bottom: 20px;
  color: #ffffff;
}

h3 {
  font-size: 29px; /* ปรับค่าตามที่คุณต้องการ */
  font-weight: bold;
  color: #ffffff;

  
 
  
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
.contai {
  display: flex;
  flex-direction: column;
  /* background-color: #f5c722; */
  margin: auto;
  width: 1300px;
  
  
}

.containers h3 {
  display: flex;
  align-items: flex-start;
  margin-top: -30px;
}


.article-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 1300px;
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
  border-bottom: 1.5px solid #777777; 
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

.article-image {
  width: 70px;
  height: 70px;
  margin-top: 17px;
  margin-left: 10px;
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
  font-size: 20px; /* ปรับขนาด font-size ตามต้องการ */
  font-weight:600;
}

.visible-text p:not(:first-child) {
  margin-top:10px ;
  font-size: 17px; /* ปรับขนาด font-size ตามต้องการ */
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




/* reponsive */
@media only screen and (max-width: 480px) {
  .container {
    flex-direction: column;
  
  }


  .text {
    order: -1;
    display: flex;
    margin-top: 2%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
   
  }

  .text h1 {
    font-size: 1.7rem;
   
  }

  .text h2 {
    font-size: 1rem;
    margin-bottom: 5%;
   
  }


  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

  /* ปรับ font-size ของปุ่ม */
  .scroll-button,
  .scroll-button1
   {
    font-size: 0.9rem;
  }

   /* ปรับ margin ของ .button และ .text */
   .button {
    margin-top: 20%;
  }

/* เพิ่มสไตล์สำหรับกล่องบทความ */

.contai {
  display: flex;
  flex-direction: column;
  /* background-color: #f5c722; */
  margin: auto;
  width: 420px;
  
}

.containers h3 {
  display: flex;
  align-items: flex-start;

}


.article-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 420px;
  border-radius: 20px;
 
}


h3 {
  font-size: 1.9rem; /* ปรับค่าตามที่คุณต้องการ */
  padding-bottom: 1px;
  font-weight: bold;
  color: #ffffff;

}

.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: 15px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  /* margin: 10px; */
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #777777; 
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

.article-image {
  width: 50px;
  height: 50px;
  margin-top: 17px;
  margin-left: 5px;
  margin-right: 10px;
  margin-bottom: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}

.article-content {
  flex-grow: 1;
  padding: 8px; /* เพิ่ม padding เพื่อให้เนื้อหาไม่ติดกับขอบของกล่อง */
  
}

.visible-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column; /* เพิ่มบรรทัดนี้เพื่อจัดเรียงให้เป็นคอลัมน์ */
  align-items: flex-start; /* เพิ่มบรรทัดนี้เพื่อจัดให้ตัวหนังสือชิดซ้าย */
}

.visible-text p {
  font-size: 1.2rem; /* ปรับขนาด font-size ตามต้องการ */
  font-weight:600;
}

.visible-text p:not(:first-child) {
  margin-top: 7px;
  font-size: 0.9rem; /* ปรับขนาด font-size ตามต้องการ */
  font-weight: normal; /* ทำตัวไม่หนาเฉพาะ visibleText1 */
}

.hidden-text p {
  font-size: 0.9rem; /* ปรับขนาด font-size ตามต้องการ */
  
}

.hidden-text {
  margin-top: 2px;
  
}


.article-content {
  flex-grow: 1;
}

.icon {
  cursor: pointer;
  font-size: 25px;
  margin-right: 5px;
  margin-top: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}


}



@media screen and (min-width: 481px) and (max-width: 768px) {
  .container {
    flex-direction: column;
    
  }

  .text {
    order: -1;
    margin-top: 1.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
   
  }

  .text h1 {
    font-size: 2.5rem;
   
  }

  .text h2 {
    font-size: 1.2rem;
    margin-bottom: 1%;
   
  }


  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  margin-right: 50px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

  /* ปรับ font-size ของปุ่ม */
  .scroll-button,
  .scroll-button1
   {
    font-size: 0.9rem;
  }

   /* ปรับ margin ของ .button และ .text */
   .button {
    margin-top: 10%;
  }

/* เพิ่มสไตล์สำหรับกล่องบทความ */

.contai {
  display: flex;
  flex-direction: column;
  /* background-color: #f5c722; */
  margin: auto;
  width: 650px;
  
}

.containers h3 {
  display: flex;
  align-items: flex-start;

}

.article-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 650px;
  border-radius: 20px;
 
}


h3 {
  font-size: 1.5rem; /* ปรับค่าตามที่คุณต้องการ */
  padding-bottom: 1px;
  font-weight: bold;
  color: #ffffff;
 
}

.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: 15px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  /* margin: 10px; */
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #777777; 
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

.article-image {
  width: 55px;
  height: 55px;
  margin-top: 17px;
  margin-left: 5px;
  margin-right: 10px;
  margin-bottom: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}

.article-content {
  flex-grow: 1;
  padding: 8px; /* เพิ่ม padding เพื่อให้เนื้อหาไม่ติดกับขอบของกล่อง */
  
}

.visible-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column; /* เพิ่มบรรทัดนี้เพื่อจัดเรียงให้เป็นคอลัมน์ */
  align-items: flex-start; /* เพิ่มบรรทัดนี้เพื่อจัดให้ตัวหนังสือชิดซ้าย */
}

.visible-text p {
  font-size: 1.2rem; /* ปรับขนาด font-size ตามต้องการ */
  font-weight:600;
}

.visible-text p:not(:first-child) {
  margin-top: 7px;
  font-size: 0.9rem; /* ปรับขนาด font-size ตามต้องการ */
  font-weight: normal; /* ทำตัวไม่หนาเฉพาะ visibleText1 */
}

.hidden-text p {
  font-size: 0.9rem; /* ปรับขนาด font-size ตามต้องการ */
  
}

.hidden-text {
  margin-top: 2px;
  
}


.article-content {
  flex-grow: 1;
}

.icon {
  cursor: pointer;
  font-size: 25px;
  margin-right: 5px;
  margin-top: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}


}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .container {
    flex-direction: column;
  
  }


  .text {
    order: -1;
    margin-top: 1.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
   
  }

  .text h1 {
    font-size: 2.7rem;
   
  }

  .text h2 {
    font-size: 1.3rem;
    margin-bottom: 1%;
   
  }


  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  margin-right: 50px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

  /* ปรับ font-size ของปุ่ม */
  .scroll-button,
  .scroll-button1
   {
    font-size: 1rem;
  }

   /* ปรับ margin ของ .button และ .text */
   .button {
    margin-top: 4.5%;
  }

/* เพิ่มสไตล์สำหรับกล่องบทความ */
.contai {
  display: flex;
  flex-direction: column;
  /* background-color: #f5c722; */
  margin: auto;
  width: 900px;
  
}

.containers h3 {
  display: flex;
  align-items: flex-start;

}
.article-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 900px;
  border-radius: 20px;
 
}


h3 {
  font-size: 1.5rem; /* ปรับค่าตามที่คุณต้องการ */
  padding-bottom: 1px;
  font-weight: bold;
  color: #ffffff;
 
  
}

.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: 25px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  /* margin: 10px; */
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #777777; 
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

.article-image {
  width: 60px;
  height: 60px;
  margin-top: 17px;
  margin-left: 5px;
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
  font-size: 1.3rem; /* ปรับขนาด font-size ตามต้องการ */
  font-weight:600;
}

.visible-text p:not(:first-child) {
  margin-top: 7px;
  font-size: 1rem; /* ปรับขนาด font-size ตามต้องการ */
  font-weight: normal; /* ทำตัวไม่หนาเฉพาะ visibleText1 */
}

.hidden-text p {
  font-size: 1rem; /* ปรับขนาด font-size ตามต้องการ */
  
}

.hidden-text {
  margin-top: 2px;
  
}


.article-content {
  flex-grow: 1;
}

.icon {
  cursor: pointer;
  font-size: 25px;
  margin-right: 5px;
  margin-top: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}


}

@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .container {
    flex-direction: row;
    
  }

  .text{
    order: -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
     
}

  .text h1 {
    font-size: 2.8rem;
   
  }

  .text h2 {
    font-size: 1.4rem;
   
  }


  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  margin-right: 50px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

  /* ปรับ font-size ของปุ่ม */
  .scroll-button,
  .scroll-button1
   {
    font-size: 1rem;
  }

   /* ปรับ margin ของ .button และ .text */
   .button {
    margin-top: 8%;
  }

/* เพิ่มสไตล์สำหรับกล่องบทความ */

.contai {
  display: flex;
  flex-direction: column;
  /* background-color: #f5c722; */
  margin: auto;
  width: 1100px;
  
}

.containers h3 {
  display: flex;
  align-items: flex-start;

}

.article-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 1100px;
  border-radius: 20px;
 
}


h3 {
  font-size: 1.7rem; /* ปรับค่าตามที่คุณต้องการ */
  padding-bottom: 1px;
  font-weight: bold;
  color: #ffffff;
 
  
}

.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: 25px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  /* margin: 10px; */
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #777777; 
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

.article-image {
  width: 70px;
  height: 70px;
  margin-top: 17px;
  margin-left: -5px;
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
  font-size: 1.3rem; /* ปรับขนาด font-size ตามต้องการ */
  font-weight:600;
}

.visible-text p:not(:first-child) {
  margin-top: 7px;
  font-size: 1rem; /* ปรับขนาด font-size ตามต้องการ */
  font-weight: normal; /* ทำตัวไม่หนาเฉพาะ visibleText1 */
}

.hidden-text p {
  font-size: 1rem; /* ปรับขนาด font-size ตามต้องการ */
  
}

.hidden-text {
  margin-top: 2px;
  
}


.article-content {
  flex-grow: 1;
}

.icon {
  cursor: pointer;
  font-size: 25px;
  margin-right: 5px;
  margin-top: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}

}


@media screen and (min-width: 1200px)  {
  .container {
    flex-direction: row;
    
  }

  .text{
    order: -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
     
}

  .text h1 {
    font-size: 2.8rem;
   
  }

  .text h2 {
    font-size: 1.4rem;
   
  }


  .scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  margin-right: 50px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

  /* ปรับ font-size ของปุ่ม */
  .scroll-button,
  .scroll-button1
   {
    font-size: 1rem;
  }

   /* ปรับ margin ของ .button และ .text */
   .button {
    margin-top: 8%;
  }

  /* เพิ่มสไตล์สำหรับกล่องบทความ */

.contai {
  display: flex;
  flex-direction: column;
  /* background-color: #f5c722; */
  margin: auto;
  width: 1200px;
  
}

.containers h3 {
  display: flex;
  align-items: flex-start;

}

.article-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  width: 1200px;
  border-radius: 20px;
 
}


h3 {
  font-size: 1.7rem; /* ปรับค่าตามที่คุณต้องการ */
  padding-bottom: 1px;
  font-weight: bold;
  color: #ffffff;
 
  
}

.article-box {
  display: flex;
  margin-top: 10px;
  margin-bottom: 12px;
  background-color: #ffffff;
  overflow: hidden;
  transition: height 0.3s ease;
  /* margin: 10px; */
  margin-left: auto; /* ทำให้กล่องอยู่กลางตามด้านซ้าย */
  margin-right: auto; /* ทำให้กล่องอยู่กลางตามด้านขวา */
  border-bottom: 1.5px solid #777777; 
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
}

.article-image {
  width: 70px;
  height: 70px;
  margin-top: 17px;
  margin-left: -5px;
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
  font-size: 1.3rem; /* ปรับขนาด font-size ตามต้องการ */
  font-weight:600;
}

.visible-text p:not(:first-child) {
  margin-top: 7px;
  font-size: 1rem; /* ปรับขนาด font-size ตามต้องการ */
  font-weight: normal; /* ทำตัวไม่หนาเฉพาะ visibleText1 */
}

.hidden-text p {
  font-size: 1rem; /* ปรับขนาด font-size ตามต้องการ */
  
}

.hidden-text {
  margin-top: 2px;
  
}


.article-content {
  flex-grow: 1;
}

.icon {
  cursor: pointer;
  font-size: 25px;
  margin-right: 5px;
  margin-top: 20px;
  align-self: flex-start; /* ทำให้รูปอยู่ด้านบน */
}
  
}
  
</style>

