import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import Column from "../Column/Column";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router";
import { openInput } from "../../redux/inputSlice";
import create from "../create";

const columns = [
    {id_column:17,column_name:"todo",id_board:11,tasks:[]},
    {id_column:18,column_name:"progress",id_board:11,tasks:[]}
]


const MockColumn = () => {
    return (
    <Provider store={store}>
        <BrowserRouter>    
           <Column columns={columns}/>
        </BrowserRouter>
    </Provider>
    );
};

afterEach(cleanup);

describe("Column component tests", () => {
    it("display columns if columns length > 0 manage state correctly ",async()=>{
        render(<MockColumn/>)
        expect(columns.map(item => item.column_name)).toEqual(['todo', 'progress']);    
        expect(store.getState().input.addColumn).toBeDefined();
    });
    it("Should open input on click add column button ", () => {
        render(<MockColumn/>);
        const { store, invoke } = create();
        invoke((dispatch, getState) => {
            dispatch(openInput("addColumn"))
            getState()
        })
        const addColumnBtn = screen.getAllByTestId('add-column-button');
        fireEvent.click(addColumnBtn[0]);
        expect(store.dispatch).toHaveBeenCalledWith(openInput("addColumn"));
    })
});