
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
        { id: 1, label: '', data: 'HTML: Hypertext Markup Language', imageSrc: '/images/html.png', link: '/home1' },
        { id: 2, label: '', data: 'CSS: Cascading Style Sheet', imageSrc: '/images/css.png', link: '/home2' },
        { id: 3, label: '', data: 'JavaScript:', imageSrc: '/images/javascript.png', link: '/home3' },
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


  },
};
</script>



<template>
  <div>
    <NavBar />
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
  </div>
  
<!--กล่อง1 -->
  <div class="card">
  <div class="card1">
    <input id="ch" type="checkbox">
    <img src="/images/html.png" />
    <p>เอชทีเอ็มแอล (อังกฤษ: HTML: Hypertext Markup Language ภาษามาร์กอัปข้อความหลายมิติ) เป็นภาษามาร์กอัปหลักในปัจจุบันที่ใช้ในการสร้างเว็บเพจ หรือข้อมูลอื่นที่เรียกดูผ่านทางเว็บเบราว์เซอร์ ซึ่งตัวโค้ดจะแสดงโครงสร้างของข้อมูล ในการแสดง หัวข้อ ลิงก์ ย่อหน้า รายการ รวมถึงการสร้างแบบฟอร์ม เชื่อมโยงภาพหรือวิดีโอด้วย</p>
    <div class="content">
    
      <h pre v-pre>โครงสร้างหลักของภาษา HTML (Hyper Text Markup Language) จะแบ่งออกเป็น 3 ส่วน คือ
      <p>1. ส่วนประกาศ เป็นส่วนที่กำหนดให้บราวเซอร์ทราบว่า นี่คือภาษา HTML และจะต้องทำการแปรผลอย่างไรมีคำสั่งคู่เดียวคือ &lt;html&gt; และ &lt;/html&gt; ปรากฏที่หัวและท้ายไฟล์</p>
      <p>2. ส่วนหัวเรื่อง (head) เป็นส่วนที่แสดงผลข้อความบนไตเติ้ลบาร์ของบราวเซอร์ และอาจมีคำสั่งสำหรับกำหนดรายละเอียดด้านเทคนิคอื่นๆ อีก แทรกอยู่ระหว่างคำสั่ง &lt;head&gt; และ &lt;/head&gt;</p>
      <p>3. ส่วนเนื้อหา (body) เป็นส่วนที่มีความซับซ้อนมากที่สุด และสามารถใส่เทคนิคลูกเล่นเพื่อดึงดูดความสนใจจากผู้ชมได้มาก ความแตกต่างระหว่างเว็บไซต์ต่างๆ แสดงความมีฝีมือของผู้จัดทำ ศิลปะในการออกแบบจะอยู่ในส่วนนี้ทั้งหมด ซึ่งจะแทรกอยู่ระหว่างคำสั่ง &lt;body&gt; และ &lt;/body&gt;</p>
      </h>
      <label for="ch">Show less</label>
    </div>

    <label for="ch">Read more</label>
    </div>


   <!--กล่อง2 -->
    <div class="card2">
    <input id="ch1" type="checkbox">
    <img src="/images/css.png"  />
    <p>CSS (ภาษาอังกฤษ: Cascading Style Sheet) หรือที่มักเรียกสั้นๆ ว่า ‘สไตล์ชีต’ เป็นภาษาที่ใช้ส่วนของการจัดรูปแบบการแสดงผลเอกสาร HTML โดยที่ CSS กำหนดและระบุรูปแบบ หรือ Style ของเนื้อหาในเอกสาร เช่น สีของข้อความ สีพื้นหลัง ประเภทและขนาดของตัวอักษร การจัดวางข้อความ และตกแต่งส่วนต่างๆของหน้าเว็บให้มีความสวยงาม</p>
    <div class="content">
      <h pre v-pre>CSS สามารถกำหนดการแสดงผลของ HTML ได้หลายๆ หน้า โดยใช้ CSS เพียงไฟล์เดียว หรือ CSS ใส่ใน HTML ได้ 3 วิธีด้วยกัน คือ
      <p>1. Inline โดยใช้ Attribute style ใน HTML Element Inline CSS ใช้ในการตกแต่ง HTML Element นั้นๆ เพียงอันเดียว โดยกำหนดค่าใน Attribute style ของ Element นั้นๆ </p>
      <p>2. Internal โดยใช้ Element &lt;style&gt; ในส่วนของ &lt;head&gt;Internal CSS ใช้ในการตกแต่งหน้าเว็บนั้นๆ เพียงหน้าเดียวโดยกำหนดค่าใน Element &lt;style&gt; ในส่วนของ &lt;head&gt; </p>
      <p>3. External โดยใช้ไฟล์ CSS แล้วลิงก์ไฟล์เข้ามาใน HTML External CSS สามารถใช้ตกแต่งหน้าเว็บได้หลายๆ หน้าด้วยการแก้ External CSS เพียงไฟล์เดียว สามารถทำให้หน้าเว็บทั้งเว็บไซต์ซึ่งอาจมีหลายร้อยหลายพันหน้าเปลี่ยนได้ โดยลิงก์ไฟล์ CSS เข้ามาใน HTML ในส่วนของ &lt;head&gt;</p>
      </h>
      <label for="ch1">Show less</label>
    </div>

    <label for="ch1">Read more</label>
    </div>


<!--กล่อง3 -->
    <div class="card3">
    <input id="ch2" type="checkbox">
    <img src="/images/JavaScript.png"  />
    <p>จาวาสคริปต์ (อังกฤษ: JavaScript) เป็นภาษาสคริปต์ทีมีลักษณะการเขียนแบบโพรโทไทป์ โดยมีโครงสร้างของภาษาและไวยกรณ์อยู่บนพื้นฐานของภาษาซี มีการใช้จาวาสคริปต์ที่ฝังอยู่ในเว็บเบราว์เซอร์ในหลายรูปแบบ เช่น ใช้เพื่อสร้างเนื้อหาที่เปลี่ยนแปลงเสมอภายในเว็บเพจ, ใช้เพื่อตรวจสอบความถูกต้องของข้อมูลที่ผู้ใช้กรอกก่อนนำเข้าระบบ </p>
    <div class="content">
      <h>จาวาสคริปต์ ส่วนมากใช้ในหน้าเว็บเพื่อประมวลผลข้อมูลที่ฝั่งของผู้ใช้งาน แต่ก็ยังมีใช้เพื่อเพิ่มเติมความสามารถในการเขียนสคริปต์โดยฝังอยู่ในโปรแกรมอื่น ๆ                                    
      </h>
      <label for="ch2">Show less</label>
    </div>

    <label for="ch2">Read more</label>
    </div>

  </div>


  
</template>


<style scoped>

*{
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
  margin-top:170px;
  
}

/* .button1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:10px;
  margin-bottom: -65px; 
} */


.scroll-button {
  background-color: #F5C722;
  color: #434343;
  padding: 10px 20px;
  margin-bottom: 80px; /* ปรับตามความต้องการ */
  font-size: 18px;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.scroll-button:hover {
  background-color:#F5C722;
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
  align-items:self-start;
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
    margin-top: 20%;
    margin-bottom: 15%;
    margin-left: 260px;
     
}

h1{
  font-size: 40px;
  margin-right: 5px;
  color:#EC4088 ;
  font-weight: bold;

}

h2{
  font-size: 20px;
  margin-bottom: 20px;
  color:#ffffff ;
}


h3{
  font-size: 29px; /* ปรับค่าตามที่คุณต้องการ */
  text-align: center;
  padding-bottom:1px ;
  font-weight: bold;
  color: #ffffff;
  margin-top: 10px;
  
}

.card{
  display: flex;
  justify-content: center;
}


.card1{
  background-color: #ffffff;
  width: 350px;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
  margin-top: 30px;
}

.card2{
  background-color: #ffffff;
  width: 350px;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
  margin-top: 30px;
}


.card3{
  background-color: #ffffff;
  width: 350px;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
  margin-top: 30px;
}



p{
  background-color: #ffffff;
  font-size: 20px;
}

h{
  background-color: #ffffff;
  font-size: 20px;
  
  
}

#ch{
  display: none;

}

 #ch:checked ~ .content{
  display: block;
  background: transparent;

}

#ch:checked ~ label{
  display: none;
 
} 


/* กล่อง2 */
#ch1{
  display: none;

}

 #ch1:checked ~ .content{
  display: block;
  background: transparent;

}

#ch1:checked ~ label{
  display: none;
 
} 

/* กล่อง3 */
#ch2{
  display: none;

}

 #ch2:checked ~ .content{
  display: block;
  background: transparent;

}

#ch2:checked ~ label{
  display: none;
 
} 

.content{
  display: none;
  margin-top: 15px;
}

label{
  display: inline-block;
  text-align: center;
  cursor: pointer;
  color: #000000;
  background-color:  #F5C722;
  padding: 3px 15px;
  border-radius: 3px;
  margin-top: 10px;
}




/* ภาพในกล่อง */
img{
  background: transparent;
  width: 100px;
  height: 100px;
 margin-left: 110px;  
 margin-bottom: 10px;
}






@media (max-width: 1024px) {

  .container {
      flex-direction: column; /* เมื่อหน้าจอมีความกว้างน้อยกว่าหรือเท่ากับ 768px จะเปลี่ยนเป็นแนวตั้ง */
      align-items: center;
    }

    .text, .row {
      order: 0; /* เปลี่ยนลำดับของ .text และ .row เมื่อหน้าจอเล็กขึ้น */
      margin-top: 10px; /* ให้มี margin-top เพื่อไม่ให้ติดกับ .text */
    }

    .text {
      flex-direction: column;
      margin-left: 20px;
      order: -1; 
      margin-bottom: -40px; /* เพิ่ม margin-bottom เพื่อให้ .text อยู่ตรงกลางแนวนอน */
    }
  



  .button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.scroll-button {
  background-color: #F5C722;
  color: #434343;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.scroll-button:hover {
  background-color:  #F5C722;
}

/* กล่องแบบฝึก */
.row {
  display: flex;
  flex-direction: column;
  align-items: center; /* จัดกลางตามแนวนอน */
  margin-top: 15px;
}

/* ส่วนตัวหนังสือแนะนำ คู่กับแบบฝึก */

h3 {
  font-size: 29px;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
}

p{
  background-color: #ffffff;
  font-size: 15px;
}

h{
  background-color: #ffffff;
  font-size: 15px;
  
}

.card {
  display: flex;
  flex-wrap: wrap; /* ทำให้เรียงแบบ column ถ้าหน้าจอไม่พอขนาด */
  justify-content: center; /* จัดกลางตามแนวนอน */
}

.card1,
.card2,
.card3 {
  background-color: #ffffff;
  width: 80%;
  max-width: 300px; /* ขนาดสูงสุดของกล่อง */
  border-radius: 20px;
  padding: 20px;
  margin: 5px;
  margin-top: 20px;
}

/* กล่อง2 */
#ch1 {
  display: none;
}

#ch1:checked ~ .content {
  display: block;
  background: transparent;
}


#ch1:checked ~ label {
  display: none;
}

.content {
  display: none;
  margin-top: 15px;
}

label {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  color:#434343;
  background-color:#F5C722;
  padding: 3px 15px;
  border-radius: 3px;
  margin-top: 20px;
}

/* ภาพในกล่อง */
img {
  background: transparent;
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

  
}





</style>






















