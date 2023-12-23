<template>
  <div>
    <AdNav />
    <div class="container">
      <div class="buttons">
        <h1>เมนู</h1>

        <router-link to="/AdminManageArticle" class="button">
          <button
            @click="scrollToAdditionalBox('html')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'html' ? '#EE5684' : '#1F1F1F' }"
          >
            <img src="/images/html.png" alt="Image" class="button-image" />
            <p>HTML</p>
          </button>
        </router-link>

        <div class="button">
          <button
            @click="scrollToAdditionalBox('css')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'css' ? '#EE5684' : '#1F1F1F' }"
          >
            <img src="/images/css.png" alt="Image" class="button-image" />
            <p>CSS</p>
          </button>
        </div>

        <div class="button">
          <button
            @click="scrollToAdditionalBox('javascript')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'javascript' ? '#EE5684' : '#1F1F1F' }"
          >
            <img src="/images/javascript.png" alt="Image" class="button-image" />
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
      <p>Test</p>
    </div>
  </div>
</template>

<script>
import AdNav from '@/components/AdNav.vue'
import BoxArticie from '@/components/BoxArticie.vue'

export default {
  components: {
    AdNav,
    BoxArticie
  },
  data() {
    return {
      currentContent: 'html', // กำหนดให้แสดงข้อมูล HTML เริ่มต้น
      languageData: {
        html: {
          
        },

        css: {
          
        },

        javascript: {

        }
      }
    }
  },

  methods: {
    scrollToAdditionalBox(contentId) {
      this.currentContent = contentId
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 50px;
  margin-left: 35px;
  margin-bottom: 2%;
  color: #fffdfd;
  font-size: 27px;
  font-weight: bolder;
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
  background-color: #1f1f1f;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);  */
  border-radius: 50px;
  cursor: pointer;
}

.scroll-button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: #ee5684;
}

p {
  font-size: 20px;
  margin-left: 115px;
  transform: translateY(-105%);
  font-weight: bolder;
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
.container-no-data {
  background-color: #f5f5f5;
  margin-top: 50px;
  margin-right: 50px;
  width: 1000px;
  height: 1000px;
}
.container-no-data h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}

.buttons {
  grid-column: 1 / 2;
}
</style>


