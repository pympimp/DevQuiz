<template>
  <div>
    <div class="container-playground">
      <div class="discription" v-if="unit">
        <div clas="UnitName" style="font-size: 24px">
          <b>{{ unit.nameUnit + ' ' }}</b
          >{{ unit.header }}
        </div>
        <div class="DescText">{{ unit.discription }}</div>
        <div class="TestText">
          <div style="color: #c53636; font-weight: bold">โจทย์:</div>
          <div style="margin-left: 5px">{{ unit.question }}</div>
        </div>
      </div>

      <div class="box-playground">
        <div class="input-playground">
          <div class="AboveText">พื้นที่เขียนโค้ด</div>
          <div>
            <ScrollAreaRoot style="--scrollbar-size: 10px" class="Text-area">
              <ScrollAreaViewport>
                <textarea v-if="unitData" v-model="code.Start"></textarea>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar class="ScrollAreaScrollbar" orientation="horizontal">
                <ScrollAreaThumb class="ScrollAreaThumb" />
              </ScrollAreaScrollbar>
            </ScrollAreaRoot>
          </div>
        </div>
        <div class="output-playground">
          <div class="AboveText">ผลลัพธ์</div>
          <iframe class="Text-area" ref="outputFrame"></iframe>
          <button @click="runCode" class="button" v-if="!corrcet"><b> ตรวจสอบ </b></button>
          <button @click="check()" class="button" v-if="corrcet && nextUnit != null"><b> ต่อไป </b></button>
          <button @click="endLesson()" class="button" v-if="corrcet && nextUnit == null"><b> จบบท </b></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { useAuthenStore } from '../stores/auth'
import Swal from 'sweetalert2'
import { authenKey } from '../utils/config';
import 'sweetalert2/dist/sweetalert2.min.css'
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'

const authenStore = useAuthenStore()
const route = useRoute()
const router = useRouter()
const unit = ref()
const corrcet = ref()
const couresId = ref()
const lessonId = ref()
const lessonName = ref()
const unitId = ref()
const course = ref()
const nextUnit = ref()
const unitData = ref()
onMounted(async() => {
  if(!localStorage.getItem(authenKey)){
      router.push({ name: "LogIn" });
    };
  if (route.params.couresId && route.params.lessonId && route.params.unitId && route.params.name) {
    fetchUnitData()
    if (couresId.value && lessonId.value && unitId.value) {
      await fetchOneUnit(couresId.value, lessonId.value, unitId.value)
      setTimeout(()=>{
        outPut()
      },500)
    }
  }
})

const start = ref()
const code = ref({
  Start: start,
})

const outputFrame = ref(null)

const runCode = () => {
  outPut()

  const userAnswer = code.value.Start
  const step1 = userAnswer.replace(/".*?"/g, '')
  const step2 =  step1.replace(/:\s*([^;]+)\s*;/g, ':')
  const answer = step2
  if (unit.value.answer[0] && unit.value.answer[1]) {
    const hasBTags = answer.includes(unit.value.answer[0]) && answer.includes(unit.value.answer[1])
    corrcet.value = hasBTags
  } else {
    const hasBTags = answer.includes(unit.value.answer[0])
    corrcet.value = hasBTags
  }

  if (corrcet.value === true) {
    Swal.fire({
      title: 'คำตอบถูกต้อง!',
      // text: "You clicked the button!",
      icon: 'success'
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'ตอบผิด',
      text: 'โปรดลองใหม่อีกครัง'
    })
  }
}

const fetchOneUnit = async (couresId, lessonId, unitId) => {
  const result = await axios.get(
    `http://localhost:3000/coures/${couresId}/${lessonId}/${unitId}`
  )
  if (result) {
    unit.value = await result.data
    start.value = unit.value.body
  }
}

const check = async () => {
  const lesson = lessonName.value
  const unitParts = unit.value.nameUnit.match(/(\D+)(\d+)/) // ใช้ regex เพื่อแยกตัวเลขและตัวอักษร
  let units = ''

  if (unitParts) {
    const unitText = unitParts[1] // ส่วนของตัวอักษร
    const unitNumber = parseInt(unitParts[2]) // ส่วนของตัวเลข
    units = unitText + (unitNumber + 1)
  }
  try {
    const result = await axios.put(
      `http://localhost:3000/user/Test/${authenStore.auth.id}/${course.value}`,
      {
        [lesson]: {
          [units]: true
        }
      }
    )
    if (result) {
      corrcet.value = false
      await router.push(`/unit/${couresId.value}/${lessonId.value}/${nextUnit.value}/${course.value}`)
         await fetchOneUnit(couresId.value, lessonId.value, nextUnit.value)
         fetchUnitData()
         outPut()
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

const outPut = () =>{
  const outputDocument =
         outputFrame.value.contentDocument || outputFrame.value.contentWindow.document
            outputDocument.open()
              outputDocument.write(code.value.Start)
            outputDocument.close()
}

const fetchUnitData = async () => {
  couresId.value = route.params.couresId
    lessonId.value = route.params.lessonId
    unitId.value = route.params.unitId
    course.value = route.params.name
  try {
    const result = await axios.get(
      'http://localhost:3000/coures/'
    )
    if (result) {
      const Index = result.data.findIndex((item) => item.name === course.value)
      if (Index !== -1) {
        unitData.value = result.data[Index]
        const lessonIndex = unitData.value.lessons.findIndex(
          (item) => item.lessonId === lessonId.value
        )
        if (lessonIndex !== -1) {
          lessonName.value = unitData.value.lessons[lessonIndex].nameLesson
          const unitIndex = unitData.value.lessons[lessonIndex].units.findIndex(
            (item) => item.unitId === unitId.value
          )
          if (
            unitIndex !== -1 &&
            unitIndex + 1 !== unitData.value.lessons[lessonIndex].units.length
          ) {
            nextUnit.value = unitData.value.lessons[lessonIndex].units[unitIndex + 1].unitId
            console.log(nextUnit.value)
          }else{
            nextUnit.value = null
          }
        }
      }
    }
  } catch (error) {
    console.error('Error during getdata:', error)
  }
}

const endLesson = async()=>{
  const lesson = lessonName.value.match(/(\D+)(\d+)/);
  let lessons = '';
  if(lesson){
    const lessonText = lesson[1];
    const lessonNumber = parseInt(lesson[2]);
    lessons = lessonText + (lessonNumber + 1)
  }
  try {
    const result = await axios.put(
      `http://localhost:3000/user/Test/${authenStore.auth.id}/${course.value}`,
      {
        [lessons]: {
          unit1: true
        }
      }
    )
    if(result){
      router.go(-1)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}
</script>

<style scoped>
.container-playground {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.UnitName{
  font-size: 1.4rem;
}

.DescText{
  font-size: 1rem;
}

.TestText{
  font-size: 1rem;
}

.discription {
  background-color: white;
  width: 1000px;
  border-radius: 10px;
  padding: 15px;
  margin-top: 60px;
}
.Text-area {
  background-color: white;
  width: 500px;
  height: 300px;
  border-radius: 20px;
  padding: 15px;
  margin: 0px 10px 0px 10px;
  resize: none;
  overflow: hidden;
}

.Text-area textarea {
  width: 100%;
  height: 270px;
  overflow-y: auto;
  border: none; /* เพิ่มบรรทัดนี้ถ้าคุณต้องการลบเส้นขอบ */
   resize: none;
}

.box-playground {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
}
.button {
  background-color: rgba(245, 199, 34, 1);
  border-radius: 15px;
  width: 104px;
  height: 41px;
  padding: 5px;
  margin: 20px;
  align-self: flex-end;
}

.output-playground {
  display: flex;
  flex-direction: column;
}

.AboveText{
  font-size: 1.3rem; margin-left: 30px; color: white
}
.input-playground {
  overflow: hidden;
}

iframe {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}

.ScrollAreaScrollbar[data-orientation='horizontal'] {
  flex-direction: column;
  height: var(--scrollbar-size);
}

.ScrollAreaThumb {
  flex: 1;
  background: var(--mauve-10);
  border-radius: var(--scrollbar-size);
  position: relative;
}
/* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
.ScrollAreaThumb::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 44px;
  min-height: 44px;
}


@media only screen and (max-width: 480px) {


.box-playground {
  width: 90%;
  display: flex;
  flex-direction:column;
  margin-top: 20px;
}

.discription{
  max-width: 90%;
  margin-top: 5%;
}

.UnitName{
  font-size: 1.2rem;
}

.DescText{
  font-size: 0.9rem;
}

.TestText{
  font-size: 1rem;
}

.Text-area{
 max-width: 90%;
 font-size: 0.2rem;
}

.AboveText{
  font-size: 1.1rem;
}
.input-playground, .output-playground{
 width: 100%;
}


.Text-area textarea{
font-size: 0.9rem;
}
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  .box-playground {
  width: 90%;
  display: flex;
  flex-direction:column;
  margin-top: 20px;
}

.discription{
  max-width: 90%;
  margin-top: 3%;
}

.UnitName{
  font-size: 1.2rem;
}

.DescText{
  font-size: 1rem;
}

.TestText{
  font-size: 1rem;
}

.Text-area{
 width: 97%;
 font-size: 0.2rem;
}

.AboveText{
  font-size: 1.1rem;
}

.box-playground{
  width: 86%;
}
.input-playground, .output-playground{
 width: 100%;
}

.Text-area textarea{
font-size: 0.9rem;
}
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .box-playground {
  width: 90%;
  display: flex;
  flex-direction:row;
  margin-top: 20px;
}

.discription{
  max-width: 90%;
  margin-top: 5%;
  
}

.UnitName{
  font-size: 1.3rem;
}

.DescText{
  font-size: 1.1rem;
}

.TestText{
  font-size: 1.2rem;
}

.Text-area{
 width: 97%;
 height: 25rem;
 font-size: 0.2rem;
 
}

.AboveText{
  font-size: 1.2rem;
}

.input-playground, .output-playground{
 width: 100%;
}

.Text-area textarea{
font-size: 1.2rem;
height: 25rem;
}

.button {
  font-size: 1rem;

}
}

@media screen and (min-width: 1025px) {
  .box-playground {
  width: 58rem;
  display: flex;
  flex-direction:row;
  margin-top: 35px;
}

.discription{
  max-width: 90%;
  margin-top: 5%;
}

.UnitName{
  font-size: 1.4rem;
}

.DescText{
  font-size: 1.2rem;
}

.TestText{
  font-size: 1.3rem;
}

.Text-area{
 width: 97%;
 height: 25rem;
 font-size: 0.2rem;
 
}

.AboveText{
  font-size: 1.2rem;
}

.input-playground, .output-playground{
 width: 100%;
}

.Text-area textarea{
font-size: 1.1rem;
height: 25rem;
}

.button {
  font-size: 1rem;

}
}
</style>
