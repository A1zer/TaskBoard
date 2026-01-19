<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "../stores/appStore";
import TaskCard from "../components/TaskCard.vue";


const store = useAppStore();

const todoTasks = computed(() =>
    store.tasks
        .filter(t => !t.completed)
        .sort((a, b) => a.order - b.order)
);

const doneTasks = computed(() =>
    store.tasks
        .filter(t => t.completed)
        .sort((a, b) => a.order - b.order)
);

const lastNotes = computed(() =>
    store.notes.slice().reverse()
);

function dropToDone(e: DragEvent) {
  const id = e.dataTransfer?.getData("taskId");
  if (!id) return;

  store.moveTask(id, true);
}

function dropToTodo(e: DragEvent) {
  const id = e.dataTransfer?.getData("taskId");
  if (!id) return;

  store.moveTask(id, false);
}


</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <div class="cards">
      <!-- TODO -->
      <section class="card"
               @dragover.prevent
               @drop="dropToTodo"
      >
        <h2>TODO</h2>
        <div class="tasks-grid">
        <TaskCard
            v-for="task in todoTasks"
            :key="task.id"
            :task="task"
        />
        </div>

        <p v-if="todoTasks.length === 0">
          🎉 Vše hotovo!
        </p>
      </section>

      <!-- DONE -->
      <section class="card done"
               @dragover.prevent
               @drop="dropToDone"
      >
        <h2>Completed</h2>
        <div class="tasks-grid">
        <TaskCard
            v-for="task in doneTasks"
            :key="task.id"
            :task="task"
        />
        </div>
      </section>
    </div>

    <!-- NOTES -->
    <section class="card notes">
      <h2>Notes</h2>

      <div class="notes-grid">
        <div
            v-for="note in lastNotes"
            :key="note.id"
            class="note-card"
        >
          <RouterLink :to="`/notes/${note.id}`">
              <div class="note-title">
                {{ note.title }}
              </div>
              <div class="note-content">
                <p>
                {{ note.content }}
                </p>
              </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  height: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: column;
}

.cards {
  min-height: 50vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.card {
  background: #333333FF;
  padding: 1em 2em;
  border-radius: 10px;
}

.card.done {
  background: #333333;
}

.card.notes {
  flex-grow: 1;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 1em 0;
}

.note-card {
  height: 10rem;
  background: #fff9c4;
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.15);
  transform: rotate(-1deg);
}

.note-card a {
  height: 100%;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
}

.note-title {
  font-weight: bold;
}

.note-content {
  height: 4.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

h2 {
  margin-top: 0.5em;
  margin-bottom: 1em;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.25rem 0;
}
</style>