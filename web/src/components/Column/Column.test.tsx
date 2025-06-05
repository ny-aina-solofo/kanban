import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import Column from "./Column";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router";

interface ColumnType {
    id_column: number;
    id_board: number;
    column_name: string;
    tasks: any[];
}
  
const mockColumn: ColumnType = {
    id_column: 17,
    id_board: 11,
    column_name: "todo",
    tasks: [],
};

const columns = [
    {id_column:17,column_name:"todo",id_board:11,tasks:[]},
    {id_column:18,column_name:"progress",id_board:11,tasks:[]}
]


const MockColumn = () => {
    return (
    <Provider store={store}>
        <BrowserRouter>    
           <Column columns={mockColumn}/>
        </BrowserRouter>
    </Provider>
    );
};

afterEach(cleanup);

describe("Column component tests", () => {
    it("display columns if columns length > 0 manage state correctly ",async()=>{
        render(<MockColumn/>)
        expect(columns.map(item => item.column_name)).toEqual(['todo', 'progress']);    
    });
    
});