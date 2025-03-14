import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import Column from "../Column/Column";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const columns = [
    { name: "todo" , id_board : 11 }, 
    { name: "doing",id_board : 11 }, 
]

const MockColumn = () => {
    return (
        <Column columns={columns}/>
    );
};

afterEach(cleanup);

describe("Board component tests", () => {
    
    it("display board",async()=>{
        render(<MockColumn/>)
        expect(columns.map(item => item.column_name)).toEqual(['todo', 'doing']);    
    });
    
});