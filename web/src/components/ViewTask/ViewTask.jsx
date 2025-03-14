import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Subtask from "../Subtask/Subtask";

const ViewTask = ()=> {
    // const { id_task } = useParams();
    // console.log(id_task);
    const selectedTask = useSelector((state) => state.tasks.selectedTask);
    const navigate = useNavigate();
    return (
        <div className="p-4">
            <header>
                <div  
                    className="d-flex justify-content-between" 
                    type="button" 
                >
                    <span onClick={() => navigate(-1)}>
                        <i className="bi bi-chevron-compact-left"></i>
                        <span className="ms-3">Retour</span>
                    </span>
                    <div className="">
                        <span 
                            className="text-secondary" type="button"
                            // onClick={()=>{
                            //     openEditModal(task);
                            //     handleClose();
                            // }}
                        >
                        modifier
                        </span>
                        <span
                            className="text-danger ms-4" type="button" 
                            // onClick={()=>{
                            //     openDeleteModal(task);
                            //     handleClose();
                            // }}
                        >
                        supprimer
                        </span>
                    </div>
                </div>
                <div className="mb-3 mt-4">
                    <h4 className="fw-bold">{selectedTask.title}</h4>
                </div>
            </header>
            <div className="mb-4">
                <p>{selectedTask.description}</p>
            </div>
            <div className="mb-4">
                <Subtask
                    subtasks = {selectedTask?.subtasks || []}
                />                                
            </div>
        </div>
    );
}
export default ViewTask;