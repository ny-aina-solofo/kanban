import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import create from "../create";
import { openModal } from "../../redux/modalSlice";
import { setActiveBoard } from "../../redux/boardSlice";


const boards = [
    {id_board:11,board_name:"Learning",column:[]},    
    {id_board:12,board_name:"Refactor todolist",column:[]},    
]

const MockSidebar = () => {
    return (
        <Provider store={store}>
            <Sidebar/>
        </Provider>
    );
};

afterEach(cleanup);

describe("Sidebar component tests", () => {
    it("display correct board list manage state correctly ",async()=>{
        render(<MockSidebar/>)
        expect(boards.map(item => item.board_name)).toEqual(['Learning', 'Refactor todolist']);    
        expect(store.getState().boards.activeBoardId).toBeDefined();
    });
    it("should open add-board-modal on plus button click", () => {
        render(<MockSidebar/>);
        const { store, invoke } = create();
        invoke((dispatch, getState) => {
            dispatch(openModal("addBoardModal"))
            getState()
        })
        const plusButton = screen.getByTestId('add-board');
        fireEvent.click(plusButton);
        expect(store.dispatch).toHaveBeenCalledWith(openModal("addBoardModal"));
    });

    it("should change active board on click", () => {
        render(<MockSidebar/>);
        const { store, invoke } = create();
        invoke((dispatch, getState) => {
            dispatch(setActiveBoard(boards.id_board))
            getState()
        })
        const boardButtons = screen.getAllByTestId("board-list");    
        fireEvent.click(boardButtons[0]);
        expect(store.dispatch).toHaveBeenCalledWith(setActiveBoard(boards.id_board));
        
    });
});