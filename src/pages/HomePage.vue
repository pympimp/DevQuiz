
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
  },

  toggleDropdown(boxId) {
      const dropdownIcon = document.querySelector(`#dropdownBox${boxId} .dropdown-icon`);
      const dropdownContent = document.querySelector(`#dropdownBox${boxId} .dropdown-content`);

      dropdownIcon.classList.toggle('active');
      dropdownContent.classList.toggle('active');

      this.$set(this, `isDropdownOpen${boxId}`, !this[`isDropdownOpen${boxId}`]);

      if (dropdownContent.classList.contains('active')) {
      // ถ้า drop-down ถูกเปิดให้ส่ง transitionend event ไปยัง method
      dropdownContent.addEventListener('transitionend', () => {
        this.dropdownOpen[boxId] = !this.dropdownOpen[boxId];
      }, { once: true });

      // ปิด drop-down content
      dropdownContent.style.maxHeight = '0';
    } else {
      // ถ้า drop-down ถูกปิดให้เปิด drop-down content ก่อนแล้วค่อยทำ transition
      this.dropdownOpen[boxId] = !this.dropdownOpen[boxId];
      this.$nextTick(() => {
        dropdownContent.style.maxHeight = '1000px'; // ปรับตามความสูงสูงสุดของ drop-down content
      });
    }    
    }
  }
};
</script>



<template>
  <div>
    <NavBar />
    
    <div class="row">
     
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
     
    <div class="box pink-box"  :style="{ marginTop: isDropdownOpen1 ? '20px' : '0' }" id="dropdownBox1">
        <img src="/images/html.png" alt="Left Image 1" class="left-image" />
        <span class="text">เอชทีเอ็มแอล (อังกฤษ: HTML: Hypertext Markup Language ภาษามาร์กอัปข้อความหลายมิติ) เป็นภาษามาร์กอัปหลักในปัจจุบันที่ใช้ในการสร้างเว็บเพจ หรือข้อมูลอื่นที่เรียกดูผ่านทางเว็บเบราว์เซอร์ ซึ่งตัวโค้ดจะแสดงโครงสร้างของข้อมูล ในการแสดง หัวข้อ ลิงก์ ย่อหน้า รายการ รวมถึงการสร้างแบบฟอร์ม เชื่อมโยงภาพหรือวิดีโอด้วย</span>
         <!-- ไอคอนสามเหลี่ยม -->
          <div class="dropdown-icon" @click="toggleDropdown(1)">
          <span class="triangle"></span>
          </div>

        <!-- Drop-down content -->
        <div class="dropdown-content"  :class="{ active: isDropdownOpen1 }" >
        <h2>ในการเขียนภาษา HTML นั้น จะมีรูปแบบโครงสร้างการเขียนแบ่งออกเป็น 3 ส่วน โดยจะแสดงในรูปแบบของสีดังนี้</h2>
        <h2>1. ส่วนประกาศ เป็นส่วนที่กำหนดให้บราวเซอร์ทราบว่า นี่คือภาษา HTML และจะต้องทำการแปรผลอย่างไรมีคำสั่งคู่เดียวคือ  ปรากฏที่หัวและท้ายไฟล์</h2>
        <h2>2. ส่วนหัวเรื่อง (head) เป็นส่วนที่แสดงผลข้อความบนไตเติ้ลบาร์ของบราวเซอร์ และอาจมีคำสั่งสำหรับกำหนดรายละเอียดด้านเทคนิคอื่นๆ อีก แทรกอยู่ระหว่างคำสั่ง </h2>
        <h2>3. ส่วนเนื้อหา (body) เป็นส่วนที่มีความซับซ้อนมากที่สุด และสามารถใส่เทคนิคลูกเล่นเพื่อดึงดูดความสนใจจากผู้ชมได้มาก ความแตกต่างระหว่างเว็บไซต์ต่างๆ แสดงความมีฝีมือของผู้จัดทำ ศิลปะในการออกแบบจะอยู่ในส่วนนี้ทั้งหมด ซึ่งจะแทรกอยู่ระหว่างคำสั่ง  </h2>  
        <!-- เพิ่มเนื้อหา drop-down content ที่นี่ -->
        </div>
    </div>

     
      <div class="box pink-box" :style="{ marginTop: isDropdownOpen2 ? '20px' : '0' }"  id="dropdownBox2">
        <img src="/images/css.png" alt="Left Image 2" class="left-image"  />
        <span class="text">CSS (ภาษาอังกฤษ: Cascading Style Sheet) หรือที่มักเรียกสั้นๆ ว่า ‘สไตล์ชีต’ เป็นภาษาที่ใช้ส่วนของการจัดรูปแบบการแสดงผลเอกสาร HTML โดยที่ CSS กำหนดและระบุรูปแบบ หรือ Style ของเนื้อหาในเอกสาร เช่น สีของข้อความ สีพื้นหลัง ประเภทของตัวอักษร และการจัดวางข้อความ</span>
       <!-- ไอคอนสามเหลี่ยม -->
        <div class="dropdown-icon" @click="toggleDropdown(2)">
        <span class="triangle"></span>
        </div>

        <!-- Drop-down content -->
        <div class="dropdown-content" :class="{ active: isDropdownOpen2 } ">
          <h2>ในการเขียนภาษา HTML นั้น จะมีรูปแบบโครงสร้างการเขียนแบ่งออกเป็น 3 ส่วน โดยจะแสดงในรูปแบบของสีดังนี้</h2>
        <h2>1. ส่วนประกาศ เป็นส่วนที่กำหนดให้บราวเซอร์ทราบว่า นี่คือภาษา HTML และจะต้องทำการแปรผลอย่างไรมีคำสั่งคู่เดียวคือ  ปรากฏที่หัวและท้ายไฟล์</h2>
        <h2>2. ส่วนหัวเรื่อง (head) เป็นส่วนที่แสดงผลข้อความบนไตเติ้ลบาร์ของบราวเซอร์ และอาจมีคำสั่งสำหรับกำหนดรายละเอียดด้านเทคนิคอื่นๆ อีก แทรกอยู่ระหว่างคำสั่ง </h2>
        <h2>3. ส่วนเนื้อหา (body) เป็นส่วนที่มีความซับซ้อนมากที่สุด และสามารถใส่เทคนิคลูกเล่นเพื่อดึงดูดความสนใจจากผู้ชมได้มาก ความแตกต่างระหว่างเว็บไซต์ต่างๆ แสดงความมีฝีมือของผู้จัดทำ ศิลปะในการออกแบบจะอยู่ในส่วนนี้ทั้งหมด ซึ่งจะแทรกอยู่ระหว่างคำสั่ง  </h2>  
        <!-- เพิ่มเนื้อหา drop-down content ที่นี่ -->
         </div>
    </div>


      
      <div class="box pink-box" :style="{ marginTop: isDropdownOpen3 ? '20px' : '0' }"  id="dropdownBox3">
        <img src="/images/javascript.png" alt="Left Image 3" class="left-image" />
        <span class="text">จาวาสคริปต์ (อังกฤษ: JavaScript) เป็นภาษาสคริปต์ ทีมีลักษณะการเขียนแบบโพรโทไทป์ (Prototyped-based Programming) ส่วนมากใช้ในหน้าเว็บเพื่อประมวลผลข้อมูลที่ฝั่งของผู้ใช้งาน แต่ก็ยังมีใช้เพื่อเพิ่มเติมความสามารถในการเขียนสคริปต์โดยฝังอยู่ในโปรแกรมอื่น ๆ</span>
        <!-- ไอคอนสามเหลี่ยม -->
        <div class="dropdown-icon" @click="toggleDropdown(3)">
        <span class="triangle"></span>
        </div>

         <!-- Drop-down content -->
         <div class="dropdown-content" :class="{ active: isDropdownOpen3 }">
          <h2>ในการเขียนภาษา HTML นั้น จะมีรูปแบบโครงสร้างการเขียนแบ่งออกเป็น 3 ส่วน โดยจะแสดงในรูปแบบของสีดังนี้</h2>
        <h2>1. ส่วนประกาศ เป็นส่วนที่กำหนดให้บราวเซอร์ทราบว่า นี่คือภาษา HTML และจะต้องทำการแปรผลอย่างไรมีคำสั่งคู่เดียวคือ  ปรากฏที่หัวและท้ายไฟล์</h2>
        <h2>2. ส่วนหัวเรื่อง (head) เป็นส่วนที่แสดงผลข้อความบนไตเติ้ลบาร์ของบราวเซอร์ และอาจมีคำสั่งสำหรับกำหนดรายละเอียดด้านเทคนิคอื่นๆ อีก แทรกอยู่ระหว่างคำสั่ง </h2>
        <h2>3. ส่วนเนื้อหา (body) เป็นส่วนที่มีความซับซ้อนมากที่สุด และสามารถใส่เทคนิคลูกเล่นเพื่อดึงดูดความสนใจจากผู้ชมได้มาก ความแตกต่างระหว่างเว็บไซต์ต่างๆ แสดงความมีฝีมือของผู้จัดทำ ศิลปะในการออกแบบจะอยู่ในส่วนนี้ทั้งหมด ซึ่งจะแทรกอยู่ระหว่างคำสั่ง  </h2>  
        <!-- เพิ่มเนื้อหา drop-down content ที่นี่ -->
        </div>
      </div>
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
  flex-direction: column;
  align-items:self-end;
  margin-right: 30px;
  margin-top: 35px;
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
  padding: 70px;
  border-radius: 8px;
  margin-bottom: 30px;
  width: 1000px; /* กำหนดความกว้างของกล่อง */
  height: 140px;
  display: flex;
  align-items: center;
  position: relative; /* เพิ่ม line นี้ */
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
  margin-left: -40px;
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




/* ไอคอนสามเหลี่ยม */
.dropdown-icon {
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%); /* ทำให้ไอคอนอยู่ตรงกลางตามความสูงของกล่อง */
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 0px 15px 20px; /* ปรับขนาดของไอคอนตามต้องการ */
  border-color: transparent transparent transparent #000 !important; /* เพิ่มสีของไอคอน */
  background-color: transparent !important; /* เพิ่ม !important */
}


.dropdown-content {
  display: flex;
  position: absolute;
  background-color: #ab4747;
  top: 100%;
  left: 50%;
  border-radius: 10px;
  transform: translateX(-50%);
  transition: max-height 0.3s ease; 
  z-index: 1;
  display: none;
  background-color: #ab4747;
  width: 1000px;
  white-space: normal;
  word-wrap: break-word;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  margin-top: 15px;
  padding: 15px; /* เพิ่ม padding เพื่อให้มีพื้นที่สำหรับแสดงเนื้อหา */
}

.dropdown-content h2 {
  font-size: 18px; /* ปรับขนาดของข้อความใน drop-down */
  margin: 10px; /* ปรับระยะห่างของข้อความ */
  color: #000;
  background-color: #ab4747;
}

/* แสดง drop-down content เมื่อ .dropdown-icon ถูกคลิก */
.dropdown-content.active {
  display: block;
  position: absolute;
  max-height: 1000px; /* ปรับตามความต้องการ, คือความสูงสูงสุดของ drop-down content */
} 




</style>






















