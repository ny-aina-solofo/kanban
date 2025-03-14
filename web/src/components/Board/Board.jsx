import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "../Column/Column";
import AddBoardModal from "../Modal/Board/AddBoardModal";
import DeleteBoardModal from "../Modal/Board/DeleteBoardModal";

const Board = () => {
    const boards = useSelector((state) => state.boards.boards);
    const activeBoardId = useSelector(state => state.boards.activeBoardId);
    const activeBoard = boards.find(board => board.id_board === activeBoardId);
   
    const addBoardModal = useSelector((state) => state.modal.addBoardModal);
    const deleteBoardModal = useSelector((state) => state.modal.deleteBoardModal);
   
    return (
        <div>
            {activeBoard.column.length > 0  ? (
                <div>
                    <Column 
                        columns= {activeBoard?.column || []} 
                    />
                </div>
            ) : (
                <div className="text-center text-muted mt-3">
                    Aucun tableau de colonnes n'est disponible. 
                    Cliquez sur <strong>+ New Board</strong> pour en ajouter une.
                </div>
            )}
            {addBoardModal.open && <AddBoardModal />}
            {deleteBoardModal.open && <DeleteBoardModal/>}
        </div>
    )
}

export default Board;
