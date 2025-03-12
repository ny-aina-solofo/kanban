import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import Column from "../Column/Column";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const columns = [
    { name: "Platform Launch", isActive : false }, 
    { name: "Marketing Plan", isActive : false }, 
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
        expect(columns.map(item => item.name)).toEqual(['Platform Launch', 'Marketing Plan']);    
    });
    
});