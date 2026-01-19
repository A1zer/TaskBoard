import { defineStore } from "pinia";
import type {Task, Note} from "../types";
import { load, save } from "../utils/storage";

export const useAppStore = defineStore("app", {
    state: () => ({
        tasks: load<Task[]>("tasks"),
        notes: load<Note[]>("notes")
    }),

    actions: {
        addTask(task: Task) {
            this.tasks.push(task);
            save("tasks", this.tasks);
        },

        toggleTask(id: string) {
            const task = this.tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                save("tasks", this.tasks);
            }
        },

        removeTask(id: string) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            save("tasks", this.tasks);
        },

        updateTask(updated: Task) {
            const index = this.tasks.findIndex(t => t.id === updated.id);
            if (index !== -1) {
                this.tasks[index] = updated;
                save("tasks", this.tasks);
            }
        },

        addNote(note: Note) {
            this.notes.push(note);
            save("notes", this.notes);
        },

        removeNote(id: string) {
            this.notes = this.notes.filter(n => n.id !== id);
            save("notes", this.notes);
        },

        updateNote(updated: Note) {
            const index = this.notes.findIndex(n => n.id === updated.id);
            if (index !== -1) {
                this.notes[index] = updated;
                save("notes", this.notes);
            }
        },

        updateTaskStatus(id: string, completed: boolean) {
            const task = this.tasks.find(t => t.id === id);
            if (!task) return;

            task.completed = completed;
            save("tasks", this.tasks);
        },

        moveTask(id: string, completed: boolean) {
            const task = this.tasks.find(t => t.id === id);
            if (!task) return;

            const targetTasks = this.tasks.filter(
                t => t.completed === completed && t.id !== id
            );

            const maxOrder =
                targetTasks.length > 0
                    ? Math.max(...targetTasks.map(t => t.order))
                    : -1;

            task.completed = completed;
            task.order = maxOrder + 1;

            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        },

    }
});
