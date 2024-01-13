<template>
    <div>
      <NavBar/>
      <div class="container-playground">
        <div class="discription" v-if="unit">
          <div style="font-size: 24px;"><b>{{ unit.nameUnit + ' '}}</b>{{ unit.header }}</div>
          <div style="font-size: 16px;">{{ unit.discription }}</div>
          <div style="font-size: 16px;display: flex;flex-direction: row;">
            <div style="color: #C53636;font-weight: bold;">โจทย์: </div>
            <div style="margin-left: 5px;">{{ unit.question }}</div>
          </div>    
        </div>
  
        <div class="box-playground">
          <div class="input-playground">
            <div style="font-size: medium; margin-left: 30px;color: white;">พื้นที่เขียนโค้ด</div>
            <div>
            <textarea
            class="Text-area"
            v-model="code.html"
            ></textarea>
        </div>
          </div>
          <div class="output-playground">
            <div style="font-size: medium; margin-left: 30px;color: white;">ผลลัพธ์</div>
            <iframe class="Text-area" ref="outputFrame"></iframe>
            <button @click="runCode" class="button" v-if="!corrcet"><b> ตรวจสอบ </b></button>
            <button @click="check()" class="button" v-if="corrcet"><b> ต่อไป </b></button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { useAuthenStore } from '../stores/auth';

const authenStore = useAuthenStore();
const route = useRoute();
const router = useRouter();
const unit = ref();
const corrcet = ref();
const couresId = ref();
const lessonId = ref();
const lessonName = ref();
const unitId = ref();
const course = ref();
const nextUnit = ref(); 
onMounted(()=>{
  if(route.params.couresId && route.params.lessonId && route.params.unitId && route.params.name){
    couresId.value = route.params.couresId;
    lessonId.value = route.params.lessonId;
    unitId.value = route.params.unitId;
    course.value = route.params.name;
    fetchUnitData();
    if(couresId.value && lessonId.value && unitId.value){
      fetchOneUnit(couresId.value,lessonId.value,unitId.value)
    }
  }
})

const htmlstart = `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`;

const code = ref({
  html: htmlstart,
  css: '',
  javascript: '',
});

const outputFrame = ref(null);

const runCode = () => {
  const outputDocument = outputFrame.value.contentDocument || outputFrame.value.contentWindow.document;

  outputDocument.open();
  outputDocument.write(code.value.html);
  outputDocument.close();

    const hasBTags = code.value.html.includes('<b>') && code.value.html.includes('</b>');
  corrcet.value = hasBTags
  console.log(corrcet.value)

};

const fetchOneUnit = async(couresId,lessonId,unitId) =>{
  const result = await axios.get(`http://localhost:5000/test-elearning-b0646/us-central1/api/coures/${couresId}/${lessonId}/${unitId}`)
  if(result){
    unit.value = result.data
    console.log(unit.value)
  }
}

const check = async() =>{
  const lesson = lessonName.value
const unitParts = unit.value.nameUnit.match(/(\D+)(\d+)/); // ใช้ regex เพื่อแยกตัวเลขและตัวอักษร
  let units = '';

  if (unitParts) {
    const unitText = unitParts[1]; // ส่วนของตัวอักษร
    const unitNumber = parseInt(unitParts[2]); // ส่วนของตัวเลข
    units = unitText + (unitNumber + 1);
  }
  try {
      const result = await axios.put(`http://localhost:5000/test-elearning-b0646/us-central1/api/user/Test/${authenStore.auth.id}/${course.value}`, {
      [lesson]: {
        [units]: true
      }
    });
    if (result) {
      router.push(`/unit/${couresId.value}/${lessonId.value}/${nextUnit.value}/${course.value}`)
      if(router.push){
        fetchOneUnit(couresId.value,lessonId.value,nextUnit.value)
        console.log("เปลี่ยนหน้า")
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const fetchUnitData = async() => {
      try {
        const result = await axios.get('http://localhost:5000/test-elearning-b0646/us-central1/api/coures/');
        if(result){
          const Index = result.data.findIndex((item) => item.name === course.value)
          if(Index !== -1){
            const unitData = result.data[Index]
            const lessonIndex = unitData.lessons.findIndex((item) => item.lessonId === lessonId.value)
            if(lessonIndex !== -1){
              lessonName.value = unitData.lessons[lessonIndex].nameLesson;
              console.log('lessonName',lessonName.value)
              const unitIndex = unitData.lessons[lessonIndex].units.findIndex((item) => item.unitId === unitId.value)
              if(unitIndex !== -1){
                nextUnit.value = unitData.lessons[lessonIndex].units[unitIndex + 1].unitId
                console.log(nextUnit.value)
              }
            }
          console.log('unitData', unitData)
          }
        }
      } catch (error) {
        console.error("Error during getdata:", error);
      }
    };

</script>

<style scoped>
.container-playground{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.discription{
    background-color: white;
    width: 1000px;
    max-height: 150px;
    border-radius: 30px;
    padding: 15px;
    margin-top: 60px;
}
.Text-area{
    background-color: white;
    width: 500px;
    height: 300px;
    border-radius: 30px;
    padding: 15px;
    margin: 0px 10px 0px 10px;
}

.Text-area textarea{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    border: none; /* เพิ่มบรรทัดนี้ถ้าคุณต้องการลบเส้นขอบ */
}

.box-playground{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 20px;
}
.button{
  background-color: rgba(245, 199, 34, 1);
  border-radius: 15px;
  width: 104px;
  height: 41px;
  padding: 5px;
  margin: 20px;
  align-self: flex-end;

}

.output-playground{
  display: flex;
  flex-direction: column;
}

.input-playground{
  overflow: hidden;
}

iframe {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
</style>