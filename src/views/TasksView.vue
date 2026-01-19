<script setup lang="ts">
import { ref } from "vue";
import { useAppStore } from "../stores/appStore";

const store = useAppStore();

const title = ref("");
const description = ref("");
const error = ref("");

function handleSubmit() {
  if (!title.value.trim()) {
    error.value = "Task name mandatory";
    return;
  }

  store.addTask({
    id: Date.now().toString(),
    title: title.value,
    description: description.value || undefined,
    completed: false,
    order: store.tasks.length
  });

  title.value = "";
  description.value = "";
  error.value = "";
}
</script>

<template>
  <div class="tasks">
    <h1>Tasks</h1>

    <!-- ADD TASK -->
    <section class="add-card">
      <form @submit.prevent="handleSubmit">
        <input name="name" v-model="title" placeholder="Task name" autocomplete="on"/>
        <textarea name="textArea" v-model="description" placeholder="Description (optional)"/>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">Add Task</button>
      </form>
    </section>

    <hr />

    <!-- LISTS -->
    <section>
        <ul class="task-list">
          <li v-for="task in store.tasks" :key="task.id" class="list-item" :class="{ completed: task.completed }">

            <!-- CHECKBOX -->
            <div class="side">
            <input
                name="checkbox"
                type="checkbox"
                :checked="task.completed"
                @change="store.toggleTask(task.id)"
                aria-label="Mark task as complete"
            />
            </div>

              <!-- CONTENT -->
              <div class="item-content">
                <RouterLink
                    :to="`/tasks/${task.id}`"
                    class="content-title"
                >
                  {{ task.title }}
                </RouterLink>

                <p v-if="task.description" class="content-desc">
                  {{ task.description }}
                </p>
              </div>

            <div class="side">
              <button
                  class="delete"
                  @click="store.removeTask(task.id)"
              >
                🗑 Delete
              </button>
            </div>
          </li>
        </ul>
    </section>
  </div>
</template>

<style scoped>
.tasks {
  height: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: column;
}

.tasks > section {
  margin: 0 auto;
}

.add-card {
  width: 30vw;
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 10px;
}

.add-card form {
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
  height: 6rem;
}

.error {
  color: #ff6b6b;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40vw;
  margin: auto;
}

.list-item {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  background: #333;
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

.side {
  width: 8rem;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
}

.side input {
  transform: scale(150%);
  margin-right: 3.5rem;
}

.side input:checked {
  accent-color: #a4a9ff;
}

.content-title {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content-desc {
  font-size: 0.9rem;
  color: #ccc;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

button.delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
}

.list-item.completed {
  opacity: 0.6;
}

.list-item.completed .content-title {
  text-decoration: line-through;
}
</style>