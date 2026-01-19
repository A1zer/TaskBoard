export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    order: number;
}

export interface Note {
    id: string;
    title: string;
    content: string;
}