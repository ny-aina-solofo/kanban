import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddBoardModal from "../Modal/Board/AddBoardModal";
import DeleteBoardModal from "../Modal/Board/DeleteBoardModal";
import EditBoardModal from "../Modal/Board/EditBoardModal";
import Navbar from "../Navbar/Navbar";
import AddColumn from "../Input/Column/AddColumn";
import { openInput } from "../../redux/inputSlice";
import { useDnd } from "@/hooks/useDnd";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import Task from "../Task/Task";
import DroppableColumn from "../DroppableColumn/DroppableColumn";
import { fetchBoards } from "@/redux/fetchBoards";
import { RootState } from "@/redux/store";
import { BoardType } from "@/types";


const Board = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchBoards() as any);
    // }, [dispatch]);

    const boards = useSelector((state:RootState) => state.boards.boards);
    const activeBoardId = useSelector((state:RootState) => state.boards.activeBoardId);
    const activeBoard = boards.find((board:BoardType) => board.id_board === activeBoardId);

    const addBoardModal = useSelector((state:RootState) => state.modal.addBoardModal);
    const deleteBoardModal = useSelector((state:RootState) => state.modal.deleteBoardModal);
    const editBoardModal = useSelector((state:RootState) => state.modal.editBoardModal);
    const addColumn = useSelector((state:RootState)=>state.input.addColumn);

    // const defaultEmptyBoard = {
    //     id_board: -1, 
    //     board_name: "Chargement...",
    //     column: [],
    // };
    
    // const dndContextResult = useDnd(activeBoard || defaultEmptyBoard);
    // const { activeTask, ...contextProps } = dndContextResult;
    const { activeTask, ...contextProps } = useDnd(activeBoard);

    const columns = activeBoard?.column || [];
    
    return (
        <DndContext {...contextProps}>
            <Navbar/>
            <section style={{ paddingLeft:"300px"}}>
                <div className="mt-4 d-flex flex-row">
                    <section className="d-flex flex-row" id="kanban-column">
                        {columns.map((col:any) => (
                            <DroppableColumn key={col.id_column} columns={col} />
                        ))}                       
                        {addColumn.open && <AddColumn />}
                    </section>
                
                    {createPortal(
                        <DragOverlay style={{cursor:"grabbing"}}>
                            {activeTask && <Task tasks={activeTask} />}
                        </DragOverlay>,
                        document.body
                    )}
                    <div>
                        <div> <p>&nbsp;</p> </div>
                        <div
                            data-testid="add-column-button"
                            className="bg-white ms-3 mt-5 rounded" 
                            onClick={()=>dispatch(openInput("addColumn"))}
                            style={{width:"252px", height:"100%",cursor:"pointer"}}
                        >
                            <div 
                                className="" 
                                style={{ position:"relative", top: "40%", left: "25%" }}
                            >
                                <i className="bi bi-plus"></i>
                                <span className="ms-3">New Column</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {addBoardModal.open && <AddBoardModal />}
            {deleteBoardModal.open && <DeleteBoardModal/>}
            {editBoardModal.open && <EditBoardModal/>}
        </DndContext>
    );
}

export default Board;