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
            v-model="code.html"
            ></textarea>
        </div>
          </div>
          <div class="output-playground">
            <div style="font-size: medium; margin-left: 30px;color: white;">ผลลัพธ์</div>
            <iframe class="Text-area" ref="outputFrame"></iframe>
            <button @click="runCode" class="button">ตรวจสอบ ></button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';

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

iframe {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
</style>