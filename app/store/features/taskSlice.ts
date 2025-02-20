import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type Task = {
    id: string;
    title: string;
    description: string;
    status: "backlog" | "Em andamento" | "concluído";
}

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
            state.tasks.push({
                id: uuidv4(),
                title: action.payload.title,
                description: action.payload.description,
                status: "backlog",
            });
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const task = state.tasks.find((task) => task.id === action.payload.id);
            if (task) {
                task.title = action.payload.title;
                task.description = action.payload.description;
                task.status = action.payload.status;
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        moveTask: (state, action: PayloadAction<{ id: string; status: Task["status"] }>) => {
            const task = state.tasks.find((task) => task.id === action.payload.id);
            if (task) {
                task.status = action.payload.status;
            }
        },
    },
});

export const { addTask, editTask, removeTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
