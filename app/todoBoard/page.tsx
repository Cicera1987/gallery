"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

import { addTask, removeTask, moveTask, editTask } from "../store/features/taskSlice";
import { RootState, AppDispatch } from "../store/store";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { TaskForm, TaskFormEdit } from "../types/Types";


const TodoBoard = () => {
    const dispatch = useDispatch <AppDispatch>();
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const { register, handleSubmit, reset } = useForm < TaskForm > ();
    const [editingTask, setEditingTask] = useState < string | null > (null);
    const [editForm, setEditForm] = useState <TaskFormEdit> ({ title: "", description: "" });

    const handleAddTask = (data: TaskForm) => {
        if (data.title.trim()) {
            dispatch(addTask({title: data.title, description: data.description, status: data.status}));
            reset();
        }
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        dispatch(moveTask({ id: result.draggableId, status: result.destination.droppableId as TaskForm["status"] }));
    };

    const handleEditTask = (taskId: string) => {
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
            setEditingTask(taskId);
            setEditForm({ title: task.title, description: task.description });
        }
    };

    const handleSaveEdit = () => {
        if (editingTask) {
            const taskToEdit = tasks.find((task) => task.id === editingTask);

            if (!taskToEdit) return;

            dispatch(editTask({
                id: editingTask,
                title: editForm.title,
                description: editForm.description,
                status: taskToEdit.status
            }));

            setEditingTask(null);
        }
    };

    const renderColumn = (status: "backlog" | "Em andamento" | "concluído") => {
        
        const statusColors: Record<typeof status, string> = {
            backlog: "text-gray-500 ",
            "Em andamento": "text-green-500",
            concluído: "text-blue-500 ",
        };
        const bgColors: Record<typeof status, string> = {
            backlog: "bg-gray-500",
            "Em andamento": "bg-green-500",
            concluído: "bg-blue-500",
        };

        return (
            <div className="bg-white p-4 rounded-lg w-1/3 border border-gray-200 shadow-lg">
                <h2 className={`text-lg font-semibold mb-4 ${statusColors[status]}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </h2>
                <Droppable droppableId={status}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px]">
                            {tasks
                                .filter((task) => task.status === status)
                                .map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-gray-100 p-3 mb-2 rounded-md border border-gray-200 shadow-md"
                                            >
                                                {editingTask === task.id ? (
                                                    <div className="flex flex-col space-y-2">
                                                        <input
                                                            type="text"
                                                            value={editForm.title}
                                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                            className="border px-2 py-1 rounded"
                                                        />
                                                        <textarea
                                                            value={editForm.description}
                                                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                                            className="border px-2 py-1 rounded"
                                                        />
                                                        <button
                                                            onClick={handleSaveEdit}
                                                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                                        >
                                                            Salvar
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col">
                                                            <h3 className="text-lg text-gray-600 font-semibold mb-4 flex items-center">
                                                                <span className={`w-3 h-3 rounded-full mr-2 ${bgColors[status]}`}></span>
                                                                {task.title}
                                                            </h3>
                                                            <p className=" flex justify-between space-x-2text-gray-500">{task.description}</p>
                                                        <div className="flex justify-between space-x-2 mt-2">
                                                            <button
                                                                onClick={() => handleEditTask(task.id)}
                                                                className="text-blue-500 hover:text-blue-700 cursor-pointer p-2 w-8 h-8"
                                                            >
                                                                <FaRegEdit />
                                                            </button>
                                                            <button
                                                                onClick={() => dispatch(removeTask(task.id))}
                                                                className="text-red-500 hover:text-red-700 cursor-pointer p-2 w-8 h-8"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    };


    return (
        <div className="max-w-6xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Lista de Tarefas</h1>
            <form onSubmit={handleSubmit(handleAddTask)} className="mb-8 flex flex-col space-y-2">
                <input
                    type="text"
                    {...register("title", { required: true })}
                    className="flex-1 px-3 py-2 border rounded-md"
                    placeholder="Título da Tarefa"
                />
                <textarea
                    {...register("description")}
                    className="flex-1 px-3 py-2 border rounded-md"
                    placeholder="Descrição da Tarefa"
                />
                <button type="submit" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                    Adicionar
                </button>
            </form>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex space-x-4">
                    {renderColumn("backlog")}
                    {renderColumn("Em andamento")}
                    {renderColumn("concluído")}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TodoBoard;