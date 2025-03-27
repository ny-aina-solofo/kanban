import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Subtask from "../Subtask/Subtask";
import DropdownTask from "../Dropdown/DropdownTask";
import DeleteTaskModal from "../Modal/Task/DeleteTaskModal";
import EditDescription from "../Input/Task/EditDescription";
import { openInput } from "../../redux/inputSlice";
import EditTitle from "../Input/Task/EditTitle";
import { setSelectedTask } from "../../redux/boardSlice";


const ViewTask = ()=> {
    // const { id_task } = useParams();
    // console.log(id_task);
    const dispatch = useDispatch();
    const selectedTask = useSelector((state) => state.boards.selectedTask);
    const navigate = useNavigate();
    const deleteTaskModal = useSelector((state) => state.modal.deleteTaskModal);
    const editDescription = useSelector((state)=>state.input.editDescription);
    const editTitle = useSelector((state)=>state.input.editTitle);
    
    useEffect(() => {
        if (!selectedTask?.id_task) {
            const savedTask = localStorage.getItem("selectedTask");
            if (savedTask) {
                dispatch(setSelectedTask(JSON.parse(savedTask))); // 🔥 Restaurer
            }
        }
    }, [selectedTask, dispatch]);

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
                    <div className="d-flex justify-content-between">
                        {editTitle.open ? (
                            <EditTitle/>
                        ) : (
                            <h5 
                                className="mb-4 mt-2 fw-bold" type="button"
                                onClick={() => dispatch(openInput("editTitle"))}
                            >
                                {selectedTask.title}
                            </h5>
                        )}
                        <DropdownTask/>
                    </div>
                    <div className="mb-4">
                        {editDescription.open ? (
                            <EditDescription/>
                        ) : (
                            <p type="button" onClick={() => dispatch(openInput("editDescription"))}>
                                {selectedTask?.description || "No description"}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <Subtask subtasks={selectedTask?.subtasks || []}/>                                
                    </div>
                    
                </main>
            </div>
            {deleteTaskModal.open && <DeleteTaskModal/>}
        </div>
    );
}
export default ViewTask;