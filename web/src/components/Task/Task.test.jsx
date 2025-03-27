import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import Task from "../Task/Task";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router";
import create from "../create";
import { setSelectedTask } from "../../redux/boardSlice";

const tasks = [
    {id_task :18,title :"Testing",description :"",id_column :18,subtasks : []},
    {id_task :34,title :"Containerization : Docker",description :"",id_column :19,subtasks :[]}
]

const MockTask = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Task tasks={tasks}/>
            </BrowserRouter>
        </Provider>
    );
};

afterEach(cleanup);

describe("Task component tests", () => {
    
    it("Should display correct task list and manage state correctly",async()=>{
        render(<MockTask/>)
        expect(tasks.map(item => item.title)).toEqual(['Testing', 'Containerization : Docker']);    
    });

    it("should open view task page on click task link", () => {
        render(<MockTask/>);
        const { store, invoke } = create();
        invoke((dispatch, getState) => {
            dispatch(setSelectedTask(tasks))
            getState()
        })
        const link = screen.getAllByTestId('view-task');
        fireEvent.click(link[0]);
        expect(store.dispatch).toHaveBeenCalledWith(setSelectedTask(tasks));
    });
    
});