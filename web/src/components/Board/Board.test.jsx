import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import Board from "../Board/Board";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router";
import { openInput } from "../../redux/inputSlice";
import create from "../create";

const MockBoard = () => {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Board />
            </BrowserRouter>
        </Provider>
    )
}

describe("Board Component", () => {

    it("Should activeBoard and activeBoardId is defined ", () => {
        render(<MockBoard/>);
        expect(store.getState().boards.boards).toBeDefined();
        expect(store.getState().boards.activeBoardId).toBeDefined();
    });
    it("Should board modal and input is defined ", () => {
        render(<MockBoard/>);
        expect(store.getState().modal.addBoardModal).toBeDefined();
        expect(store.getState().modal.editBoardModal).toBeDefined();
        expect(store.getState().modal.deleteBoardModal).toBeDefined();
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