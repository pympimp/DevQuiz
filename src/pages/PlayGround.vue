<template>
  <div>
    <NavBar />
    <div class="container-playground">
      <div class="discription" v-if="unit">
        <div style="font-size: 24px">
          <b>{{ unit.nameUnit + ' ' }}</b
          >{{ unit.header }}
        </div>
        <div style="font-size: 16px">{{ unit.discription }}</div>
        <div style="font-size: 16px; display: flex; flex-direction: row">
          <div style="color: #c53636; font-weight: bold">โจทย์:</div>
          <div style="margin-left: 5px">{{ unit.question }}</div>
        </div>
      </div>

      <div class="box-playground">
        <div class="input-playground">
          <div style="font-size: medium; margin-left: 30px; color: white">พื้นที่เขียนโค้ด</div>
          <div>
            <ScrollAreaRoot style="--scrollbar-size: 10px" class="Text-area">
              <ScrollAreaViewport>
                <textarea v-if="unitData" v-model="code[unitData.name]"></textarea>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar class="ScrollAreaScrollbar" orientation="horizontal">
                <ScrollAreaThumb class="ScrollAreaThumb" />
              </ScrollAreaScrollbar>
            </ScrollAreaRoot>
          </div>
        </div>
        <div class="output-playground">
          <div style="font-size: medium; margin-left: 30px; color: white">ผลลัพธ์</div>
          <iframe class="Text-area" ref="outputFrame"></iframe>
          <button @click="runCode" class="button" v-if="!corrcet"><b> ตรวจสอบ </b></button>
          <button @click="check()" class="button" v-if="corrcet && nextUnit != null"><b> ต่อไป </b></button>
          <button @click="endLesson()" class="button" v-if="corrcet && nextUnit == null"><b> จบแบบทดสอบ </b></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { useAuthenStore } from '../stores/auth'
import Swal from 'sweetalert2'
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
onMounted(() => {
  if (route.params.couresId && route.params.lessonId && route.params.unitId && route.params.name) {
    couresId.value = route.params.couresId
    lessonId.value = route.params.lessonId
    unitId.value = route.params.unitId
    course.value = route.params.name
    fetchUnitData()
    if (couresId.value && lessonId.value && unitId.value) {
      fetchOneUnit(couresId.value, lessonId.value, unitId.value)
    }
  }
})

const htmlstart = ref(`<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`)

const cssstart = ref(`<!DOCTYPE html>
<html>
<head>
<style>
h1 {
  font-family: verdana;
  font-size: 300%;
}
</style>
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`)

const javascriptstart = ref(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML with JavaScript</title>
</head>
<body>

    <h1>Hello, World!</h1>

</body>
</html>`)

const code = ref({
  HTML: htmlstart,
  CSS: cssstart,
  JavaScript: javascriptstart
})

const outputFrame = ref(null)

const runCode = () => {
  const outputDocument =
    outputFrame.value.contentDocument || outputFrame.value.contentWindow.document

  outputDocument.open()
  outputDocument.write(code.value[unitData.value.name])
  outputDocument.close()

  const userAnswer = code.value[unitData.value.name]
  const step1 = userAnswer.replace(/".*?"/g, '')
  const step2 =  step1.replace(/:\s*([^;]+)\s*;/g, ':')
  const answer = step2
  console.log("test",answer)
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
  console.log(corrcet.value)
}

const fetchOneUnit = async (couresId, lessonId, unitId) => {
  const result = await axios.get(
    `http://localhost:5000/test-elearning-b0646/us-central1/api/coures/${couresId}/${lessonId}/${unitId}`
  )
  if (result) {
    unit.value = result.data
    console.log('unit', unit.value)
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
      `http://localhost:5000/test-elearning-b0646/us-central1/api/user/Test/${authenStore.auth.id}/${course.value}`,
      {
        [lesson]: {
          [units]: true
        }
      }
    )
    if (result) {
      corrcet.value = false
      router.push(`/unit/${couresId.value}/${lessonId.value}/${nextUnit.value}/${course.value}`)
      if (router.push) {
        fetchOneUnit(couresId.value, lessonId.value, nextUnit.value)
        console.log('เปลี่ยนหน้า')
      }
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

const fetchUnitData = async () => {
  try {
    const result = await axios.get(
      'http://localhost:5000/test-elearning-b0646/us-central1/api/coures/'
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
          console.log('lessonName', lessonName.value)
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
        console.log('unitData', unitData.value)
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
      `http://localhost:5000/test-elearning-b0646/us-central1/api/user/Test/${authenStore.auth.id}/${course.value}`,
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

.discription {
  background-color: white;
  width: 1000px;
  max-height: 150px;
  border-radius: 30px;
  padding: 15px;
  margin-top: 60px;
}
.Text-area {
  background-color: white;
  width: 500px;
  height: 300px;
  border-radius: 30px;
  padding: 15px;
  margin: 0px 10px 0px 10px;
  resize: none;
}

.Text-area textarea {
  width: 100%;
  height: 270px;
  overflow-y: auto;
  border: none; /* เพิ่มบรรทัดนี้ถ้าคุณต้องการลบเส้นขอบ */
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
</style>
