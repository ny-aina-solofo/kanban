import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const boards = [
    { name: "Platform Launch", isActive : false }, 
    { name: "Marketing Plan", isActive : false }, 
]

const MockSidebar = () => {
    return (
        <Provider store={store}>
            <Sidebar/>
        </Provider>
    );
};

afterEach(cleanup);

describe("Board component tests", () => {
    
    it("display board",async()=>{
        render(<MockSidebar/>)
        expect(boards.map(item => item.name)).toEqual(['Platform Launch', 'Marketing Plan']);    
    });
    
});