<template>
<ClassList/>
  </template>
  
  <script setup>
  // eslint-disable-next-line no-unused-vars
  import ClassList from '../components/ClassList.vue';

  </script>
  
  <style>
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .admin {
    background-color: rgb(183, 229, 229);
  }
  
  .grid-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
  }
  
  .grid-item {
    /* background-color: #f2f2f2; */
    padding: 10px;
    text-align: center;
  }
  
  .col-1 {
    flex-basis: calc(5% - 10px);
  }
  
  .col-4 {
    flex-basis: calc(45% - 10px);
  }
  .col-2 {
    flex-basis: calc(10% - 10px);
  }
  
  .col-3 {
    flex-basis: calc(20% - 10px);
  }
  
  .bi{
    padding: 3vh;
  }
  
  /* Customize as needed for other column sizes */
  </style>
  