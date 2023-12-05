<script>
import NavBar from "@/components/NavBar.vue";
import BoxComponent from '@/components/BoxComponent.vue';
// import ItemhomeComponent from '../components/ItemhomeComponent.vue';

export default {
  components: {
    NavBar,
    BoxComponent,
  //   ItemhomeComponent,
   },
   data() {
    return {
      boxes: [
        { id: 1, label: '', data: 'HTML: Hypertext Markup Language', imageSrc: '/images/html.png', link: '' },
        { id: 2, label: '', data: 'CSS: Cascading Style Sheet', imageSrc: '/images/css.png', link: '' },
        { id: 3, label: '', data: 'JavaScript:', imageSrc: '/images/javascript.png', link: '' },
      ],
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


    articles: [
        {
          id: 1,
          image: '/images/html.png',
          visibleText: 'เอชทีเอ็มแอล (อังกฤษ: HTML: Hypertext Markup Language ภาษามาร์กอัปข้อความหลายมิติ) เป็นภาษามาร์กอัปหลักในปัจจุบันที่ใช้ในการสร้างเว็บเพจ หรือข้อมูลอื่นที่เรียกดูผ่านทางเว็บเบราว์เซอร์ ซึ่งตัวโค้ดจะแสดงโครงสร้างของข้อมูล ในการแสดง หัวข้อ ลิงก์ ย่อหน้า รายการ รวมถึงการสร้างแบบฟอร์ม เชื่อมโยงภาพหรือวิดีโอด้วย',
          hiddenText: 'โครงสร้างหลักของภาษา HTML (Hyper Text Markup Language) จะแบ่งออกเป็น 3 ส่วน คือ 1. ส่วนประกาศ เป็นส่วนที่กำหนดให้บราวเซอร์ทราบว่า นี่คือภาษา HTML และจะต้องทำการแปรผลอย่างไรมีคำสั่งคู่เดียวคือ <html> และ </html> ปรากฏที่หัวและท้ายไฟล์ 2. ส่วนหัวเรื่อง (head)  เป็นส่วนที่แสดงผลข้อความบนไตเติ้ลบาร์ของบราวเซอร์ และอาจมีคำสั่งสำหรับกำหนดรายละเอียดด้านเทคนิคอื่นๆ อีก แทรกอยู่ระหว่างคำสั่ง <head> และ  </head> \n3. ส่วนเนื้อหา (body)  เป็นส่วนที่มีความซับซ้อนมากที่สุด และสามารถใส่เทคนิคลูกเล่นเพื่อดึงดูดความสนใจจากผู้ชมได้มาก ความแตกต่างระหว่างเว็บไซต์ต่างๆ แสดงความมีฝีมือของผู้จัดทำ ศิลปะในการออกแบบจะอยู่ในส่วนนี้ทั้งหมด ซึ่งจะแทรกอยู่ระหว่างคำสั่ง <body> และ  </body> ',
          isExpanded: false,
        },
        {
          id: 2,
          image: '/images/css.png',
          visibleText: 'CSS (ภาษาอังกฤษ: Cascading Style Sheet) หรือที่มักเรียกสั้นๆ ว่า ‘สไตล์ชีต’ เป็นภาษาที่ใช้ส่วนของการจัดรูปแบบการแสดงผลเอกสาร HTML โดยที่ CSS กำหนดและระบุรูปแบบ หรือ Style ของเนื้อหาในเอกสาร เช่น สีของข้อความ สีพื้นหลัง ประเภทและขนาดของตัวอักษร การจัดวางข้อความ และตกแต่งส่วนต่างๆของหน้าเว็บให้มีความสวยงาม',
          hiddenText: 'CSS สามารถกำหนดการแสดงผลของ HTML ได้หลายๆ หน้า โดยใช้ CSS เพียงไฟล์เดียว หรือ CSS ใส่ใน HTML ได้ 3 วิธีด้วยกัน คือ 1. Inline โดยใช้ Attribute style ใน HTML Element Inline CSS ใช้ในการตกแต่ง HTML Element นั้นๆ เพียงอันเดียว โดยกำหนดค่าใน Attribute style ของ Element นั้นๆ 2. Internal โดยใช้ Element <style> ในส่วนของ <head> Internal CSS ใช้ในการตกแต่งหน้าเว็บนั้นๆ เพียงหน้าเดียวโดยกำหนดค่าใน Element <style> ในส่วนของ <head> 3. External โดยใช้ไฟล์ CSS แล้วลิงก์ไฟล์เข้ามาใน HTML External CSS สามารถใช้ตกแต่งหน้าเว็บได้หลายๆ หน้าด้วยการแก้ External CSS เพียงไฟล์เดียว สามารถทำให้หน้าเว็บทั้งเว็บไซต์ซึ่งอาจมีหลายร้อยหลายพันหน้าเปลี่ยนได้ โดยลิงก์ไฟล์ CSS เข้ามาใน HTML ในส่วนของ </head>',
          isExpanded: false,
        },
        {
          id: 3,
          image: '/images/JavaScript.png',
          visibleText: 'จาวาสคริปต์ (อังกฤษ: JavaScript) เป็นภาษาสคริปต์ทีมีลักษณะการเขียนแบบโพรโทไทป์ โดยมีโครงสร้างของภาษาและไวยกรณ์อยู่บนพื้นฐานของภาษาซี มีการใช้จาวาสคริปต์ที่ฝังอยู่ในเว็บเบราว์เซอร์ในหลายรูปแบบ เช่น ใช้เพื่อสร้างเนื้อหาที่เปลี่ยนแปลงเสมอภายในเว็บเพจ, ใช้เพื่อตรวจสอบความถูกต้องของข้อมูลที่ผู้ใช้กรอกก่อนนำเข้าระบบ',
          hiddenText: 'จาวาสคริปต์ ส่วนมากใช้ในหน้าเว็บเพื่อประมวลผลข้อมูลที่ฝั่งของผู้ใช้งาน แต่ก็ยังมีใช้เพื่อเพิ่มเติมความสามารถในการเขียนสคริปต์โดยฝังอยู่ในโปรแกรมอื่น ๆ',
          visibleText1:'เป็นภาษามาร์กอัปหลักในปัจจุบันที่ใช้ในการสร้างเว็บเพจ หรือข้อมูลอื่นที่เรียกดูผ่านทางเว็บเบราว์เซอร์ ซึ่งตัวโค้ดจะแสดงโครงสร้างของข้อมูล ในการแสดง หัวข้อ ลิงก์ ย่อหน้า รายการ รวมถึงการสร้างแบบฟอร์ม เชื่อมโยงภาพหรือวิดีโอด้วย',
        },
        
        {
          id: 2,
          image: '/images/css.png',
          visibleText:'CSS (ภาษาอังกฤษ: Cascading Style Sheet)',
          visibleText1:'หรือที่มักเรียกสั้นๆ ว่า ‘สไตล์ชีต’ เป็นภาษาที่ใช้ส่วนของการจัดรูปแบบการแสดงผลเอกสาร HTML โดยที่ CSS กำหนดและระบุรูปแบบ หรือ Style ของเนื้อหาในเอกสาร เช่น สีของข้อความ สีพื้นหลัง ประเภทและขนาดของตัวอักษร การจัดวางข้อความ และตกแต่งส่วนต่างๆของหน้าเว็บให้มีความสวยงาม',
          hiddenText: 'CSS สามารถกำหนดการแสดงผลของ HTML ได้หลายๆ หน้า โดยใช้ CSS เพียงไฟล์เดียว หรือ CSS ใส่ใน HTML ได้ 3 วิธีด้วยกัน คือ <br>1. Inline โดยใช้ Attribute style ใน HTML Element Inline CSS ใช้ในการตกแต่ง HTML Element นั้นๆ เพียงอันเดียว โดยกำหนดค่าใน Attribute style ของ Element นั้นๆ <br>2. Internal โดยใช้ Element &lt;style&gt; ในส่วนของ &lt;head&gt;Internal CSS ใช้ในการตกแต่งหน้าเว็บนั้นๆ เพียงหน้าเดียวโดยกำหนดค่าใน Element &lt;style&gt; ในส่วนของ &lt;head&gt; <br>3. External โดยใช้ไฟล์ CSS แล้วลิงก์ไฟล์เข้ามาใน HTML External CSS สามารถใช้ตกแต่งหน้าเว็บได้หลายๆ หน้าด้วยการแก้ External CSS เพียงไฟล์เดียว สามารถทำให้หน้าเว็บทั้งเว็บไซต์ซึ่งอาจมีหลายร้อยหลายพันหน้าเปลี่ยนได้ โดยลิงก์ไฟล์ CSS เข้ามาใน HTML ในส่วนของ &lt;head&gt;</p>',
          isExpanded: false,
        },

        {
          id: 3,
          image: '/images/JavaScript.png',
          visibleText:'จาวาสคริปต์ (อังกฤษ: JavaScript) ',
          visibleText1:'เป็นภาษาสคริปต์ทีมีลักษณะการเขียนแบบโพรโทไทป์ โดยมีโครงสร้างของภาษาและไวยกรณ์อยู่บนพื้นฐานของภาษาซี มีการใช้จาวาสคริปต์ที่ฝังอยู่ในเว็บเบราว์เซอร์ในหลายรูปแบบ ',
          hiddenText: ' เช่น ใช้เพื่อสร้างเนื้อหาที่เปลี่ยนแปลงเสมอภายในเว็บเพจ, ใช้เพื่อตรวจสอบความถูกต้องของข้อมูลที่ผู้ใช้กรอกก่อนนำเข้าระบบ จาวาสคริปต์ ส่วนมากใช้ในหน้าเว็บเพื่อประมวลผลข้อมูลที่ฝั่งของผู้ใช้งาน แต่ก็ยังมีใช้เพื่อเพิ่มเติมความสามารถในการเขียนสคริปต์โดยฝังอยู่ในโปรแกรมอื่น ๆ',
          isExpanded: false,
        },
      ],
  


    };
  },

  methods: {
    goToPage(link) {
      // ให้ทำการเปลี่ยนหน้าไปที่ link ที่กำหนด
      this.$router.push({ path: link });
    },

    scrollToAdditionalBox() {
  console.log('scrollToAdditionalBox is called');

  // ใช้ this.$nextTick เพื่อทำให้แน่ใจว่า DOM ได้ถูกอัปเดตและพร้อมใช้งาน
  this.$nextTick(() => {
    const boxes = document.querySelectorAll('.box');
    const lastBox = boxes[boxes.length - 1]; // เลือกกล่องล่าสุด

    console.log('lastBox:', lastBox);
    console.log('isScrolledDown:', this.isScrolledDown);

    if (lastBox) {

      if (this.isScrolledDown) {
        // ถ้ามีการเลื่อนลงอยู่ในขณะนี้ ให้เลื่อนขึ้น
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // ถ้าไม่ได้เลื่อนลง ให้เลื่อนลง
        window.scrollTo({ top: document.body.scrollHeight - window.innerHeight, behavior: 'smooth' });
      }

      // สลับสถานะการเลื่อน
      this.isScrolledDown = !this.isScrolledDown;

      // เพิ่ม Console Log ที่คาดหวังว่าควรทำงาน
      setTimeout(() => {
        console.log('After scrolling:', window.scrollY);
      }, 1000); // ระยะเวลาที่ให้ตัวควบคุมรอ
    }
  });
},


  toggleArticle(article) {
    article.isExpanded = !article.isExpanded;
  },
},


  };

</script>





<template>
  <NavBar />
  <!-- section หน้าโฮม -->
    <div class="container">
  <div class="row">
    <router-link v-for="box in boxes" :key="box.id" :to="box.link" class="box">
      <BoxComponent :boxData="box" />
    </router-link>
  </div>
    <div class="text">
        <h1>เริ่มต้นการเรียน</h1>
        <h2>ภาษาคอมพิวเตอร์เบื้องต้น</h2>
    </div>
  </div>

    <div class="button">
    <button @click="scrollToAdditionalBox" class="scroll-button">อ่านบทความ</button>
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

/* .button1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:10px;
  margin-bottom: -65px; 
} */

.scroll-button {
  background-color: #f5c722;
  color: #434343;
  padding: 10px 20px;
  margin-bottom: 110px; /* ปรับตามความต้องการ */
 margin-top: -100px;
  font-size: 18px;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.scroll-button:hover {
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
  margin-left: 27%;
  
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
  justify-content: center;
}

.card1 {
  background-color: #ffffff;
  width: 350px;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
  margin-top: 30px;
}

.card2 {
  background-color: #ffffff;
  width: 350px;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
  margin-top: 30px;
}

.card3 {
  background-color: #ffffff;
  width: 350px;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
  margin-top: 30px;
}

p {
  background-color: #ffffff;
  font-size: 20px;
}

h {
  background-color: #ffffff;
  font-size: 20px;
  
  
}


/* เพิ่มสไตล์สำหรับกล่องบทความ */



.article-container {
  display: flex;
  flex-direction: column;
  margin: auto; /* เพิ่มบรรทัดนี้ */
  margin-top: 10px;
  margin-bottom: 20px;
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


</style>
