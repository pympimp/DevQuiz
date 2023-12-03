<script>
import NavBar from "@/components/NavBar.vue";
import BoxArticie from "@/components/BoxArticie.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default {
  components: {
    NavBar,
    BoxArticie,
  },
  data() {
    return {
      currentContent: 'html', // กำหนดให้แสดงข้อมูล HTML เริ่มต้น
      languageData: {
        html: {
          title: "HTML (Hyper Text Markup Language)",
          description: "HTML (Hyper Text Markup Language) คือภาษาที่เขียนไว้เพื่อวาง โครงสร้างของโปรแกรมทั้งหมด เรียกได้ว่าเป็นภาษาแรกเริ่มของภาษาคอม เพราะ ช่วยให้โปรแกรมเมอร์สามารถวิเคราะห์โครงสร้างโปรแกรมได้ชัดเจนขึ้น",
          boxes: [
          { boxTitle: "1. <Head> tag ", boxText: "มีไว้เพื่อเป็นส่วนหัวของโครงสร้าง นิยมใส่ <title> เพื่อบ่งบอกเป็น Title หลักของเว็บไซต์   มีไว้เพื่อเป็นส่วนหัวของโครงสร้าง นิยมใส่ <title> เพื่อบ่งบอกเป็น Title หลักของเว็บไซต์   มีไว้เพื่อเป็นส่วนหัวของโครงสร้าง นิยมใส่ <title> เพื่อบ่งบอกเป็น Title หลักของเว็บไซต์   มีไว้เพื่อเป็นส่วนหัวของโครงสร้าง นิยมใส่ <title> เพื่อบ่งบอกเป็น Title หลักของเว็บไซต์   ",isExpanded: false },
          { boxTitle: "HTML", boxText: "This is the second box." ,isExpanded: false},
          { boxTitle: "HTML", boxText: "This is the first box." ,isExpanded: false},
          { boxTitle: "HTML", boxText: "This is the second box." ,isExpanded: false},
          { boxTitle: "HTML", boxText: "This is the first box." ,isExpanded: false},
          { boxTitle: "HTML", boxText: "This is the second box." ,isExpanded: false}, 
        ],
        },

        
        css: {
          title: "CSS (Cascading Style Sheet)",
          description: "CSS (Cascading Style Sheet) มีไว้เพื่อกำหนดและระบุรูปแบบ หรือ Style ของเนื้อหาในเอกสาร เช่น สีของข้อความ สีพื้นหลัง ประเภทและขนาดของตัวอักษร การจัดวางข้อความ และตกแต่งส่วนต่างๆของหน้าเว็บให้มีความสวยงาม",
          boxes: [
          { boxTitle: "CSS", boxText: "This is the first box." ,isExpanded: false},
          { boxTitle: "CSS", boxText: "This is the second box.",isExpanded: false},
          { boxTitle: "CSS", boxText: "This is the first box.",isExpanded: false},
          { boxTitle: "CSS", boxText: "This is the second box.",isExpanded: false},
          { boxTitle: "CSS", boxText: "This is the first box.",isExpanded: false},
          { boxTitle: "CSS", boxText: "This is the second box.",isExpanded: false},
        ],
        },


        javascript: {
          title: "JavaScript ",
          description: "JavaScript เป็นภาษาสคริปต์ทีมีลักษณะการเขียนแบบโพรโทไทป์ ส่วนมากใช้ในหน้าเว็บเพื่อประมวลผลข้อมูลที่ฝั่งของผู้ใช้งาน แต่ก็ยังมีใช้เพื่อเพิ่มเติมความสามารถในการเขียนสคริปต์โดยฝังอยู่ในโปรแกรมอื่น ๆ",
          boxes: [
          { boxTitle: "JavaScript", boxText: "This is the first box.",isExpanded: false},
          { boxTitle: "JavaScript", boxText: "This is the second box.",isExpanded: false},
          { boxTitle: "JavaScript", boxText: "This is the first box.",isExpanded: false},
          { boxTitle: "JavaScript", boxText: "This is the second box.",isExpanded: false},
          { boxTitle: "JavaScript", boxText: "This is the first box.",isExpanded: false},
          { boxTitle: "JavaScript", boxText: "This is the second box.",isExpanded: false},
        ],
        },
      },
    };
  },
  


  methods: {
    scrollToAdditionalBox(contentId) {
      this.currentContent = contentId;
    },
  },
};
</script>



<template>
    <div>
      <NavBar />
      <div class="container">
        <div class="buttons">
          <h1>บทความทั้งหมด</h1>
          
          
          <div class="button">
          <button @click="scrollToAdditionalBox('html')" class="scroll-button" :style="{ backgroundColor: currentContent === 'html' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/html.png" alt="Image" class="button-image">
            <p>HTML</p>
          </button>
        </div>

        <div class="button">
          <button @click="scrollToAdditionalBox('css')" class="scroll-button" :style="{ backgroundColor: currentContent === 'css' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/css.png" alt="Image" class="button-image">
            <p>CSS</p>
          </button>
        </div>

        <div class="button">
          <button @click="scrollToAdditionalBox('javascript')" class="scroll-button" :style="{ backgroundColor: currentContent === 'javascript' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/javascript.png" alt="Image" class="button-image">
            <p>JavaScript</p>
          </button>
        </div>
      </div>
      
     
      <!-- <BoxArticie v-if="currentContent && languageData[currentContent]" :contentData="languageData[currentContent]" /> -->
      <BoxArticie v-if="currentContent === 'html'" :contentData="languageData.html" />
      <BoxArticie v-if="currentContent === 'css'" :contentData="languageData.css" />
      <BoxArticie v-if="currentContent === 'javascript'" :contentData="languageData.javascript" />
      <!-- <div v-else class="container-no-data">
        <h1>No Data</h1>
      </div> -->
    </div>
  </div>
</template>





<style scoped>



 h1{
    margin-top: 50px;
    margin-left:35px;
    color: #fffdfd;
    font-size: 27px;
    font-weight:bolder;
 }



.button-image {
  transform: translateY(10%);
  width: 40px;
  height: 40px;
  margin-left: 65px; 
  /* background-color: aqua; */
}



.scroll-button {
    margin-top: 5px;
    margin-left: -40px;
    margin-bottom: 15px;
    width: 270px;
    height: 50px;
    background-color:#1F1F1F;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);  */
    border-radius:50px ;
    cursor: pointer;

}

.scroll-button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
  background-color:#EE5684;
}



p{
    font-size: 20px;
    margin-left: 115px;
    transform: translateY(-105%);
    font-weight:bolder;
    color: #fffdfd;
    width: 20px;
    /* background-color: aqua; */
    
}


.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* หากต้องการให้เปิดมาแล้วเป็นกล่องเปล่าๆ */
.container-no-data{
  background-color: #F5F5F5;
  margin-top: 50px;
  margin-right: 50px;
  width: 1000px;
  height: 1000px;
    
}
.container-no-data h1{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
}



.buttons {
  grid-column: 1 / 2;
}



</style>








<!-- 
<template>
    <div>
      <NavBar />
      <div style="display: flex;">
        <BoxArticie />
      <h1>บทความทั้งหมด</h1>
      <div class="button">
      <button @click="scrollToAdditionalBox('html')" class="scroll-button" :style="{ backgroundColor: currentContent === 'html' ? '#EE5684' : '#1F1F1F' }">
        <img src="/images/html.png" alt="Image" class="button-image">
        <p>HTML</p>
      </button>
      
    </div>

    <div class="button">
      <button @click="scrollToAdditionalBox('css')" class="scroll-button" :style="{ backgroundColor: currentContent === 'css' ? '#EE5684' : '#1F1F1F' }">
        <img src="/images/css.png" alt="Image" class="button-image">
        <p>CSS</p>
      </button>
    </div>

    <div class="button">
      <button @click="scrollToAdditionalBox('javascript')" class="scroll-button" :style="{ backgroundColor: currentContent === 'javascript' ? '#EE5684' : '#1F1F1F' }">
        <img src="/images/javascript.png" alt="Image" class="button-image">
        <p>JavaScript</p>
      </button>
    </div>

  </div>
</div>



</template> -->
