"use client";

import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

import { addTask, removeTask, moveTask , editTask} from "../store/features/taskSlice"
import { RootState, AppDispatch } from "../store/store";
import { FaTrash, FaRegEdit } from "react-icons/fa";

const TodoBoard =  () => {
    const [newTask, setNewTask] = useState("");
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const [editTaskId, setEditTaskId] = useState < string | null > (null);
    const [editText, setEditText] = useState("");
    const dispatch = useDispatch < AppDispatch > ();

    const handleAddTask = (e: FormEvent) => {
        e.preventDefault();
        if (newTask.trim()) {
            dispatch(addTask(newTask.trim()));
            setNewTask("");
        }
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        dispatch(moveTask({ id: result.draggableId, status: result.destination.droppableId as "backLog" | "Em andamento " | "concluído" }));
    };

    const handleEditTask = (id: string, text: string) => {
        setEditTaskId(id);
        setEditText(text);
    };

    const handleSaveEdit = () => {
        if (editTaskId && editText.trim()) {
            dispatch(editTask({ id: editTaskId, text: editText.trim() }));
            setEditTaskId(null);
            setEditText("");
        }
    };

    const renderColumn = (status: "backlog" | "Em andamento" | "concluído") => (
        <div className="bg-gray-100 p-4 rounded-md w-1/3">
            <h2 className="text-lg font-semibold mb-4 text-gray-500">
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
                                            className="bg-white p-3 mb-2 rounded-md shadow flex justify-between items-center"
                                        >
                                            {editTaskId === task.id ? (
                                                <input
                                                    type="text"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    className="border p-1 rounded-md flex-1"
                                                />
                                            ) : (
                                                <h3 className="font-semibold text-gray-400 flex-1">{task.text}</h3>
                                            )}

                                            <div className="flex space-x-2">
                                                {editTaskId === task.id ? (
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="text-green-500 hover:text-green-700"
                                                    >
                                                        ✔️
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEditTask(task.id, task.text)}
                                                        className="text-green-500 hover:text-green-700"
                                                    >
                                                            <FaRegEdit  size={20}/>
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => dispatch(removeTask(task.id))}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
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
    
    return (
        <div className="max-w-6xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Lista de Tarefas</h1>
            <form onSubmit={handleAddTask} className="mb-8 flex items-center space-x-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md"
                    placeholder="Adicionar nova Tarefa"
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
