<template>
  <HeadPart/>
  <Search/>
  <ShowResult/>
</template>

<script>
import HeadPart from './components/HeadPart.vue'
import Search from './components/Search.vue'
import ShowResult from './components/ShowResult.vue'

export default {
  name: 'App',
  components: {
    HeadPart,Search,ShowResult
  }
}
</script>

<style>
#app {
  width:100%;
  height: 100%;
  background-color: rgb(185, 236, 255);
  overflow-y: scroll;
}
</style>
