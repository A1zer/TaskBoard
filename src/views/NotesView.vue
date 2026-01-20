<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useAppStore } from "../stores/appStore";

const store = useAppStore();

const title = ref("");
const content = ref("");
const error = ref("");

function handleSubmit() {
  if (!title.value.trim()) {
    error.value = "Note name mandatory";
    return;
  }

  store.addNote({
    id: Date.now().toString(),
    title: title.value,
    content: content.value
  });

  title.value = "";
  content.value = "";
  error.value = "";
}
</script>

<template>
  <div class="notes">

    <!-- ADD NOTE -->
    <section class="add-card">
      <h1>Notes</h1>
      <div class="form-container">
      <form @submit.prevent="handleSubmit">
        <input name="name" v-model="title" placeholder="Note name" autocomplete="on"/>
        <textarea name="textArea" v-model="content" placeholder="Content"/>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">Add Note</button>
      </form>
      </div>
    </section>

    <hr />

    <!-- LISTS -->
    <section class="list">
      <div class="list-container">
      <ul class="note-list">
        <li v-for="note in store.notes" :key="note.id" class="list-item">

          <div id="side-filler" class="side">

          </div>

          <!-- CONTENT -->
          <div class="item-content">
          <RouterLink
              :to="`/notes/${note.id}`"
              class="content-title"
          >
            {{ note.title }}
          </RouterLink>

            <p v-if="note.content" class="content-desc">
              {{ note.content }}
            </p>
          </div>

          <div class="side">
          <button
              class="delete"
              @click="store.removeNote(note.id)"
          >
            🗑 Delete
          </button>
          </div>
        </li>
      </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.notes {
  height: 100%;
  width: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: column;
}

.form-container {
  max-width: 600px;
  margin: auto;
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 10px;
}

.list-container {
  max-width: 600px;
  margin: auto;
}

form {
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

.note-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

@media (max-width: 430px) {
  #side-filler {
    display: none;
    width: 0;
  }

  .side {
    justify-content: end;
  }

  .item-content {
    flex: 1;
    text-align: left;
    padding-left: 1rem;

  }
}
</style>