<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../stores/appStore";

const route = useRoute();
const router = useRouter();
const store = useAppStore();

const taskId = route.params.id as string;
const task = store.tasks.find(t => t.id === taskId);

const title = ref(task?.title || "");
const description = ref(task?.description || "");
const completed = ref(task?.completed || false);
const error = ref("");

function handleSave() {
  if (!title.value.trim()) {
    error.value = "Task name mandatory";
    return;
  }

  if (!task) return;

  store.updateTask({
    id: task.id,
    title: title.value,
    description: description.value,
    completed: completed.value,
    order: task.order
  });

  router.back();
}

function handleDelete() {
  if (!task) return;

  store.removeTask(task.id);
  router.back();
}
</script>

<template>
  <section v-if="task" class="task">
    <div class="edit-wrapper">
    <h1>Task Details</h1>

    <div class="edit-card">
    <form @submit.prevent="handleSave">

        <strong>Name</strong>
        <input name="name" v-model="title" placeholder="Task name" autocomplete="on"/>
        <p v-if="error" class="error">{{ error }}</p>

        <strong>Description</strong>
        <textarea name="textArea" v-model="description" placeholder="Description (optional)"/>

        <label>
          <input
              type="checkbox"
              v-model="completed"
              style="accent-color: #a4a9ff;"/>
          Mark task as complete
        </label>

      <button type="submit">Save Changes</button>
      <button type="button" @click="handleDelete">
        Delete
      </button>
    </form>
    </div>
    </div>
  </section>

  <p v-else>Task not found</p>
</template>

<style scoped>
.task {
  height: 100%;
  width: 100%;
}

.edit-wrapper {
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
}

.edit-card {
  width: 600px;
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 10px;
}

.edit-card form {
  display: grid;
  gap: 0.75rem;
}

input, textarea {
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
}

textarea {
  resize: none;
  height: 16rem;
}

.error {
  color: #ff6b6b;
}
</style>