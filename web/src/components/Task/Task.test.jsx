import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import Task from "../Task/Task";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const tasks = [
    { name: "Platform Launch", isActive : false }, 
    { name: "Marketing Plan", isActive : false }, 
]

const MockTask = () => {
    return (
        <Task tasks={tasks}/>
    );
};

afterEach(cleanup);

describe("Board component tests", () => {
    
    it("display board",async()=>{
        render(<MockTask/>)
        expect(tasks.map(item => item.name)).toEqual(['Platform Launch', 'Marketing Plan']);    
    });
    
});