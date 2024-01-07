<script>
import AdNav from '@/components/AdNav.vue'
import BoxAddash from '@/components/BoxAddash.vue'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
  components: {
    AdNav,
    BoxAddash
  },
  data() {
    return {
      currentContent: 'Dashboard', // กำหนดให้แสดงข้อมูล HTML เริ่มต้น
      languageData: {
        Dashboard: {
          
        },

        Userlist: {
          
        },

        Managearticles: {

        },

        Manageexercises: {

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






<template>
  <div>
    <AdNav />
    <div class="container">
      <div class="buttons">
        <h1>เมนู</h1>

        <router-link to="/AdminManageArticle" class="button">
          <button
            @click="scrollToAdditionalBox('Dashboard')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'Dashboard' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/html.png" alt="Image" class="button-image" />
            <p>แดชบอร์ด</p>
          </button>
        </router-link>

        <router-link to="/AdminManageArticle" class="button">
          <button
            @click="scrollToAdditionalBox('Userlist')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'Userlist' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/css.png" alt="Image" class="button-image" />
            <p>รายชื่อผู้ใช้</p>
          </button>
        </router-link>

        <router-link to="/AdminManageArticle" class="button">
          <button
            @click="scrollToAdditionalBox('Managearticles')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'Managearticles' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/javascript.png" alt="Image" class="button-image" />
            <p>จัดการบทความ</p>
          </button>
        </router-link>

        <router-link to="/AdminManageArticle" class="button">
          <button
            @click="scrollToAdditionalBox('Manageexercises')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'Manageexercises' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/javascript.png" alt="Image" class="button-image" />
            <p>จัดกการแบบฝึกหัด</p>
          </button>
        </router-link>

      </div>

      <!-- <BoxArticie v-if="currentContent && languageData[currentContent]" :contentData="languageData[currentContent]" /> -->
      <BoxAddash v-if="currentContent === 'Dashboard'" :contentData="languageData.Dashboard" />
      <BoxAddash v-if="currentContent === 'Userlist'" :contentData="languageData.Userlist" />
      <BoxAddash v-if="currentContent === 'Managearticles'" :contentData="languageData.Managearticles" />
      <BoxAddash v-if="currentContent === 'Manageexercises'" :contentData="languageData.Manageexercises" />
      <!-- <div v-else class="container-no-data">
        <h1>No Data</h1>
      </div> -->
    </div>
  </div>
</template>


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
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-left: -40px;
  margin-bottom: 25px;
  width: 300px;
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
  margin-left: 120px;
  transform: translateY(-105%);
  font-weight: bolder;
  text-align: left;
  color: #fffdfd;
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


