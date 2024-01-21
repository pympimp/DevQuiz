<template>
  <!-- <div class="container"> -->
    <div class="content">
      <h1>{{ contentData.fullname }}</h1>
      <p style="max-width: 87%">{{ contentData.discription }}</p>
      <div v-if="unitData && ProgressIndex != null">
        <div v-for="(box, index) in lessonData" :key="index">
          <div class="inner-box" :style="{ height: box.isExpanded ? 'auto' : '50px' }">
            <div class="box-content">
              <div class="box-header">
                <h1>{{ box.nameLesson }}</h1>
                <button @click="toggleBox(index)">
                  <i
                    class="bi"
                    :class="{ 'bi-chevron-up': box.isExpanded, 'bi-chevron-down': !box.isExpanded }"
                  ></i>
                </button>
              </div>
            </div>
          </div>
          <Transition name="slide-fade">
            <div class="card-container" v-if="box.isExpanded">
              <div v-for="(subitem, subindex) in box.units" :key="subindex">
                <div
                  @click="goto(unitData.courseId, box.lessonId, subitem.unitId, unitData.name)"
                  class="card-unit"
                  :style="{
                    backgroundColor: userData.progress[ProgressIndex][box.nameLesson][
                      subitem.nameUnit
                    ]
                      ? 'rgba(237, 237, 237, 1)'
                      : 'rgba(209, 209, 209, 0.7)'
                  }"
                  :class="{
                    'not-clickable':
                      userData.progress[ProgressIndex][box.nameLesson][subitem.nameUnit] ==
                      false
                  }"
                >
                  <div style="align-self: center" class="subPtag">
                    {{ index + 1 + '.' + (subindex + 1) + ' ' }}{{ subitem.header }}
                  </div>
                  <div
                    class="icon-card"
                    :style="{
                      backgroundColor: userData.progress[ProgressIndex][box.nameLesson][
                        subitem.nameUnit
                      ]
                        ? 'rgba(151, 221, 118, 1)'
                        : 'rgba(223, 115, 115, 0.7)'
                    }"
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-check"
                      v-if="
                        userData.progress[ProgressIndex][box.nameLesson][
                          subitem.nameUnit
                        ] == true
                      "
                    />
                    <FontAwesomeIcon icon="fa-solid fa-xmark" v-else></FontAwesomeIcon>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <div v-else>
        <div v-for="(box, index) in unitData" :key="index">
          <div v-for="(subitem, subindex) in box.units" :key="subindex">
            <div class="inner-box" :style="{ height: subitem.isExpanded ? 'auto' : '50px' }">
              <div class="box-content">
                <div class="box-header">
                  <h1>{{ getContinuousIndex(index, subindex) + '. ' }}{{ subitem.header }}</h1>
                  <button @click="toggleBoxUnit(index, subindex)">
                    <i
                      class="bi"
                      :class="{
                        'bi-chevron-up': subitem.isExpanded,
                        'bi-chevron-down': !subitem.isExpanded
                      }"
                    ></i>
                  </button>
                </div>
                <Transition name="slide-fade">
                  <div v-if="subitem.isExpanded" class="Description">
                    <div>{{ subitem.discription }}</div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import { reactive } from 'vue'
import { useAuthenStore } from '../stores/auth'
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'

export default {
  mounted() {
    console.log('maja', this.unitData)
  },
  components: {
    FontAwesomeIcon
  },
  props: {
    contentData: {
      type: Object,
      default: () => ({})
    },
    unitData: {
      type: Object,
      default: () => ({})
    },
    ProgressIndex: {
      type: Number
    },
    userData:{
      type: Object,
      default: () =>({})
    }
  },
  data() {
    return {
      authenStore: useAuthenStore(),
      Numaa: 0,
      router: useRouter(),
      continuousIndex: 0
    }
  },
  setup(props) {
    // กำหนด reactive object ที่เก็บข้อมูล
    const internalContentData = reactive(props.contentData)
    const unitData1 = reactive(props.unitData)
    const lessonData = reactive(props.unitData.lessons)
    const userData1 = reactive(props.userData)

    // ฟังก์ชันสำหรับการเปลี่ยนสถานะของกล่อง

    return {
      internalContentData,
      unitData1,
      lessonData,
      userData1
    }
  },
  methods: {
    toggleBox(index) {
      console.log('Toggle Box Clicked', index)
      if (this.unitData1.lessons[index].isExpanded == false) {
        this.unitData1.lessons[index].isExpanded = true
        console.log(this.ProgressIndex)
      } else {
        this.unitData1.lessons[index].isExpanded = false
      }
    },
    toggleBoxUnit(index, subindex) {
      if (this.unitData1[index].units[subindex].isExpanded == false) {
        this.unitData1[index].units[subindex].isExpanded = true
      } else {
        this.unitData1[index].units[subindex].isExpanded = false
      }
    },
    goto(couresId, lessonId, unitId, name) {
      this.router.push(`/unit/${couresId}/${lessonId}/${unitId}/${name}`)
    },
    getContinuousIndex(boxIndex, subindex) {
      return boxIndex * 5 + subindex + 1
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: auto;
  /* background-color: #bd6a6a; */
}

.Description {
  margin-left: 26px;
  margin-top: 5px;
}

.card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 80%;
  margin-left: 4%;
}

.inner-box {
  background-color: #f5f5f5;
  margin-bottom: 1px;
  margin-top: 15px;
  width: 800px;
  height: auto;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  transition: height 0.3s ease;
}

h1 {
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
}

p {
  color: #a6a6a6;
  font-size: 16px;
  margin-top: 5px;
  margin-left: 20px;
}

.content {
  margin-top: 50px;
  /* background-color: #6b0000; */
  width: 900px;
}

.icon-card {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  width: 40px; /* ปรับขนาดตามที่ต้องการ */
  height: 40px; /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%; /* ทำให้เป็นวงกลม */
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25); /* inner shadow */
}

.box-content {
  flex-grow: 1;
  padding-right: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

.inner-box h1 {
  color: #000000;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 8px;
}

.inner-box p {
  margin-left: 20px;
  margin-top: 2px;
  color: #000000;
  font-size: 16px;
  max-height: 70px;
  overflow: hidden;
}

.bi-chevron-up {
  margin-right: 15px;
  font-size: 24px;
  color: #1f1f1f;
  cursor: pointer;
}

.bi-chevron-down {
  margin-right: 15px;
  font-size: 24px;
  color: #1f1f1f;
  cursor: pointer;

  /* transform-origin: center;  */
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-unit {
  margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.not-clickable {
  pointer-events: none;
}

.card-unit:hover {
  background-color: white;
  transform: scale(0.98);
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

@media only screen and (max-width: 480px) {

  .content {
    display: flex;
    flex-direction: column;
    margin-left: -1px;
    max-width: 50vh;
  }

  .inner-box {
    background-color: #f5f5f5;
    width: 95%;
    border-radius: 10px;
  }

  h1 {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 0;
  }

  p {
    color: #a6a6a6;
    font-size: 0.9rem;
    margin-left: 5px;
    width: 90%;
  }


  .inner-box h1 {
    color: #000000;
    font-size: 1.2rem;
  }


  .bi-chevron-up,  .bi-chevron-down  {
    margin-right: -0.3rem;
    color: #1f1f1f;
    cursor: pointer;
  }


  .card-unit {
    font-size: 1rem;
  }

  .card-container {
    max-width: 85%;
  }
}
@media screen and (min-width: 481px) and (max-width: 768px) {
  .content {
    display: flex;
    flex-direction: column;
  }
  .inner-box {   
     background-color: #f5f5f5;
    width: 95%;
    border-radius: 10px;
  }

  h1 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.95rem;
    margin-left: 5px;
  }

  .bi-chevron-up,  .bi-chevron-down  {
    margin-right: -0.3rem;
    color: #1f1f1f;
    cursor: pointer;
  }

  .card-container {
    max-width: 85%;
  }

  .box-header h1 {
    font-size: 1.1rem;
  }

  .subPtag {
    font-size: 0.95rem;
  }
} 


@media screen and (min-width: 769px) and (max-width: 1024px) {
  .content {
    display: flex;
    flex-direction: column;
  }
  .inner-box {   
     background-color: #f5f5f5;
    width: 95%;
    border-radius: 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    margin-left: 5px;
  }

  .bi-chevron-up,  .bi-chevron-down  {
    margin-right: -0.3rem;
    font-size: 1.7rem;
    color: #1f1f1f;
    cursor: pointer;
  }

  .card-container {
    max-width: 85%;
  }

  .box-header h1 {
    font-size: 1.3rem;
  }

  .subPtag {
    font-size: 1.1rem;
  }
}

@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .content {
    display: flex;
    flex-direction: column;
  }
  .inner-box {   
     background-color: #f5f5f5;
    width: 95%;
    border-radius: 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    margin-left: 5px;
  }

  .bi-chevron-up,  .bi-chevron-down  {
    margin-right: -0.3rem;
    font-size: 1.7rem;
    color: #1f1f1f;
    cursor: pointer;
  }

  .card-container {
    max-width: 87%;
  }

  .box-header h1 {
    font-size: 1.4rem;
  }

  .subPtag {
    font-size: 1.2rem;
  }
}

@media screen and (min-width: 1201px) {
  .content {
    display: flex;
    flex-direction: column;
    max-width: 55rem;
  }
  .inner-box {   
     background-color: #f5f5f5;
    width: 83%;
    border-radius: 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    margin-left: 5px;
  }

  .bi-chevron-up,  .bi-chevron-down  {
    margin-right: -0.3rem;
    font-size: 1.7rem;
    color: #1f1f1f;
    cursor: pointer;
  }

  .card-container {
    max-width: 75%;
    margin-left: 2rem;
  }

  .box-header h1 {
    font-size: 1.4rem;
  }

  .subPtag {
    font-size: 1.2rem;
  }
}


/* reponsive */
@media only screen and (max-width: 480px) {

}


@media screen and (min-width: 481px) and (max-width: 768px) {

}

@media screen and (min-width: 769px) and (max-width: 1024px) {

}

@media screen and (min-width: 1025px) and (max-width: 1200px) {

}

@media screen and (min-width: 1200px)  {
 
}

</style>
