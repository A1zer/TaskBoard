<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main id="main-content">
  <div id="page">
    <router-view />
  </div>
  </main>
</template>

<style scoped>
#main-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#page {
  padding: 2rem;
  flex-grow: 1;
}
</style>
