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
        <div style={{ width: "150vh", paddingLeft:"350px" }}>
            <div className="p-4">
                <div 
                    className="mb-4" type="button"
                    onClick={() => navigate(-1)}
                >
                    <i className="bi bi-chevron-compact-left"></i>
                    <span className="ms-3">Retour</span>
                </div>

                <main className="border rounded p-3">
                    <h5 className="mb-4 mt-2 fw-bold">{selectedTask.title}</h5>
                    <div className="mb-4">
                        <p>{selectedTask?.description || 'no-description'}</p>
                    </div>
                    <div className="">
                        <Subtask
                            subtasks = {selectedTask?.subtasks || []}
                        />                                
                    </div>
                </main>
            </div>
        </div>
    );
}
export default ViewTask;