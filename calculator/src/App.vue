<template>
  <div id="app">
    <Calculator></Calculator>

  </div>
</template>

<script>
import Calculator from './components/Calculator.vue';

export default {
  name: 'App',
  components: {
    Calculator
}
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
