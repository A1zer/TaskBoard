import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAppStore } from "../stores/appStore";

describe("App Store – Tasks & Notes", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
    });

    it("adds a new task", () => {
        const store = useAppStore();

        store.addTask({
            id: "1",
            title: "Test task",
            completed: false,
            order: 0
        });

        expect(store.tasks.length).toBe(1);
        // @ts-ignore
        expect(store.tasks[0].title).toBe("Test task");
    });

    it("toggles task completion", () => {
        const store = useAppStore();

        store.addTask({
            id: "1",
            title: "Toggle task",
            completed: false,
            order: 0
        });

        store.toggleTask("1");

        // @ts-ignore
        expect(store.tasks[0].completed).toBe(true);
    });

    it("removes a task", () => {
        const store = useAppStore();

        store.addTask({
            id: "1",
            title: "Delete task",
            completed: false,
            order: 0
        });

        store.removeTask("1");

        expect(store.tasks.length).toBe(0);
    });

    it("adds a note", () => {
        const store = useAppStore();

        store.addNote({
            id: "n1",
            title: "Test note",
            content: "Hello"
        });

        expect(store.notes.length).toBe(1);
        // @ts-ignore
        expect(store.notes[0].title).toBe("Test note");
    });

    it("removes a note", () => {
        const store = useAppStore();

        store.addNote({
            id: "n1",
            title: "Test note",
            content: "Hello"
        });

        store.removeNote("n1");

        expect(store.notes.length).toBe(0);
    });
});
