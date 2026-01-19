<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div id="navbar-container">
    <nav id="navbar-content">
    <RouterLink to="/">Dashboard</RouterLink> |
    <RouterLink to="/tasks">Tasks</RouterLink> |
    <RouterLink to="/notes">Notes</RouterLink> |
    <RouterLink to="/profile">Profile</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
a {
  font-size: 1.2em;
}

#navbar-container {
  width: 100%;
  background-color: #242424;
  z-index: 1000;
  border-bottom: 1px solid #ccc;
}

#navbar-content {
  max-width: 1200px;
  display: flex;
  padding: 1rem 2rem;
  margin: 0 auto;
  align-items: center;
  justify-content: space-around;
}
</style>