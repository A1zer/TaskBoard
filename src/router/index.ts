import { createRouter, createWebHistory } from "vue-router";

import DashboardView from "../views/DashboardView.vue";
import TasksView from "../views/TasksView.vue";
import TaskDetailView from "../views/TaskDetailView.vue";
import NotesView from "../views/NotesView.vue";
import NoteDetailView from "../views/NoteDetailView.vue";
import ProfileViews from "../views/ProfileView.vue";

const routes = [
    { path: "/", component: DashboardView },
    { path: "/tasks", component: TasksView },
    { path: "/tasks/:id", component: TaskDetailView },
    { path: "/notes", component: NotesView },
    { path: "/notes/:id", component: NoteDetailView },
    { path: "/profile", component: ProfileViews }
];

export const router = createRouter({
    history: createWebHistory("TaskBoard"),
    routes
});
