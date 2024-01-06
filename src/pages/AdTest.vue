<template>
    <div>
      <NavBar />
      <div class="container">
        <div class="buttons">
          <h1>Menu</h1>
  
          <div class="button">
            <button
              @click="toggleSubContainer('Dashboard')"
              class="scroll-button"
              :style="{ backgroundColor: currentContent === 'Dashboard' ? '#EE5684' : '#1F1F1F' }"
            >
              <img src="/images/html.png" alt="Image" class="button-image" />
              <p>Dashboard</p>
              <i v-if="showSubContainer && currentContent === 'Dashboard'" class="icon-down"></i>
            </button>
          </div>
  
          <div class="button">
            <button
              @click="scrollToAdditionalBox('User')"
              class="scroll-button"
              :style="{ backgroundColor: currentContent === 'User' ? '#EE5684' : '#1F1F1F' }"
            >
              <img src="/images/css.png" alt="Image" class="button-image" />
              <p>ManageUser</p>
            </button>
          </div>
  
          <!-- เพิ่มปุ่มสำหรับแท็บอื่นๆ ตามต้องการ -->
  
        </div>
  
        <component :is="tabs[currentContent]" v-if="tabs[currentContent]" />
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'
  import UserList from '@/components/UserList.vue'
  
  export default {
    components: {
      NavBar,
    },
    data() {
      return {
        currentContent: 'Dashboard',
        showSubContainer: false,
        tabs: {
          Dashboard: UserList, // ใส่ component ที่ต้องการแสดงตาม Dashboard ไว้ที่นี่
          User: null,
          // เพิ่ม component สำหรับแท็บอื่นๆ ตามต้องการ
        }
      }
    },
    methods: {
      scrollToAdditionalBox(contentId) {
        this.currentContent = contentId
      },
      toggleSubContainer(contentId) {
        this.currentContent = contentId
        this.showSubContainer = !this.showSubContainer
      }
    }
  }
  </script>

<style scoped>
h1 {
  margin-top: 50px;
  margin-left: 35px;
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

.sub-container {
  background-color: #f5f5f5;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
}
</style>
