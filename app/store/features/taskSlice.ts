import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Task {
    id: string;
    text: string;
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
        addTask: (state, action: PayloadAction<string>) => {
            state.tasks.push({
                id: Date.now().toString(),
                text: action.payload,
                status: "backlog",
            });
        },
        editTask: (state, action: PayloadAction<{ id: string; text: string }>) => {
            const task = state.tasks.find((task) => task.id === action.payload.id);
            if (task) {
                task.text = action.payload.text;
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
