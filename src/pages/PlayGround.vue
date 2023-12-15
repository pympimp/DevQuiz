<template>
    <div>
      <NavBar/>
      <div class="container-playground">
        <div class="discription">
          <div style="font-size: 24px;">hello world</div>
          <div style="font-size: 16px;">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, quod harum possimus reiciendis reprehenderit veniam asperiores ipsa, nam delectus illum quia doloremque, distinctio cupiditate ipsam quae? Quo soluta cupiditate eveniet!</div>
        </div>
  
        <div class="box-playground">
          <div class="input-playground">
            <div style="font-size: medium; margin-left: 30px;color: white;">พื้นที่เขียนโค้ด</div>
            <div>
            <textarea
            class="Text-area"
            v-model="code"
            @init="editorInit"
            lang="javascript"
            theme="chrome"
            ></textarea>
        </div>
          </div>
          <div class="output-playground">
            <div style="font-size: medium; margin-left: 30px;color: white;">ผลลัพธ์</div>
            <div class="Text-area" v-html="output"></div>
            <button @click="runCode" class="button">ตรวจสอบ ></button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  import { VAceEditor } from 'vue3-ace-editor';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      code: 'console.log("Hello, World!");',
      output: '',
    };
  },
  methods: {
    runCode() {
      try {
        const result = new Function(this.code)();
        this.output = result.toString();
      } catch (error) {
        this.output = `Error: ${error.message}`;
      }
    },
    editorInit(editor) {
      // เมื่อโค้ดถูกโหลดเสร็จ
      editor.on('change', () => {
        this.runCode(); // เรียกใช้งานเมื่อโค้ดถูกเปลี่ยน
      });
    },
  },
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
    max-width: 1000px;
    max-height: 180px;
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
</style>