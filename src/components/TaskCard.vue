<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Task } from "../types";

const props = defineProps<{ task: Task }>();
const router = useRouter();

function onDragStart(e: DragEvent) {
  e.dataTransfer?.setData("taskId", props.task.id);
  e.dataTransfer!.effectAllowed = "move";
}

function goToDetail() {
  router.push(`/tasks/${props.task.id}`);
}
</script>

<template>
  <div
      class="task-card"
      draggable="true"
      @dragstart="onDragStart"
      @click="goToDetail"
  >
    <div class="task-title">
      <strong>
    {{ task.title }}
      </strong>
    </div>
    <div class="task-desc">
    <p v-if="task.description" class="content-desc">
      {{ task.description }}
    </p>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  height: 16rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  background: #ececec;
  padding: 1rem 2rem;
  border-radius: 6px;
  cursor: grab;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  color: #1a1a1a;
}

.task-card:active {
  cursor: grabbing;
}

.task-title {
  border-bottom: 1px solid #9a9a9a;
  padding-bottom: 0.5rem;
}

.task-desc {
  height: 9rem;
  display: flex;
  text-align: left;
  font-weight: 500;
  white-space: pre-wrap;

  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>