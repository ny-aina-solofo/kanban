import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "../Column/Column";
import AddBoardModal from "../Modal/Board/AddBoardModal";
import DeleteBoardModal from "../Modal/Board/DeleteBoardModal";
import EditBoardModal from "../Modal/Board/EditBoardModal";
import Navbar from "../Navbar/Navbar";
import AddColumn from "../Input/Column/AddColumn";
import { openInput } from "../../redux/inputSlice";

const Board = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state:any) => state.boards.boards);
    const activeBoardId = useSelector((state:any) => state.boards.activeBoardId);
    const activeBoard = boards.find((board:any) => board.id_board === activeBoardId);
    const columns = activeBoard?.column || [];
    const addBoardModal = useSelector((state:any) => state.modal.addBoardModal);
    const deleteBoardModal = useSelector((state:any) => state.modal.deleteBoardModal);
    const editBoardModal = useSelector((state:any) => state.modal.editBoardModal);
    const addColumn = useSelector((state:any)=>state.input.addColumn);

    return (
        <main>
            <Navbar/>
            {activeBoard ? (
                <section style={{ paddingLeft:"300px"}}>
                    <div className="mt-4 d-flex flex-row">
                        <section className="d-flex flex-row" id="kanban-column">
                            {columns.map((col:any) => (
                                <Column key={col.id_column} columns={col} />
                            ))}                       
                            {addColumn.open && <AddColumn />}
                        </section>
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
            ) : (
                <article className="ms-2 text-center text-muted mt-3">
                    Aucun tableau de colonnes n'est disponible. 
                    Cliquez sur <strong>+</strong> pour en ajouter une.
                </article>
            )}
            {addBoardModal.open && <AddBoardModal />}
            {deleteBoardModal.open && <DeleteBoardModal/>}
            {editBoardModal.open && <EditBoardModal/>}
        </main>
    );
}

export default Board;
