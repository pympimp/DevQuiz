<template>
    <button class="hover:bg-white duration-300 font-sm text-black rounded py-1.5 px-4 custom-button">
      เข้าสู่ระบบ
    </button>
  </template>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai+Looped&family=Oswald&display=swap');
  
  /* Use ::v-deep (or /deep/) to increase specificity and override Tailwind styles */
  ::v-deep .custom-button {
    font-family: 'Noto Sans Thai Looped', 'Oswald', sans-serif;
  }
  </style>
  