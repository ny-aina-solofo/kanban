import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import Column from "../Column/Column";

const Board = () => {
    const boards = useSelector((state) => state.boards.boards);
    const activeBoardId = useSelector(state => state.boards.activeBoardId);
    const activeBoard = boards.find(board => board.id_board === activeBoardId);
    return (
        <div>
            <Sidebar />
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
        </div>
    )
}

export default Board;
