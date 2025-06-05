import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Subtask from "../Subtask/Subtask";
import DeleteTaskModal from "../Modal/Task/DeleteTaskModal";
import EditDescription from "../Input/Task/EditDescription";
import { openInput } from "../../redux/inputSlice";
import EditTitle from "../Input/Task/EditTitle";
import { setSelectedTask } from "../../redux/boardSlice";
import { openModal } from "../../redux/modalSlice";
import ChangeTaskStatus from "../Select/ChangeTaskStatus";

const ViewTask = ()=> {
    // const { id_task } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boards = useSelector((state:any) => state.boards.boards);
    const activeBoardId = useSelector((state:any) => state.boards.activeBoardId);
    const activeBoard = boards.find((board:any) => board.id_board === activeBoardId);
    const selectedTask = useSelector((state:any) => state.boards.selectedTask);
    const columns = activeBoard?.column || [] ;
    const column_name = columns.find((col:any) => col.id_column === selectedTask.id_column)?.column_name || '';

    const deleteTaskModal = useSelector((state:any) => state.modal.deleteTaskModal);
    const editDescription = useSelector((state:any)=>state.input.editDescription);
    const editTitle = useSelector((state:any)=>state.input.editTitle);

    useEffect(() => {
        if (!selectedTask?.id_task) {
            const savedTask = localStorage.getItem("selectedTask");
            if (savedTask) {
                dispatch(setSelectedTask(JSON.parse(savedTask))); // 🔥 Restaurer
            }
        }
    }, [selectedTask, dispatch]);

    return (
        <div style={{ width: "150vh", paddingLeft:"300px" }}>
            <div className="ms-5">
                <div 
                    className="mb-4 mt-3"
                    style={{cursor:"pointer"}}
                    onClick={() => navigate(-1)}
                >
                    <i className="bi bi-chevron-compact-left"></i>
                    <span className="ms-3">Retour</span>
                </div>

                <div className=" bg-white border rounded p-3">
                    <header className="mb-4">
                        {editTitle.open ? (
                            <EditTitle/>
                        ) : (
                            <h5 
                                className="mt-2 fw-bold"
                                style={{cursor:"pointer"}}
                                onClick={() => dispatch(openInput("editTitle"))}
                            >
                                {selectedTask.title}
                            </h5>
                        )}
                        <div 
                            className="d-flex align-items-center"
                            // style={{fontSize:"14px"}}
                        >
                            <small>statut</small>
                            <div className="dropdown">
                                <div 
                                    className="ms-2 border rounded p-1" 
                                
                                    style={{cursor:"pointer"}}
                                    data-bs-toggle="dropdown" aria-expanded="false"
                                >
                                    <span>{column_name}</span>
                                    <i className="ms-2 bi bi-chevron-down"></i>
                                </div>
                                <div 
                                    className="dropdown-menu p-3" 
                                    // style={{width:"200px",height:"100px"}}
                                >
                                    <ChangeTaskStatus/>  
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className="d-flex">
                        <section style={{ width: "90vh"}}>
                            <div className="mb-4">
                                {editDescription.open ? (
                                    <EditDescription/>
                                ) : (
                                    <p
                                    style={{cursor:"pointer"}} onClick={() => dispatch(openInput("editDescription"))}>
                                        {selectedTask?.description || "No description"}
                                    </p>
                                )}
                            </div>
                            <div className="">
                                <Subtask subtasks={selectedTask?.subtasks || []}/>                                
                            </div>
                        </section>
                        <section className="ms-3 d-flex flex-column">
                            <button 
                                className="border rounded"
                                style={{cursor:"pointer"}} 
                                onClick={() =>{
                                    dispatch(openModal("deleteTaskModal"));
                                    dispatch(setSelectedTask(selectedTask));
                                }}
                            >
                                supprimer
                            </button>
                            <button 
                                className="border rounded mt-2"
                                style={{cursor:"pointer"}}
                                onClick={() => dispatch(openInput("addSubtask"))} 
                            >
                                ajouter sous-tâches
                            </button>
                        </section>
                    </main>
                    
                </div>
            </div>
            {deleteTaskModal.open && <DeleteTaskModal/>}
        </div>
    );
}
export default ViewTask;