<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../stores/appStore";

const route = useRoute();
const router = useRouter();
const store = useAppStore();

const noteId = route.params.id as string;
const note = store.notes.find(n => n.id === noteId);

const title = ref(note?.title || "");
const content = ref(note?.content || "");
const error = ref("");

function handleSave() {
  if (!title.value.trim()) {
    error.value = "Note name mandatory";
    return;
  }

  if (!note) return;

  store.updateNote({
    id: note.id,
    title: title.value,
    content: content.value
  });

  router.back();
}

function handleDelete() {
  if (!note) return;

  store.removeNote(note.id);
  router.back();
}
</script>

<template>
  <section v-if="note" class="note">
    <div class="edit-wrapper">
    <h1>Note Details</h1>

    <div class="edit-card">
    <form @submit.prevent="handleSave">

        <Strong>Name</Strong>
        <input v-model="title" />
        <p v-if="error" class="error">{{ error }}</p>

        <Strong>Content</Strong>
        <textarea name="textArea" v-model="content" placeholder="Content"></textarea>

      <button type="submit">Save Changes</button>
      <button type="button" @click="handleDelete">
        Delete
      </button>
    </form>
    </div>
    </div>
  </section>

  <p v-else>Note not found</p>
</template>

<style scoped>
.note {
  height: 100%;
  width: 100%;
}

.edit-card {
  max-width: 600px;
  margin: auto;
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
  height: 8rem;
}

.error {
  color: #ff6b6b;
}
</style>