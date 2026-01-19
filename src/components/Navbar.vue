<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav id="navbar">
    <nav id="navbar-content">
    <RouterLink to="/">Dashboard</RouterLink> |
    <RouterLink to="/tasks">Tasks</RouterLink> |
    <RouterLink to="/notes">Notes</RouterLink> |
    <RouterLink to="/profile">Profile</RouterLink>
    </nav>
  </nav>
</template>

<style scoped>
a {
  font-size: 1.2em;
}

#navbar {
  //position: fixed;
  //top: 0;
  width: 100%;
  background-color: #242424;
  z-index: 1000;
  border-bottom: 1px solid #ccc;
}

#navbar-content {
  width: 70%;
  display: flex;
  padding: 1rem 2rem;
  margin: 0 auto;
  flex-basis: 400px;
  align-items: center;
  justify-content: space-around;
}
</style>