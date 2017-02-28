<template>
  <div id="app">
    <top></top>
    <container></container>
    <bottom></bottom>
  </div>
</template>

<script>
import Top from './components/Top'
import Container from './components/Container'
import Bottom from './components/Bottom'

export default {
  name: 'app',
  components: {
    Top,
    Container,
    Bottom
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
