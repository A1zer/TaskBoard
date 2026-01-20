<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "../stores/appStore";

const store = useAppStore();

/* === STATS === */
const totalTasks = computed(() => store.tasks.length);

const completedTasks = computed(
    () => store.tasks.filter(t => t.completed).length
);

const todoTasks = computed(
    () => store.tasks.filter(t => !t.completed).length
);

const notesCount = computed(() => store.notes.length);


/* === DATA RESET === */
function resetData() {
  if (!confirm("Do you really want to delete all data?")) {
    return;
  }

  store.tasks = [];
  store.notes = [];
  localStorage.clear();
}
</script>

<template>
  <section class="profile">
    <h1>Profile</h1>
    <div>
    <p>TaskBoard</p>
    <p><strong>Version:</strong> 1.0</p>
    </div>

    <!-- USER -->
    <section class="card">
      <h2>User</h2>
      <p><strong>Username:</strong> Aizer</p>
    </section>

    <!-- STATS -->
    <section class="card">
      <h2>Stats</h2>
      <ul>
        <li>Total Tasks: {{ totalTasks }}</li>
        <li>Completed: {{ completedTasks }}</li>
        <li>Not Finished: {{ todoTasks }}</li>
        <li>Notes: {{ notesCount }}</li>
      </ul>
    </section>

    <!-- SETTINGS -->
    <section class="card">
      <h2>Settings</h2>

      <button class="danger" @click="resetData">
        Reset All
      </button>
    </section>
  </section>
</template>

<style scoped>
.profile {
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card {
  background: #333;
  padding: 1.5rem;
  border-radius: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
}

button.danger {
  background: #646cffaa;
  color: white;
  border: none;
  border-radius: 6px;
}
</style>