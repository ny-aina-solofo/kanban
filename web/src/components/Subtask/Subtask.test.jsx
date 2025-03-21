import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router";
import create from "../create";
import Subtask from "./Subtask";

const subtasks = [
    {done:true,id_task:18,libelle:"TDD",id_subtask:19},
    {done:false,id_task:18,libelle:"React Testing",id_subtask:21},
]

const MockSubtask = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Subtask subtasks={subtasks}/>
            </BrowserRouter>
        </Provider>
    );
};

afterEach(cleanup);

describe("SubTask component tests", () => {
    
    it("Should display correct subtask list and manage state correctly",async()=>{
        render(<MockSubtask/>)
        expect(subtasks.map(item => item.libelle)).toEqual(['TDD', 'React Testing']);
        expect(store.getState().input.addSubtask).toBeDefined();
    });
    it("delete subtask", async () => {
        render(<MockSubtask/>)
        const deleteButtons = screen.getAllByTestId('delete-button');
        fireEvent.click(deleteButtons[0]);
    });

    it("update checkbox", async () => {
        render(<MockSubtask/>)
        const checkboxs = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxs[0]);
        expect(checkboxs[0].checked).toBe(true);
    });
 
});