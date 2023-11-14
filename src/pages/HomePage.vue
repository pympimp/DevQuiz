
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
        { id: 3, label: '', data: 'JavaScript: ', imageSrc: '/images/javascript.png', link: '/home3' },
      ],
      isScrolledDown: false,
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
          lastBox.scrollIntoView({ behavior: 'smooth' });
        }

        // สลับสถานะการเลื่อน
        this.isScrolledDown = !this.isScrolledDown;

        // เพิ่ม Console Log ที่คาดหวังว่าควรทำงาน
        setTimeout(() => {
          console.log('After scrolling:', window.scrollY);
        }, 1000); // ระยะเวลาที่ให้ตัวควบคุมรอ
      }
    });
  }
  }
};
</script>



<template>
  <div>
    <NavBar />
    
    <div class="row">
      <!-- วนลูปผ่านทุกไอเท็มใน 'boxes' array และแสดง BoxComponent -->
      <router-link v-for="box in boxes" :key="box.id" :to="box.link" class="box">
        <BoxComponent :boxData="box" />
      </router-link>

    </div>
    <div class="button">
    <button @click="scrollToAdditionalBox" class="scroll-button">อ่านบทความ พร้อมเรียนทฤษฏี</button>
    </div>
  
    <h3>บทความเบื้องต้น</h3>
  </div>
  <div class="box-container">
      <!-- กล่องที่ 1 -->
      <router-link to="/html" class="box pink-box">
        <img src="/images/html.png" alt="Left Image 1" class="left-image" />
        <span class="text">เอชทีเอ็มแอล (อังกฤษ: HTML: Hypertext Markup Language ภาษามาร์กอัปข้อความหลายมิติ) เป็นภาษามาร์กอัปหลักในปัจจุบันที่ใช้ในการสร้างเว็บเพจ หรือข้อมูลอื่นที่เรียกดูผ่านทางเว็บเบราว์เซอร์ ซึ่งตัวโค้ดจะแสดงโครงสร้างของข้อมูล ในการแสดง หัวข้อ ลิงก์ ย่อหน้า รายการ รวมถึงการสร้างแบบฟอร์ม เชื่อมโยงภาพหรือวิดีโอด้วย</span>
      </router-link>

      <!-- กล่องที่ 2 -->
      <router-link to="/css" class="box pink-box">
        <img src="/images/css.png" alt="Left Image 2" class="left-image" />
        <span class="text">CSS (ภาษาอังกฤษ: Cascading Style Sheet) หรือที่มักเรียกสั้นๆ ว่า ‘สไตล์ชีต’ เป็นภาษาที่ใช้ส่วนของการจัดรูปแบบการแสดงผลเอกสาร HTML โดยที่ CSS กำหนดและระบุรูปแบบ หรือ Style ของเนื้อหาในเอกสาร เช่น สีของข้อความ สีพื้นหลัง ประเภทของตัวอักษร และการจัดวางข้อความ</span>
      </router-link>


      <!-- กล่องที่ 3 -->
      <router-link to="/javascript" class="box pink-box">
        <img src="/images/javascript.png" alt="Left Image 3" class="left-image" />
        <span class="text">จาวาสคริปต์ (อังกฤษ: JavaScript) เป็นภาษาสคริปต์ ทีมีลักษณะการเขียนแบบโพรโทไทป์ (Prototyped-based Programming) ส่วนมากใช้ในหน้าเว็บเพื่อประมวลผลข้อมูลที่ฝั่งของผู้ใช้งาน แต่ก็ยังมีใช้เพื่อเพิ่มเติมความสามารถในการเขียนสคริปต์โดยฝังอยู่ในโปรแกรมอื่น ๆ</span>
      </router-link>

      <!-- <div class="button1">
    <button @click="scrollToAdditionalBox" class="scroll-button">เลือกทำแบบฝึก</button>
    </div> -->

    </div>
  
</template>


<style scoped>

* {
  background-color: rgb(229, 219, 241);
}


/* ส่วนของปุ่ม */
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:80px;
}

.button1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:10px;
  /* margin-bottom: -65px;  */
}


.scroll-button {
  background-color: #ff80bf;
  color: #ffffff;
  padding: 10px 20px;
  margin-bottom: 80px; /* ปรับตามความต้องการ */
  font-size: 16px;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.scroll-button:hover {
  background-color: #8000ff;
}


/* กล่องแบบฝึก */
.row {
  display: flex;
  flex-direction: column; /* สามารถเปลี่ยนเป็น column ได้ */
  align-items:self-end;
  margin-right: 30px;
  margin-top: -10px;
}



  /* ส่วนของภาพในกล่อง */
  .box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* กล่องชมพู */
.pink-box {
  background-color: #ff80bf;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 700px; /* กำหนดความกว้างของกล่อง */
  height: 140px;
  display: flex;
  align-items: center;
}

.box.pink-box {
  transition: box-shadow 0.3s ease; /* เพิ่ม transition เพื่อทำให้การเปลี่ยนแปลงเงาเกิดขึ้นโดยลื่นไหล */
}

.box.pink-box:hover {
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3); /* ตั้งค่าเงาเมื่อ hover */
}




/* ภาพและตัวหนังสือในกล่อง */
.left-image {
  width: 80px; /* ปรับขนาดของรูปภาพตามความต้องการ */
  margin-right: 10px; /* ระยะห่างระหว่างรูปภาพและข้อความ */
  background-color: #ff80bf;
}

.text {
  color: rgb(0, 0, 0); /* สีข้อความ */
  /* font-weight: bold; */
  font-size: 14px;
  background-color: #ff80bf;

}


h3{
  font-size: 22px; /* ปรับค่าตามที่คุณต้องการ */
  margin-left: 420px; /* ปรับค่าตามที่คุณต้องการ */
  padding-bottom:1px ;
  font-weight: bold;
}
</style>





















